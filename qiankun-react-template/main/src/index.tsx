import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
import { HashRouter, BrowserRouter } from 'react-router-dom'

const container = document.getElementById('root') as HTMLDivElement
const root = ReactDOM.createRoot(container)
const render = (Component: React.FC): void => {
    root.render(
        <Provider store={store}>
            <BrowserRouter>
                <Component />
            </BrowserRouter>
        </Provider>
    )
}
render(App)
