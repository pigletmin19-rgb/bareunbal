import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import styles from './CheckoutPage.module.css'

const REQUESTS = [
  '선택 안 함',
  '문 앞에 놓아주세요',
  '경비실에 맡겨주세요',
  '택배함에 넣어주세요',
  '연락 후 배송해주세요',
  '부재 시 문자 남겨주세요',
  '직접 입력',
]

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const shippingFee = totalPrice >= 50000 ? 0 : 3000
  const finalPrice = totalPrice + shippingFee

  const [buyer, setBuyer] = useState({ name: '', phone: '', email: '' })
  const [shipping, setShipping] = useState({ name: '', phone: '', zipCode: '', address: '', detail: '', request: '선택 안 함', requestDirect: '' })
  const [sameAsBuyer, setSameAsBuyer] = useState(false)
  const [payMethod, setPayMethod] = useState('card')
  const [agree, setAgree] = useState(false)

  useEffect(() => {
    if (!user) return
    getDoc(doc(db, 'users', user.uid)).then(snap => {
      if (snap.exists()) {
        const data = snap.data()
        setBuyer({ name: data.name || '', phone: data.phone || '', email: user.email || '' })
      } else {
        setBuyer(prev => ({ ...prev, email: user.email || '' }))
      }
    })
  }, [user])

  useEffect(() => {
    if (sameAsBuyer) {
      setShipping(prev => ({ ...prev, name: buyer.name, phone: buyer.phone }))
    }
  }, [sameAsBuyer, buyer])

  const handleBuyerChange = e => setBuyer(prev => ({ ...prev, [e.target.name]: e.target.value }))
  const handleShippingChange = e => setShipping(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    if (!agree) { alert('이용약관에 동의해주세요.'); return }
    alert('결제 기능은 토스페이먼츠 연동 후 활성화됩니다.')
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

            {/* 주문자 정보 */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>주문자 정보</h2>
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.label}>이름 *</label>
                  <input name="name" value={buyer.name} onChange={handleBuyerChange} className={styles.input} required placeholder="이름 입력" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>연락처 *</label>
                  <input name="phone" value={buyer.phone} onChange={handleBuyerChange} className={styles.input} required placeholder="010-0000-0000" />
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>이메일 *</label>
                <input name="email" type="email" value={buyer.email} onChange={handleBuyerChange} className={styles.input} required placeholder="이메일 주소" />
              </div>
            </div>

            {/* 배송 정보 */}
            <div className={styles.section}>
              <div className={styles.sectionTitleRow}>
                <h2 className={styles.sectionTitle}>배송 정보</h2>
                <label className={styles.checkRow}>
                  <input
                    type="checkbox"
                    checked={sameAsBuyer}
                    onChange={e => setSameAsBuyer(e.target.checked)}
                    className={styles.checkbox}
                  />
                  <span>주문자 정보와 동일</span>
                </label>
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.label}>수령인 *</label>
                  <input name="name" value={shipping.name} onChange={handleShippingChange} className={styles.input} required placeholder="이름 입력" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>연락처 *</label>
                  <input name="phone" value={shipping.phone} onChange={handleShippingChange} className={styles.input} required placeholder="010-0000-0000" />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>우편번호 *</label>
                <div className={styles.zipRow}>
                  <input name="zipCode" value={shipping.zipCode} onChange={handleShippingChange} className={`${styles.input} ${styles.zipInput}`} required placeholder="우편번호" readOnly />
                  <button type="button" className={styles.searchAddrBtn} onClick={() => {
                    new window.daum.Postcode({
                      oncomplete: data => {
                        setShipping(prev => ({
                          ...prev,
                          zipCode: data.zonecode,
                          address: data.roadAddress || data.jibunAddress,
                        }))
                      }
                    }).open()
                  }}>주소 검색</button>
                </div>
              </div>
              <div className={styles.field}>
                <input name="address" value={shipping.address} onChange={handleShippingChange} className={styles.input} required placeholder="기본 주소" readOnly />
              </div>
              <div className={styles.field}>
                <input name="detail" value={shipping.detail} onChange={handleShippingChange} className={styles.input} placeholder="상세 주소 (동/호수 등)" />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>배송 요청사항</label>
                <select name="request" value={shipping.request} onChange={handleShippingChange} className={styles.select}>
                  {REQUESTS.map(r => <option key={r}>{r}</option>)}
                </select>
                {shipping.request === '직접 입력' && (
                  <input name="requestDirect" value={shipping.requestDirect} onChange={handleShippingChange} className={styles.input} placeholder="요청사항 직접 입력" style={{ marginTop: 8 }} />
                )}
              </div>
            </div>

            {/* 결제 방법 */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>결제 방법</h2>
              <div className={styles.paymentMethods}>
                {[
                  { key: 'card', label: '신용/체크카드' },
                  { key: 'kakao', label: '카카오페이' },
                  { key: 'naver', label: '네이버페이' },
                  { key: 'toss', label: '토스페이' },
                ].map(m => (
                  <button
                    key={m.key}
                    type="button"
                    className={`${styles.payMethod} ${payMethod === m.key ? styles.payMethodActive : ''}`}
                    onClick={() => setPayMethod(m.key)}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
              <p className={styles.paymentNote}>🔒 토스페이먼츠 보안 결제로 안전하게 처리됩니다.</p>
            </div>

            {/* 약관 동의 */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>약관 동의</h2>
              <label className={styles.checkRow}>
                <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} className={styles.checkbox} />
                <span>[필수] <Link to="/terms" target="_blank">이용약관</Link> 및 <Link to="/privacy" target="_blank">개인정보처리방침</Link>에 동의합니다.</span>
              </label>
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
            <p className={styles.freeShipNote}>
              {shippingFee > 0 ? `${(50000 - totalPrice).toLocaleString()}원 더 담으면 무료배송!` : '✓ 무료배송 적용'}
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
