export interface LastMessage {
  content?: string
  timestamp?: string
  username?: string
}

export interface Room {
  roomId: number
  roomName: string
  avatar: string
  index: number
  unreadCount: number
  utime: number // UpdateTime
  at?: boolean | 'all'
  lastMessage: LastMessage
  search: string
}

export interface MessageFile {
  type: string
  url: string
  size?: number
  name?: string
  fid?: string
}

export interface Message {
  _id: string | number
  senderId?: number
  username: string
  content: string
  code?: string
  timestamp?: string
  date?: string
  role?: string
  file?: MessageFile
  time?: number
  replyMessage?: Message
  at?: boolean | 'all'
  deleted?: boolean
  system?: boolean
  reveal?: boolean
  flash?: boolean
  title?: string
}

export interface AtCacheItem {
  text: string
  id: number | 'all'
}

export interface SendMessageParams {
  content: string
  roomId?: number
  file?: {
    type: string
    path: string
    size: number
  }
  replyMessage?: any
  room?: Room
  b64img?: string
  imgpath?: string
  // at: AtCacheItem[]
  sticker?: boolean
}
