import { PayloadAction } from '@reduxjs/toolkit'
import { Room } from '../../types/RoomTypes'
import InitialStates from '../../types/States'

export function handleJoinRoom(state: InitialStates, action: PayloadAction<Room>) {
  state.currentRoom.room = action.payload
}

export function handleUpdateRoom(state: InitialStates, action: PayloadAction<Room>) {
  state.currentRoom.room = action.payload
}
