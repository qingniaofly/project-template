const isProd = process.env.NODE_ENV === 'production'
const config = {
    NODE_ENV: process.env.NODE_ENV,
    PUBLIC_URL: '/q',
    // 默认跳转地址
    DEFAULT_HOME_URL: '/demo1/about',
    // localhost:xxx  对应生产环境域名
    SUB_APP: {
        'sub-demo1': {
            entry: '//localhost:8071/subapp/demo1/',
            container: '#subapp',
            activeRule: [`/q/demo1`],
            prefetch: true,
        },
        'sub-demo2': {
            entry: '//localhost:8072/subapp/demo2/',
            container: '#subapp',
            activeRule: [`/q/demo1`],
            prefetch: false,
        },
    },
}
if (isProd) {
    config.SUB_APP = {
        'sub-demo1': {
            entry: '//localhost:8090/subapp/demo1/',
            container: '#subapp',
            activeRule: [`/q/demo1`],
            prefetch: true,
        },
        'sub-demo2': {
            entry: '//localhost:8090/subapp/demo2/',
            container: '#subapp',
            activeRule: [`/q/demo1`],
            prefetch: false,
        },
    }
}
window._env_ = config
export default config
