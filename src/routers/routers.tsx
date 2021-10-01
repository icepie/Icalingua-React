import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import App from '../App';
import { LoginView } from '../views/LoginView';


export default function Router() {
  let fakeLogin = false;
  return (
    <HashRouter>
      <ConfigProvider locale={zhCN}>
        <Switch>
          <Route path={'/'} exact={true}>
            {fakeLogin ? <App /> : <Redirect to={'/login'} />}
          </Route>
          <Route path={'/login'} exact={true}>
            {fakeLogin ? <Redirect to={'/'} /> : <LoginView />}
          </Route>
        </Switch>
      </ConfigProvider>
    </HashRouter>
  );
}

