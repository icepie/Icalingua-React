import { createReducer } from '@reduxjs/toolkit'
import FriendSearchable from '../types/FriendSearchable'
import GroupSearchable from '../types/GroupSearchable'
import Room from '../types/Room'
import { updateFriends, updateGroups, updateRooms } from '../actions/account'

export interface States {
  friends: FriendSearchable[]
  groups: GroupSearchable[]
  rooms: Room[]
}

const initialState:States = {
  friends: [],
  groups: [],
  rooms: []
}

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(updateFriends, (state, action) => {
    state.friends = action.payload
  }).addCase(updateGroups, (state, action) => {
    state.groups = action.payload
  }).addCase(updateRooms, (state, action) => {
    state.rooms = action.payload
  })
})
