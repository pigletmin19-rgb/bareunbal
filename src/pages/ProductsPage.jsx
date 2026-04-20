import React, { useState, useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { PRODUCTS } from '../data/products'
import { getSettings } from '../data/siteSettings'
import styles from './ProductsPage.module.css'

const GENDER_TABS = [
  { key: 'women', label: '여성' },
  { key: 'men', label: '남성' },
  { key: 'kids', label: '키즈' },
]

const SIZES = [220, 225, 230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280, 285]

const SORT_OPTIONS = [
  { value: 'default', label: '추천순' },
  { value: 'newest', label: '신상품순' },
  { value: 'price_asc', label: '낮은 가격순' },
  { value: 'price_desc', label: '높은 가격순' },
  { value: 'rating', label: '평점 높은순' },
  { value: 'discount', label: '할인율 높은순' },
]

export default function ProductsPage({ category }) {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const tag = searchParams.get('tag')

  const initGender = category && ['women', 'men', 'kids'].includes(category)
    ? category
    : category === 'sale' ? null : null

  const [gender, setGender] = useState(initGender || 'women')
  const [sort, setSort] = useState('default')
  const { shoeTypes: SHOE_TYPES, shoeModels: SHOE_MODELS } = getSettings()
  const [selectedTypes, setSelectedTypes] = useState([])
  const [selectedSizes, setSelectedSizes] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [openSection, setOpenSection] = useState({ type: true, size: true, model: false })
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 12

  useEffect(() => {
    if (category && ['women', 'men', 'kids'].includes(category)) {
      setGender(category)
    }
  }, [category])

  const isSale = category === 'sale'
  const isNew = tag === 'new'

  let filtered = PRODUCTS

  if (isSale) {
    filtered = PRODUCTS.filter(p => p.tags.includes('sale'))
  } else if (isNew) {
    filtered = PRODUCTS.filter(p => p.tags.includes('new'))
  } else {
    filtered = PRODUCTS.filter(p => p.category === gender)
  }

  if (selectedSizes.length > 0) {
    filtered = filtered.filter(p => selectedSizes.some(s => p.sizes.includes(s)))
  }

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'price_asc') return a.price - b.price
    if (sort === 'price_desc') return b.price - a.price
    if (sort === 'rating') return b.rating - a.rating
    if (sort === 'newest') return a.tags.includes('new') ? -1 : 1
    if (sort === 'discount') {
      const da = a.originalPrice ? (1 - a.price / a.originalPrice) : 0
      const db = b.originalPrice ? (1 - b.price / b.originalPrice) : 0
      return db - da
    }
    return 0
  })

  const toggleSize = s => {
    setSelectedSizes(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    )
  }

  const toggleType = t => {
    setSelectedTypes(prev =>
      prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]
    )
  }

  const resetFilters = () => {
    setSelectedTypes([])
    setSelectedSizes([])
    setPage(1)
  }

  const activeFilterCount = selectedTypes.length + selectedSizes.length
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE)
  const paged = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const pageTitle = isSale ? '세일' : isNew ? '신제품' : ''

  return (
    <div className={styles.page}>
      {/* 상단 성별 탭 (allbirds 스타일) */}
      {!isSale && !isNew && (
        <div className={styles.genderBar}>
          <div className={styles.genderTabs}>
            {GENDER_TABS.map(t => (
              <Link
                key={t.key}
                to={`/products/${t.key}`}
                className={`${styles.genderTab} ${gender === t.key ? styles.genderTabActive : ''}`}
                onClick={() => setGender(t.key)}
              >
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 페이지 제목 (세일/신제품) */}
      {(isSale || isNew) && (
        <div className={styles.pageHero}>
          <h1 className={styles.pageHeroTitle}>{pageTitle}</h1>
        </div>
      )}

      <div className={`${styles.layout} ${!sidebarOpen ? styles.layoutFull : ''}`}>
        {/* 왼쪽 필터 사이드바 */}
        <aside className={`${styles.sidebar} ${sidebarOpen ? '' : styles.sidebarHidden}`}>
          <div className={styles.sidebarHead}>
            <span className={styles.filterLabel}>필터</span>
            {activeFilterCount > 0 && (
              <button className={styles.resetBtn} onClick={resetFilters}>
                초기화 ({activeFilterCount})
              </button>
            )}
          </div>

          {/* 신발 유형 */}
          <div className={styles.filterSection}>
            <button
              className={styles.filterSectionHead}
              onClick={() => setOpenSection(p => ({ ...p, type: !p.type }))}
            >
              <span>신발 유형</span>
              <span className={styles.chevron}>{openSection.type ? '▲' : '▼'}</span>
            </button>
            {openSection.type && (
              <div className={styles.filterOptions}>
                {SHOE_TYPES.map(t => (
                  <label key={t} className={styles.checkLabel}>
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(t)}
                      onChange={() => toggleType(t)}
                      className={styles.checkbox}
                    />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* 사이즈 */}
          <div className={styles.filterSection}>
            <button
              className={styles.filterSectionHead}
              onClick={() => setOpenSection(p => ({ ...p, size: !p.size }))}
            >
              <span>사이즈 (mm)</span>
              <span className={styles.chevron}>{openSection.size ? '▲' : '▼'}</span>
            </button>
            {openSection.size && (
              <div className={styles.sizeGrid}>
                {SIZES.map(s => (
                  <button
                    key={s}
                    className={`${styles.sizeBtn} ${selectedSizes.includes(s) ? styles.sizeBtnActive : ''}`}
                    onClick={() => toggleSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 모델 */}
          <div className={styles.filterSection}>
            <button
              className={styles.filterSectionHead}
              onClick={() => setOpenSection(p => ({ ...p, model: !p.model }))}
            >
              <span>모델</span>
              <span className={styles.chevron}>{openSection.model ? '▲' : '▼'}</span>
            </button>
            {openSection.model && (
              <div className={styles.filterOptions}>
                {SHOE_MODELS.map(m => (
                  <label key={m} className={styles.checkLabel}>
                    <input type="checkbox" className={styles.checkbox} />
                    <span>{m}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* 오른쪽 상품 영역 */}
        <div className={styles.main}>
          <div className={styles.toolbar}>
            <button
              className={styles.filterToggle}
              onClick={() => setSidebarOpen(v => !v)}
            >
              {sidebarOpen ? '◀ 필터 닫기' : '▶ 필터 열기'}
            </button>
            <span className={styles.count}>{sorted.length}개 상품</span>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className={styles.sortSelect}
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* 선택된 필터 태그 */}
          {activeFilterCount > 0 && (
            <div className={styles.activeTags}>
              {selectedTypes.map(t => (
                <span key={t} className={styles.activeTag}>
                  {t} <button onClick={() => toggleType(t)}>✕</button>
                </span>
              ))}
              {selectedSizes.map(s => (
                <span key={s} className={styles.activeTag}>
                  {s}mm <button onClick={() => toggleSize(s)}>✕</button>
                </span>
              ))}
            </div>
          )}

          <div className={`${styles.grid} ${!sidebarOpen ? styles.gridWide : ''}`}>
            {paged.map(p => <ProductCard key={p.id} product={p} />)}
          </div>

          {sorted.length === 0 && (
            <div className={styles.empty}>
              <p>조건에 맞는 상품이 없습니다.</p>
              <button className={styles.resetLink} onClick={resetFilters}>필터 초기화</button>
            </div>
          )}

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button className={styles.pageBtn} onClick={() => { setPage(1); window.scrollTo(0,0) }} disabled={page === 1}>처음</button>
              <button className={styles.pageBtn} onClick={() => { setPage(p => Math.max(1, p-1)); window.scrollTo(0,0) }} disabled={page === 1}>‹</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  className={`${styles.pageBtn} ${page === n ? styles.pageBtnActive : ''}`}
                  onClick={() => { setPage(n); window.scrollTo(0,0) }}
                >
                  {n}
                </button>
              ))}
              <button className={styles.pageBtn} onClick={() => { setPage(p => Math.min(totalPages, p+1)); window.scrollTo(0,0) }} disabled={page === totalPages}>›</button>
              <button className={styles.pageBtn} onClick={() => { setPage(totalPages); window.scrollTo(0,0) }} disabled={page === totalPages}>마지막</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ProductCard({ product }) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  return (
    <Link to={`/products/${product.id}`} className={styles.card}>
      <div className={styles.imgWrap}>
        <img src={product.image} alt={product.name} className={styles.img} />
        {product.badge && <span className={styles.badge}>{product.badge}</span>}
        {product.tags.includes('sale') && discount && (
          <span className={styles.saleBadge}>{discount}% OFF</span>
        )}
      </div>
      <div className={styles.info}>
        <p className={styles.name}>{product.name}</p>
        <div className={styles.priceRow}>
          <span className={styles.price}>{product.price.toLocaleString()}원</span>
          {product.originalPrice && (
            <span className={styles.original}>{product.originalPrice.toLocaleString()}원</span>
          )}
          {discount && <span className={styles.discountText}>{discount}%</span>}
        </div>
        <div className={styles.rating}>
          <span className={styles.stars}>{'★'.repeat(Math.round(product.rating))}</span>
          <span className={styles.ratingNum}>{product.rating} ({product.reviewCount})</span>
        </div>
        <div className={styles.colorDots}>
          {product.colors.slice(0, 5).map((c, i) => (
            <span key={i} className={styles.colorDot} style={{ background: c }} title={product.colorNames[i]} />
          ))}
          {product.colors.length > 5 && (
            <span className={styles.moreColors}>+{product.colors.length - 5}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
