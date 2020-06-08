const webpack = require("webpack")
const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const BrowserSyncPlugin = require("browser-sync-webpack-plugin")

const isDevelopment = process.env.NODE_ENV === "development"

module.exports = {
  watch: isDevelopment,
  devtool: isDevelopment ? "source-map" : false,
  entry: {
    app: path.join(__dirname, "src", "index.jsx"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    library: "code-states-visualizer",
    libraryTarget: "commonjs2",
  },
  resolve: {
    modules: [path.join(__dirname, "src"), "node_modules"],
    extensions: [".js", ".jsx", ".scss"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        // options: {
        //   babelrc: true,
        // },
      },
      {
        test: /(\.scss$)|(\.css$)/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    minimize: isDevelopment ? false : true, //Update this to true or false
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development"),
      },
    }),
    new MiniCssExtractPlugin("[name].css"),
    new BrowserSyncPlugin({
      host: "localhost",
      port: 3000,
      proxy: "http://localhost:51433/",
    }),
  ].filter((p) => !!p),
  devServer: {
    port: 51433,
  },
}
