import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Room } from 'types/RoomTypes'
import { FriendSearchable, GroupSearchable, OnlineData } from 'types/RuntimeTypes'

export interface AccountState {
  onlineData: OnlineData
  friends?: FriendSearchable[]
  groups?: GroupSearchable[]
  rooms?: Room[]
}

const initialState: AccountState = {
  onlineData: {
    online: false,
    nickname: '',
    user_id: 0,
    sex: 'female',
    age: 0,
  },
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    updateOnlineData: (state, action: PayloadAction<OnlineData>) => {
      state.onlineData = action.payload
    },

    updateFriends: (state, action: PayloadAction<FriendSearchable[]>) => {
      state.friends = action.payload
    },

    updateGroups: (state, action: PayloadAction<GroupSearchable[]>) => {
      state.groups = action.payload
    },

    updateRooms: (state, action: PayloadAction<Room[]>) => {
      state.rooms = action.payload
    },

    updateRoomsSingle: (state, action: PayloadAction<Room>) => {
      const rooms = state.rooms
      const index = rooms?.findIndex((room: Room) => room.roomId === action.payload.roomId)
      if (index !== undefined && state.rooms) {
        state.rooms.splice(index, 1)
        state.rooms.splice(0, 0, action.payload)
      }
    },
  },
})

export const { updateRooms, updateRoomsSingle, updateFriends, updateGroups, updateOnlineData } = accountSlice.actions

export default accountSlice.reducer
