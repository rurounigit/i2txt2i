import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'dark-blue': '#153D70',
        'blue': '#26538D',
        'light-blue': '#8FADD3',
        'pale-blue': '#BED1EB',
        'light-orange': '#EC8B52',
        'white': '#D55E00',
        'green': '#359A81',
        'light-green': '#89D2C0',

      },
    },
  },
  plugins: [],
};
export default config;
