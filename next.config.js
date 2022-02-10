const withLess = require("next-with-less");
const nextTranslate = require("next-translate");

module.exports = withLess({
  // i18n: { locales: ["en", "zh"],
  //   defaultLocale: "zh",
  // },
  ...nextTranslate(),
  images: {
    domains: ["fakestoreapi.com"],
  },
  lessLoaderOptions: {
    lessOptions: {
      modifyVars: {
        "primary-color": "#f43f5e",
        "link-color": "#f43f5e",
        "border-radius-base": "2px",
      },
      javascriptEnabled: true,
    },
  },
});
