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
          50: "#f9f5ff",
          100: "#f4ebff",
          200: "#e9d7fe",
          300: "#d6bbfb",
          400: "#b692f6",
          500: "#9e77ed",
          600: "#7f56d9",
          700: "#6941c6",
          800: "#53389e",
          900: "#42307d",
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
