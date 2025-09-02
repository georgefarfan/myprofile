module.exports = {
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
  },
  defaultNS: "common",
  ns: ["common"],
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
