import { registerMicroApps, setDefaultMountApp, start, initGlobalState, RegistrableApp } from 'qiankun'
import push, { IPushStateData } from './pushState'

declare var _env_: {
    PUBLIC_PATH: string
    DEFAULT_HOME_URL: string
    SUB_APP: RegistrableApp<any>[]
}

function getMicroApps() {
    const microApps = []
    for (let name in _env_.SUB_APP) {
        let app = _env_.SUB_APP[name]
        app = Object.assign(app, { name })
        microApps.push(app)
    }
    return microApps
}

class QianKunUtil {
    constructor() {
        window.addEventListener('popstate', this.onPopstate, false)
    }

    destory() {
        window.removeEventListener('popstate', this.onPopstate, false)
    }

    async pushState(url: string, data?: IPushStateData, _blank?: boolean) {
        return push(url, data, _blank)
    }

    onPopstate(e) {
        // 点击浏览器前进或者回退
        if (e.state && e.state.url && !e.state.prevUrl) {
            history.pushState(undefined, e.state.url, e.state)
        }
    }

    init(initialState: any, loader: (loading: boolean) => void) {
        const apps = this.getApps(loader)

        // 注册所有子应用
        this.registerMicroApps(apps)

        // 初始化全局state
        const actions = this.initGlobalState({ ...initialState, qiankunUtil: this })

        // 默认进入页
        const defaultUrl = `${_env_.PUBLIC_PATH}${_env_.DEFAULT_HOME_URL}`
        this.setDefaultMountApp(defaultUrl)

        // 启动应用
        this.start({
            prefetch: false, // 关闭预加载
        })
        return actions
    }

    private start(config?: { prefetch: boolean }) {
        // 启动应用
        start({
            ...config,
            // async fetch(url: string, ...args) {
            //     if (url && url.indexOf('subapp') > -1) {
            //         // const fileUrl = E:/taoyangchao/project/electron/electron-app/release/subapp/purehtml/index.html
            //         const fileUrl = path.resolve(window.__dirname, url)
            //         console.log('QuanKun.ts start fetch import data=', url ,args, fileUrl)
            //         // return fs.readFileSync(fileUrl, 'utf8')
            //       return axios.get(fileUrl + "index.html")
            //     }

            //     console.log('QuanKun.ts start fetch data=', url ,args)
            //     return window.fetch(url, ...args);
            // },
        })
    }

    private setDefaultMountApp(url: string) {
        // 默认进入页面
        setDefaultMountApp(url)
    }

    private getApps(loader: (loading: boolean) => void) {
        const microApps = getMicroApps()
        const apps: RegistrableApp<any>[] = microApps.map((app) => {
            return { ...app, loader }
        })
        return apps
    }

    private registerMicroApps(apps: RegistrableApp<any>[]) {
        registerMicroApps(apps, {
            beforeLoad: [
                (app: { name: string }) => {
                    console.log('[LifeCycle] before load %c%s', 'color: green;', app.name) //eslint-disable-line
                    return Promise.resolve(app)
                },
            ],
            beforeMount: [
                (app: { name: string }) => {
                    console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name) //eslint-disable-line
                    return Promise.resolve(app)
                },
            ],
            afterMount: [
                (app: { name: string }) => {
                    console.log('[LifeCycle] after mount %c%s', 'color: green;', app.name) //eslint-disable-line
                    return Promise.resolve(app)
                },
            ],
            afterUnmount: [
                (app: { name: string }) => {
                    console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name) //eslint-disable-line
                    return Promise.resolve(app)
                },
            ],
        })
    }

    private initGlobalState(initialState: Record<string, any>) {
        // 初始化全局state
        const actions = initGlobalState()
        // 设置全局state
        actions.setGlobalState(initialState)
        return actions
    }
}

export default QianKunUtil
