export default class EventUtil {
    map = new Map()

    on = (name, callback) => {
        let fnList = this.map.get(name)
        if (!Array.isArray(fnList)) {
            fnList = []
        }
        fnList.push(callback)
        this.map.set(name, fnList)
    }

    send = (name, ...data) => {
        const fnList = this.map.get(name)
        if (!Array.isArray(fnList)) {
            return
        }
        fnList.forEach((fn) => {
            if (typeof fn === 'function') {
                fn.apply(undefined, data)
            }
        })
    }

    removeListener(name, callback) {
        const fnList = this.map.get(name)
        if (!Array.isArray(fnList)) {
            return
        }
        const list = fnList.filter((fn) => fn !== callback)
        this.map.set(name, list)
    }

    clear() {
        this.map.clear()
    }
}
export const eventUtil = new EventUtil()
