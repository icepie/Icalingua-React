// Account adapter
import { bridgeSocket } from '../providers/bridgeProvider'
import { Room } from '../types/RoomTypes'
import { FriendSearchable, GroupSearchable } from '../types/RuntimeTypes'

const getFriends = async (): Promise<FriendSearchable[]> => {
  return new Promise((resolve) => bridgeSocket.emit('getFriendsFallback', resolve))
}

const getGroups = async (): Promise<GroupSearchable[]> => {
  return new Promise((resolve) => bridgeSocket.emit('getGroups', resolve))
}

const getRoom = async (roomId: number): Promise<Room> => {
  return new Promise((resolve) => bridgeSocket.emit('getRoom', roomId, resolve))
}

export { getFriends, getGroups, getRoom }
