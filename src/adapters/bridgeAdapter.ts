import { bridgeSocket } from '../providers/bridgeProvider'
import BridgeAdapter from '../types/BridgeAdapter'

export const bridgeAdapter: BridgeAdapter = {
  // TODO: Adapter 拆分到几个文件中去
  getFriends() {
    return new Promise(resolve => bridgeSocket.emit('getFriendsFallback', resolve))
  },
  getGroups() {
    return new Promise(resolve => bridgeSocket.emit('getGroups', resolve))
  },
}
