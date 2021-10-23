import { createReducer } from '@reduxjs/toolkit'
import { handleUpdateFriends, handleUpdateGroups, handleUpdateRooms } from '../reducers/account'
import { handleAddMessage, handlePutMessages } from '../reducers/room'
import { handleJoinRoom, handleUpdateRoom } from '../reducers/ui'
import States from '../types/States'

const initialState: States = { runtime: {}, currentRoom: {} }

export const reducer = createReducer(initialState, {
  'friends/update': handleUpdateFriends,
  'groups/update': handleUpdateGroups,
  'rooms/update': handleUpdateRooms,
  'room/join': handleJoinRoom,
  'room/update': handleUpdateRoom,
  'room/putMessages': handlePutMessages,
  'room/addMessage': handleAddMessage,
})
