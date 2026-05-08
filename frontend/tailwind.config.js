/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0F172A', // Slate 900 (dark default)
        surface: '#1E293B',    // Slate 800
        primary: '#38BDF8',    // Sky 400
        secondary: '#94A3B8',  // Slate 400
      },
    },
  },
  plugins: [],
}

