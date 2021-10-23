import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { getConfig } from './providers/configProvider'
import App from './views/App'
import Login from './views/Login'

export default function Router() {
  let requireLogin = getConfig().server === '' || getConfig().privateKey === ''

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true}>
          {requireLogin ? <Redirect to="/login" /> : <App />}
        </Route>
        <Route path="/login" exact={true}>
          {requireLogin ? <Login /> : <App />}
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
