import React, { useState } from 'react'
import styles from './AdminCoupons.module.css'

const INIT_COUPONS = [
  { id: 'c001', code: 'BAREUN10', type: 'percent', value: 10, minOrder: 50000, usageLimit: 100, usedCount: 42, validTo: '2026-06-30', isActive: true },
  { id: 'c002', code: 'WELCOME5K', type: 'fixed', value: 5000, minOrder: 30000, usageLimit: 500, usedCount: 213, validTo: '2026-12-31', isActive: true },
  { id: 'c003', code: 'SUMMER20', type: 'percent', value: 20, minOrder: 100000, usageLimit: 200, usedCount: 200, validTo: '2026-05-31', isActive: false },
]

const INIT_FORM = { code: '', type: 'percent', value: '', minOrder: '', usageLimit: '', validTo: '' }

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState(INIT_COUPONS)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(INIT_FORM)

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    const newCoupon = {
      id: `c${Date.now()}`,
      code: form.code.toUpperCase(),
      type: form.type,
      value: Number(form.value),
      minOrder: Number(form.minOrder) || 0,
      usageLimit: Number(form.usageLimit) || 9999,
      usedCount: 0,
      validTo: form.validTo,
      isActive: true,
    }
    setCoupons(prev => [...prev, newCoupon])
    setForm(INIT_FORM)
    setShowForm(false)
  }

  const toggleActive = id => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c))
  }

  const deleteCoupon = id => {
    if (window.confirm('쿠폰을 삭제하시겠습니까?')) {
      setCoupons(prev => prev.filter(c => c.id !== id))
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHead}>
        <h1 className={styles.pageTitle}>쿠폰 관리</h1>
        <button className={styles.addBtn} onClick={() => setShowForm(true)}>+ 쿠폰 생성</button>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>쿠폰 코드</th>
              <th>할인</th>
              <th>최소 주문</th>
              <th>사용 현황</th>
              <th>유효기간</th>
              <th>상태</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map(c => (
              <tr key={c.id}>
                <td className={styles.codeCell}>{c.code}</td>
                <td className={styles.discountCell}>
                  {c.type === 'percent' ? `${c.value}% 할인` : `${c.value.toLocaleString()}원 할인`}
                </td>
                <td>{c.minOrder > 0 ? `${c.minOrder.toLocaleString()}원 이상` : '없음'}</td>
                <td>
                  <span className={styles.usageBar}>
                    <span className={styles.usageText}>{c.usedCount} / {c.usageLimit}</span>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${Math.min(100, (c.usedCount / c.usageLimit) * 100)}%` }}
                      />
                    </div>
                  </span>
                </td>
                <td className={styles.dateCell}>{c.validTo}</td>
                <td>
                  <span className={`${styles.statusBadge} ${c.isActive ? styles.active : styles.inactive}`}>
                    {c.isActive ? '활성' : '비활성'}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.toggleBtn} onClick={() => toggleActive(c.id)}>
                      {c.isActive ? '비활성화' : '활성화'}
                    </button>
                    <button className={styles.deleteBtn} onClick={() => deleteCoupon(c.id)}>삭제</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className={styles.overlay} onClick={() => setShowForm(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHead}>
              <h2 className={styles.modalTitle}>쿠폰 생성</h2>
              <button className={styles.closeBtn} onClick={() => setShowForm(false)}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.field}>
                <label className={styles.label}>쿠폰 코드 *</label>
                <input name="code" value={form.code} onChange={handleChange} className={styles.input} placeholder="예: BAREUN20" required />
              </div>

              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label className={styles.label}>할인 종류 *</label>
                  <select name="type" value={form.type} onChange={handleChange} className={styles.select}>
                    <option value="percent">정률 할인 (%)</option>
                    <option value="fixed">정액 할인 (원)</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>할인 값 *</label>
                  <input name="value" type="number" value={form.value} onChange={handleChange} className={styles.input} placeholder={form.type === 'percent' ? '10' : '5000'} required />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label className={styles.label}>최소 주문 금액</label>
                  <input name="minOrder" type="number" value={form.minOrder} onChange={handleChange} className={styles.input} placeholder="0" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>최대 사용 횟수</label>
                  <input name="usageLimit" type="number" value={form.usageLimit} onChange={handleChange} className={styles.input} placeholder="100" />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>유효기간</label>
                <input name="validTo" type="date" value={form.validTo} onChange={handleChange} className={styles.input} />
              </div>

              <div className={styles.formActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => setShowForm(false)}>취소</button>
                <button type="submit" className={styles.saveBtn}>쿠폰 생성</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
