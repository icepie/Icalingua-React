import { notification } from 'antd'
import { ArgsProps } from 'antd/lib/notification'
import Emitter from 'component-emitter'
import Room from '../types/Room'
import { logger, newLogProps } from '../utils/logger'
import { Bridge } from './bridgeProvider'

export let account = new Emitter
export let ui = new Emitter

// Attach Events
account.on('loginSuccess', (bot: Bridge) => {
  // console.log(bot)
  logger.success(newLogProps(`用户 ${bot.nickname}(${bot.uin}) 登录成功`))
})

account.on('loginFailed', () => {
  location.href = '/login'
})

account.on('updateBot', (bot: Bridge) => {
  // console.log(bot)
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

// UI
ui.on('updateRooms', (rooms: Room[]) => {
  console.log(rooms)
})
