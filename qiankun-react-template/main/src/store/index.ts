import { createStoreWithReducers } from './base'
import { reducers } from './reducers'
import { IRootState } from './type'

const initialState: IRootState = {
    cacheRoute: new Map(),
    isLogin: false,
}

export const store = createStoreWithReducers(reducers, initialState)

export default store
