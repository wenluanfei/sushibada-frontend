import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        sushibada: {
          red: '#a71117',
          soft: '#fff5f0',
          gold: '#ffc857',
        }
      }
    }
  },
  plugins: [],
} satisfies Config

