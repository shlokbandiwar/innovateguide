/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1B5573",
          container: "#2D6482",
        },
        secondary: {
          DEFAULT: "#E8521A",
          container: "#FC6028",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          container: {
            lowest: "#FFFFFF",
            low: "#F5FAFF",
            high: "#E5E7EB",
            highest: "#D6DDE5",
          }
        },
        neutral: {
          dark: "#1B3A4B",
          muted: "#4B5563",
          outline: "#E5E7EB",
          outlineVariant: "#D6DDE5",
        },
        // Dark mode palette
        dark: {
          bg: "#0F172A",           // Page background
          surface: "#1E293B",      // Card/panel background
          elevated: "#263244",     // Elevated cards
          border: "#334155",       // Borders
          text: "#F1F5F9",         // Primary text
          muted: "#94A3B8",        // Muted text
          heading: "#E2E8F0",      // Headings
        }
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        '2xl': "1rem",
        '3xl': "2rem",
      },
      spacing: {
        'margin-desktop': '40px',
        'margin-mobile': '16px',
        'gutter': '24px',
        'container-max': '1280px',
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
      }
    },
  },
  plugins: [],
}