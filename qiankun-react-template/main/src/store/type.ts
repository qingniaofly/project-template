export interface IAction<T = {}, S = undefined> {
    type: string
    payLoad: T
    other: S
}

export interface IRootState {
    cacheRoute: Map<string, any>
    isLogin: boolean
}
