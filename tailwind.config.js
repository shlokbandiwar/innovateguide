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
          DEFAULT: "#1B5573",        // Primary Navy
          container: "#2D6482",      // Hero background
        },
        secondary: {
          DEFAULT: "#E8521A",        // Accent Orange
          container: "#FC6028",      // Accent Orange hover
        },
        surface: {
          DEFAULT: "#FFFFFF",        // Page Background (White)
          container: {
            lowest: "#FFFFFF",       // Card Background (White)
            low: "#F5FAFF",          // Alternate Section Background (Light blue)
            high: "#E5E7EB",         // Border Color
            highest: "#D6DDE5",      // Subtle borders / outlines
          }
        },
        neutral: {
          dark: "#1B3A4B",           // Dark Heading Text
          muted: "#4B5563",          // Body Text
          outline: "#E5E7EB",        // Border Color
          outlineVariant: "#D6DDE5", // Input border color (#D6DDE5)
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

