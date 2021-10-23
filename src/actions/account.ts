import { createAction } from '@reduxjs/toolkit'
import { Bridge } from '../providers/bridgeProvider'
import { Room } from '../types/RoomTypes'
import { FriendSearchable, GroupSearchable } from '../types/RuntimeTypes'

export const updateBot = createAction<Bridge>('bot/update')
export const updateFriends = createAction<FriendSearchable[]>('friends/update')
export const updateGroups = createAction<GroupSearchable[]>('groups/update')
export const updateRooms = createAction<Room[]>('rooms/update')
