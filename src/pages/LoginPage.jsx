import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../firebase'
import styles from './LoginPage.module.css'

const googleProvider = new GoogleAuthProvider()

export default function LoginPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '', name: '', phone: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const saveUserToFirestore = async (user, extra = {}) => {
    const ref = doc(db, 'users', user.uid)
    const snap = await getDoc(ref)
    if (!snap.exists()) {
      await setDoc(ref, {
        email: user.email,
        name: user.displayName || extra.name || '',
        phone: extra.phone || '',
        grade: 'normal',
        totalPurchase: 0,
        orderCount: 0,
        isActive: true,
        createdAt: serverTimestamp(),
      })
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, form.email, form.password)
      } else {
        if (form.password !== form.confirmPassword) {
          setError('비밀번호가 일치하지 않습니다.')
          setLoading(false)
          return
        }
        const { user } = await createUserWithEmailAndPassword(auth, form.email, form.password)
        await updateProfile(user, { displayName: form.name })
        await saveUserToFirestore(user, { name: form.name, phone: form.phone })
      }
      navigate('/')
    } catch (err) {
      const messages = {
        'auth/user-not-found': '이메일을 찾을 수 없습니다.',
        'auth/wrong-password': '비밀번호가 올바르지 않습니다.',
        'auth/email-already-in-use': '이미 사용 중인 이메일입니다.',
        'auth/weak-password': '비밀번호는 6자 이상이어야 합니다.',
        'auth/invalid-email': '이메일 형식이 올바르지 않습니다.',
        'auth/invalid-credential': '이메일 또는 비밀번호가 올바르지 않습니다.',
      }
      setError(messages[err.code] || '오류가 발생했습니다.')
    }
    setLoading(false)
  }

  const handleGoogle = async () => {
    setError('')
    try {
      const { user } = await signInWithPopup(auth, googleProvider)
      await saveUserToFirestore(user)
      navigate('/')
    } catch (err) {
      setError('구글 로그인에 실패했습니다.')
    }
  }

  const handleForgotPassword = async () => {
    if (!form.email) {
      setError('이메일을 입력해주세요.')
      return
    }
    try {
      await sendPasswordResetEmail(auth, form.email)
      alert('비밀번호 재설정 이메일을 발송했습니다.')
    } catch {
      setError('이메일을 찾을 수 없습니다.')
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <Link to="/" className={styles.logo}>바른발</Link>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${mode === 'login' ? styles.tabActive : ''}`}
            onClick={() => { setMode('login'); setError('') }}
          >
            로그인
          </button>
          <button
            className={`${styles.tab} ${mode === 'signup' ? styles.tabActive : ''}`}
            onClick={() => { setMode('signup'); setError('') }}
          >
            회원가입
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <>
              <div className={styles.field}>
                <label className={styles.label}>이름</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="이름 입력"
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>휴대폰 번호</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="010-0000-0000"
                  className={styles.input}
                />
              </div>
            </>
          )}

          <div className={styles.field}>
            <label className={styles.label}>이메일</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="이메일 주소 입력"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>비밀번호</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="비밀번호 입력"
              className={styles.input}
              required
            />
          </div>

          {mode === 'signup' && (
            <div className={styles.field}>
              <label className={styles.label}>비밀번호 확인</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="비밀번호 재입력"
                className={styles.input}
                required
              />
            </div>
          )}

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? '처리 중...' : mode === 'login' ? '로그인' : '회원가입'}
          </button>
        </form>

        <button className={styles.googleBtn} onClick={handleGoogle}>
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width={18} />
          Google로 {mode === 'login' ? '로그인' : '가입'}
        </button>

        {mode === 'login' && (
          <p className={styles.forgotPw}>
            <button className={styles.forgotBtn} onClick={handleForgotPassword}>비밀번호를 잊으셨나요?</button>
          </p>
        )}

        {mode === 'signup' && (
          <p className={styles.agree}>
            회원가입 시 <Link to="/terms">이용약관</Link> 및 <Link to="/privacy">개인정보처리방침</Link>에 동의합니다.
          </p>
        )}
      </div>
    </div>
  )
}
