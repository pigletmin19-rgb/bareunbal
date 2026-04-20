import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { getSettings } from '../data/siteSettings'
import styles from './Header.module.css'

const NAV_LEFT = [
  {
    label: '여성',
    path: '/products/women',
    sub: [
      { label: '신상품', path: '/products/women?tag=new' },
      { label: '워킹화', path: '/products/women' },
      { label: '러닝화', path: '/products/women' },
      { label: '슬립온', path: '/products/women' },
      { label: '세일', path: '/products/sale' },
    ],
  },
  {
    label: '남성',
    path: '/products/men',
    sub: [
      { label: '신상품', path: '/products/men?tag=new' },
      { label: '워킹화', path: '/products/men' },
      { label: '러닝화', path: '/products/men' },
      { label: '스탠딩화', path: '/products/men' },
      { label: '세일', path: '/products/sale' },
    ],
  },
  {
    label: '키즈',
    path: '/products/kids',
    sub: null,
  },
  {
    label: '소재 & 기술',
    path: '/about',
    sub: null,
  },
  {
    label: '세일',
    path: '/products/sale',
    sub: null,
    accent: true,
  },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hoveredNav, setHoveredNav] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const { totalCount } = useCart()
  const location = useLocation()
  const leaveTimer = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setHoveredNav(null)
    document.body.style.overflow = ''
  }, [location.pathname])

  const handleMouseEnter = (label) => {
    clearTimeout(leaveTimer.current)
    setHoveredNav(label)
  }

  const handleMouseLeave = () => {
    leaveTimer.current = setTimeout(() => setHoveredNav(null), 120)
  }

  const toggleMenu = () => {
    setMenuOpen(v => {
      document.body.style.overflow = !v ? 'hidden' : ''
      return !v
    })
  }

  const activeDropdown = NAV_LEFT.find(n => n.label === hoveredNav && n.sub)

  return (
    <>
      {/* 상단 공지 배너 */}
      {getSettings().bannerVisible && (
        <div className={styles.announceBanner}>
          <p>{getSettings().bannerText}</p>
        </div>
      )}

      <div className={styles.spacer} />

      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          {/* 왼쪽 네비게이션 */}
          <nav className={styles.navLeft}>
            {NAV_LEFT.map(n => (
              <div
                key={n.label}
                className={styles.navItem}
                onMouseEnter={() => handleMouseEnter(n.label)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={n.path}
                  className={`${styles.navLink} ${n.accent ? styles.saleLink : ''} ${location.pathname === n.path ? styles.navLinkActive : ''}`}
                >
                  {n.label}
                </Link>
              </div>
            ))}
          </nav>

          {/* 중앙 로고 */}
          <Link to="/" className={styles.logo}>바른발</Link>

          {/* 오른쪽 아이콘 */}
          <div className={styles.navRight}>
            <Link to="/login" className={styles.iconBtn} aria-label="로그인">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>
            <Link to="/cart" className={styles.cartBtn} aria-label="장바구니">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {totalCount > 0 && <span className={styles.cartBadge}>{totalCount}</span>}
            </Link>
            <button className={styles.hamburger} onClick={toggleMenu} aria-label="메뉴">
              <span className={styles.hamBar} />
              <span className={styles.hamBar} />
              <span className={styles.hamBar} />
            </button>
          </div>
        </div>

        {/* 드롭다운 메가메뉴 */}
        {activeDropdown && (
          <div
            className={styles.dropdown}
            onMouseEnter={() => handleMouseEnter(activeDropdown.label)}
            onMouseLeave={handleMouseLeave}
          >
            <div className={styles.dropdownInner}>
              <div className={styles.dropdownLinks}>
                <p className={styles.dropdownTitle}>{activeDropdown.label}</p>
                {activeDropdown.sub.map(s => (
                  <Link key={s.label} to={s.path} className={styles.dropdownLink}>
                    {s.label}
                  </Link>
                ))}
              </div>
              <div className={styles.dropdownFeatured}>
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80"
                  alt="추천 상품"
                  className={styles.dropdownImg}
                />
                <p className={styles.dropdownFeaturedLabel}>이번 시즌 신제품</p>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* 모바일 메뉴 */}
      {menuOpen && (
        <div className={styles.overlay} onClick={toggleMenu}>
          <div className={styles.mobileMenu} onClick={e => e.stopPropagation()}>
            <div className={styles.mobileHead}>
              <Link to="/" className={styles.mobileLogo} onClick={toggleMenu}>바른발</Link>
              <button className={styles.closeBtn} onClick={toggleMenu}>✕</button>
            </div>
            {NAV_LEFT.map(n => (
              <Link
                key={n.path}
                to={n.path}
                className={`${styles.mobileLink} ${n.accent ? styles.mobileSale : ''}`}
                onClick={toggleMenu}
              >
                {n.label}
              </Link>
            ))}
            <div className={styles.mobileDivider} />
            <Link to="/login" className={styles.mobileLink} onClick={toggleMenu}>로그인 / 회원가입</Link>
            <Link to="/mypage" className={styles.mobileLink} onClick={toggleMenu}>마이페이지</Link>
          </div>
        </div>
      )}
    </>
  )
}
