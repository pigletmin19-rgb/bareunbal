import React, { useState } from 'react'
import styles from './AdminMembers.module.css'

const INIT_MEMBERS = [
  { id: 'u001', name: '이○○', email: 'lee@example.com', phone: '010-1111-2222', grade: 'vip', orderCount: 12, totalPurchase: 1540000, joinDate: '2025-06-15', isActive: true },
  { id: 'u002', name: '박○○', email: 'park@example.com', phone: '010-2222-3333', grade: 'gold', orderCount: 6, totalPurchase: 720000, joinDate: '2025-09-01', isActive: true },
  { id: 'u003', name: '김○○', email: 'kim@example.com', phone: '010-3333-4444', grade: 'silver', orderCount: 3, totalPurchase: 420000, joinDate: '2026-01-20', isActive: true },
  { id: 'u004', name: '최○○', email: 'choi@example.com', phone: '010-4444-5555', grade: 'normal', orderCount: 1, totalPurchase: 178000, joinDate: '2026-03-10', isActive: true },
  { id: 'u005', name: '정○○', email: 'jung@example.com', phone: '010-5555-6666', grade: 'normal', orderCount: 0, totalPurchase: 0, joinDate: '2026-04-15', isActive: false },
]

const GRADES = { normal: '일반', silver: '실버', gold: '골드', vip: 'VIP' }
const GRADE_COLOR = { normal: '#a0a09a', silver: '#8b8b9a', gold: '#c08a2a', vip: '#3d6b4f' }

export default function AdminMembers() {
  const [members, setMembers] = useState(INIT_MEMBERS)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [gradeFilter, setGradeFilter] = useState('all')

  const filtered = members.filter(m => {
    const matchSearch = m.name.includes(search) || m.email.includes(search)
    const matchGrade = gradeFilter === 'all' || m.grade === gradeFilter
    return matchSearch && matchGrade
  })

  const toggleActive = id => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, isActive: !m.isActive } : m))
    setSelected(prev => prev?.id === id ? { ...prev, isActive: !prev.isActive } : prev)
  }

  const changeGrade = (id, grade) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, grade } : m))
    setSelected(prev => prev?.id === id ? { ...prev, grade } : prev)
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>회원 관리</h1>

      <div className={styles.toolbar}>
        <input
          type="text"
          placeholder="이름 또는 이메일 검색"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <select value={gradeFilter} onChange={e => setGradeFilter(e.target.value)} className={styles.gradeSelect}>
          <option value="all">전체 등급</option>
          {Object.entries(GRADES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <span className={styles.count}>총 {filtered.length}명</span>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>이름</th>
              <th>이메일</th>
              <th>등급</th>
              <th>주문수</th>
              <th>총 구매액</th>
              <th>가입일</th>
              <th>상태</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(m => (
              <tr key={m.id}>
                <td className={styles.nameCell}>{m.name}</td>
                <td className={styles.emailCell}>{m.email}</td>
                <td>
                  <span
                    className={styles.gradeBadge}
                    style={{ color: GRADE_COLOR[m.grade], background: GRADE_COLOR[m.grade] + '18' }}
                  >
                    {GRADES[m.grade]}
                  </span>
                </td>
                <td>{m.orderCount}회</td>
                <td>{m.totalPurchase.toLocaleString()}원</td>
                <td className={styles.dateCell}>{m.joinDate}</td>
                <td>
                  <span className={`${styles.activeBadge} ${m.isActive ? styles.activeOn : styles.activeOff}`}>
                    {m.isActive ? '활성' : '비활성'}
                  </span>
                </td>
                <td>
                  <button className={styles.detailBtn} onClick={() => setSelected(m)}>상세</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 회원 상세 */}
      {selected && (
        <div className={styles.overlay} onClick={() => setSelected(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHead}>
              <h2 className={styles.modalTitle}>회원 상세</h2>
              <button className={styles.closeBtn} onClick={() => setSelected(null)}>✕</button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.infoGrid}>
                <div className={styles.infoRow}><span className={styles.infoKey}>이름</span><span>{selected.name}</span></div>
                <div className={styles.infoRow}><span className={styles.infoKey}>이메일</span><span>{selected.email}</span></div>
                <div className={styles.infoRow}><span className={styles.infoKey}>연락처</span><span>{selected.phone}</span></div>
                <div className={styles.infoRow}><span className={styles.infoKey}>가입일</span><span>{selected.joinDate}</span></div>
                <div className={styles.infoRow}><span className={styles.infoKey}>주문수</span><span>{selected.orderCount}회</span></div>
                <div className={styles.infoRow}><span className={styles.infoKey}>총 구매액</span><span className={styles.priceText}>{selected.totalPurchase.toLocaleString()}원</span></div>
              </div>

              <div className={styles.gradeSection}>
                <p className={styles.sectionLabel}>등급 변경</p>
                <div className={styles.gradeBtns}>
                  {Object.entries(GRADES).map(([k, v]) => (
                    <button
                      key={k}
                      className={`${styles.gradeBtn} ${selected.grade === k ? styles.gradeBtnActive : ''}`}
                      onClick={() => changeGrade(selected.id, k)}
                      style={selected.grade === k ? { borderColor: GRADE_COLOR[k], color: GRADE_COLOR[k] } : {}}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button
                  className={selected.isActive ? styles.deactivateBtn : styles.activateBtn}
                  onClick={() => toggleActive(selected.id)}
                >
                  {selected.isActive ? '계정 비활성화' : '계정 활성화'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
