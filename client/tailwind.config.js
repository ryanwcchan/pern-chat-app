/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light", // Built-in DaisyUI light theme
      "dark", // Built-in DaisyUI dark theme
      "synthwave",
      {
        mytheme: {
          primary: "#facc15",
          secondary: "#ea580c",
          accent: "#f59e0b",
          neutral: "#3b82f6",
          "base-100": "#e5e7eb",
          info: "#006de6",
          success: "#22c55e",
          warning: "#ffae00",
          error: "#ff6971",
        },
      },
    ],
  },
};
