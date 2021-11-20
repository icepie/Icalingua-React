import { createAction } from '@reduxjs/toolkit'
import { Room } from '../../types/RoomTypes'
import { FriendSearchable, GroupSearchable, OnlineData } from '../../types/RuntimeTypes'

export const updateOnlineData = createAction<OnlineData>('onlineData/update')
export const updateFriends = createAction<FriendSearchable[]>('friends/update')
export const updateGroups = createAction<GroupSearchable[]>('groups/update')
export const updateRooms = createAction<Room[]>('rooms/update')
export const updateRoomsSingle = createAction<Room>('rooms/updateSingle')
