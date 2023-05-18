const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

function getConfig(env) {
    const providePlugin = {
        // [qiankun_config__env__name]: [path.join(__dirname, './config.js'), 'default'],
    }

    const NODE_ENV = env.NODE_ENV

    const copyPlugin = {
        patterns: [
            {
                from: path.resolve(__dirname, `./env.${NODE_ENV}.js`),
                to: 'static/js',
            },
        ],
    }

    const plugins = [new webpack.ProvidePlugin(providePlugin), new CopyWebpackPlugin(copyPlugin)]

    const config = {
        plugins,
    }

    return config
}

module.exports = getConfig
