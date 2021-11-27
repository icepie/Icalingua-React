import { ConfigProvider } from 'antd'
import 'antd/dist/antd.css'
import zhCN from 'antd/lib/locale/zh_CN'
import { store } from 'app/store'
import moment from 'moment'
import 'moment/locale/zh-cn'
import { initLocalStorage } from 'providers/configProvider'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Router from './routers'
import './styles/global.scss'

moment('zh-cn')

// 初始化数据
initLocalStorage()

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <Router />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
