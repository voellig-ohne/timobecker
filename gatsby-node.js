var Webpack = require("webpack");

exports.modifyWebpackConfig = function(config, stage) {
    config.plugin("webpack-define", Webpack.DefinePlugin, [{
        "PRODUCTION": process.env.NODE_ENV === 'production',
        "STATIC": stage === 'build-html'
    }]);
    return config;
}