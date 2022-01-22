const path = require("path");

module.exports = {
  chainWebpack: (config) => {
  const types = ["vue-modules", "vue", "normal-modules", "normal"];
types.forEach((type) =>
addStyleResource(config.module.rule("less").oneOf(type))
);
},

configureWebpack: {
  optimization: {
  splitChunks: false,
},
output: {
  filename: () =>
  process.env.VUE_CLI_MODERN_MODE && !process.env.VUE_CLI_MODERN_BUILD
  ? "my-account.js"
  : "my-account.js",
},
  },

css: {
  extract: false,
},
  };

function addStyleResource(rule) {
  rule
  .use("style-resource")
  .loader("style-resources-loader")
  .options({
  patterns: [
  path.resolve(__dirname, "./src/styles/variables.less"),
  path.resolve(__dirname, "./src/styles/wp-styles.less"),
  ],
  });
}
