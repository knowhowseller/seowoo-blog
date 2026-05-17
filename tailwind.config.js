/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        seowoo: {
          navy:  '#144e8c',   // Main Color 5% — 신뢰
          blue:  '#439AE3',   // Sub Color 25%
          teal:  '#005c70',   // Sub Color
          base:  '#C9E4FA',   // Base Color 70%
          gold:  '#f7931e',   // Point Color — 로고 구슬
          dark:  '#353535',   // 보조 텍스트
          soft:  '#e8f3fd',   // 연한 배경용
        },
      },
      fontFamily: {
        sans: ['var(--font-pretendard)', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#353535',
            a: { color: '#144e8c', '&:hover': { color: '#439AE3' } },
            h2: { color: '#144e8c' },
            h3: { color: '#144e8c' },
            strong: { color: '#144e8c' },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
