import React from 'react'
import { Link } from 'react-router-dom'
import { getSettings } from '../data/siteSettings'
import styles from './Footer.module.css'

const LINKS = {
  쇼핑: [
    { label: '신제품', path: '/products?tag=new' },
    { label: '남성', path: '/products/men' },
    { label: '여성', path: '/products/women' },
    { label: '키즈', path: '/products/kids' },
    { label: '세일', path: '/products/sale' },
  ],
  고객지원: [
    { label: '공지사항', path: '/notice' },
    { label: 'FAQ', path: '/faq' },
    { label: '1:1 문의', path: '/contact' },
  ],
  회사: [
    { label: '브랜드 소개', path: '/about' },
    { label: '개인정보처리방침', path: '/privacy' },
    { label: '이용약관', path: '/terms' },
  ],
}

export default function Footer() {
  const s = getSettings()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>{s.brandName}</Link>
            <p className={styles.tagline}>당신의 발이 척추를 바꿉니다</p>
            <p className={styles.info}>고객센터: {s.phone}</p>
            <p className={styles.info}>운영시간: {s.hours}</p>
            <a href={`mailto:${s.email}`} className={styles.email}>{s.email}</a>
            <div className={styles.sns}>
              <a href={s.instagram || '#'} className={styles.snsLink} aria-label="인스타그램" target="_blank" rel="noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href={s.kakao || '#'} className={styles.snsLink} aria-label="카카오톡" target="_blank" rel="noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3C6.48 3 2 6.58 2 11c0 2.77 1.69 5.21 4.27 6.7L5.3 21l4.05-2.13c.87.18 1.74.28 2.65.28 5.52 0 10-3.58 10-8S17.52 3 12 3z"/>
                </svg>
              </a>
              <a href={s.youtube || '#'} className={styles.snsLink} aria-label="유튜브" target="_blank" rel="noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
                </svg>
              </a>
            </div>
          </div>

          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title} className={styles.col}>
              <p className={styles.colTitle}>{title}</p>
              {links.map(l => (
                <Link key={l.path} to={l.path} className={styles.link}>{l.label}</Link>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.bottom}>
          <p className={styles.biz}>
            {s.brandName} | 대표 {s.ceoName || '[대표자명]'} | 사업자등록번호 {s.bizNumber || '[번호]'} | 통신판매업신고 {s.mailOrderNo || '[번호]'}
            <br />
            주소: {s.address || '[주소 입력]'} | 이메일: {s.email}
          </p>
          <p className={styles.copy}>© 2026 {s.brandName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
