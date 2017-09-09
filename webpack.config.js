var path = require("path");
var webpack = require("webpack");

module.exports  = {
    entry: path.resolve(__dirname, "src/app.js"),
    output: {        
        path: path.resolve(__dirname, "/build"),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                query: {
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
    node: {
        fs: "empty"
    }
}