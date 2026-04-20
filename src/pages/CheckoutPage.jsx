import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import styles from './CheckoutPage.module.css'

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()
  const shippingFee = totalPrice >= 50000 ? 0 : 3000
  const finalPrice = totalPrice + shippingFee

  const [form, setForm] = useState({
    name: '', phone: '', zipCode: '', address: '', detail: '',
    request: '', sameAsBuyer: false,
  })

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    alert('결제 기능은 토스페이먼츠 연동 후 활성화됩니다.\n\n주문 완료 처리됩니다.')
    clearCart()
    navigate('/')
  }

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <p>장바구니가 비어있습니다.</p>
        <Link to="/products" className={styles.backLink}>쇼핑 계속하기</Link>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>주문 / 결제</h1>

        <form onSubmit={handleSubmit} className={styles.layout}>
          <div className={styles.formArea}>
            {/* 배송 정보 */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>배송 정보</h2>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.label}>수령인 *</label>
                  <input name="name" value={form.name} onChange={handleChange} className={styles.input} required placeholder="이름 입력" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>연락처 *</label>
                  <input name="phone" value={form.phone} onChange={handleChange} className={styles.input} required placeholder="010-0000-0000" />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>우편번호 *</label>
                <div className={styles.zipRow}>
                  <input name="zipCode" value={form.zipCode} onChange={handleChange} className={styles.input} required placeholder="우편번호" />
                  <button type="button" className={styles.searchAddrBtn}>주소 검색</button>
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>주소 *</label>
                <input name="address" value={form.address} onChange={handleChange} className={styles.input} required placeholder="기본 주소" />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>상세 주소</label>
                <input name="detail" value={form.detail} onChange={handleChange} className={styles.input} placeholder="상세 주소 (동/호수 등)" />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>배송 요청사항</label>
                <select name="request" value={form.request} onChange={handleChange} className={styles.select}>
                  <option value="">선택해주세요</option>
                  <option>문 앞에 놓아주세요</option>
                  <option>경비실에 맡겨주세요</option>
                  <option>연락 후 배송해주세요</option>
                  <option>부재 시 연락바랍니다</option>
                </select>
              </div>
            </div>

            {/* 결제 방법 */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>결제 방법</h2>
              <div className={styles.paymentNote}>
                <p>🔒 토스페이먼츠 보안 결제 (카드, 간편결제)</p>
                <p className={styles.paymentSub}>결제 시 암호화된 보안 채널을 통해 안전하게 처리됩니다.</p>
              </div>
              <div className={styles.paymentMethods}>
                {['신용/체크카드', '카카오페이', '네이버페이', '토스페이'].map(m => (
                  <div key={m} className={styles.payMethod}>{m}</div>
                ))}
              </div>
            </div>
          </div>

          {/* 주문 요약 */}
          <div className={styles.summary}>
            <h3 className={styles.summaryTitle}>주문 상품</h3>

            <div className={styles.orderItems}>
              {items.map(item => (
                <div key={item.key} className={styles.orderItem}>
                  <img src={item.product.image} alt={item.product.name} className={styles.orderItemImg} />
                  <div>
                    <p className={styles.orderItemName}>{item.product.name}</p>
                    <p className={styles.orderItemMeta}>{item.size}mm × {item.qty}개</p>
                    <p className={styles.orderItemPrice}>{(item.product.price * item.qty).toLocaleString()}원</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.divider} />
            <div className={styles.priceRows}>
              <div className={styles.priceRow}>
                <span>상품 금액</span>
                <span>{totalPrice.toLocaleString()}원</span>
              </div>
              <div className={styles.priceRow}>
                <span>배송비</span>
                <span>{shippingFee === 0 ? '무료' : `${shippingFee.toLocaleString()}원`}</span>
              </div>
            </div>
            <div className={styles.divider} />
            <div className={styles.totalRow}>
              <span>총 결제 금액</span>
              <span className={styles.totalPrice}>{finalPrice.toLocaleString()}원</span>
            </div>

            <button type="submit" className={styles.payBtn}>
              {finalPrice.toLocaleString()}원 결제하기
            </button>

            <p className={styles.agree}>
              주문하면 <Link to="/terms">이용약관</Link>에 동의하는 것으로 간주됩니다.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
