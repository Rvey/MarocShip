module.exports = {
  darkMode: 'media',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@themesberg/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@themesberg/flowbite/plugin')
]
}
