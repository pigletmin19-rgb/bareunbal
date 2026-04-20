import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signOut, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import styles from './MyPage.module.css'

const TABS = ['주문 내역', '개인정보', '배송지 관리', '쿠폰 / 포인트']

export default function MyPage() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState(0)
  const [userInfo, setUserInfo] = useState(null)
  const [form, setForm] = useState({ name: '', phone: '' })
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')

  useEffect(() => {
    if (!loading && !user) navigate('/login')
  }, [user, loading])

  useEffect(() => {
    if (!user) return
    getDoc(doc(db, 'users', user.uid)).then(snap => {
      if (snap.exists()) {
        const data = snap.data()
        setUserInfo(data)
        setForm({ name: data.name || '', phone: data.phone || '' })
      }
    })
  }, [user])

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/')
  }

  const handleSaveInfo = async e => {
    e.preventDefault()
    setSaving(true)
    await updateDoc(doc(db, 'users', user.uid), { name: form.name, phone: form.phone })
    setUserInfo(prev => ({ ...prev, ...form }))
    setSaveMsg('저장되었습니다.')
    setSaving(false)
    setTimeout(() => setSaveMsg(''), 2000)
  }

  if (loading || !user) return null

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <div className={styles.userCard}>
            <div className={styles.avatar}>👤</div>
            <p className={styles.userName}>{userInfo?.name || user.displayName || '회원'}</p>
            <p className={styles.userGrade}>{userInfo?.grade === 'vip' ? 'VIP' : userInfo?.grade === 'gold' ? 'Gold' : userInfo?.grade === 'silver' ? 'Silver' : '일반 회원'}</p>
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
            <button className={styles.logoutBtn} onClick={handleLogout}>로그아웃</button>
          </nav>
        </div>

        <div className={styles.content}>
          <h1 className={styles.tabTitle}>{TABS[tab]}</h1>

          {tab === 0 && (
            <div className={styles.orderList}>
              <p className={styles.comingSoon}>주문 내역 기능은 결제 연동 후 표시됩니다.</p>
            </div>
          )}

          {tab === 1 && (
            <form className={styles.infoForm} onSubmit={handleSaveInfo}>
              <div className={styles.infoField}>
                <label className={styles.infoLabel}>이메일</label>
                <input className={styles.infoInput} value={user.email || ''} disabled />
              </div>
              <div className={styles.infoField}>
                <label className={styles.infoLabel}>이름</label>
                <input
                  className={styles.infoInput}
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="이름 입력"
                />
              </div>
              <div className={styles.infoField}>
                <label className={styles.infoLabel}>휴대폰 번호</label>
                <input
                  className={styles.infoInput}
                  value={form.phone}
                  onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                  placeholder="010-0000-0000"
                />
              </div>
              {saveMsg && <p style={{ color: '#3d6b4f', fontSize: '13px' }}>{saveMsg}</p>}
              <button type="submit" className={styles.saveBtn} disabled={saving}>
                {saving ? '저장 중...' : '저장'}
              </button>
            </form>
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
