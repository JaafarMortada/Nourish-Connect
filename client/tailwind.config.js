/** @type {import('tailwindcss').Config} */

import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text-gray': 'hsl(var(--color-text-gray) / </alpha-value>)',
        'text-gray': 'hsl(var(--color-text-black) / </alpha-value>)',
        'background': 'hsl(var(--color-background) / </alpha-value>)',
        'background-black': 'hsl(var(--color-background-black) / </alpha-value>)',
        'primary': 'hsl(var(--color-primary) / </alpha-value>)',
        'secondary': 'hsl(var(--color-secondary) / </alpha-value>)',
        'accent': 'hsl(var(--color-accent) / </alpha-value>)',
      }
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
})

