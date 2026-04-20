import React, { useState } from 'react'
import { PRODUCTS } from '../../data/products'
import styles from './AdminProducts.module.css'

const INIT_FORM = {
  name: '', nameEn: '', category: 'men', price: '', originalPrice: '',
  description: '', features: '', badge: '', image: '', sizes: '', tags: '', stock: '',
}

export default function AdminProducts() {
  const [products, setProducts] = useState(PRODUCTS)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(INIT_FORM)
  const [editId, setEditId] = useState(null)
  const [search, setSearch] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [colors, setColors] = useState([])
  const [newColor, setNewColor] = useState('#3d6b4f')
  const [newColorName, setNewColorName] = useState('')
  const [discountRate, setDiscountRate] = useState('')

  const filtered = products.filter(p =>
    p.name.includes(search) || p.category.includes(search)
  )

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleImageFile = e => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      setImagePreview(ev.target.result)
      setForm(prev => ({ ...prev, image: ev.target.result }))
    }
    reader.readAsDataURL(file)
  }

  const addColor = () => {
    if (!newColorName.trim()) return
    setColors(prev => [...prev, { hex: newColor, name: newColorName.trim() }])
    setNewColorName('')
    setNewColor('#3d6b4f')
  }

  const removeColor = i => setColors(prev => prev.filter((_, idx) => idx !== i))

  const handleEdit = p => {
    setColors((p.colors || []).map((hex, i) => ({ hex, name: (p.colorNames || [])[i] || '' })))
    setForm({
      name: p.name,
      nameEn: p.nameEn || '',
      category: p.category,
      price: String(p.price),
      originalPrice: p.originalPrice ? String(p.originalPrice) : '',
      description: p.description,
      features: p.features.join(', '),
      badge: p.badge || '',
      image: p.image,
      sizes: p.sizes.join(', '),
      tags: p.tags.join(', '),
      stock: String(p.stock ?? ''),
    })
    setImagePreview(p.image || '')
    setEditId(p.id)
    setShowForm(true)
  }

  const handleDelete = id => {
    if (window.confirm('상품을 삭제하시겠습니까?')) {
      setProducts(prev => prev.filter(p => p.id !== id))
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    const newProduct = {
      id: editId || `p${Date.now()}`,
      name: form.name,
      nameEn: form.nameEn,
      category: form.category,
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
      description: form.description,
      features: form.features.split(',').map(f => f.trim()).filter(Boolean),
      badge: form.badge,
      image: form.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
      images: [],
      sizes: form.sizes.split(',').map(s => Number(s.trim())).filter(Boolean),
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      stock: form.stock !== '' ? Number(form.stock) : null,
      colors: colors.map(c => c.hex),
      colorNames: colors.map(c => c.name),
      rating: 0,
      reviewCount: 0,
    }

    if (editId) {
      setProducts(prev => prev.map(p => p.id === editId ? newProduct : p))
    } else {
      setProducts(prev => [...prev, newProduct])
    }

    setForm(INIT_FORM)
    setEditId(null)
    setShowForm(false)
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHead}>
        <h1 className={styles.pageTitle}>상품 관리</h1>
        <button className={styles.addBtn} onClick={() => { setShowForm(true); setEditId(null); setForm(INIT_FORM); setColors([]) }}>
          + 상품 등록
        </button>
      </div>

      {/* 검색 */}
      <div className={styles.toolbar}>
        <input
          type="text"
          placeholder="상품명 검색"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <span className={styles.count}>총 {filtered.length}개</span>
      </div>

      {/* 상품 목록 테이블 */}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>이미지</th>
              <th>상품명</th>
              <th>카테고리</th>
              <th>가격</th>
              <th>재고</th>
              <th>태그</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td>
                  <img src={p.image} alt={p.name} className={styles.thumbImg} />
                </td>
                <td>
                  <p className={styles.productName}>{p.name}</p>
                  <p className={styles.productNameEn}>{p.nameEn}</p>
                </td>
                <td>
                  <span className={styles.catBadge}>
                    {p.category === 'men' ? '남성' : p.category === 'women' ? '여성' : '키즈'}
                  </span>
                </td>
                <td>
                  <p className={styles.priceText}>{p.price.toLocaleString()}원</p>
                  {p.originalPrice && (
                    <p className={styles.originalText}>{p.originalPrice.toLocaleString()}원</p>
                  )}
                </td>
                <td>
                  {p.stock != null
                    ? <span className={p.stock < 10 ? styles.stockLow : styles.stockOk}>{p.stock}개</span>
                    : <span className={styles.stockNone}>-</span>
                  }
                </td>
                <td>
                  <div className={styles.tags}>
                    {p.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
                  </div>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.editBtn} onClick={() => handleEdit(p)}>수정</button>
                    <button className={styles.deleteBtn} onClick={() => handleDelete(p.id)}>삭제</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 등록/수정 폼 */}
      {showForm && (
        <div className={styles.overlay} onClick={() => setShowForm(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHead}>
              <h2 className={styles.modalTitle}>{editId ? '상품 수정' : '상품 등록'}</h2>
              <button className={styles.closeBtn} onClick={() => setShowForm(false)}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label className={styles.label}>상품명 *</label>
                  <input name="name" value={form.name} onChange={handleChange} className={styles.input} required />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>영문명</label>
                  <input name="nameEn" value={form.nameEn} onChange={handleChange} className={styles.input} placeholder="Cloud Step Slip-on" />
                  <p className={styles.hint}>상품명 아래 작게 표시됩니다.</p>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label className={styles.label}>카테고리 *</label>
                  <select name="category" value={form.category} onChange={handleChange} className={styles.select}>
                    <option value="men">남성</option>
                    <option value="women">여성</option>
                    <option value="kids">키즈</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>뱃지</label>
                  <input name="badge" value={form.badge} onChange={handleChange} className={styles.input} placeholder="베스트셀러" />
                  <p className={styles.hint}>상품 이미지 위에 표시되는 라벨입니다. (예: 신상, 베스트셀러, SALE)</p>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label className={styles.label}>판매가 (원) *</label>
                  <input name="price" type="number" value={form.price} onChange={handleChange} className={styles.input} required />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>할인율 (%)</label>
                  <input
                    type="number"
                    value={discountRate}
                    min="0" max="99"
                    placeholder="예: 20"
                    className={styles.input}
                    onChange={e => {
                      const rate = e.target.value
                      setDiscountRate(rate)
                      if (rate && form.price) {
                        const original = Math.round(Number(form.price) / (1 - Number(rate) / 100) / 100) * 100
                        setForm(prev => ({ ...prev, originalPrice: String(original) }))
                      }
                    }}
                  />
                  <p className={styles.hint}>% 입력 시 정가 자동 계산</p>
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>정가 (원)</label>
                <input name="originalPrice" type="number" value={form.originalPrice} onChange={e => { handleChange(e); if (form.price && e.target.value) { const r = Math.round((1 - Number(form.price) / Number(e.target.value)) * 100); setDiscountRate(String(r)) } else { setDiscountRate('') } }} className={styles.input} placeholder="할인율 입력 시 자동 계산" />
                <p className={styles.hint}>정가와 판매가의 차이로 할인율이 자동 표시됩니다.</p>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>상품 이미지</label>
                <div className={styles.imageUploadWrap}>
                  {imagePreview && <img src={imagePreview} alt="미리보기" className={styles.imagePreview} />}
                  <label className={styles.fileLabel}>
                    📷 사진 파일 선택
                    <input type="file" accept="image/*" onChange={handleImageFile} className={styles.fileInput} />
                  </label>
                  <span className={styles.orText}>또는</span>
                  <input name="image" value={form.image.startsWith('data:') ? '' : form.image} onChange={e => { handleChange(e); setImagePreview(e.target.value) }} className={styles.input} placeholder="이미지 URL 직접 입력" />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>사이즈 (쉼표로 구분)</label>
                <input name="sizes" value={form.sizes} onChange={handleChange} className={styles.input} placeholder="240, 245, 250, 255, 260" />
                <p className={styles.hint}>상품 상세 페이지의 사이즈 선택 버튼으로 표시됩니다. (단위: mm)</p>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>태그 (쉼표로 구분)</label>
                <input name="tags" value={form.tags} onChange={handleChange} className={styles.input} placeholder="new, bestseller, sale" />
                <p className={styles.hint}>상품 필터에 사용됩니다. new(신상), bestseller(베스트), sale(세일)</p>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>주요 기능 (쉼표로 구분)</label>
                <input name="features" value={form.features} onChange={handleChange} className={styles.input} placeholder="슬립온 구조, 메모리폼 쿠션, 미끄럼방지 밑창" />
                <p className={styles.hint}>상품 상세 페이지의 ✓ 체크 항목으로 표시됩니다.</p>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>색상</label>
                <p className={styles.hint}>상품 상세 페이지의 색상 선택 버튼으로 표시됩니다.</p>
                <div className={styles.colorList}>
                  {colors.map((c, i) => (
                    <span key={i} className={styles.colorTag}>
                      <span className={styles.colorDot} style={{ background: c.hex }} />
                      {c.name}
                      <button className={styles.colorRemove} onClick={() => removeColor(i)}>✕</button>
                    </span>
                  ))}
                </div>
                <div className={styles.colorAddRow}>
                  <input type="color" value={newColor} onChange={e => setNewColor(e.target.value)} className={styles.colorPicker} />
                  <input
                    type="text"
                    value={newColorName}
                    onChange={e => setNewColorName(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addColor() } }}
                    placeholder="색상 이름 (예: 코랄)"
                    className={styles.input}
                  />
                  <button type="button" className={styles.colorAddBtn} onClick={addColor}>추가</button>
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>재고 수량</label>
                <input name="stock" type="number" value={form.stock} onChange={handleChange} className={styles.input} placeholder="재고 없으면 비워두세요" />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>상품 설명</label>
                <textarea name="description" value={form.description} onChange={handleChange} className={styles.textarea} rows={3} placeholder="예) 신고 벗기 편한 슬립온 스타일에 의료용 쿠션을 더한 일상화." />
                <p className={styles.hint}>상품 상세 페이지 상단과 '상품 설명' 탭에 표시됩니다.</p>
              </div>

              <div className={styles.formActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => setShowForm(false)}>취소</button>
                <button type="submit" className={styles.saveBtn}>{editId ? '수정 저장' : '등록하기'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
