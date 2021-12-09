import { sign } from 'noble-ed25519'
import { io, Socket } from 'socket.io-client'
import { Message, Room } from 'types/RoomTypes'
import { BridgeVersionInfo, OnlineData, OnlineDataBridge } from 'types/RuntimeTypes'
import { getConfig } from './configProvider'
import { events } from './eventProvider'

export let bridgeSocket: Socket

export class Bridge {
  protected _bridgeVersion: BridgeVersionInfo
  protected _onlineData?: OnlineData
  protected _rooms?: Room[]

  private bridgeEvents = {
    attachUIEvents: () => {
      bridgeSocket.on('message', (message: string) => {
        events.ui.emit('message', message)
      })

      bridgeSocket.on('messageError', (message: string) => {
        events.ui.emit('messageError', message)
      })

      bridgeSocket.on('messageSuccess', (message: string) => {
        events.ui.emit('messageSuccess', message)
      })
    },
    attachAccountEvents: () => {
      bridgeSocket.on('setOnline', () => {
        events.account.emit('setOnline')
      })

      bridgeSocket.on('setOffline', (message: string) => {
        events.account.emit('setOffline', message)
      })

      bridgeSocket.on('onlineData', async (data: OnlineDataBridge) => {
        this._onlineData = {
          online: data.online,
          nickname: data.nick,
          user_id: data.uin,
          sysInfo: data.sysInfo,
          priority: data.priority,

          // 兼容Bridge：暂时无接口
          sex: 'female',
          age: 0,
        }

        events.account.emit('updateBot', this)
      })
    },
    attachMessageEvents: () => {
      bridgeSocket.on('addMessage', ({ roomId, message }: { roomId: number; message: Message }) => {
        events.messages.emit('addMessage', roomId, message)
      })

      bridgeSocket.on('deleteMessage', (messageId: string) => {
        events.messages.emit('deleteMessage', messageId)
      })
    },
    attachRoomEvents: () => {
      bridgeSocket.on('setAllRooms', (rooms: Room[]) => {
        this._rooms = rooms.map((i) => {
          return { ...i, search: i.roomName + i.roomId }
        })
        events.rooms.emit('updateRooms', this._rooms)
      })

      bridgeSocket.on('updateRoom', (room: Room) => {
        events.rooms.emit('updateRoom', room)
      })
    },
  }

  public constructor(bridgeVersion: BridgeVersionInfo) {
    this._bridgeVersion = bridgeVersion

    this.attachSocketEvents()
  }

  public get onlineData() {
    return this._onlineData
  }

  public get rooms() {
    return this._rooms
  }

  public attachSocketEvents = () => {
    this.bridgeEvents.attachAccountEvents()
    this.bridgeEvents.attachMessageEvents()
    this.bridgeEvents.attachRoomEvents()
    this.bridgeEvents.attachUIEvents()
  }
}

export function createBridge() {
  let bridgeVersion: BridgeVersionInfo
  let bot: Bridge

  // logger.info(newLogProps('创建Bridge连接...'))

  // 连接服务器
  bridgeSocket = io(getConfig().server, { transports: ['websocket'] })
  bridgeSocket.once('connect_error', async () => {
    events.ui.emit('showError', {
      message: '登录失败',
      description: '与服务器连接失败，请检查服务器地址&协议是否填写正确',
    })

    events.account.emit('loginFailed')
  })

  // 验证身份
  bridgeSocket.on('requireAuth', async (salt: string, version: BridgeVersionInfo) => {
    bridgeVersion = version
    bridgeSocket.emit('auth', await sign(salt, getConfig().privateKey))
  })

  // 监听服务端事件
  bridgeSocket.once('authSucceed', async () => {
    bot = new Bridge(bridgeVersion)

    // TODO: 有没有更好的实现方法？
    setTimeout(() => events.account.emit('loginSuccess', bot), 500)
    // ui.emit('showSuccess', { message: '登录成功', description: `身份验证成功，服务器版本${bridgeVersion.version}` })
  })

  bridgeSocket.once('authFailed', async () => {
    events.ui.emit('showError', {
      message: '登录失败',
      description: '认证失败，请检查 privateKey 是否正确',
    })

    events.account.emit('loginFailed')
  })
}
