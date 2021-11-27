import { Config } from 'types/RuntimeTypes'

export const initLocalStorage = () => {
  let config: Config = {
    server: '',
    privateKey: '',
  }

  for (let conf in config) {
    if (window.localStorage.getItem(conf) === null) {
      // @ts-ignore
      window.localStorage.setItem(conf, config[conf])
    } else {
      // @ts-ignore
      config[conf] = window.localStorage.getItem(conf)
    }
  }

  return config
}

let config = initLocalStorage()
export const getConfig = () => config
export const saveConfig = (_config: Config) => {
  // eslint-disable-next-line guard-for-in
  for (let conf in _config) {
    // @ts-ignore
    window.localStorage.setItem(conf, _config[conf])

    // @ts-ignore
    config[conf] = window.localStorage.getItem(conf)
  }

  return config
}
