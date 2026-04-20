import React, { useState } from 'react'
import styles from './AdminReviews.module.css'

const INIT_REVIEWS = [
  { id: 1, product: '스파인케어 워커 Pro', customer: '이○○', rating: 5, content: '허리 통증이 정말 줄었어요. 강력 추천합니다!', date: '2026-04-17', status: '공개' },
  { id: 2, product: '포스처핏 데일리 W', customer: '박○○', rating: 4, content: '착화감이 너무 좋아요. 발이 편해서 하루종일 신어도 괜찮아요.', date: '2026-04-16', status: '공개' },
  { id: 3, product: '클라우드 스텝 슬립온', customer: '김○○', rating: 5, content: '신고 벗기 편하고 쿠션감이 최고예요.', date: '2026-04-15', status: '공개' },
  { id: 4, product: '오소 트레일 러너', customer: '최○○', rating: 3, content: '디자인은 좋은데 사이즈가 약간 작게 나오는 것 같아요.', date: '2026-04-14', status: '비공개' },
  { id: 5, product: '스파인케어 스탠딩', customer: '정○○', rating: 5, content: '서서 일하는 직업인데 발 통증이 많이 줄었습니다.', date: '2026-04-13', status: '공개' },
]

const STARS = [1, 2, 3, 4, 5]

export default function AdminReviews() {
  const [reviews, setReviews] = useState(INIT_REVIEWS)
  const [filter, setFilter] = useState('전체')
  const [search, setSearch] = useState('')

  const filtered = reviews.filter(r => {
    if (filter !== '전체' && r.status !== filter) return false
    if (search && !r.product.includes(search) && !r.customer.includes(search)) return false
    return true
  })

  const toggleStatus = id => {
    setReviews(prev => prev.map(r =>
      r.id === id ? { ...r, status: r.status === '공개' ? '비공개' : '공개' } : r
    ))
  }

  const deleteReview = id => {
    if (window.confirm('리뷰를 삭제하시겠습니까?')) {
      setReviews(prev => prev.filter(r => r.id !== id))
    }
  }

  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : 0

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>리뷰 관리</h1>

      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <p className={styles.statValue}>{reviews.length}</p>
          <p className={styles.statLabel}>전체 리뷰</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statValue}>⭐ {avgRating}</p>
          <p className={styles.statLabel}>평균 평점</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statValue}>{reviews.filter(r => r.status === '공개').length}</p>
          <p className={styles.statLabel}>공개 리뷰</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statValue}>{reviews.filter(r => r.status === '비공개').length}</p>
          <p className={styles.statLabel}>비공개 리뷰</p>
        </div>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.filterTabs}>
          {['전체', '공개', '비공개'].map(f => (
            <button
              key={f}
              className={`${styles.filterTab} ${filter === f ? styles.filterTabActive : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="상품명 또는 고객명 검색"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <span className={styles.count}>총 {filtered.length}개</span>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>상품명</th>
              <th>고객</th>
              <th>평점</th>
              <th>내용</th>
              <th>날짜</th>
              <th>상태</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id}>
                <td className={styles.productName}>{r.product}</td>
                <td>{r.customer}</td>
                <td>
                  <span className={styles.stars}>
                    {STARS.map(s => (
                      <span key={s} style={{ color: s <= r.rating ? '#f5c518' : '#ddd' }}>★</span>
                    ))}
                  </span>
                </td>
                <td className={styles.content}>{r.content}</td>
                <td className={styles.date}>{r.date}</td>
                <td>
                  <span className={r.status === '공개' ? styles.badgePublic : styles.badgeHidden}>
                    {r.status}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.toggleBtn} onClick={() => toggleStatus(r.id)}>
                      {r.status === '공개' ? '비공개' : '공개'}
                    </button>
                    <button className={styles.deleteBtn} onClick={() => deleteReview(r.id)}>삭제</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
