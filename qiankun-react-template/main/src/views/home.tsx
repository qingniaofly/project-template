import React, { memo, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import qiankunUtil from '../qiankun'
import { LoadingWrapper } from '../components/loading'
import push from '../routes/push'
import classNames from 'classnames'
import { getPublicPath } from '../utils/env'
import { useDispatch } from 'react-redux'
import { storeAction } from '../store/actions'

function Home() {
    const PUBLIC_PATH = getPublicPath()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        qiankunUtil.init({}, (loading) => {
            setLoading(loading)
        })
    }, [])

    const isActiveMenu = useCallback((path: string) => {
        return location.pathname.indexOf(path) > -1
    }, [])

    return (
        <div className="layout full-screen">
            <div className="layout-header" data-loading={loading ? 1 : 0}>
                <span className="main-logo">main app</span>
                <ul className="main-menus">
                    <li
                        className={classNames('main-menu', { 'main-menu-active': isActiveMenu('/react18') })}
                        onClick={() => {
                            push('/react18')
                        }}
                    >
                        react18
                    </li>
                    <li
                        className={classNames('main-menu', { 'main-menu-active': isActiveMenu('/purehtml') })}
                        onClick={() => {
                            push('/purehtml')
                        }}
                    >
                        purehtml
                    </li>
                    <li
                        className={classNames('main-menu', { 'main-menu-active': isActiveMenu('/vue3') })}
                        onClick={() => {
                            push('/vue3')
                        }}
                    >
                        vue3
                    </li>
                </ul>
                <div className="main-logout">
                    <span
                        onClick={() => {
                            dispatch(storeAction.login(false))
                            navigate(`${PUBLIC_PATH}/login`)
                        }}
                    >
                        退出
                    </span>
                </div>
            </div>
            <div className="layout-content">
                <LoadingWrapper loading={loading}>
                    <div id="subapp" className="full-screen"></div>
                </LoadingWrapper>
            </div>
        </div>
    )
}
export default memo(Home)
