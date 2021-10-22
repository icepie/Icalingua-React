import { FriendInfo, GroupInfo, MessageElem } from 'oicq'

export interface Config {
  server: string
  privateKey: string
}

export interface BridgeVersionInfo {
  version: string
  protocolVersion: string
}

export interface OnlineData {
  online: boolean
  nick: string
  uin: number
  priority?: 1 | 2 | 3 | 4 | 5
  sysInfo?: string
}

export interface FriendSearchable extends FriendInfo {
  sc: string // 好友检索信息，包括昵称、备注、号码
}

export interface GroupSearchable extends GroupInfo {
  sc: string // 群组检索信息，包括名称、号码
}

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
}

export type Message = MessageElem

