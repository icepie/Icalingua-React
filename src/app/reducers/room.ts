import { PayloadAction } from '@reduxjs/toolkit'
import { Message } from '../../types/RoomTypes'
import InitialStates from '../../types/States'

export function handlePutMessages(state: InitialStates, action: PayloadAction<Message[]>) {
  state.currentRoom.messages = action.payload
}

export function handleAddMessage(state: InitialStates, action: PayloadAction<Message>) {
  state.currentRoom.messages?.push(action.payload)
}
