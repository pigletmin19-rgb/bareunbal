import React, { useState } from 'react'
import { Outlet, NavLink, Link } from 'react-router-dom'
import styles from './AdminLayout.module.css'

const MENU = [
  { path: '/admin', label: '대시보드', icon: '📊', exact: true },
  { path: '/admin/products', label: '상품 관리', icon: '👟' },
  { path: '/admin/orders', label: '주문 관리', icon: '📦' },
  { path: '/admin/members', label: '회원 관리', icon: '👥' },
  { path: '/admin/coupons', label: '쿠폰 관리', icon: '🎫' },
  { path: '/admin/reviews', label: '리뷰 관리', icon: '⭐' },
  { path: '/admin/settings', label: '설정', icon: '⚙️' },
]

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className={styles.layout}>
      <aside className={`${styles.sidebar} ${sidebarOpen ? '' : styles.collapsed}`}>
        <div className={styles.sidebarHead}>
          <Link to="/" className={styles.logo}>바른발</Link>
          <span className={styles.adminBadge}>관리자</span>
        </div>

        <nav className={styles.nav}>
          {MENU.map(m => (
            <NavLink
              key={m.path}
              to={m.path}
              end={m.exact}
              className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navActive : ''}`}
            >
              <span className={styles.navIcon}>{m.icon}</span>
              <span className={styles.navLabel}>{m.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className={styles.sidebarBottom}>
          <Link to="/" className={styles.shopLink}>← 쇼핑몰 보기</Link>
        </div>
      </aside>

      <div className={styles.main}>
        <header className={styles.topBar}>
          <button className={styles.menuToggle} onClick={() => setSidebarOpen(v => !v)}>
            ☰
          </button>
          <span className={styles.topBarTitle}>바른발 관리자</span>
          <span className={styles.adminName}>관리자</span>
        </header>

        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
