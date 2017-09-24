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

module.exports  = merge(baseConfig, {
    devtool: "source-map",
    entry: path.resolve(__dirname, "src/app.js"),
    output: {        
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
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
        extractLess,
        uglifyJS
    ]
})