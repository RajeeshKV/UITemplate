/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        accent: "#c8a96e",
        "accent-dark": "#d4b07a",
        navy: "#1e293b",
        canvas: "#f7f6f2",
        "canvas-dark": "#0f0f10",
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
