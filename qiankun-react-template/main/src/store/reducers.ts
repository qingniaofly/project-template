import { E_ACTION_TYPE } from './actions'
import { IAction, IRootState } from './type'

export const reducers = {
    [E_ACTION_TYPE.LOGIN_ACTION](state: IRootState, action: IAction<string>) {
        return { ...state, isLogin: action.payLoad }
    },
}
