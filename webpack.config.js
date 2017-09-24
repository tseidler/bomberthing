/*************************** */
/* Webpack production config */
/*************************** */
const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.base");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractLess = new ExtractTextPlugin("style.css");
const uglifyJS = new webpack.optimize.UglifyJsPlugin();
const commonChunks = new webpack.optimize.CommonsChunkPlugin({
    name: "vendor"
});

module.exports  = merge(baseConfig, {
    devtool: "source-map",
    entry: {
        main: path.resolve(__dirname, "src/app.js"),
        vendor: path.resolve(__dirname, "src/vendor.js")
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },
    module: {
        rules: [{
            test:  /\.less$/i,
            use: extractLess.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "less-loader"
                }],
                fallback: "style-loader"
            })
        }]
    },
    plugins: [
        commonChunks,
        extractLess,
        uglifyJS
    ]
})