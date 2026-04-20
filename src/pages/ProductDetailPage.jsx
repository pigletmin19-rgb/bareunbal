import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getProductById } from '../services/productService'
import { useCart } from '../contexts/CartContext'
import styles from './ProductDetailPage.module.css'

const TABS = ['상품 설명', '소재 & 기술', '배송 & 반품', '리뷰']

const DUMMY_REVIEWS = [
  { name: '이○○', rating: 5, date: '2026.03.15', text: '허리 통증이 많이 줄었습니다. 장시간 착용해도 편해요.' },
  { name: '박○○', rating: 5, date: '2026.02.28', text: '처음에는 반신반의했는데 실제로 효과가 있어요!' },
  { name: '최○○', rating: 4, date: '2026.02.10', text: '디자인도 좋고 발이 편합니다. 재구매 의사 있어요.' },
]

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProductById(id).then(data => { setProduct(data); setLoading(false) })
  }, [id])

  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState(null)
  const [activeImg, setActiveImg] = useState(0)
  const [activeTab, setActiveTab] = useState(0)
  const [added, setAdded] = useState(false)

  if (loading) return <div style={{ textAlign: 'center', padding: '80px' }}>불러오는 중...</div>

  if (!product) {
    return (
      <div className={styles.notFound}>
        <p>상품을 찾을 수 없습니다.</p>
        <Link to="/products" className={styles.backLink}>상품 목록으로</Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('사이즈를 선택해주세요.')
      return
    }
    addItem(product, selectedSize)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('사이즈를 선택해주세요.')
      return
    }
    addItem(product, selectedSize)
    navigate('/cart')
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  const allImages = product.images?.length ? product.images : [product.image]

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* 이미지 갤러리 */}
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            {allImages.map((img, i) => (
              <button
                key={i}
                className={`${styles.thumb} ${activeImg === i ? styles.thumbActive : ''}`}
                onClick={() => setActiveImg(i)}
              >
                <img src={img} alt={`${product.name} ${i+1}`} />
              </button>
            ))}
          </div>
          <div className={styles.mainImg}>
            <img src={allImages[activeImg]} alt={product.name} />
            {product.badge && <span className={styles.badge}>{product.badge}</span>}
          </div>
        </div>

        {/* 상품 정보 */}
        <div className={styles.info}>
          <div className={styles.breadcrumb}>
            <Link to="/products">전체 상품</Link>
            <span>›</span>
            <span>{product.category === 'men' ? '남성' : product.category === 'women' ? '여성' : '키즈'}</span>
          </div>

          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.nameEn}>{product.nameEn}</p>

          <div className={styles.ratingRow}>
            <span className={styles.stars}>{'★'.repeat(Math.round(product.rating))}</span>
            <span className={styles.ratingNum}>{product.rating}</span>
            <span className={styles.reviewCount}>({product.reviewCount}개 리뷰)</span>
          </div>

          <div className={styles.priceRow}>
            <span className={styles.price}>{product.price.toLocaleString()}원</span>
            {product.originalPrice && (
              <>
                <span className={styles.original}>{product.originalPrice.toLocaleString()}원</span>
                <span className={styles.discount}>{discount}% 할인</span>
              </>
            )}
          </div>

          {/* 색상 선택 */}
          <div className={styles.optionSection}>
            <p className={styles.optionLabel}>
              색상 <span className={styles.optionValue}>{product.colorNames[selectedColor]}</span>
            </p>
            <div className={styles.colorRow}>
              {product.colors.map((c, i) => (
                <button
                  key={i}
                  className={`${styles.colorBtn} ${selectedColor === i ? styles.colorBtnActive : ''}`}
                  style={{ background: c }}
                  onClick={() => setSelectedColor(i)}
                  title={product.colorNames[i]}
                />
              ))}
            </div>
          </div>

          {/* 사이즈 선택 */}
          <div className={styles.optionSection}>
            <p className={styles.optionLabel}>사이즈 (mm)</p>
            <div className={styles.sizeGrid}>
              {product.sizes.map(s => (
                <button
                  key={s}
                  className={`${styles.sizeBtn} ${selectedSize === s ? styles.sizeBtnActive : ''}`}
                  onClick={() => setSelectedSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <p className={styles.description}>{product.description}</p>

          <ul className={styles.features}>
            {product.features.map(f => (
              <li key={f} className={styles.featureItem}>✓ {f}</li>
            ))}
          </ul>

          <div className={styles.ctaRow}>
            <button
              className={styles.addBtn}
              onClick={handleAddToCart}
            >
              {added ? '✓ 담겼습니다!' : '장바구니 담기'}
            </button>
            <button
              className={styles.buyBtn}
              onClick={handleBuyNow}
            >
              바로 구매
            </button>
          </div>

          <div className={styles.shippingInfo}>
            <p>🚚 50,000원 이상 구매 시 무료배송</p>
            <p>📦 주문 후 2-3 영업일 배송</p>
            <p>↩ 수령 후 7일 이내 반품 가능</p>
          </div>
        </div>
      </div>

      {/* 상세 탭 */}
      <div className={styles.tabs}>
        <div className={styles.tabList}>
          {TABS.map((t, i) => (
            <button
              key={t}
              className={`${styles.tab} ${activeTab === i ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(i)}
            >
              {t}
            </button>
          ))}
        </div>

        <div className={styles.tabContent}>
          {activeTab === 0 && (
            <div className={styles.tabPanel}>
              <p className={styles.tabDesc}>{product.description}</p>
              <div className={styles.featureCards}>
                {product.features.map(f => (
                  <div key={f} className={styles.featureCard}>
                    <span className={styles.featureCheck}>✓</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 1 && (
            <div className={styles.tabPanel}>
              <h3>소재 & 기술</h3>
              <p>천연 메리노울 인솔 / 유칼립투스 갑피 / 천연 고무 아웃솔</p>
              <p>정형외과 전문의 협업 설계 / 3D 아치 서포트 기술 적용</p>
            </div>
          )}

          {activeTab === 2 && (
            <div className={styles.tabPanel}>
              <h3>배송 안내</h3>
              <p>· 기본 배송비: 3,000원 (50,000원 이상 무료)</p>
              <p>· 배송 기간: 2-3 영업일 (CJ대한통운)</p>
              <h3 style={{marginTop: '24px'}}>반품 & 교환</h3>
              <p>· 반품: 수령 후 7일 이내 (착용 전 제품)</p>
              <p>· 교환: 수령 후 14일 이내</p>
              <p>· 제품 불량 시 무료 왕복배송 지원</p>
            </div>
          )}

          {activeTab === 3 && (
            <div className={styles.tabPanel}>
              <div className={styles.reviewSummary}>
                <span className={styles.bigRating}>{product.rating}</span>
                <div>
                  <div className={styles.bigStars}>{'★'.repeat(Math.round(product.rating))}</div>
                  <span>{product.reviewCount}개 리뷰</span>
                </div>
              </div>
              <div className={styles.reviewList}>
                {DUMMY_REVIEWS.map((r, i) => (
                  <div key={i} className={styles.reviewItem}>
                    <div className={styles.reviewHeader}>
                      <span className={styles.reviewStars}>{'★'.repeat(r.rating)}</span>
                      <span className={styles.reviewName}>{r.name}</span>
                      <span className={styles.reviewDate}>{r.date}</span>
                    </div>
                    <p className={styles.reviewText}>{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
