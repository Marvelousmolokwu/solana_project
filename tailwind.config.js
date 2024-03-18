/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      backgroundImage:{
        'hero-img': 'url("https://res.cloudinary.com/ddgyd8szc/image/upload/v1710697909/banner-bg_ygbaqx.png")',
      'bg-color': 'url("https://res.cloudinary.com/ddgyd8szc/image/upload/v1710731926/color-sharp_q8jelg.png")',
    'bg-up-color': 'url("https://res.cloudinary.com/ddgyd8szc/image/upload/v1710734115/color-sharp2_gwsdh6.png")',  
    },
      keyframes:{
        updown:{
          '0% 100%':{
transform:'translateY(-20px)'
          },
          '50%': {transform: 'translateY(20px)'}
        }
      },
      animation:{
        updown : 'updown 3s linear infinite'
      }
    },
  },
  plugins: [],
}

