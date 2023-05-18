import React, { memo } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getPublicPath } from './utils/env'
import AuthorizedRoute from './routes/AuthorizedRoute'
import Home from './views/home'
import Login from './views/login'
import './style/common.scss'
import './App.scss'
import '@babel/polyfill'

const App = () => {
    const PUBLIC_PATH = getPublicPath()
    return (
        <div className="app-wrapper full-screen">
            <Routes>
                <Route path={`${PUBLIC_PATH}/login/*`} element={<Login />} />
                <Route
                    path={`/*`}
                    element={
                        <AuthorizedRoute>
                            <Home />
                        </AuthorizedRoute>
                    }
                />
            </Routes>
        </div>
    )
}
export default memo(App)
