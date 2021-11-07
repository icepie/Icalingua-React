import { createReducer } from '@reduxjs/toolkit'
import { handleUpdateFriends, handleUpdateGroups, handleUpdateOnlineData, handleUpdateRooms } from '../reducers/account'
import { handleAddMessage, handlePutMessages } from '../reducers/room'
import { handleJoinRoom, handleUpdateRoom } from '../reducers/ui'
import InitialStates from '../types/States'

// TODO: 拆分OnlineData为user
const initialState: InitialStates = { runtime: {}, currentRoom: {} }

export const reducer = createReducer(initialState, {
  'onlineData/update': handleUpdateOnlineData,
  'friends/update': handleUpdateFriends,
  'groups/update': handleUpdateGroups,
  'rooms/update': handleUpdateRooms,
  'room/join': handleJoinRoom,
  'room/update': handleUpdateRoom,
  'room/putMessages': handlePutMessages,
  'room/addMessage': handleAddMessage,
})
