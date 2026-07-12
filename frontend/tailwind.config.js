/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── MARS TRAVEL premium palette ── */
        navy: '#0B1F3F',       // deep Mediterranean navy — headings, dark sections
        gold: '#D4AF37',       // refined gold — luxury accents
        primary: '#00B4D8',    // turquoise — interactive accents
        ink: '#2C3E50',        // body text on light surfaces
        secondary: '#687386',  // muted text
        line: '#E6ECF2',       // hairline borders
        mist: '#F5F7FA',       // page background
        background: '#F5F7FA',
        surface: '#FFFFFF',
      },
      fontFamily: {
        display: ["'Playfair Display'", 'Georgia', 'serif'],
        sans: ['Inter', "'Noto Sans'", 'sans-serif'],
      },
    },
  },
  plugins: [],
}
