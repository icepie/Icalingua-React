import {Client, createClient} from 'oicq'
import {config} from './configProvider'
import sleep from '../utils/sleep'

// @ts-ignore
export const bot = global.bot || createClient(config.host.account, {
    platform: config.host.protocol,
})

// @ts-ignore
if (process.env.NODE_ENV !== "production") global.bot = bot

if (!bot.isOnline())
    bot.login(config.host.password)

export const ensureOnline = async () => {
    let count = 0
    while (!bot.isOnline()) {
        count++
        if (count > 300) return false
        await sleep(10)
    }
    return true
}
