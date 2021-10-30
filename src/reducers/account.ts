import { PayloadAction } from '@reduxjs/toolkit'
import { Room } from '../types/RoomTypes'
import { FriendSearchable, GroupSearchable, OnlineData } from '../types/RuntimeTypes'
import States from '../types/States'

export function handleUpdateOnlineData(state: States, action: PayloadAction<OnlineData>) {
  state.onlineData = action.payload
}

export function handleUpdateFriends(state: States, action: PayloadAction<FriendSearchable[]>) {
  state.runtime.friends = action.payload
}

export function handleUpdateGroups(state: States, action: PayloadAction<GroupSearchable[]>) {
  state.runtime.groups = action.payload
}

export function handleUpdateRooms(state: States, action: PayloadAction<Room[]>) {
  state.runtime.rooms = action.payload
}
