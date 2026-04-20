import React, { useState } from 'react'
import { getSettings, saveSettings } from '../../data/siteSettings'
import styles from './AdminSettings.module.css'

const TABS = ['배너 & 홈', '브랜드 정보', '배송 정책', '소재 & 기술', '필터 설정', 'SNS']

export default function AdminSettings() {
  const [settings, setSettings] = useState(getSettings)
  const [activeTab, setActiveTab] = useState(0)
  const [saved, setSaved] = useState(false)
  const [newType, setNewType] = useState('')
  const [newModel, setNewModel] = useState('')

  const update = (key, value) => setSettings(prev => ({ ...prev, [key]: value }))

  const handleSave = () => {
    saveSettings(settings)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const addType = () => {
    const v = newType.trim()
    if (!v || settings.shoeTypes.includes(v)) return
    update('shoeTypes', [...settings.shoeTypes, v])
    setNewType('')
  }

  const removeType = t => update('shoeTypes', settings.shoeTypes.filter(x => x !== t))

  const addModel = () => {
    const v = newModel.trim()
    if (!v || settings.shoeModels.includes(v)) return
    update('shoeModels', [...settings.shoeModels, v])
    setNewModel('')
  }

  const removeModel = m => update('shoeModels', settings.shoeModels.filter(x => x !== m))

  const updateMaterial = (i, field, value) => {
    const updated = settings.materials.map((m, idx) => idx === i ? { ...m, [field]: value } : m)
    update('materials', updated)
  }

  const handleMaterialImg = (i, e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => updateMaterial(i, 'img', ev.target.result)
    reader.readAsDataURL(file)
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHead}>
        <h1 className={styles.pageTitle}>설정</h1>
        <button className={styles.saveBtn} onClick={handleSave}>
          {saved ? '✓ 저장됨' : '저장하기'}
        </button>
      </div>

      <div className={styles.tabs}>
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

      {/* 배너 & 홈 */}
      {activeTab === 0 && (
        <div className={styles.section}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>상단 배너 문구</label>
            <p className={styles.hint}>홈페이지 맨 위 검정 띠에 표시되는 공지 문구입니다.</p>
            <input className={styles.input} value={settings.bannerText} onChange={e => update('bannerText', e.target.value)} />
            <label className={styles.checkRow}>
              <input type="checkbox" checked={settings.bannerVisible} onChange={e => update('bannerVisible', e.target.checked)} />
              <span>배너 표시</span>
            </label>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>홈 히어로 뱃지</label>
            <p className={styles.hint}>메인 사진 위 작은 라벨 텍스트입니다. (예: 신제품 출시)</p>
            <input className={styles.input} value={settings.heroBadge} onChange={e => update('heroBadge', e.target.value)} />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>홈 히어로 타이틀</label>
            <p className={styles.hint}>메인 화면 중앙 큰 제목입니다. \n 으로 줄바꿈할 수 있습니다.</p>
            <input className={styles.input} value={settings.heroTitle} onChange={e => update('heroTitle', e.target.value)} />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>홈 히어로 부제목</label>
            <p className={styles.hint}>메인 큰 제목 아래 작은 문구입니다. (예: 최대 50% 세일 진행 중)</p>
            <input className={styles.input} value={settings.heroSub} onChange={e => update('heroSub', e.target.value)} />
          </div>
        </div>
      )}

      {/* 브랜드 정보 */}
      {activeTab === 1 && (
        <div className={styles.section}>
          <p className={styles.sectionDesc}>홈페이지 하단(Footer)과 이용약관, 개인정보처리방침에 표시됩니다.</p>

          <div className={styles.formGrid}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>상호명</label>
              <input className={styles.input} value={settings.brandName} onChange={e => update('brandName', e.target.value)} />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>대표자명</label>
              <input className={styles.input} value={settings.ceoName} onChange={e => update('ceoName', e.target.value)} placeholder="홍길동" />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>사업자등록번호</label>
              <input className={styles.input} value={settings.bizNumber} onChange={e => update('bizNumber', e.target.value)} placeholder="000-00-00000" />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>통신판매업 신고번호</label>
              <input className={styles.input} value={settings.mailOrderNo} onChange={e => update('mailOrderNo', e.target.value)} placeholder="제2026-서울강남-0000호" />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>대표 전화번호</label>
              <p className={styles.hint}>Footer 고객센터 전화번호에 표시됩니다.</p>
              <input className={styles.input} value={settings.phone} onChange={e => update('phone', e.target.value)} placeholder="1588-0000" />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>대표 이메일</label>
              <input className={styles.input} value={settings.email} onChange={e => update('email', e.target.value)} placeholder="contact@bareunbal.com" />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>고객센터 운영시간</label>
              <input className={styles.input} value={settings.hours} onChange={e => update('hours', e.target.value)} placeholder="평일 09:00 - 18:00" />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>사업장 주소</label>
              <input className={styles.input} value={settings.address} onChange={e => update('address', e.target.value)} placeholder="서울시 강남구 ..." />
            </div>
          </div>
        </div>
      )}

      {/* 배송 정책 */}
      {activeTab === 2 && (
        <div className={styles.section}>
          <p className={styles.sectionDesc}>상품 상세 페이지와 배송/반품 안내에 표시됩니다.</p>

          <div className={styles.formGrid}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>기본 배송비 (원)</label>
              <p className={styles.hint}>결제 금액이 무료배송 기준 미만일 때 부과되는 배송비입니다.</p>
              <input className={styles.input} type="number" value={settings.shippingFee} onChange={e => update('shippingFee', Number(e.target.value))} />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>무료배송 기준금액 (원)</label>
              <p className={styles.hint}>이 금액 이상 구매 시 배송비가 무료입니다. (예: 50000)</p>
              <input className={styles.input} type="number" value={settings.freeShippingMin} onChange={e => update('freeShippingMin', Number(e.target.value))} />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>배송 소요일</label>
              <p className={styles.hint}>상품 상세 페이지에 표시되는 배송 기간 안내입니다.</p>
              <input className={styles.input} value={settings.deliveryDays} onChange={e => update('deliveryDays', e.target.value)} placeholder="2-3 영업일" />
            </div>
          </div>
        </div>
      )}

      {/* 소재 & 기술 */}
      {activeTab === 3 && (
        <div className={styles.section}>
          <p className={styles.sectionDesc}>홈페이지 메인의 "우리가 사용하는 소재" 섹션 3개 카드 내용입니다.</p>

          {settings.materials.map((m, i) => (
            <div key={i} className={styles.materialCard}>
              <p className={styles.materialNum}>{i + 1}번 카드</p>
              <div className={styles.materialRow}>
                <div className={styles.materialImgWrap}>
                  {m.img && <img src={m.img} alt="" className={styles.materialImg} />}
                  <label className={styles.fileLabel}>
                    📷 사진 변경
                    <input type="file" accept="image/*" onChange={e => handleMaterialImg(i, e)} className={styles.fileInput} />
                  </label>
                  <p className={styles.hint}>또는 URL 직접 입력</p>
                  <input className={styles.input} value={m.img.startsWith('data:') ? '' : m.img} onChange={e => updateMaterial(i, 'img', e.target.value)} placeholder="이미지 URL" />
                </div>
                <div className={styles.materialFields}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>소재 이름</label>
                    <input className={styles.input} value={m.name} onChange={e => updateMaterial(i, 'name', e.target.value)} />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>설명</label>
                    <textarea className={styles.textarea} value={m.desc} onChange={e => updateMaterial(i, 'desc', e.target.value)} rows={3} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 필터 설정 */}
      {activeTab === 4 && (
        <div className={styles.section}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>신발 유형</label>
            <p className={styles.hint}>상품 목록 페이지 왼쪽 필터의 "신발 유형" 항목입니다.</p>
            <div className={styles.tagList}>
              {settings.shoeTypes.map(t => (
                <span key={t} className={styles.tag}>
                  {t}
                  <button className={styles.tagRemove} onClick={() => removeType(t)}>✕</button>
                </span>
              ))}
            </div>
            <div className={styles.addRow}>
              <input className={styles.input} value={newType} onChange={e => setNewType(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addType() } }} placeholder="유형 입력 (예: 샌들)" />
              <button className={styles.addBtn} onClick={addType}>추가</button>
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>모델</label>
            <p className={styles.hint}>상품 목록 페이지 왼쪽 필터의 "모델" 항목입니다.</p>
            <div className={styles.tagList}>
              {settings.shoeModels.map(m => (
                <span key={m} className={styles.tag}>
                  {m}
                  <button className={styles.tagRemove} onClick={() => removeModel(m)}>✕</button>
                </span>
              ))}
            </div>
            <div className={styles.addRow}>
              <input className={styles.input} value={newModel} onChange={e => setNewModel(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addModel() } }} placeholder="모델명 입력 (예: 에어핏)" />
              <button className={styles.addBtn} onClick={addModel}>추가</button>
            </div>
          </div>
        </div>
      )}

      {/* SNS */}
      {activeTab === 5 && (
        <div className={styles.section}>
          <p className={styles.sectionDesc}>홈페이지 하단(Footer)의 SNS 아이콘 링크입니다. 주소를 입력하지 않으면 # 으로 표시됩니다.</p>

          <div className={styles.formGrid}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>인스타그램 주소</label>
              <input className={styles.input} value={settings.instagram} onChange={e => update('instagram', e.target.value)} placeholder="https://instagram.com/bareunbal" />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>카카오톡 채널 주소</label>
              <input className={styles.input} value={settings.kakao} onChange={e => update('kakao', e.target.value)} placeholder="https://pf.kakao.com/..." />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>유튜브 주소</label>
              <input className={styles.input} value={settings.youtube} onChange={e => update('youtube', e.target.value)} placeholder="https://youtube.com/@bareunbal" />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>네이버 블로그 주소</label>
              <input className={styles.input} value={settings.naverBlog} onChange={e => update('naverBlog', e.target.value)} placeholder="https://blog.naver.com/bareunbal" />
            </div>
          </div>
        </div>
      )}

      <div className={styles.saveRow}>
        <button className={styles.saveBtn} onClick={handleSave}>
          {saved ? '✓ 저장됨' : '저장하기'}
        </button>
      </div>
    </div>
  )
}
