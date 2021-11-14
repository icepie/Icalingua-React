import { notification } from 'antd'
import { ArgsProps } from 'antd/lib/notification'
import Emitter from 'component-emitter'
import { logger, newLogProps } from '../utils/logger'
import { Bridge } from './bridgeProvider'

export let ui = new Emitter
export let account = new Emitter
// export let rooms = new Emitter
export let messages = new Emitter

// Attach Events
account.on('loginSuccess', (bot: Bridge) => {
  // console.log(bot)
  logger.success(newLogProps(`用户 ${bot.nickname}(${bot.uin}) 登录成功`))
})

account.on('loginFailed', () => {
  location.href = '/login'
})

// Logger
ui.on('showMessage', (args: ArgsProps) => {
  notification.info({ ...args })
})

ui.on('showSuccess', (args: ArgsProps) => {
  notification.success({ ...args })
})

ui.on('showWarning', (args: ArgsProps) => {
  notification.warn({ ...args })
  logger.warning({ ...args })
})

ui.on('showError', (args: ArgsProps) => {
  notification.error({ ...args })
  logger.error({ ...args })
})

