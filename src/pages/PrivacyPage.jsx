import React from 'react'
import styles from './PrivacyPage.module.css'

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>개인정보처리방침</h1>
        <p className={styles.updated}>최종 업데이트: 2026년 4월 18일</p>

        <div className={styles.content}>
          <h2>1. 개인정보의 수집 및 이용 목적</h2>
          <p>바른발(bareunbal.com)은 다음의 목적을 위해 개인정보를 처리합니다.</p>
          <ul>
            <li>회원 가입 및 관리</li>
            <li>상품 주문 및 배송 처리</li>
            <li>고객 문의 응답</li>
            <li>서비스 개선 및 마케팅 (동의 시)</li>
          </ul>

          <h2>2. 수집하는 개인정보 항목</h2>
          <p><strong>필수 항목:</strong> 이름, 이메일, 비밀번호, 연락처, 배송 주소</p>
          <p><strong>선택 항목:</strong> 마케팅 수신 동의</p>
          <p><strong>자동 수집:</strong> IP 주소, 쿠키, 방문 기록</p>

          <h2>3. 개인정보의 보유 및 이용 기간</h2>
          <p>회원 탈퇴 시까지 보유하며, 전자상거래 관련 법령에 따라 최대 5년간 보관됩니다.</p>

          <h2>4. 개인정보의 제3자 제공</h2>
          <p>배송 처리를 위해 택배사(CJ대한통운)에 이름, 연락처, 주소를 제공합니다.</p>

          <h2>5. 개인정보 보호책임자</h2>
          <p>이름: [담당자명]</p>
          <p>이메일: privacy@bareunbal.com</p>

          <h2>6. 이용자의 권리</h2>
          <p>이용자는 언제든지 개인정보 조회, 수정, 삭제, 처리 정지를 요청할 수 있습니다.</p>
        </div>
      </div>
    </div>
  )
}
