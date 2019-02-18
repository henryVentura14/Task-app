const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, 'src') + '/app/index.js',
  output: {
    path: path.resolve(__dirname, "./public/js"),
    filename: "bundle.js",
    publicPath: "public",

  },
  module: {
    rules: [{
      test: /(\.js|.jsx)$/,
      include: [
        path.resolve(__dirname, "src")
      ],
      exclude: [
        path.resolve(__dirname, "node_modules")
      ],
      loader: "babel-loader",
      options: {
        presets: ["env", "stage-2", "react"]
      },
    },
    {
      test: /\.css$/,
      include: [
        path.resolve(__dirname, "src")
      ],
      exclude: [
        path.resolve(__dirname, "node_modules")
      ],
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [{
          loader: 'css-loader',
          options: {
            minimize: true
          }
        }]
      })
    },
  ]
},
plugins: [
  new ExtractTextPlugin("../css/style.min.css"),
  new MinifyPlugin()
]
};
