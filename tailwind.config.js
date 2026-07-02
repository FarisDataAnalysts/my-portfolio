/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0B0F1A",
        navylight: "#131A2B",
        teal: "#00D9B5",
        gold: "#D4A947",
        offwhite: "#E8E6E0",
        slate: "#5B6472",
      },
      fontFamily: {
        display: ["var(--font-space)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(232,230,224,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(232,230,224,0.04) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
