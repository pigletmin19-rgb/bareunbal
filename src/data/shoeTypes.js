const TYPES_KEY = 'bareunbal_shoe_types'
const MODELS_KEY = 'bareunbal_shoe_models'
const BANNER_KEY = 'bareunbal_banner'
const MATERIALS_KEY = 'bareunbal_materials'

const DEFAULT_TYPES = ['워킹화', '러닝화', '슬립온', '스탠딩화', '트레일화']
const DEFAULT_MODELS = ['스파인케어', '포스처핏', '오소 트레일', '클라우드 스텝']
const DEFAULT_BANNER = '17만원 이상 구매 시 10% 할인 · 25만원 이상 구매 시 15% 할인'
const DEFAULT_MATERIALS = [
  { name: 'ZQ 메리노울', desc: '뉴질랜드산 고품질 메리노울. 항균·항취·온도 조절 기능으로 발을 항상 쾌적하게 유지합니다.', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' },
  { name: '유칼립투스 나무', desc: '유칼립투스 나무에서 추출한 섬유로 제작된 갑피. 면보다 3배 부드럽고 환경 부담이 적습니다.', img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80' },
  { name: '사탕수수 폼', desc: '탄소 중립 사탕수수 유래 폼 아웃솔. 충격 흡수와 반발력이 뛰어나며 지구에도 이롭습니다.', img: 'https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?w=800&q=80' },
]

export function getShoeTypes() {
  try { return JSON.parse(localStorage.getItem(TYPES_KEY)) || DEFAULT_TYPES } catch { return DEFAULT_TYPES }
}
export function saveShoeTypes(types) { localStorage.setItem(TYPES_KEY, JSON.stringify(types)) }

export function getShoeModels() {
  try { return JSON.parse(localStorage.getItem(MODELS_KEY)) || DEFAULT_MODELS } catch { return DEFAULT_MODELS }
}
export function saveShoeModels(models) { localStorage.setItem(MODELS_KEY, JSON.stringify(models)) }

export function getBannerText() {
  return localStorage.getItem(BANNER_KEY) || DEFAULT_BANNER
}
export function saveBannerText(text) { localStorage.setItem(BANNER_KEY, text) }

export function getMaterials() {
  try { return JSON.parse(localStorage.getItem(MATERIALS_KEY)) || DEFAULT_MATERIALS } catch { return DEFAULT_MATERIALS }
}
export function saveMaterials(materials) { localStorage.setItem(MATERIALS_KEY, JSON.stringify(materials)) }
