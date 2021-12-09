import { store } from 'app/store'
import { initLocalStorage } from 'providers/configProvider'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Router from './routers'
import './styles/global.scss'

// 初始化数据
initLocalStorage()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
