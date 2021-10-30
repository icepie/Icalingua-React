import { sign } from 'noble-ed25519'
import { io, Socket } from 'socket.io-client'
import { Room } from '../types/RoomTypes'
import { BridgeVersionInfo, OnlineData } from '../types/RuntimeTypes'
import { getConfig } from './configProvider'
import { account, ui } from './eventProvider'

export let bridgeSocket: Socket

export class Bridge {
  private _uin = 0
  private _nickname = 'NULL'
  private _bridgeVersion: BridgeVersionInfo
  private _onlineData?: OnlineData
  private _rooms?: Room[]

  public constructor(bridgeVersion: BridgeVersionInfo) {
    this._bridgeVersion = bridgeVersion

    this.attachSocketEvents()
  }

  public get onlineData() {
    return this._onlineData
  }

  public get uin() {
    return this._uin
  }

  public set uin(uin: number) {
    this._uin = uin
  }

  public get nickname() {
    return this._nickname
  }

  public set nickname(nickname: string) {
    this._nickname = nickname
  }

  public get rooms() {
    return this._rooms
  }

  public attachSocketEvents = () => {
    bridgeSocket.on('onlineData', async (data: OnlineData) => {
      this._uin = data.uin
      this._nickname = data.nick
      this._onlineData = data

      account.emit('updateBot', this)
    })

    bridgeSocket.on('setAllRooms', (rooms: Room[]) => {
      this._rooms = rooms
      ui.emit('updateRooms', this._rooms)
    })
  }
}

export function createBridge() {
  let bridgeVersion: BridgeVersionInfo
  let bot: Bridge

  // 连接服务器
  bridgeSocket = io(getConfig().server, { transports: ['websocket'] })
  bridgeSocket.once('connect_error', async () => {
    account.emit('loginFailed', { message: '登录失败', description: '与服务器连接失败，请检查服务器地址&协议是否填写正确' })
  })

  // 验证身份
  bridgeSocket.on('requireAuth', async (salt: string, version: BridgeVersionInfo) => {
    bridgeVersion = version
    bridgeSocket.emit('auth', await sign(salt, getConfig().privateKey))
  })

  // 监听服务端事件
  bridgeSocket.once('authSucceed', async () => {
    bot = new Bridge(bridgeVersion)

    setTimeout(() => account.emit('loginSuccess', bot), 500)
    // ui.emit('showSuccess', { message: '登录成功', description: `身份验证成功，服务器版本${bridgeVersion.version}` })
  })

  bridgeSocket.once('authFailed', async () => {
    account.emit('loginFailed')
    ui.emit('showError', { message: '登录失败', description: '认证失败' })
  })
}
