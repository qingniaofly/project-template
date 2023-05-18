import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { storeAction } from '../store/actions'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <div className="login-container full-screen">
            <div className="login-header" style={{ height: 80 }}>
                <h1>qiankun DEMO</h1>
            </div>
            <div className="login-content">
                <button
                    className="login-join"
                    onClick={() => {
                        dispatch(storeAction.login(true))
                        navigate('/')
                    }}
                >
                    进 入
                </button>
            </div>
        </div>
    )
}
export default memo(Login)
