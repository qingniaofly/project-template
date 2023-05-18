// import * as _R from "ramda"

declare global {
    type PartialPick<T, K extends keyof T> = Partial<T> & Pick<T, K>

    //prettier-ignore
    /* eslint-disable */
    /**
     * @description: 传入类本身，而不是类的实例
     */
    interface ClassOf<T> {
        new(...args: any[]): T
    }
    /* eslint-disable */
    type ExcludesFalse = <T>(x: T | false) => x is T

    const _env_: {
        readonly PUBLIC_URL: string
        readonly HTTPS: boolean
        //营销接口
        readonly EAMS_PROMOTION_API: string
        //应用管家老版本地地址
        readonly EAMS_OLD_HOST: string
        readonly EAMS_SSO_LOGIN_URL: string
        // 默认登录后的跳转地址
        readonly EAMS_DEFAULT_HOME_URL: string
        // 子应用配置
        // 仪表盘
        readonly EAMS_SUB_APP_DASHBOARD: string
        // 用户管理
        readonly EAMS_SUB_APP_USRMANAGER: string
        // 高级设置
        readonly EAMS_SUB_APP_ADVANCEDCONFIG: string
        // 会议室管理
        readonly EAMS_SUB_APP_ROOMMANAGER: string
        // 费用管理
        readonly EAMS_SUB_APP_COSTMANAGER: string
    }

    // const qiankun_RouteEvent: {
    //     public before?: null | ((data?: string) => Promise<boolean | undefined>)
    //     public after?: null | ((data?: string) => () => void | Promise<boolean | undefined>)
    //     public reset?: (type?: "before" | "after") => void
    //     public [key: string]: null | ((data?: string) => Promise<boolean | undefined>)
    // }

    interface Window {
        loginBridge: {
            onLoginSuccess: (userId: string | number, token: string) => void
        }
    }
}
