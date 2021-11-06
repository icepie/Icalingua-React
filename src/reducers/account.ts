import { PayloadAction } from '@reduxjs/toolkit'
import { Room } from '../types/RoomTypes'
import { FriendSearchable, GroupSearchable, OnlineData } from '../types/RuntimeTypes'
import InitialStates from '../types/States'

export function handleUpdateOnlineData(state: InitialStates, action: PayloadAction<OnlineData>) {
  state.onlineData = action.payload
}

export function handleUpdateFriends(state: InitialStates, action: PayloadAction<FriendSearchable[]>) {
  state.runtime.friends = action.payload
}

export function handleUpdateGroups(state: InitialStates, action: PayloadAction<GroupSearchable[]>) {
  state.runtime.groups = action.payload
}

export function handleUpdateRooms(state: InitialStates, action: PayloadAction<Room[]>) {
  state.runtime.rooms = action.payload
}
