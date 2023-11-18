/** @type {import('tailwindcss').Config} */
export default {
  content: ["./frontend/src/**/*.{html,js,jsx}", "./src/styles/**/*.css"],
  theme: {
    extend: {
      fontFamily: {
        Nunito: ["Nunito", "sans-serif"],
        Proxima: ['"Proxima Nova"', "sans-serif"],
      },
      colors: {
        white: "#fff",
        "light-blue": "#6b71ee",
        "brand-color": "#373db5",
        black: "#000",
        "gray-2": "#595657",
        "gray-4": "#d8d8d8",
        "gray-5": "#858585",
        black: "#221e1f",
        coral: "#ff5d7c",
        red: "#e14664",
        backgroundcolor: "#f9f9f9",
      },
      fontSize: {
        "x-small": "0.8rem",
        small: "0.9rem",
        "small-2": "1.8rem",
        large: "30px",
      },
    },
  },
  plugins: [],
  experimental: {
    applyComplexClasses: true,
  },
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
};
