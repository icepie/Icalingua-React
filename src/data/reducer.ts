import { createReducer } from '@reduxjs/toolkit'
import { updateFriends, updateGroups, updateRooms } from '../actions/account'
import { joinRoom, updateRoom } from '../actions/ui'
import { handleUpdateFriends, handleUpdateGroups, handleUpdateRooms } from '../reducers/account'
import { handleJoinRoom, handleUpdateRoom } from '../reducers/ui'
import { FriendSearchable, GroupSearchable, Room } from '../types/RuntimeTypes'

export interface States {
  runtime: {
    friends: FriendSearchable[]
    groups: GroupSearchable[]
    rooms: Room[]
  }
  
  room: number
}

const initialState: States = {
  runtime: {
    friends: [],
    groups: [],
    rooms: [],
  },
  room: 0,
}

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(updateFriends, handleUpdateFriends).
          addCase(updateGroups, handleUpdateGroups).
          addCase(updateRooms, handleUpdateRooms).
          addCase(joinRoom, handleJoinRoom).
          addCase(updateRoom, handleUpdateRoom)
})
