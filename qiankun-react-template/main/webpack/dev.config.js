const webpack = require('webpack')
const { merge } = require('webpack-merge')
const commonConfig = require('./common.config')

const env = {
    PUBLIC_PATH: '/',
    NODE_ENV: 'development',
}

module.exports = merge(commonConfig({ ...env, PUBLIC_PATH: '' }), {
    output: {
        publicPath: env.PUBLIC_PATH,
    },
    devtool: 'inline-source-map',
    plugins: [
        new webpack.DefinePlugin(
            Object.keys(env).reduce((o, key) => {
                o[key] = JSON.stringify(env[key])
                return o
            }, {})
        ),
    ],
    mode: 'development',
    devServer: {
        static: { publicPath: env.PUBLIC_PATH },
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        historyApiFallback: {
            historyApiFallback: true,
            // Paths with dots should still use the history fallback.
            // See https://github.com/facebookincubator/create-react-app/issues/387.
            disableDotRule: true,
        },
    },
})
