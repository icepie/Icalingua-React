import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from '../views/App'
import LoginView from '../views/LoginView'

// TODO: 登录鉴权
export default function Router() {
  return (
    <BrowserRouter>
      <ConfigProvider locale={zhCN}>
        <Switch>
          <Route path={'/'} exact={true}>
            <App />
          </Route>
          <Route path={'/login'} exact={true}>
            <LoginView />
          </Route>
        </Switch>
      </ConfigProvider>
    </BrowserRouter>
  )
}
