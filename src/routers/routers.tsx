import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { getConfig } from '../providers/configProvider'
import LoginView from '../views/LoginView'
import App from '../views/App'

export default function Router() {
  let requireLogin = getConfig().server === '' || getConfig().privateKey === ''

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true}>
          {requireLogin ? <Redirect to="/login" /> : <App />}
        </Route>
        <Route path="/login" exact={true}>
          {requireLogin ? <LoginView /> : <App />}
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
