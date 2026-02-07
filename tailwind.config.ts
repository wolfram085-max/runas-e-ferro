import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "rf-ink": "#0f172a",
        "rf-brand": "#1d4ed8",
        "rf-gold": "#f5c65c"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
