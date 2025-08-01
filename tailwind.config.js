// tailwind.config.js
module.exports = {
  content: [
    "./views/**/*.hbs",   // handlebars
    "./public/**/*.html", // se tiver algum HTML direto
    "./src/**/*.js",      // scripts com classes dinâmicas
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
