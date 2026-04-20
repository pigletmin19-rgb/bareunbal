import React, { useState } from 'react'
import styles from './FaqPage.module.css'

const FAQS = [
  { q: '사이즈 선택은 어떻게 하나요?', a: '발 길이를 mm 단위로 측정하신 후 해당 사이즈를 선택하세요. 발볼이 넓으신 분은 한 사이즈 크게 구매하시길 권장합니다.' },
  { q: '반품/교환이 가능한가요?', a: '착용 전 상태의 제품은 수령 후 7일 이내 반품, 14일 이내 교환 가능합니다. 착용 후에는 위생상의 이유로 반품이 불가합니다.' },
  { q: '배송 기간은 얼마나 걸리나요?', a: '결제 완료 후 1-2 영업일 이내 출고되며, CJ대한통운을 통해 2-3 영업일 내 배송됩니다.' },
  { q: '무료배송 기준은 어떻게 되나요?', a: '50,000원 이상 구매 시 무료배송이며, 미만 시 3,000원의 배송비가 부과됩니다. 제주/도서산간은 추가 3,000원입니다.' },
  { q: '세탁은 어떻게 하나요?', a: '찬물 손세탁을 권장합니다. 세탁기 사용 시 신발 세탁망을 이용하고 약한 물살로 세탁하세요. 건조기 사용은 피해주세요.' },
  { q: '척추에 실제로 효과가 있나요?', a: '바른발은 정형외과 전문의와 함께 설계된 제품으로 올바른 보행 습관 형성과 아치 지지에 효과적입니다. 단, 의료기기가 아니므로 심각한 척추 질환의 경우 전문의 상담을 권장합니다.' },
]

export default function FaqPage() {
  const [open, setOpen] = useState(null)

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>자주 묻는 질문</h1>
        <div className={styles.list}>
          {FAQS.map((f, i) => (
            <div key={i} className={styles.item}>
              <button className={styles.question} onClick={() => setOpen(open === i ? null : i)}>
                <span>Q. {f.q}</span>
                <span className={styles.arrow}>{open === i ? '▲' : '▼'}</span>
              </button>
              {open === i && (
                <div className={styles.answer}>
                  <p>A. {f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
