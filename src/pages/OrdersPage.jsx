import React from 'react'
import styles from './OrdersPage.module.css'

export default function OrdersPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>주문 내역</h1>
        <p className={styles.empty}>로그인 후 주문 내역을 확인할 수 있습니다.</p>
      </div>
    </div>
  )
}
