import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import LoginPage from './pages/LoginPage'
import MyPage from './pages/MyPage'
import OrdersPage from './pages/OrdersPage'
import AboutPage from './pages/AboutPage'
import NoticePage from './pages/NoticePage'
import FaqPage from './pages/FaqPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import NotFoundPage from './pages/NotFoundPage'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProducts from './pages/admin/AdminProducts'
import AdminOrders from './pages/admin/AdminOrders'
import AdminMembers from './pages/admin/AdminMembers'
import AdminCoupons from './pages/admin/AdminCoupons'
import AdminReviews from './pages/admin/AdminReviews'
import AdminSettings from './pages/admin/AdminSettings'
import { CartProvider } from './contexts/CartContext'
import { AuthProvider } from './contexts/AuthContext'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  return (
    <AuthProvider>
    <CartProvider>
      <Routes>
        {/* 관리자 라우트 */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="members" element={<AdminMembers />} />
          <Route path="coupons" element={<AdminCoupons />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* 일반 라우트 */}
        <Route path="/*" element={
          <div className="app">
            <ScrollToTop />
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/men" element={<ProductsPage category="men" />} />
                <Route path="/products/women" element={<ProductsPage category="women" />} />
                <Route path="/products/sale" element={<ProductsPage category="sale" />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/notice" element={<NoticePage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        } />
      </Routes>
    </CartProvider>
    </AuthProvider>
  )
}
