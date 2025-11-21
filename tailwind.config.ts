import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Zinc/Slate palette for that monochrome tech look
        background: '#09090b', // Zinc 950
        surface: '#18181b',    // Zinc 900
        surfaceHighlight: '#27272a', // Zinc 800
        border: '#3f3f46',     // Zinc 700
        text: '#f4f4f5',       // Zinc 100
        textMuted: '#a1a1aa',  // Zinc 400
        brand: '#fafafa',      // White (minimalist brand)
        brandDark: '#e4e4e7',  // Zinc 200
        // Keeping some compatibility mappings if needed, but prioritizing the new palette
        input: '#27272a',
        ring: '#fafafa',
        foreground: '#f4f4f5',
        primary: {
          DEFAULT: '#fafafa',
          foreground: '#09090b',
        },
        secondary: {
          DEFAULT: '#18181b',
          foreground: '#f4f4f5',
        },
        muted: {
          DEFAULT: '#27272a',
          foreground: '#a1a1aa',
        },
        accent: {
          DEFAULT: '#27272a',
          foreground: '#fafafa',
        },
        popover: {
          DEFAULT: '#09090b',
          foreground: '#f4f4f5',
        },
        card: {
          DEFAULT: '#18181b',
          foreground: '#f4f4f5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'dither': "url(\"data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 3h1v1H1V3zm2-2h1v1H3V1z' fill='%233f3f46' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E\")",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
}

export default config
