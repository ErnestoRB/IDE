/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: {
          "50": "rgba(242, 234, 250, 1)",
          "100": "rgba(228, 212, 244, 1)",
          "200": "rgba(201, 169, 233, 1)",
          "300": "rgba(174, 126, 222, 1)",
          "400": "rgba(147, 83, 211, 1)",
          "500": "rgba(120, 40, 200, 1)",
          "600": "rgba(96, 32, 160, 1)",
          "700": "rgba(72, 24, 120, 1)",
          "800": "rgba(48, 16, 80, 1)",
          "900": "rgba(24, 8, 40, 1)",
        }
      },
    },
  },
  plugins: [
    require("@headlessui/tailwindcss"),
    require("tailwind-scrollbar-hide"),
  ],
};
