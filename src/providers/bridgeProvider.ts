import { Modal } from 'antd'
import { sign } from 'noble-ed25519'
import { io, Socket } from 'socket.io-client'
import BridgeVersionInfo from '../types/BridgeVersionInfo'
import OnlineData from '../types/OnlineData'
import { getConfig } from './configProvider'
import { account, ui } from './eventProvider'

const EXCEPTED_PROTOCOL_VERSION = '2.0.0'
let socket: Socket

export class Bridge {
  public _uin = 0
  public _nickname = 'NULL'
  public _bridgeVersion: BridgeVersionInfo
  public _connected = false
  public _onlineData?: OnlineData

  public constructor(bridgeVersion: BridgeVersionInfo, connected: boolean) {
    this._bridgeVersion = bridgeVersion
    this._connected = connected

    this.attachSocketEvents()
  }

  public get connected() {
    return this._connected
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

  public attachSocketEvents = () => {
    socket.on('onlineData', async (data: OnlineData) => {
      this._uin = data.uin
      this._nickname = data.nick
      this._onlineData = data

      account.emit('updateBot', this)
    })
  }
}

export function createBridge() {
  let bridgeVersion: BridgeVersionInfo
  let bot: Bridge

  // 连接服务器
  socket = io(getConfig().server, { transports: ['websocket'] })
  socket.once('connect_error', async () => {
    account.emit('loginFailed', { message: '登录失败', description: '与服务器连接失败，请检查服务器地址&协议是否填写正确' })
  })

  // 验证身份
  socket.on('requireAuth', async (salt: string, version: BridgeVersionInfo) => {
    bridgeVersion = version
    let isConfirm = true

    if (version.protocolVersion !== EXCEPTED_PROTOCOL_VERSION) {
      Modal.confirm({
        title: '是否继续？',
        content: `当前版本的 Icalingua 要求 Bridge 的协议版本为 ${EXCEPTED_PROTOCOL_VERSION}，而服务器的协议版本为 ${version.protocolVersion}`,
        onCancel: () => {
          isConfirm = false
        },
      })
    }

    if (isConfirm) {
      socket.emit('auth', await sign(salt, getConfig().privateKey))
    }
  })

  // 监听服务端事件
  socket.once('authSucceed', async () => {
    bot = new Bridge(bridgeVersion, true)

    account.emit('loginSuccess', bot)
    ui.emit('showSuccess', { message: '登录成功', description: `身份验证成功，服务器版本${bridgeVersion.version}` })
  })

  socket.once('authFailed', async () => {
    account.emit('loginFailed')
    ui.emit('showError', { message: '登录失败', description: '认证失败' })
  })
}
