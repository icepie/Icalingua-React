import { createAction } from '@reduxjs/toolkit'
import { FriendSearchable, GroupSearchable, Room } from '../types/RuntimeTypes'

export const updateFriends = createAction<FriendSearchable[]>('friends/update')
export const updateGroups = createAction<GroupSearchable[]>('groups/update')
export const updateRooms = createAction<Room[]>('rooms/update')
