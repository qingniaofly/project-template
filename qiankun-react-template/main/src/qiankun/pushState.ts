export interface IPushStateData {
    [key: string]: string | number
}

export const getPublicPath = () => {
    return ((window as any)._env_ as any).PUBLIC_PATH || '/'
}

// 获取基本路径
export const getBasePath = () => {
    let PUBLIC_PATH = getPublicPath()
    PUBLIC_PATH = PUBLIC_PATH === '/' ? '' : PUBLIC_PATH
    return PUBLIC_PATH
}

/**
 * 将数据解析成到url上的参数
 *
 * @param data
 * @param strSplit
 */
const parseToUrlParams = (data?: IPushStateData, strSplit: '?' | '&' = '?') => {
    let p = ''
    if (data && Object.keys(data).length) {
        p += strSplit
        for (const key in data) {
            const value = data[key]
            p += `${key}=${value}&`
        }
        p = p.slice(0, p.length - 1)
    }
    return p
}

export const getRouteUrl = (url: string) => {
    const public_path = getPublicPath()

    // 如果url的第一个字符是"/，public_path的最后一个字符是"/"，需要删掉一个"/"   url: "/login"、 public_path: "/"  => "/login"
    if (url.indexOf('/') === 0 && public_path.lastIndexOf('/') === public_path.length - 1) {
        url = url.slice(1, url.length)
    }
    // url: "/login"、 public_path: "/eamscenter"  => "/eamscenter/login"
    url = public_path + url
    return url
}

export const parseUrlToMap = (url: string) => {
    const urlMap = new Map<string, string | number>()
    const has = url.includes('?')
    if (!has) return { url, urlMap }
    const urlArr = url.split('?')
    const _url = urlArr[0]
    const paramsStr = urlArr[1]
    const paramsArr = paramsStr.split('&')
    paramsArr.forEach((s) => {
        const has = s.includes('=')
        let key = '',
            value = ''
        if (has) {
            const arr = s.split('?')
            key = arr[0]
            if (arr.length > 1) {
                value = arr[1]
            }
        }
        if (key) {
            urlMap.set(key, value)
        }
    })
    return { url: _url, urlMap }
}

export const parseMapToUrl = (urlMap: Map<string, string | number>) => {
    let str = ''
    for (const [key, value] of urlMap) {
        str += `${key}=${value}`
    }
    return str
}

export const addTimestampToUrl = (url: string) => {
    // 加时间戳
    const timestamp = new Date().getTime()
    // 取到url
    const { url: _url, urlMap } = parseUrlToMap(url)
    urlMap.set('v', `${timestamp}`)
    const urlParamStr = parseMapToUrl(urlMap)
    url = `${_url}?${urlParamStr}`
    return url
}

/**
 * 统一路由跳转方法
 *
 * @param url 跳转地址
 * @param data 传参
 * @param _blank 是否新开窗口
 */
const push = async (url: string, data?: IPushStateData, _blank?: boolean) => {
    // 处理url，加public_path
    url = getRouteUrl(url)

    // 路由拦截
    const flag = (await (beforePush(url) as unknown)) as boolean
    if (flag === false) {
        // 可根据此标识判断，是否跳转了，进入渲染menu样式
        return flag
    }

    // 新开窗口
    if (_blank) {
        const strSplit = url.includes('?') ? '&' : '?'
        data = { ...data, v: new Date().getTime() }
        url += parseToUrlParams(data, strSplit)
        window.open(url)
        return
    }

    // const link = document.createElement("a")
    // link.href = url
    // document.body.append(link)
    // link.click()
    // document.body.removeChild(link)

    const prevUrl = location.pathname
    data = { ...data, url, prevUrl }

    // 给url加时间戳
    url = addTimestampToUrl(url)

    history.pushState = pushRoute()
    const ret = history.pushState(data, url, url)

    afterPush(url)

    // reloadRouteIfEmpty()

    return ret
}

const reloadRouteIfEmpty = (n?: number) => {
    let count = n || 3
    let timeout: NodeJS.Timeout | null = null
    const fn = () => {
        timeout = setTimeout(() => {
            const subappDOM = document.getElementById('subapp')
            let reload = false
            // 子应用路由未正确加载
            if (subappDOM && (!subappDOM.children || !subappDOM.children.length)) {
                // eslint-disable-next-line
                console.error('route load fail, will reload => ', location.pathname)
                reload = true
                count = 0
            } else {
                count--
            }
            count > 0 ? fn() : timeout && clearTimeout(timeout)
            reload && window.location.reload()
        }, 200)
    }
    fn()
}

const beforePush = async (url: string) => {
    const qiankun_RouteEvent = (window as any).qiankun_RouteEvent

    if (!qiankun_RouteEvent || typeof qiankun_RouteEvent.before !== 'function') {
        return true
    }

    const flag = await qiankun_RouteEvent.before(url).then((v: boolean) => v)

    // 清除上一个拦截器，防止重复执行
    // 返回为false时，不清除，防止只执行一次
    if (flag !== false) {
        typeof qiankun_RouteEvent.reset === 'function' && qiankun_RouteEvent.reset('before')
    }

    // 延迟40ms，确保如有弹窗，弹窗先消失后跳转
    await new Promise((resolve) => setTimeout(() => resolve(true), 40))

    return flag
}

const afterPush = async (url: string) => {
    const qiankun_RouteEvent = (window as any).qiankun_RouteEvent

    if (qiankun_RouteEvent && typeof qiankun_RouteEvent.after === 'function') {
        qiankun_RouteEvent.after(url)
        typeof qiankun_RouteEvent.reset === 'function' && qiankun_RouteEvent.reset('after')
    }
}

export const pushRoute = () => {
    const _wr = function () {
        const orig = history.pushState
        // eslint-disable-next-line
        return function (...params: any) {
            const rv = orig.apply((this || history) as Function, params) //eslint-disable-line
            return rv
        }
    }
    return _wr()
}

export default push
