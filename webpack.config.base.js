const path = require("path");
const webpack = require("webpack");

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
        new webpack.EnvironmentPlugin([
            'NODE_ENV'
        ])
    ],
    node: {
        fs: "empty"
    }
}