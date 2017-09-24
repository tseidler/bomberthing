const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpack = new HtmlWebpackPlugin({
    template: "src/index.html",
    inject: true
});

const webpackEnvironment = new webpack.EnvironmentPlugin([
    "NODE_ENV"
]);

module.exports  = {
    entry: path.resolve(__dirname, "src/app.js"),
    module: {
        rules: [{
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                ["env", {
                                    "targets": {
                                    "browsers": ["last 2 versions"]
                                    },
                                    "debug": process.env.NODE_ENV === "development"
                                }]
                            ]
                        }
                    }
                ]
            }]
    },
    plugins: [
        htmlWebpack,
        webpackEnvironment
    ],
    node: {
        fs: "empty"
    }
}
