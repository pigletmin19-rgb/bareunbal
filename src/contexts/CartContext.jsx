import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'bareunbal_cart'

function loadCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = useCallback((product, size, qty = 1) => {
    setItems(prev => {
      const key = `${product.id}-${size}`
      const existing = prev.find(i => i.key === key)
      if (existing) return prev.map(i => i.key === key ? { ...i, qty: i.qty + qty } : i)
      return [...prev, { key, product, size, qty }]
    })
  }, [])

  const removeItem = useCallback((key) => setItems(prev => prev.filter(i => i.key !== key)), [])
  const updateQty = useCallback((key, qty) => {
    if (qty < 1) return
    setItems(prev => prev.map(i => i.key === key ? { ...i, qty } : i))
  }, [])
  const clearCart = useCallback(() => setItems([]), [])

  const totalCount = items.reduce((s, i) => s + i.qty, 0)
  const totalPrice = items.reduce((s, i) => s + i.product.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, totalCount, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
