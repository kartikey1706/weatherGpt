/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        weather: {
          primary: '#0f172a', // Slate 900
          secondary: '#1e293b', // Slate 800
          accent: '#38bdf8', // Sky 400
          warning: '#fbbf24', // Amber 400
          danger: '#ef4444', // Red 500
          success: '#22c55e', // Green 500
        }
      }
    },
  },
  plugins: [],
}
