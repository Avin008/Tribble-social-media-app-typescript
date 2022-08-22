const { defaults } = require("autoprefixer");
const defaultTheme = require("tailwindcss/defaultTheme");
const scrollbarHide = require("tailwind-scrollbar-hide");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ["sans"]: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [scrollbarHide],
};
