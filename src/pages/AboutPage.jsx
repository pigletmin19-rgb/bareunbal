import React from 'react'
import styles from './AboutPage.module.css'

const MATERIALS = [
  { name: '메리노울 인솔', desc: '뉴질랜드산 천연 메리노울로 제작한 항균·항취 인솔. 의료기기 피부 적합성 인증.' },
  { name: '유칼립투스 갑피', desc: '유칼립투스 나무에서 추출한 섬유로 제작. 면보다 부드럽고 환경 부담이 적습니다.' },
  { name: '천연 고무 아웃솔', desc: '브라질산 천연 고무로 제작. 뛰어난 그립력과 내구성, 생분해 가능한 친환경 소재.' },
  { name: '3D 아치 서포트', desc: '정형외과 전문의와 협업해 개발한 3D 구조의 아치 서포트. 발의 자연스러운 자세를 지원.' },
]

const STEPS = [
  { num: '01', title: '발 구조 연구', desc: '정형외과 의사, 스포츠 의학 전문가와 함께 수백 명의 발 구조를 분석합니다.' },
  { num: '02', title: '3D 설계', desc: '데이터 기반의 3D 모델링으로 발의 자연스러운 정렬을 지원하는 라스트를 설계합니다.' },
  { num: '03', title: '소재 선별', desc: '의료적 기준을 통과한 천연 소재만 사용합니다. 피부과 테스트 필수 통과.' },
  { num: '04', title: '임상 검증', desc: '출시 전 실제 착용 테스트와 척추 정렬 측정으로 효과를 검증합니다.' },
]

export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* 히어로 */}
      <section className={styles.hero}>
        <img src="https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?w=1600&q=80" alt="바른발 소재" className={styles.heroImg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroLabel}>MATERIAL & TECHNOLOGY</p>
          <h1 className={styles.heroTitle}>자연에서 온 의료급 소재,<br />과학이 만든 기능성</h1>
        </div>
      </section>

      {/* 브랜드 소개 */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.brandIntro}>
            <div>
              <p className={styles.sectionLabel}>ABOUT 바른발</p>
              <h2 className={styles.sectionTitle}>척추 건강은 발에서 시작됩니다</h2>
              <p className={styles.desc}>
                바른발은 정형외과 전문의와 함께 설계한 의료기반 기능성 신발 브랜드입니다.
                잘못된 보행 습관과 맞지 않는 신발이 척추와 관절에 미치는 영향을 연구하고,
                일상 속에서 올바른 자세를 유지할 수 있는 신발을 만들고 있습니다.
              </p>
              <p className={styles.desc}>
                단순한 편안함을 넘어, 매 걸음이 척추 건강에 도움이 되는 신발.
                그것이 바른발이 추구하는 가치입니다.
              </p>
            </div>
            <div className={styles.brandImgWrap}>
              <img src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80" alt="바른발 브랜드" className={styles.brandImg} />
            </div>
          </div>
        </div>
      </section>

      {/* 소재 */}
      <section className={`${styles.section} ${styles.bgGray}`}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <p className={styles.sectionLabel}>MATERIALS</p>
            <h2 className={styles.sectionTitle}>검증된 소재만 사용합니다</h2>
          </div>
          <div className={styles.materialGrid}>
            {MATERIALS.map(m => (
              <div key={m.name} className={styles.materialCard}>
                <h3 className={styles.materialName}>{m.name}</h3>
                <p className={styles.materialDesc}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 개발 과정 */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <p className={styles.sectionLabel}>OUR PROCESS</p>
            <h2 className={styles.sectionTitle}>바른발이 만들어지는 과정</h2>
          </div>
          <div className={styles.steps}>
            {STEPS.map(s => (
              <div key={s.num} className={styles.step}>
                <span className={styles.stepNum}>{s.num}</span>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
