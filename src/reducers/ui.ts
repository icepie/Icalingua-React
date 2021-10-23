import { PayloadAction } from '@reduxjs/toolkit'
import { Room } from '../types/RuntimeTypes'
import States from '../types/States'

export function handleJoinRoom(state: States, action: PayloadAction<Room>) {
  state.currentRoom.room = action.payload
}

export function handleUpdateRoom(state: States, action: PayloadAction<Room>) {
  state.currentRoom.room = action.payload
}
