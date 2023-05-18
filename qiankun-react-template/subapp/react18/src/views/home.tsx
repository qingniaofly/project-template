import React, { memo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()
    return (
        <div>
            subapp react18
            <button
                onClick={() => {
                    navigate('about')
                }}
            >
                关于
            </button>
        </div>
    )
}
export default memo(Home)
