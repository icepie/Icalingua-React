import Emitter from 'component-emitter'
import { getConfig, saveConfig } from 'providers/configProvider'
import { logger, newLogProps } from 'utils/logger'
import { Bridge } from './bridgeProvider'

const ui = new Emitter()
const account = new Emitter()
const rooms = new Emitter()
const messages = new Emitter()

export const events = {
  ui,
  account,
  rooms,
  messages,
}

// Attach Events
account.on('loginSuccess', (bot: Bridge) => {
  logger.success(newLogProps(`用户 ${bot.onlineData?.nickname}(${bot.onlineData?.user_id}) 登录成功`))
})

account.on('loginFailed', () => {
  saveConfig({ ...getConfig(), privateKey: '' }) // 防止反复重定向
  location.href = '/login'
})
