import React from 'react'
import styles from './PrivacyPage.module.css'

export default function TermsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>이용약관</h1>
        <p className={styles.updated}>최종 업데이트: 2026년 4월 18일</p>

        <div className={styles.content}>
          <h2>제1조 (목적)</h2>
          <p>이 약관은 바른발(bareunbal.com)이 제공하는 온라인 쇼핑 서비스의 이용 조건 및 절차에 관한 사항을 규정합니다.</p>

          <h2>제2조 (정의)</h2>
          <p>"이용자"란 본 사이트에 접속하여 서비스를 이용하는 회원 및 비회원을 말합니다.</p>

          <h2>제3조 (서비스의 제공)</h2>
          <ul>
            <li>기능성 슈즈 판매 서비스</li>
            <li>상품 정보 제공 서비스</li>
            <li>주문 및 배송 관련 서비스</li>
          </ul>

          <h2>제4조 (주문 및 결제)</h2>
          <p>주문 후 결제가 완료된 경우 주문이 확정됩니다. 결제는 토스페이먼츠를 통해 처리됩니다.</p>

          <h2>제5조 (취소 및 반품)</h2>
          <p>상품 수령 후 7일 이내 교환/반품이 가능합니다. 착용 후 위생상의 이유로 반품이 불가한 경우가 있습니다.</p>

          <h2>제6조 (면책 조항)</h2>
          <p>바른발의 제품은 의료기기가 아닙니다. 건강 관련 문제는 전문 의료기관을 통해 상담하시기 바랍니다.</p>
        </div>
      </div>
    </div>
  )
}
