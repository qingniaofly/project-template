import { registerMicroApps, setDefaultMountApp, start, initGlobalState, RegistrableApp } from 'qiankun'

interface IQiankunGlobalState {
    language?: string // 语言
    onCallback?: (type: string, data: boolean | any) => void
}

interface RegistrableAppPlus {
    prefetch?: boolean
    name: string
    entry: string
    container: string
    activeRule: string | string[]
}

declare var _env_: {
    PUBLIC_URL: string
    SUB_APP_DEMO1: string
    SUB_APP_DEMO2: string
}
const PUBLIC_URL = _env_.PUBLIC_URL

// 子应用列表
const microApps: RegistrableAppPlus[] = [
    {
        name: 'sub-demo1',
        entry: _env_.SUB_APP_DEMO1 as string,
        container: '#subapp',
        activeRule: [`${PUBLIC_URL}/demo1`, `${PUBLIC_URL}/demo1/`],
        prefetch: true,
    },
    {
        name: 'sub-demo2',
        entry: _env_.SUB_APP_DEMO2 as string,
        container: '#subapp',
        activeRule: [`${PUBLIC_URL}/demo2`, `${PUBLIC_URL}/demo2/`],
    },
]
interface IQiankun_RouteEvent {
    reset?: (type?: string) => void
    [key: string]: any
}
const qiankun_RouteEvent: IQiankun_RouteEvent = {}
qiankun_RouteEvent.reset = (type?: string) => {
    if (!type) {
        qiankun_RouteEvent.before = null
        qiankun_RouteEvent.after = null
        return
    }
    qiankun_RouteEvent[type] = null
}
;(window as any).qiankun_RouteEvent = qiankun_RouteEvent
const initQiankun = (initialState: IQiankunGlobalState, loader: (loading: boolean) => void) => {
    if (qiankun_RouteEvent && qiankun_RouteEvent.reset) {
        qiankun_RouteEvent.reset()
    }
    // 子应用加loader
    const apps: any[] = microApps.map((app) => {
        return { ...app, loader }
    })

    window.addEventListener(
        'popstate',
        function (e) {
            // 点击浏览器前进或者回退
            if (e.state && e.state.url && !e.state.prevUrl) {
                history.pushState(undefined, e.state.url, e.state)
            }
        },
        false
    )

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

    // 初始化全局state
    const actions = initGlobalState()

    // 默认进入登录页
    const defaulUrl = `${PUBLIC_URL}/`
    setDefaultMountApp(defaulUrl)

    // 启动应用
    start({
        prefetch: false, // 关闭预加载
    })

    // 设置全局state
    actions.setGlobalState(initialState)

    return actions
}

export default initQiankun
