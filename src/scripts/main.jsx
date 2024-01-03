import React from 'react'
import { createRoot } from 'react-dom/client';
import navbar from '@monsantoit/phoenix-navbar'
import {Provider} from 'react-redux'
import store from './store'
import Routes from './routes'
import '../styles/style.scss'

const suiteId = 'aurora'
const render = () => {
    const createLink = (url) => {
        const elm = document.createElement("link")
        elm.setAttribute("rel", "stylesheet")
        elm.setAttribute("type", "text/css")
        elm.setAttribute(
            "href",
            url
        )
        document.head.appendChild(elm)
    }
    createLink(`https://phoenix-tools.io/assets/cached/${suiteId}/styles/navbar.css`)
    createLink(`https://phoenix-tools.io/assets/cached/${suiteId}/styles/mat1.1.1.css`)
    createLink(`/agvisor-ui/styles/style.css`)

    const phoenixSuiteId = document.createElement("script")
    phoenixSuiteId.setAttribute("type", "text/javascript")
    phoenixSuiteId.append(`window.phoenix.suiteId = "${suiteId}"`)
    document.body.appendChild(phoenixSuiteId)

    const app = (
        <Provider store={store}>
            <Routes />
        </Provider>
    )
    const container = document.querySelector('.contents');
    const root = createRoot(container);
    root.render(app);
}

navbar.install({
    element: document.querySelector('.nav'),
    suiteId,
    productId: 'agvisor-ui',
    cookieName: 'agvisor-ui-np'
}).then(() => {
    render()
}).catch((e) => {
    console.error(e);
});

