const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = webpackConfigEnv => {
  const defaultConfig = singleSpaDefaults({
    orgName: "atlas",
    projectName: "styles",
    webpackConfigEnv
  });

  return webpackMerge.smart(defaultConfig, {
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: [require("tailwindcss"), require("autoprefixer")]
              }
            }
          ]
        }
      ]
    }
  });
};
