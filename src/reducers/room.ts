import { PayloadAction } from '@reduxjs/toolkit'
import { Message } from '../types/RuntimeTypes'
import States from '../types/States'

export function handleAddMessage(state: States, action: PayloadAction<Message>) {
  state.currentRoom.messages?.push(action.payload)
}
