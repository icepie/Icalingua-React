import { PayloadAction } from '@reduxjs/toolkit'
import { Message } from '../types/RoomTypes'
import States from '../types/States'

export function handlePutMessages(state: States, action: PayloadAction<Message[]>) {
  state.currentRoom.messages = action.payload
}

export function handleAddMessage(state: States, action: PayloadAction<Message>) {
  state.currentRoom.messages?.push(action.payload)
}
