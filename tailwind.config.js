/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      backgroundImage:{
        'hero-img': 'url("https://res.cloudinary.com/ddgyd8szc/image/upload/v1710697909/banner-bg_ygbaqx.png")'
      }
    },
  },
  plugins: [],
}

