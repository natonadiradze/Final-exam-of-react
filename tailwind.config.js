/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius:{
        'none': '0',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        'xxl': '20px',
        '3xl':'24px'
      },
      fontSize: {
        esm:'12px',
        sm: '14px',
        base: '16px',
        md:'18px',
        lg:'22px',
        xl:'26px',
        xxl:'36px',
        '3xl':'40px',
      },
      colors: {
        'home-dark':'#3D5572',
        'home-card':'rgba(247, 248, 250, 0.80)',
        'footer-bg': '#F4F4F4',
        'main-text':'#41587B',
        'black':'#272727',
        'modal-bg':'rgba(62, 86, 115, 0.83)',
        'modal-btn':'#445F79',
        'home-categories-blur-bg':'rgba(0, 0, 0, 0.30)',
        'home-categories-blur-border':'rgba(249, 250, 251, 0.05)',
        'home-categories-title':'#FAFAFA',
        'home-categories-text':'#F9FAFB',
        'backdrop':'rgba(0, 0, 0, 0.5)',
        'sort-table':'#F9FAFB',
        'sort-table-dark':'#1F2937',
        'sort-table-light':'#4B5563',
        'edark':'#1F2937',
        'heart-bg':'rgba(0, 0, 0, 0.30)',
      },
      fontFamily:{
        'poppins':['Poppins', 'sans-serif'],
        'roboto':['Roboto', 'sans-serif'],
        'glaho':["BPG Glaho", "sans-serif"]
      },
    },
  },
  plugins: [],
}

