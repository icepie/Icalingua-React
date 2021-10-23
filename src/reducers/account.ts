import { PayloadAction } from '@reduxjs/toolkit'
import { Bridge } from '../providers/bridgeProvider'
import { Room } from '../types/RoomTypes'
import { FriendSearchable, GroupSearchable } from '../types/RuntimeTypes'
import States from '../types/States'

export function handleUpdateBot(state: States, action: PayloadAction<Bridge>) {
  state.runtime.bot = action.payload
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
