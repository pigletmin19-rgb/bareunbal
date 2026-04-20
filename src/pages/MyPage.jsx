import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './MyPage.module.css'

const TABS = ['주문 내역', '개인정보', '배송지 관리', '쿠폰 / 포인트']

const MOCK_ORDERS = [
  { id: 'ORD-001', date: '2026-04-18', product: '스파인케어 워커 Pro', size: 265, price: 198000, status: '결제완료' },
  { id: 'ORD-002', date: '2026-03-10', product: '클라우드 스텝 슬립온', size: 250, price: 138000, status: '배송완료' },
]

export default function MyPage() {
  const [tab, setTab] = useState(0)

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <div className={styles.userCard}>
            <div className={styles.avatar}>👤</div>
            <p className={styles.userName}>[이름]</p>
            <p className={styles.userGrade}>일반 회원</p>
          </div>

          <nav className={styles.sideNav}>
            {TABS.map((t, i) => (
              <button
                key={t}
                className={`${styles.sideNavItem} ${tab === i ? styles.sideNavActive : ''}`}
                onClick={() => setTab(i)}
              >
                {t}
              </button>
            ))}
            <button className={styles.logoutBtn}>로그아웃</button>
          </nav>
        </div>

        <div className={styles.content}>
          <h1 className={styles.tabTitle}>{TABS[tab]}</h1>

          {tab === 0 && (
            <div className={styles.orderList}>
              {MOCK_ORDERS.map(o => (
                <div key={o.id} className={styles.orderCard}>
                  <div className={styles.orderTop}>
                    <span className={styles.orderId}>{o.id}</span>
                    <span className={styles.orderDate}>{o.date}</span>
                  </div>
                  <div className={styles.orderBody}>
                    <p className={styles.orderProduct}>{o.product} (사이즈 {o.size}mm)</p>
                    <div className={styles.orderBottom}>
                      <span className={styles.orderPrice}>{o.price.toLocaleString()}원</span>
                      <span className={styles.orderStatus}>{o.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 1 && (
            <div className={styles.infoForm}>
              <p className={styles.comingSoon}>로그인 기능 구현 후 개인정보 조회/수정이 가능합니다.</p>
            </div>
          )}

          {tab === 2 && (
            <div className={styles.comingSoon}>배송지 관리 기능은 준비 중입니다.</div>
          )}

          {tab === 3 && (
            <div className={styles.pointSection}>
              <div className={styles.pointCard}>
                <p className={styles.pointLabel}>보유 쿠폰</p>
                <p className={styles.pointValue}>0개</p>
              </div>
              <div className={styles.pointCard}>
                <p className={styles.pointLabel}>포인트</p>
                <p className={styles.pointValue}>0 P</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
