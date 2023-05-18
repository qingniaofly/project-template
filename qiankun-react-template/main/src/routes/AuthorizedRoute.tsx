import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { IRootState } from '../store/type'
import { getPublicPath } from '../utils/env'

const AuthorizedRoute = ({ children }) => {
    const PUBLIC_PATH = getPublicPath()
    const { isLogin } = useSelector((state: IRootState) => state)
    if (!isLogin) {
        return <Navigate to={`${PUBLIC_PATH}/login`} replace />
    }
    return children
}

export default memo(AuthorizedRoute)
