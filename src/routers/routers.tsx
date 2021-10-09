import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { getBot } from '../providers/dataProvider'
import App from '../views/App'
import LoginView from '../views/LoginView'

export default function Router() {
  let bot = getBot()

  return (
    <BrowserRouter>
      <ConfigProvider locale={zhCN}>
        <Switch>
          <Route path={'/'} exact={true}>
            {bot !== null ? <App bot={bot} /> : <Redirect to={'/login'} />}
          </Route>
          <Route path={'/login'} exact={true}>
            {bot === null ? <LoginView /> : <Redirect to={'/'} />}
          </Route>
        </Switch>
      </ConfigProvider>
    </BrowserRouter>
  )
}
