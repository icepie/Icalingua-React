import 'antd/dist/antd.css'
import moment from 'moment'
import 'moment/locale/zh-cn'
import React from 'react'
import ReactDOM from 'react-dom'
import { initLocalStorage } from './providers/configProvider'
import { initDataStore } from './providers/dataProvider'
import Router from './routers/routers'
import './styles/global.scss'

moment('zh-cn')

// 初始化数据
initLocalStorage()
initDataStore()

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById('root'),
)
