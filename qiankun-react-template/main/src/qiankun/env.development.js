window._env_ = {
    NODE_ENV: 'development',
    PORT: ' 8070',
    HOST: ' localhost',
    PUBLIC_PATH: '/q',
    // 默认跳转地址
    DEFAULT_HOME_URL: '/react18',
    // localhost:xxx  对应生产环境域名
    SUB_APP: {
        'sub-react18': {
            entry: '//localhost:8071/subapp/react18/',
            container: '#subapp',
            activeRule: [`/q/react18`],
            prefetch: true,
        },
        purehtml: {
            entry: '//localhost:8073',
            container: '#subapp',
            activeRule: [`/q/purehtml`],
            prefetch: false,
        },
        vue3: {
            entry: '//localhost:8074/subapp/vue3/',
            container: '#subapp',
            activeRule: [`/q/vue3`],
            prefetch: false,
        },
    },
}
