const webpack = require('webpack')
const { merge } = require('webpack-merge')
const commonConfig = require('./common.config')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const env = {
    PUBLIC_PATH: '',
    NODE_ENV: 'production',
}
module.exports = merge(commonConfig(env), {
    output: {
        publicPath: env.PUBLIC_PATH,
    },
    plugins: [
        // new CleanWebpackPlugin([BUILD_PATH]),
        new webpack.DefinePlugin(
            Object.keys(env).reduce((o, key) => {
                o[key] = JSON.stringify(env[key])
                return o
            }, {})
        ),
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                parallel: 4,
                exclude: /node_modules/,
                cache: false,
                uglifyOptions: {
                    output: {
                        comments: false,
                        beautify: false,
                    },
                },
            }),
        ],
    },
    mode: env.NODE_ENV,
})
