const path = require("path");
const webpack = require("webpack");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractLess = new ExtractTextPlugin("style.css");

module.exports  = {
    entry: path.resolve(__dirname, "src/app.js"),
    output: {        
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
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
                                    "debug": false
                                }]
                            ]
                        }
                    }
                ]
            },
            {
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
    ],
    node: {
        fs: "empty"
    }
}