/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          light: '#FAF8F5',
          cardLight: '#FFFFFF',
          dark: '#0E0F14',
          cardDark: '#171922',
          borderDark: '#262938'
        },
        pop: {
          coral: '#FF6B6B',
          yellow: '#FFE66D',
          mint: '#4ECDC4',
          purple: '#B388FF',
          blue: '#4D96FF',
          peach: '#FFA07A',
          lime: '#C7F464',
          pink: '#FF85A1'
        }
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Outfit', 'sans-serif'],
        caveat: ['Caveat', 'cursive'],
        handwriting: ['"Shantell Sans"', '"Architects Daughter"', '"Noteworthy"', '"Patrick Hand"', 'cursive', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'soft': '0 10px 30px -5px rgba(0,0,0,0.06), 0 4px 6px -2px rgba(0,0,0,0.02)',
        'float': '0 20px 40px -10px rgba(0,0,0,0.1)',
        'pop': '4px 4px 0px 0px #1E1F24',
        'pop-coral': '4px 4px 0px 0px #FF6B6B',
        'pop-mint': '4px 4px 0px 0px #4ECDC4',
        'pop-yellow': '4px 4px 0px 0px #FFE66D',
        'pop-purple': '4px 4px 0px 0px #B388FF',
      }
    },
  },
  plugins: [],
}
