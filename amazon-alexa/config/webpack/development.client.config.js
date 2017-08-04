const fs = require("fs-extra");
const path = require("path");
const webpack = require("webpack");

const {
    cacheEnvDir,
    context,
    minimalStats,
    nodeEnv,
    output,
    resolve,
    rules,
    webpackEntry,
    webpackPlugins
} = require("./base.config.js");

module.exports = {
    devMiddleware: {
        compress: true,
        publicPath: "/bundles/",
        stats: minimalStats,
        watchOptions: {
            ignored: "!src/*"
        }
    },

    hotMiddleware: {
        path: "/audible"
    },

    devConfig: {
        cache: true,
        context,
        name: `client-side rendering <${nodeEnv}>`,
        entry: webpackEntry({
            hot: true
        }),
        target: "web",
        devtool: "eval",
        output,
        resolve,
        module: {
            rules
        },
        plugins: webpackPlugins({
            hot: true,
            optimize: false,
            minify: false
        }).concat(
            fs
                .readdirSync(cacheEnvDir)
                .filter(file => file.endsWith("-manifest.json"))
                .map(file => {
                    return new webpack.DllReferencePlugin({
                        manifest: require(path.join(cacheEnvDir, file))
                    });
                })
        )
    }
};
