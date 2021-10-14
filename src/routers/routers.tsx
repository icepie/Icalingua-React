import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Bridge, createBridge } from '../providers/bridgeProvider'
import { getConfig } from '../providers/configProvider'
import { account } from '../providers/eventProvider'
import App from '../views/App'
import LoginView from '../views/LoginView'

export default function Router() {
  let _bot: Bridge | undefined

  if (getConfig().server === '' || getConfig().privateKey === '') {
    return <LoginView />
  } else {
    createBridge()

    account.on('login', (bot: Bridge) => {
      _bot = bot
      return <App bot={_bot} />
    })
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact={true}>
          <LoginView />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
