// Account adapter
import { bridgeSocket } from '../providers/bridgeProvider'
import FriendSearchable from '../types/FriendSearchable'
import GroupSearchable from '../types/GroupSearchable'
import Room from '../types/Room'

const getFriends = async (): Promise<FriendSearchable[]> => {
  return new Promise(resolve => bridgeSocket.emit('getFriendsFallback', resolve))
}

const getGroups = async (): Promise<GroupSearchable[]> => {
  return new Promise(resolve => bridgeSocket.emit('getGroups', resolve))
}

const getRoom = async (roomId: number): Promise<Room> => {
  return new Promise(resolve => bridgeSocket.emit('getRoom', roomId, resolve))
}

export { getFriends, getGroups, getRoom }
