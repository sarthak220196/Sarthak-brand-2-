import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F1EDE2",
        bone: "#E6E0D1",
        char: "#2B2B2E",
        ink: "#000000",
        lime: "#C8F135",
        cobalt: "#1E3FD8",
        mute: "#6B675D",
      },
      fontFamily: {
        sans: ["Archivo Variable", "Archivo", "Helvetica Neue", "Arial", "sans-serif"],
        serif: ["Newsreader Variable", "Newsreader", "Georgia", "Times New Roman", "serif"],
      },
      maxWidth: { grid: "1440px" },
    },
  },
  plugins: [],
};
export default config;
