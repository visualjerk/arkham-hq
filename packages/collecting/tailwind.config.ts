import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        serif: ['var(--font-serif)'],
        mono: ['var(--font-roboto-mono)'],
      },
      aspectRatio: {
        card: '100/140',
        'card-horizontal': '140/100',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
export default config
