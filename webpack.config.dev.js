const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.base.js");

module.exports  = merge(baseConfig, {
    devtool: "inline-source-map",
    module: {
        rules: [{
            test:  /\.less$/i,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "less-loader"
            }]
        }]
    }
});