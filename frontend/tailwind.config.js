/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /* ── ANTALYA JOURNEY premium palette ──
           Fixed brand colors keep the same value in both themes;
           the var-backed tokens flip with the `.dark` root class. */
        navy: '#0B1F3F',            // deep Mediterranean navy — dark sections, on-gold text
        gold: '#D4AF37',            // refined gold — luxury accents
        primary: '#00B4D8',         // turquoise — interactive accents
        heading: 'var(--heading)',  // headings on themed surfaces
        ink: 'var(--ink)',          // body text on themed surfaces
        secondary: 'var(--text-secondary)',
        line: 'var(--border)',      // hairline borders
        mist: 'var(--bg)',          // page background
        surface: 'var(--surface)',  // cards & panels
      },
      fontFamily: {
        display: ["'Playfair Display'", 'Georgia', 'serif'],
        sans: ['Inter', "'Noto Sans'", 'sans-serif'],
      },
    },
  },
  plugins: [],
}
