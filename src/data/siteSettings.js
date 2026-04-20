const KEY = 'bareunbal_settings'

const DEFAULTS = {
  // 상단 배너
  bannerText: '17만원 이상 구매 시 10% 할인 · 25만원 이상 구매 시 15% 할인',
  bannerVisible: true,

  // 홈 히어로
  heroTitle: '척추 건강을 위한\n기능성 슈즈',
  heroBadge: '신제품 출시',
  heroSub: '최대 50% 세일 진행 중',

  // 브랜드 정보
  brandName: '바른발',
  phone: '1588-0000',
  email: 'contact@bareunbal.com',
  hours: '평일 09:00 - 18:00',
  address: '',
  bizNumber: '',
  ceoName: '',
  mailOrderNo: '',

  // SNS
  instagram: '',
  kakao: '',
  youtube: '',
  naverBlog: '',

  // 배송
  shippingFee: 3000,
  freeShippingMin: 50000,
  deliveryDays: '2-3 영업일',

  // 소재 & 기술
  materials: [
    { name: 'ZQ 메리노울', desc: '뉴질랜드산 고품질 메리노울. 항균·항취·온도 조절 기능으로 발을 항상 쾌적하게 유지합니다.', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' },
    { name: '유칼립투스 나무', desc: '유칼립투스 나무에서 추출한 섬유로 제작된 갑피. 면보다 3배 부드럽고 환경 부담이 적습니다.', img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80' },
    { name: '사탕수수 폼', desc: '탄소 중립 사탕수수 유래 폼 아웃솔. 충격 흡수와 반발력이 뛰어나며 지구에도 이롭습니다.', img: 'https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?w=800&q=80' },
  ],

  // 필터
  shoeTypes: ['워킹화', '러닝화', '슬립온', '스탠딩화', '트레일화'],
  shoeModels: ['스파인케어', '포스처핏', '오소 트레일', '클라우드 스텝'],
}

export function getSettings() {
  try {
    const saved = localStorage.getItem(KEY)
    return saved ? { ...DEFAULTS, ...JSON.parse(saved) } : DEFAULTS
  } catch { return DEFAULTS }
}

export function saveSettings(settings) {
  localStorage.setItem(KEY, JSON.stringify(settings))
}

export function getSetting(key) {
  return getSettings()[key]
}
