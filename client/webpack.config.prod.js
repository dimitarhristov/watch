const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");
const backend = "http://localhost:9999";
const ROOT_DIR = process.cwd();
const BUILD_DIR = path.resolve(ROOT_DIR, "dist");
const proxy = require("proxy-middleware");

module.exports = {
  // the output bundle won't be optimized for production but suitable for development
  mode: "production",
  // the app entry point is /src/index.js
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    // the output of the webpack build will be in /dist directory
    path: path.resolve(__dirname, "dist"),
    // the filename of the JS bundle will be bundle.js
    filename: "bundle.js"
  },
  watch: true,
  devServer: {
    contentBase: BUILD_DIR,
    port: 8888,
    historyApiFallback: true,
    progress: true,
    inline: true,
    before: app => {
      app.use("/dashboard", proxy(backend + "/dashboard"));

      app.get("/*", (req, res, next) => {
        const wwwFile = path.join(ROOT_DIR, "dist", req.path);
        const wwwIndexFile = path.join(wwwFile, "index.html");

        if (fs.existsSync(wwwIndexFile)) return res.sendFile(wwwIndexFile);
        if (fs.existsSync(wwwFile)) return res.sendFile(wwwFile);

        next();
      });
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, "./src")],
        loader: "babel-loader"
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, "./src")],
        use: "awesome-typescript-loader",
        include: __dirname
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"]
  },
  /*devServer: {
    contentBase: path.resolve(__dirname, "build"),
    historyApiFallback: true
  },*/
  // add a custom index.html as the template
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html")
    })
  ]
};
