const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Iosevka Charon Mono", ...defaultTheme.fontFamily.sans],
        mono: ["Iosevka Charon Mono", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        tertiary: "#d33682",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
