import { ConfigProvider } from 'antd'
import 'antd/dist/antd.css'
import zhCN from 'antd/lib/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
import React from 'react'
import ReactDOM from 'react-dom'
import { initLocalStorage } from './providers/configProvider'
import Router from './routers/routers'
import './styles/global.scss'

moment('zh-cn')

// 初始化数据
initLocalStorage()

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <Router />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
