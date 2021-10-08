import { Modal, notification } from 'antd'
import { sign } from 'noble-ed25519'
import { io, Socket } from 'socket.io-client'
import { oicqAdapter } from '../adapters/oicqAdapter'
import BridgeVersionInfo from '../types/BridgeVersionInfo'
import OicqAdapter from '../types/OicqAdapter'
import OnlineData from '../types/OnlineData'
import { getConfig } from './configProvider'

const EXCEPTED_PROTOCOL_VERSION = '2.0.0'

export class Provider {
  uin: number = 0
  nickname: string = 'NULL'
  socket: Socket
  bridgeVersion: BridgeVersionInfo
  onlineData?: OnlineData
  connected: boolean = false
  adapter: OicqAdapter = oicqAdapter

  constructor(socket: Socket, bridgeVersion: BridgeVersionInfo, connected: boolean) {
    this.socket = socket
    this.bridgeVersion = bridgeVersion
    this.connected = connected

    this.attachSocketEvents()
  }

  isConnected = () => this.connected

  getOnlineData = () => this.onlineData

  attachSocketEvents = () => {
    this.socket.on('onlineData', async (data: OnlineData) => {
      this.uin = data.uin
      this.nickname = data.nick
      this.onlineData = data

      console.log(this.onlineData)
    })
  }
}

export function createProvider() {
  let socket: Socket
  let bridgeVersion: BridgeVersionInfo
  let connected: boolean = false
  let provider

  // 连接服务器
  socket = io(getConfig().server, { transports: ['websocket'] })
  socket.once('connect_error', async () => {
    notification.error({ message: '与服务器连接失败', description: '请检查服务器地址&协议是否填写正确' })
  })

  // 验证身份
  socket.on('requireAuth', async (salt: string, version: BridgeVersionInfo) => {
    bridgeVersion = version
    let isConfirm = true

    if (version.protocolVersion !== EXCEPTED_PROTOCOL_VERSION) {
      Modal.confirm({
        title: '提示',
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
    connected = true
    notification.success({ message: '登录成功', description: `身份验证成功，服务器版本${bridgeVersion.version}` })
  })

  socket.once('authFailed', async () => {
    notification.error({ message: '错误', description: '认证失败' })
  })

  if (connected) {
    // @ts-ignore
    provider = new Provider(socket, bridgeVersion, connected)
    return provider
  } else {
    return false
  }
}
