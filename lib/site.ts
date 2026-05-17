export const SITE = {
  name:        '서우 성장연구소',
  description: '작심삼일을 이겨내는 법, S=BTA 성공 방법론, 비전·목표·행동 관리 전략을 매일 연구합니다.',
  url:         process.env.NEXT_PUBLIC_SITE_URL ?? 'https://seowoo.kr',
  ogImage:     '/og-default.png',
  twitterHandle: '',
  author:      '서우(Seowoo)',
  locale:      'ko_KR',
  appUrl:      'https://app.seowoo.kr',
  kakaoChannel: 'http://pf.kakao.com/_xkmeqX',
  keywords: [
    '작심삼일 극복', '목표관리 앱', '자기계발 방법', '비전보드 만들기',
    'S=BTA', '성공 습관', '루틴 만들기', '자기계발 앱 추천',
    '목표 달성 방법', '성공의 나무', '비전관리', '서우',
  ],
}

export const CATEGORIES = [
  { slug: '작심삼일',   label: '작심삼일 극복' },
  { slug: '목표관리',   label: '목표 관리' },
  { slug: 'SBTA',      label: 'S=BTA 방법론' },
  { slug: '자기계발',   label: '자기계발' },
  { slug: '비전',      label: '비전 설계' },
  { slug: '습관',      label: '습관 형성' },
]
