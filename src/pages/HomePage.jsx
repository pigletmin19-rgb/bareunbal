import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PRODUCTS } from '../data/products'
import { getSettings } from '../data/siteSettings'
import styles from './HomePage.module.css'

const MATERIAL_COLORS = ['#f5f0e8', '#edf4ef', '#f7f3ee']

export default function HomePage() {
  const settings = getSettings()
  const bestsellers = PRODUCTS.filter(p => p.tags.includes('bestseller')).slice(0, 3)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = e => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <div className={styles.page}>

      {/* 1. 히어로 배너 — 풀스크린 */}
      <section className={styles.hero}>
        <div className={styles.heroMedia}>
          <img
            src={settings.heroImage}
            alt="바른발 기능성 슈즈"
            className={styles.heroImg}
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroContent}>
          <p className={styles.heroBadge}>{settings.heroBadge}</p>
          <h1 className={styles.heroTitle}>
            {settings.heroTitle.split('\\n').map((line, i) => <span key={i}>{line}<br /></span>)}
          </h1>
          <p className={styles.heroSub}>{settings.heroSub}</p>
          <div className={styles.heroActions}>
            <Link to="/products/women" className={styles.heroBtnWhite}>여성 쇼핑하기</Link>
            <Link to="/products/men" className={styles.heroBtnOutline}>남성 쇼핑하기</Link>
          </div>
        </div>
      </section>

      {/* 2. 베스트 셀러 */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>베스트 셀러</h2>
          <div className={styles.bestGrid}>
            {bestsellers.map(p => (
              <BestCard key={p.id} product={p} />
            ))}
          </div>
          <div className={styles.sectionCta}>
            <Link to="/products" className={styles.btnOutline}>전체 상품 보기</Link>
          </div>
        </div>
      </section>

      {/* 3. 우리가 사용하는 소재 */}
      <section className={`${styles.section} ${styles.bgLight}`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>우리가 사용하는 소재</h2>
          <p className={styles.sectionDesc}>
            바른발은 자연에서 온 소재만 사용합니다. 지구와 발 모두에게 좋은 선택.
          </p>
          <div className={styles.materialGrid}>
            {settings.materials.map((m, i) => (
              <MaterialCard key={m.name} material={m} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. 브랜드 스토리 카드 */}
      <section className={styles.storySection}>
        <div className={styles.storyCard}>
          <div className={styles.storyImgWrap}>
            <img
              src={settings.storyImage1}
              alt="편안함"
              className={styles.storyImg}
            />
          </div>
          <div className={styles.storyContent}>
            <p className={styles.storyLabel}>COMFORT</p>
            <h3 className={styles.storyTitle}>하루 종일<br />편안함</h3>
            <p className={styles.storyDesc}>
              정형외과 전문의와 함께 설계한 3D 아치 서포트로
              12시간 착용해도 피로가 없습니다.
            </p>
            <Link to="/about" className={styles.storyLink}>자세히 알아보기 →</Link>
          </div>
        </div>
        <div className={`${styles.storyCard} ${styles.storyReverse}`}>
          <div className={styles.storyImgWrap}>
            <img
              src={settings.storyImage2}
              alt="지속가능성"
              className={styles.storyImg}
            />
          </div>
          <div className={styles.storyContent}>
            <p className={styles.storyLabel}>SUSTAINABILITY</p>
            <h3 className={styles.storyTitle}>지구를 위한<br />선택</h3>
            <p className={styles.storyDesc}>
              천연 소재 사용, 탄소 발자국 최소화.
              바른발의 모든 제품은 환경을 생각하며 만들어집니다.
            </p>
            <Link to="/about" className={styles.storyLink}>소재 이야기 →</Link>
          </div>
        </div>
      </section>

      {/* 5. 뉴스레터 구독 */}
      <section className={styles.newsletter}>
        <div className={styles.newsletterInner}>
          {subscribed ? (
            <div className={styles.subscribed}>
              <p className={styles.subscribedIcon}>✓</p>
              <h2 className={styles.newsletterTitle}>구독 완료!</h2>
              <p className={styles.newsletterDesc}>건강한 발 이야기를 이메일로 보내드릴게요.</p>
            </div>
          ) : (
            <>
              <h2 className={styles.newsletterTitle}>뉴스레터 구독 가입하기</h2>
              <p className={styles.newsletterDesc}>
                신제품 소식, 척추 건강 팁, 회원 전용 할인을 가장 먼저 받아보세요.
              </p>
              <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
                <input
                  type="email"
                  placeholder="이메일 주소 입력"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={styles.newsletterInput}
                  required
                />
                <button type="submit" className={styles.newsletterBtn}>구독하기</button>
              </form>
              <p className={styles.newsletterNote}>언제든지 구독 취소 가능합니다.</p>
            </>
          )}
        </div>
      </section>

    </div>
  )
}

function BestCard({ product }) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  return (
    <Link to={`/products/${product.id}`} className={styles.bestCard}>
      <div className={styles.bestImgWrap}>
        <img src={product.image} alt={product.name} className={styles.bestImg} />
      </div>
      <div className={styles.bestInfo}>
        <p className={styles.bestName}>{product.name}</p>
        <p className={styles.bestNameEn}>{product.nameEn}</p>
        <div className={styles.bestPriceRow}>
          <span className={styles.bestPrice}>{product.price.toLocaleString()}원</span>
          {product.originalPrice && (
            <>
              <span className={styles.bestOriginal}>{product.originalPrice.toLocaleString()}원</span>
              <span className={styles.bestDiscount}>{discount}% 할인</span>
            </>
          )}
        </div>
        <div className={styles.bestColors}>
          {product.colors.map((c, i) => (
            <span key={i} className={styles.bestColorDot} style={{ background: c }} />
          ))}
          <span className={styles.bestColorCount}>{product.colors.length}가지 색상</span>
        </div>
      </div>
    </Link>
  )
}

function MaterialCard({ material }) {
  return (
    <div className={styles.materialCard} style={{ background: material.color }}>
      <div className={styles.materialImgWrap}>
        <img src={material.img} alt={material.name} className={styles.materialImg} />
      </div>
      <div className={styles.materialInfo}>
        <h3 className={styles.materialName}>{material.name}</h3>
        <p className={styles.materialDesc}>{material.desc}</p>
        <Link to="/about" className={styles.materialLink}>자세히 알아보기 →</Link>
      </div>
    </div>
  )
}
