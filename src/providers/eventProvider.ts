import { notification } from 'antd'
import Emitter from 'component-emitter'
import { useHistory } from 'react-router'
import { Bridge } from './bridgeProvider'

export let account = new Emitter
export let ui = new Emitter

// Attach Events
account.on('loginSuccess', (bot: Bridge) => {
  console.log(bot)
})

account.on('loginFailed', () => {
  const history = useHistory()
  history.push('/login')
})

account.on('updateBot', (bot: Bridge) => {
  console.log(bot)
})

// UI && Logger
ui.on('showMessage', (message: String, description?: String) => {
  notification.info({ message: message, description: description })
  console.info(`${message} ${description}`)
})

ui.on('showSuccess', (message: String, description?: String) => {
  notification.success({ message: message, description: description })
  console.info(`${message} ${description}`)
})

ui.on('showWarning', (message: String, description?: String) => {
  notification.warn({ message: message, description: description })
  console.warn(`${message} ${description}`)
})

ui.on('showError', (message: String, description?: String) => {
  notification.error({ message: message, description: description })
  console.error(`${message} ${description}`)
})
