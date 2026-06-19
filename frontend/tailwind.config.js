export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Enforces clean typography across the app
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        // Custom minimal shadows to prevent heavy borders
        '3xs': '0 1px 2px 0 rgba(15, 23, 42, 0.03)',
        'xs': '0 1px 4px 0 rgba(15, 23, 42, 0.05)',
        'sm': '0 2px 8px 0 rgba(15, 23, 42, 0.04)',
        'md': '0 4px 20px -2px rgba(15, 23, 42, 0.06)',
      },
    },
  },
  plugins: [],
}