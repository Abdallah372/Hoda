/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      lineHeight: {
        "relaxed-arabic": "1.8",
        "loose-arabic": "2.2", // For Matn text
      },
      fontSize: {
        reading: ["1.125rem", { lineHeight: "1.8" }],
        matn: ["1.25rem", { lineHeight: "2.2" }],
      },
      colors: {
        "emerald-deep": "#022c22",
        "gold-muted": "#cdb58d",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"), // Ensure this is installed or use CDN/custom
  ],
};
