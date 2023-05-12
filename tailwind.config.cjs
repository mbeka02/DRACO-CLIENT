/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        xxs: "0.55rem",
      },
      colors: {
        "light-secondary": "#fdfff5",
        "dark-primary": "#121212",
        "hr-custom": "#323232",
        "blue-custom": "#0077FF",
        "indigo-custom": "#5453E0",
        "green-custom": "#20BD5F",
        "red-custom": "#F44336",
        "pink-custom": "#E91E63",
        "grey-custom": "#DBE5E6",
      },
      borderWidth: {
        "border-custom": "1px",
      },
      gridTemplateColumns: {
        custom: " 1fr 4fr",
        custom_2: "1fr 2fr",
        custom_3: "5fr 3fr",
        custom_4: "3fr 3fr",
      },
      maxWidth: {
        custom: "33.3333%",
      },
      minWidth: {
        custom: "8rem",
      },
      height: {
        msgbox: "13%",
      },
    },
  },
  plugins: [],
};
