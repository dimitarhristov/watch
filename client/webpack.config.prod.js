const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const fs = require("fs");
const backend = "http://localhost:9999";
const ROOT_DIR = process.cwd();
const BUILD_DIR = path.resolve(ROOT_DIR, "dist");
const proxy = require("proxy-middleware");

const minimizePlugin = new UglifyJsPlugin({
  parallel: true,
  sourceMap: true,
  cache: true,
  test: /\.js(x?)$/,
  uglifyOptions: {
    output: {
      // ecma: 5,
      comments: false
    }
  }
});

module.exports = {
  mode: "production",
  // the app entry point is /src/index.js
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    // the output of the webpack build will be in /dist directory
    path: path.resolve(__dirname, "dist"),
    // the filename of the JS bundle will be bundle.js
    filename: "bundle.js",
    publicPath: "/"
  },
  watch: true,
  devServer: {
    contentBase: BUILD_DIR,
    port: 8888,
    watchContentBase: true,
    historyApiFallback: true,
    progress: false,
    inline: true,
    before: app => {
      app.use("/api", proxy(backend + "/api"));

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
        use: "awesome-typescript-loader"
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"]
  },
  optimization: {
    minimize: true,
    minimizer: [minimizePlugin]
  },
  // add a custom index.html as the template
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: path.resolve(__dirname, "src", "index.html")
    })
  ]
};
