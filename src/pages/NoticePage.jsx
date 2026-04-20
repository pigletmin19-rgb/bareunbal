import React, { useState } from 'react'
import styles from './NoticePage.module.css'

const NOTICES = [
  { id: 1, title: '[공지] 2026년 여름 신제품 출시 안내', date: '2026-04-15', isNew: true },
  { id: 2, title: '[공지] 배송 지연 안내 (4월 20일 ~ 4월 22일)', date: '2026-04-10', isNew: false },
  { id: 3, title: '[이벤트] 첫 구매 고객 10% 할인 쿠폰 증정', date: '2026-04-01', isNew: false },
  { id: 4, title: '[공지] 개인정보처리방침 개정 안내', date: '2026-03-15', isNew: false },
  { id: 5, title: '[이벤트] 바른발 회원가입 이벤트', date: '2026-03-01', isNew: false },
]

export default function NoticePage() {
  const [open, setOpen] = useState(null)

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>공지사항</h1>
        <div className={styles.list}>
          {NOTICES.map(n => (
            <div key={n.id} className={styles.item}>
              <button className={styles.itemBtn} onClick={() => setOpen(open === n.id ? null : n.id)}>
                <div className={styles.itemLeft}>
                  {n.isNew && <span className={styles.newBadge}>NEW</span>}
                  <span className={styles.itemTitle}>{n.title}</span>
                </div>
                <span className={styles.itemDate}>{n.date}</span>
              </button>
              {open === n.id && (
                <div className={styles.detail}>
                  <p>공지사항 상세 내용이 여기에 표시됩니다.</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
