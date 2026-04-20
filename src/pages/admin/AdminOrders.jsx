import React, { useState } from 'react'
import styles from './AdminOrders.module.css'

const INIT_ORDERS = [
  { id: 'ORD-20260418-001', customer: '이○○', phone: '010-1234-5678', product: '스파인케어 워커 Pro', size: 265, qty: 1, amount: 198000, status: '결제완료', date: '2026-04-18', address: '서울시 중랑구 상봉동', tracking: '' },
  { id: 'ORD-20260418-002', customer: '박○○', phone: '010-2345-6789', product: '포스처핏 데일리 W', size: 240, qty: 1, amount: 178000, status: '배송중', date: '2026-04-17', address: '서울시 강남구 역삼동', tracking: '532198765432' },
  { id: 'ORD-20260417-003', customer: '김○○', phone: '010-3456-7890', product: '클라우드 스텝 슬립온', size: 245, qty: 2, amount: 276000, status: '배송완료', date: '2026-04-17', address: '경기도 성남시 분당구', tracking: '532198765400' },
  { id: 'ORD-20260416-004', customer: '최○○', phone: '010-4567-8901', product: '오소 트레일 러너', size: 260, qty: 1, amount: 149000, status: '배송준비중', date: '2026-04-16', address: '부산시 해운대구', tracking: '' },
  { id: 'ORD-20260415-005', customer: '정○○', phone: '010-5678-9012', product: '스파인케어 스탠딩', size: 275, qty: 1, amount: 168000, status: '취소', date: '2026-04-15', address: '대구시 달서구', tracking: '' },
]

const STATUSES = ['전체', '결제완료', '배송준비중', '배송중', '배송완료', '취소']

const STATUS_COLOR = {
  '결제완료': '#3d6b4f',
  '배송준비중': '#e8734a',
  '배송중': '#4a7ab5',
  '배송완료': '#a0a09a',
  '취소': '#c0392b',
}

export default function AdminOrders() {
  const [orders, setOrders] = useState(INIT_ORDERS)
  const [filterStatus, setFilterStatus] = useState('전체')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [tracking, setTracking] = useState('')

  const filtered = filterStatus === '전체' ? orders : orders.filter(o => o.status === filterStatus)

  const updateStatus = (id, status) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
    setSelectedOrder(prev => prev?.id === id ? { ...prev, status } : prev)
  }

  const saveTracking = id => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, tracking, status: '배송중' } : o))
    setSelectedOrder(prev => prev?.id === id ? { ...prev, tracking, status: '배송중' } : prev)
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>주문 관리</h1>

      <div className={styles.filters}>
        {STATUSES.map(s => (
          <button
            key={s}
            className={`${styles.filterBtn} ${filterStatus === s ? styles.filterActive : ''}`}
            onClick={() => setFilterStatus(s)}
          >
            {s}
          </button>
        ))}
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
              <th>상세</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(o => (
              <tr key={o.id}>
                <td className={styles.orderId}>{o.id}</td>
                <td>{o.customer}</td>
                <td>{o.product}</td>
                <td>{o.amount.toLocaleString()}원</td>
                <td>
                  <span
                    className={styles.statusBadge}
                    style={{ color: STATUS_COLOR[o.status], background: STATUS_COLOR[o.status] + '18' }}
                  >
                    {o.status}
                  </span>
                </td>
                <td className={styles.dateCell}>{o.date}</td>
                <td>
                  <button className={styles.detailBtn} onClick={() => { setSelectedOrder(o); setTracking(o.tracking) }}>
                    상세
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 주문 상세 모달 */}
      {selectedOrder && (
        <div className={styles.overlay} onClick={() => setSelectedOrder(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHead}>
              <h2 className={styles.modalTitle}>주문 상세</h2>
              <button className={styles.closeBtn} onClick={() => setSelectedOrder(null)}>✕</button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.orderInfo}>
                <div className={styles.infoRow}><span className={styles.infoKey}>주문번호</span><span>{selectedOrder.id}</span></div>
                <div className={styles.infoRow}><span className={styles.infoKey}>고객명</span><span>{selectedOrder.customer}</span></div>
                <div className={styles.infoRow}><span className={styles.infoKey}>연락처</span><span>{selectedOrder.phone}</span></div>
                <div className={styles.infoRow}><span className={styles.infoKey}>배송주소</span><span>{selectedOrder.address}</span></div>
                <div className={styles.infoRow}><span className={styles.infoKey}>상품</span><span>{selectedOrder.product} (사이즈 {selectedOrder.size}mm)</span></div>
                <div className={styles.infoRow}><span className={styles.infoKey}>수량</span><span>{selectedOrder.qty}개</span></div>
                <div className={styles.infoRow}><span className={styles.infoKey}>결제금액</span><span className={styles.priceText}>{selectedOrder.amount.toLocaleString()}원</span></div>
                <div className={styles.infoRow}>
                  <span className={styles.infoKey}>주문상태</span>
                  <span style={{ color: STATUS_COLOR[selectedOrder.status], fontWeight: 700 }}>{selectedOrder.status}</span>
                </div>
              </div>

              <div className={styles.trackingSection}>
                <p className={styles.trackingLabel}>운송장 번호</p>
                <div className={styles.trackingRow}>
                  <input
                    type="text"
                    value={tracking}
                    onChange={e => setTracking(e.target.value)}
                    placeholder="운송장 번호 입력"
                    className={styles.trackingInput}
                  />
                  <button className={styles.trackingBtn} onClick={() => saveTracking(selectedOrder.id)}>
                    배송중으로 변경
                  </button>
                </div>
              </div>

              <div className={styles.statusButtons}>
                <p className={styles.trackingLabel}>상태 변경</p>
                <div className={styles.statusBtns}>
                  {['결제완료', '배송준비중', '배송중', '배송완료', '취소'].map(s => (
                    <button
                      key={s}
                      className={`${styles.statusChangeBtn} ${selectedOrder.status === s ? styles.statusChangeBtnActive : ''}`}
                      onClick={() => updateStatus(selectedOrder.id, s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
