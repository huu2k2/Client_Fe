/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)',
      },
      fontFamily: {
        main: ["Inter", "sans-serif"],
      },
      colors: {
        red600: "text-red-600",
        red50: "text-red-50",
        black200: "text-black-200",
        gray6a: "#6A6A6A",
        blue600: "text-blue-600",
        blue50: "text-blue-50",
        'checkbox-red': '#EF4444',
      },
      utilities: {
        ".scroll-hidden": {
          "scrollbar-width": "none", /* Firefox */
          "-ms-overflow-style": "none", /* Internet Explorer 10+ */
        },
        ".scroll-hidden::-webkit-scrollbar": {
          display: "none", /* Safari and Chrome */
        },
      },
      keyframes: {
        "slide-in": {
          "0%": {
            transform: "translateX(100%)",
            backgroundColor: "rgba(107, 114, 128, 0)",
          },
          "80%": {
            transform: "translateX(50%)",
            backgroundColor: "rgba(107, 114, 128, 0)",
          },
          "100%": {
            transform: "translateX(0)",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          },
        },
        "slide-out": {
          "0%": {
            transform: "translateX(0)",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          },
          "10%": {
            transform: "translateX(0)",
            backgroundColor: "rgba(107, 114, 128, 0)",
          },
          "100%": {
            transform: "translateX(100%)",
            backgroundColor: "rgba(107, 114, 128, 0)",
          },
        },
      },
      animation: {
        "slide-in": "slide-in 0.5s forwards",
        "slide-out": "slide-out 0.5s forwards",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['checked'],
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scroll-hidden": {
          "scrollbar-width": "none", /* Firefox */
          "-ms-overflow-style": "none", /* Internet Explorer 10+ */
        },
        ".scroll-hidden::-webkit-scrollbar": {
          display: "none", /* Safari and Chrome */
        },
      });
    },
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light"],
  },
};
