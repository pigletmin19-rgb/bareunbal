import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './LoginPage.module.css'

export default function LoginPage() {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ email: '', password: '', name: '', phone: '' })

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    alert(mode === 'login' ? '로그인 기능은 준비 중입니다.' : '회원가입 기능은 준비 중입니다.')
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <Link to="/" className={styles.logo}>바른발</Link>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${mode === 'login' ? styles.tabActive : ''}`}
            onClick={() => setMode('login')}
          >
            로그인
          </button>
          <button
            className={`${styles.tab} ${mode === 'signup' ? styles.tabActive : ''}`}
            onClick={() => setMode('signup')}
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
                placeholder="비밀번호 재입력"
                className={styles.input}
                required
              />
            </div>
          )}

          <button type="submit" className={styles.submitBtn}>
            {mode === 'login' ? '로그인' : '회원가입'}
          </button>
        </form>

        {mode === 'login' && (
          <p className={styles.forgotPw}>
            <a href="#">비밀번호를 잊으셨나요?</a>
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
