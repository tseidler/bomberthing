const path = require("path");
const webpack = require("webpack");

module.exports  = {
    entry: path.resolve(__dirname, "src/app.js"),
    output: {        
        path: path.resolve(__dirname, "build"),
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
                                    "debug": true
                                }]
                            ]
                        }
                    }
                ]
            },
            {
                test:  /\.less$/i,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "less-loader"
                }]
        }]
    },
    node: {
        fs: "empty"
    }
}