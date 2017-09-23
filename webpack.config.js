const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.base");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractLess = new ExtractTextPlugin("style.css");

module.exports  = merge(baseConfig, {
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
        extractLess
    ]
})