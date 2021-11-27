import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Room } from 'types/RoomTypes'

export interface UIState {
  room: Room | null
}

const initialState: UIState = { room: null }

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    joinRoom: (state, action: PayloadAction<Room | null>) => {
      state.room = action.payload
    },

    updateRoom: (state, action: PayloadAction<Room>) => {
      state.room = action.payload
    },
  },
})

export const { joinRoom, updateRoom } = uiSlice.actions

export default uiSlice.reducer
