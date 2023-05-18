import { createAction } from './base'

export enum E_ACTION_TYPE {
    LOGIN_ACTION = 'loginAction',
}

export const storeAction = {
    login(isLogin: boolean) {
        return createAction(E_ACTION_TYPE.LOGIN_ACTION, isLogin)
    },
}
