import { createAction } from '@reduxjs/toolkit'
import FriendSearchable from '../types/FriendSearchable'
import GroupSearchable from '../types/GroupSearchable'
import Room from '../types/Room'

export const updateFriends = createAction<FriendSearchable[]>('friends/update')
export const updateGroups = createAction<GroupSearchable[]>('groups/update')
export const updateRooms = createAction<Room[]>('rooms/update')
