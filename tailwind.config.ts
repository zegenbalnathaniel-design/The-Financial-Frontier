import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Background layers
        midnight: "#04070D",
        navy: "#08111F",
        slate: "#0F172A",
        // Accents
        emerald: "#00D084",
        electric: "#3B82F6",
        cyan: "#22D3EE",
        violet: "#7C3AED",
        gold: "#FBBF24",
        // Semantics for finance
        pos: "#00D084",
        neg: "#F65B5B",
        // Neutrals
        ink: "#EAF2FF",
        body: "#C4D0E4",
        muted: "#8598B4",
        muted2: "#586A86",
        line: "rgba(133,152,180,0.14)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        glass: "0 20px 60px -24px rgba(0,0,0,0.7)",
        glow: "0 0 40px -8px rgba(0,208,132,0.4)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(rgba(133,152,180,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(133,152,180,0.05) 1px, transparent 1px)",
      },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        drift: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.8)", opacity: "0.7" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        drift: "drift 8s linear infinite",
        pulseRing: "pulseRing 2.4s ease-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
