/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "320px",
      sm: "576px",
      md: "768px",
      lg: "1024px",
      xl: "1192px",
      "2xl": "1312px",
    },
    fontSize: {
      xs: "12px",
      sm: "14px",
      base: "16px",
      dm: "18px",
      md: "20px",
      lg: "24px",
      xl: "32px",
      xxl: "40px",
    },
    extend: {
      colors: {
        primary: "#a62a57",
        secondary: "#5da9dd",
        white: "#ffffff",
        black: "#121212",
        dark: "#363636",
        light: "#ddd",
        alert: "#fff3cd",
        dodge: "#664d03",
        warning: "#ffc107",
        success: "#28b469",
      },
    },
  },
  plugins: [],
}

