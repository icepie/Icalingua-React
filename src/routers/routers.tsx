import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import App from '../App';
import { adapter } from '../adapters/socketIoAdapter';
import { LoginView } from '../views/LoginView';

export default function Router() {
  return (
    <HashRouter>
      <ConfigProvider locale={zhCN}>
        <Switch>
          <Route path={'/'} exact={true}>
            {adapter.isLogin() ? <App /> : <Redirect to={'/login'} />}
          </Route>
          <Route path={'/login'} exact={true}>
            {adapter.isLogin() ? <Redirect to={'/'} /> : <LoginView />}
          </Route>
        </Switch>
      </ConfigProvider>
    </HashRouter>
  );
}

