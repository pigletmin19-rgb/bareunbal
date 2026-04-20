import React from 'react'
import { Link } from 'react-router-dom'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import styles from './AdminDashboard.module.css'

const STATS = [
  { label: '오늘 매출', value: '1,248,000원', change: '+12%', icon: '💰', color: '#3d6b4f' },
  { label: '이번달 매출', value: '18,540,000원', change: '+8%', icon: '📈', color: '#3d6b4f' },
  { label: '신규 주문', value: '24건', change: '오늘', icon: '📦', color: '#4a7ab5' },
  { label: '신규 회원', value: '8명', change: '오늘', icon: '👥', color: '#8b5e8b' },
]

const SALES_DATA = [
  { date: '4/12', sales: 820000 },
  { date: '4/13', sales: 1050000 },
  { date: '4/14', sales: 760000 },
  { date: '4/15', sales: 1320000 },
  { date: '4/16', sales: 980000 },
  { date: '4/17', sales: 1150000 },
  { date: '4/18', sales: 1248000 },
]

const CATEGORY_DATA = [
  { name: '남성', value: 42 },
  { name: '여성', value: 35 },
  { name: '키즈', value: 23 },
]

const RECENT_ORDERS = [
  { id: 'ORD-001', customer: '이○○', product: '스파인케어 워커 Pro', amount: '198,000원', status: '결제완료', date: '2026-04-18' },
  { id: 'ORD-002', customer: '박○○', product: '포스처핏 데일리 W', amount: '178,000원', status: '배송중', date: '2026-04-17' },
  { id: 'ORD-003', customer: '김○○', product: '클라우드 스텝 슬립온', amount: '138,000원', status: '배송완료', date: '2026-04-17' },
  { id: 'ORD-004', customer: '최○○', product: '오소 트레일 러너', amount: '149,000원', status: '결제완료', date: '2026-04-16' },
  { id: 'ORD-005', customer: '정○○', product: '스파인케어 스탠딩', amount: '168,000원', status: '배송준비중', date: '2026-04-16' },
]

const STATUS_COLOR = {
  '결제완료': '#3d6b4f',
  '배송준비중': '#e8734a',
  '배송중': '#4a7ab5',
  '배송완료': '#a0a09a',
}

const fmtSales = v => `${(v / 10000).toFixed(0)}만`

export default function AdminDashboard() {
  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>대시보드</h1>

      {/* 통계 카드 */}
      <div className={styles.statsGrid}>
        {STATS.map(s => (
          <div key={s.label} className={styles.statCard}>
            <div className={styles.statTop}>
              <span className={styles.statIcon}>{s.icon}</span>
              <span className={styles.statChange} style={{ color: s.color }}>{s.change}</span>
            </div>
            <p className={styles.statValue}>{s.value}</p>
            <p className={styles.statLabel}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* 차트 영역 */}
      <div className={styles.chartsRow}>
        <div className={styles.chartCard}>
          <h2 className={styles.sectionTitle}>최근 7일 매출</h2>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={SALES_DATA} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3d6b4f" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3d6b4f" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0ec" />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#a0a09a' }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={fmtSales} tick={{ fontSize: 12, fill: '#a0a09a' }} axisLine={false} tickLine={false} />
              <Tooltip formatter={v => `${v.toLocaleString()}원`} labelStyle={{ color: '#1a1a1a' }} />
              <Area type="monotone" dataKey="sales" stroke="#3d6b4f" strokeWidth={2} fill="url(#salesGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartCard}>
          <h2 className={styles.sectionTitle}>카테고리별 판매</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={CATEGORY_DATA} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0ec" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#a0a09a' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#a0a09a' }} axisLine={false} tickLine={false} />
              <Tooltip formatter={v => `${v}건`} />
              <Bar dataKey="value" fill="#3d6b4f" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 최근 주문 */}
      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>최근 주문</h2>
          <Link to="/admin/orders" className={styles.moreLink}>전체 보기 →</Link>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>주문번호</th>
                <th>고객명</th>
                <th>상품</th>
                <th>금액</th>
                <th>상태</th>
                <th>날짜</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_ORDERS.map(o => (
                <tr key={o.id}>
                  <td className={styles.orderId}>{o.id}</td>
                  <td>{o.customer}</td>
                  <td>{o.product}</td>
                  <td>{o.amount}</td>
                  <td>
                    <span className={styles.statusBadge} style={{ color: STATUS_COLOR[o.status], background: STATUS_COLOR[o.status] + '15' }}>
                      {o.status}
                    </span>
                  </td>
                  <td className={styles.dateCell}>{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 빠른 메뉴 */}
      <div className={styles.quickMenu}>
        <Link to="/admin/products" className={styles.quickCard}>
          <span>👟</span>
          <span>상품 등록</span>
        </Link>
        <Link to="/admin/orders" className={styles.quickCard}>
          <span>📦</span>
          <span>주문 처리</span>
        </Link>
        <Link to="/admin/members" className={styles.quickCard}>
          <span>👥</span>
          <span>회원 조회</span>
        </Link>
        <Link to="/admin/coupons" className={styles.quickCard}>
          <span>🎫</span>
          <span>쿠폰 발급</span>
        </Link>
      </div>
    </div>
  )
}
