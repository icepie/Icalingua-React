import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Message } from 'types/RoomTypes'

export interface RoomState {
  messages: Message[]
}

const initialState: RoomState = { messages: [] }

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    putMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload
    },

    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages?.push(action.payload)
    },
  },
})

export const { putMessages, addMessage } = roomSlice.actions

export default roomSlice.reducer
