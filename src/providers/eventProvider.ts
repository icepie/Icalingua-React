import Emitter from 'component-emitter'
import { Bridge } from './bridgeProvider'

export let account = new Emitter

// Attach Events
account.on('login', (bot: Bridge) => {
  console.log(bot)
})
