import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import styles from './CartPage.module.css'

export default function CartPage() {
  const { items, removeItem, updateQty, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()

  const shippingFee = totalPrice >= 50000 ? 0 : 3000
  const finalPrice = totalPrice + shippingFee

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyIcon}>🛍️</p>
        <h2 className={styles.emptyTitle}>장바구니가 비어있습니다</h2>
        <p className={styles.emptyDesc}>마음에 드는 상품을 담아보세요.</p>
        <Link to="/products" className={styles.shopBtn}>쇼핑 계속하기</Link>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>장바구니</h1>

        <div className={styles.layout}>
          <div className={styles.items}>
            {items.map(item => (
              <div key={item.key} className={styles.item}>
                <div className={styles.itemImg}>
                  <img src={item.product.image} alt={item.product.name} />
                </div>
                <div className={styles.itemInfo}>
                  <p className={styles.itemName}>{item.product.name}</p>
                  <p className={styles.itemMeta}>사이즈: {item.size}mm</p>
                  <div className={styles.itemBottom}>
                    <div className={styles.qtyControl}>
                      <button onClick={() => updateQty(item.key, item.qty - 1)} disabled={item.qty <= 1}>－</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.key, item.qty + 1)}>＋</button>
                    </div>
                    <span className={styles.itemPrice}>
                      {(item.product.price * item.qty).toLocaleString()}원
                    </span>
                  </div>
                </div>
                <button className={styles.removeBtn} onClick={() => removeItem(item.key)}>✕</button>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <h3 className={styles.summaryTitle}>주문 요약</h3>

            <div className={styles.summaryRows}>
              <div className={styles.summaryRow}>
                <span>상품 금액</span>
                <span>{totalPrice.toLocaleString()}원</span>
              </div>
              <div className={styles.summaryRow}>
                <span>배송비</span>
                <span>{shippingFee === 0 ? '무료' : `${shippingFee.toLocaleString()}원`}</span>
              </div>
              {shippingFee > 0 && (
                <p className={styles.freeShipHint}>
                  {(50000 - totalPrice).toLocaleString()}원 더 담으면 무료배송!
                </p>
              )}
            </div>

            <div className={styles.divider} />
            <div className={styles.totalRow}>
              <span>총 결제 금액</span>
              <span className={styles.totalPrice}>{finalPrice.toLocaleString()}원</span>
            </div>

            <button
              className={styles.checkoutBtn}
              onClick={() => navigate('/checkout')}
            >
              주문하기
            </button>

            <Link to="/products" className={styles.continueBtn}>쇼핑 계속하기</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
