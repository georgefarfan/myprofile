/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}", // 👈 añade los posts de blog
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.gray.700"),
            "--tw-prose-headings": theme("colors.gray.900"),
            "--tw-prose-links": theme("colors.primary.600"),
            "--tw-prose-bold": theme("colors.gray.900"),
            "--tw-prose-hr": theme("colors.gray.200"),
            "--tw-prose-code": theme("colors.primary.600"),
            "h1, h2, h3, h4": {
              "scroll-margin-top": theme("spacing.24"),
            },
            a: {
              fontWeight: "500",
              textDecoration: "none",
              borderBottom: "1px solid currentColor",
              "&:hover": {
                color: theme("colors.primary.600"),
              },
            },
            code: {
              backgroundColor: theme("colors.gray.100"),
              borderRadius: theme("borderRadius.md"),
              padding: "0.2rem 0.4rem",
              fontWeight: "600",
            },
            pre: {
              backgroundColor: theme("colors.gray.900"),
              color: theme("colors.gray.100"),
              borderRadius: theme("borderRadius.lg"),
              padding: theme("spacing.4"),
            },
          },
        },
        invert: {
          css: {
            "--tw-prose-body": theme("colors.gray.300"),
            "--tw-prose-headings": theme("colors.gray.100"),
            "--tw-prose-links": theme("colors.primary.400"),
            "--tw-prose-bold": theme("colors.gray.100"),
            "--tw-prose-hr": theme("colors.gray.700"),
            "--tw-prose-code": theme("colors.primary.400"),
            a: { color: theme("colors.primary.400") },
            code: { backgroundColor: theme("colors.gray.800") },
            pre: { backgroundColor: theme("colors.gray.800") },
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"), // 👈 importante para blogs
  ],
};
