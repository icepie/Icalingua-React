type Config = {
  account: number,
  password: string,
  protocol: 1 | 2 | 3 | 4 | 5,
  server: string,
  privateKey: string
}

export const initLocalStorage = () => {
  let config: Config = {
    account: 0, password: '', protocol: 1, server: '', privateKey: ''
  };

  for (let conf in config) {
    if (window.localStorage.getItem(conf) === undefined) {
      // @ts-ignore
      window.localStorage.setItem(conf, config[conf]);
    }
  }

  return config;
};

let config = initLocalStorage();
export const getConfig = () => config;
export const saveConfig = (_config: Config) => {
  for (let conf in _config) {
    // @ts-ignore
    window.localStorage.setItem(conf, _config[conf]);
  }

  config = _config;
  return config;
}
