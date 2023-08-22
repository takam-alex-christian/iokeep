import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors:{
        primary: "#FDB660",
        dark: "#474E41",
        gray: "#A0A6A5",
        "light-gray": "#F9F7F1",
        orange: "#F6761F"
      },
      gridTemplateColumns:{
        lg: "0.50fr 1fr 0.50fr",
        "nav-lg": "0.5fr 1fr 0.5fr",
        "editor-lg": "0.25fr 1fr"
      }
    },
  },
  plugins: [],
}
export default config
