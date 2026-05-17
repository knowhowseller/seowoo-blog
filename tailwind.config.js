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
          green:  '#2D6A4F',
          light:  '#52B788',
          cream:  '#F8F4EF',
          brown:  '#5C4033',
          gold:   '#D4A017',
        },
      },
      fontFamily: {
        sans: ['var(--font-pretendard)', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#2D3748',
            a: { color: '#2D6A4F', '&:hover': { color: '#52B788' } },
            h2: { color: '#2D6A4F' },
            h3: { color: '#2D6A4F' },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
