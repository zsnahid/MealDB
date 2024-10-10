/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFC107",
      },
      fontFamily: {
        poppins: "Poppins",
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fit, minmax(200px, 1fr))",
      },
      backgroundImage: {
        "hero-img": "url(./images/banner_1.png)",
      },
    },
  },
  plugins: [],
};
