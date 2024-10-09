/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm':{"min":"240px","max":"345px"},
      "md":{"min":"346px","max":"540px"},
      'lg':{"min":"541px","max":"1080px"},
      "xl":{"min":"1081px","max":"1440px"},
      "2xl":{"min":"1441px","max":"2160px"},
      "3xl": {"min":"2160px","max":"4080px"}
    },
    extend: {
      
    },
  },
  plugins:[
  ]
}