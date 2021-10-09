// TODO: Redux
import { Bridge } from './bridgeProvider'

interface Data {
  bot: Bridge | undefined
}

export const setBot = (_bot: Bridge) => {
  const { ...object } = _bot
  window.localStorage.setItem('bot', JSON.stringify(object))
}

export const getBot = () => {
  const bot = window.localStorage.getItem('bot')
  if (bot === null) return null
  // @ts-ignore
  return JSON.parse(window.localStorage.getItem('bot'))
}
