type CookiesDomain = 'tenpay.com' | 'docs.qq.com' | 'office.qq.com' | 'connect.qq.com' |
  'vip.qq.com' | 'mail.qq.com' | 'qzone.qq.com' | 'gamecenter.qq.com' |
  'mma.qq.com' | 'game.qq.com' | 'qqweb.qq.com' | 'openmobile.qq.com' |
  'qun.qq.com' | 'ti.qq.com'

export default interface Provider {
  createBot(): any;

  isLogin(): boolean;
}