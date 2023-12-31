import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          one: '#9747FF',
          two: '#FCCB28',
          tree: '#C5A1FF',
          four: '#2C153B',
          five: '#FEF0AC',
          six: '#E3E0F3',
          seven: '#C5A1FF',
          eight: '#F7D6B4',
          danger: '#FF7A5C',
          success: '#91ED91',
          white: '#FDF9F5',
          black: '#1D2019',
        },
      },
    },
  },
  plugins: [],
}
export default config
