import { notification } from 'antd'
import { ArgsProps } from 'antd/lib/notification'
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
ui.on('showMessage', (args: ArgsProps) => {
  notification.info({ ...args })
  console.info(`Info: [${args.message}] ${args.description}`)
})

ui.on('showSuccess', (args: ArgsProps) => {
  notification.success({ ...args })
  console.info(`Success: [${args.message}] ${args.description}`)
})

ui.on('showWarning', (args: ArgsProps) => {
  notification.warn({ ...args })
  console.warn(`Warning: [${args.message}] ${args.description}`)
})

ui.on('showError', (args: ArgsProps) => {
  notification.error({ ...args })
  console.error(`Error: [${args.message}] ${args.description}`)
})
