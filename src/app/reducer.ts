import { createReducer } from '@reduxjs/toolkit'
import InitialStates from '../types/States'
import {
  handleUpdateFriends,
  handleUpdateGroups,
  handleUpdateOnlineData,
  handleUpdateRooms,
  handleUpdateRoomsSingle,
} from './reducers/account'
import { handleAddMessage, handlePutMessages } from './reducers/room'
import { handleJoinRoom, handleUpdateRoom } from './reducers/ui'

const initialState: InitialStates = { runtime: {}, currentRoom: {} }

// TODO: 拆分OnlineData为user
export const reducer = createReducer(initialState, {
  'onlineData/update': handleUpdateOnlineData,
  'friends/update': handleUpdateFriends,
  'groups/update': handleUpdateGroups,
  'rooms/update': handleUpdateRooms,
  'rooms/updateSingle': handleUpdateRoomsSingle,
  'room/join': handleJoinRoom,
  'room/update': handleUpdateRoom,
  'room/putMessages': handlePutMessages,
  'room/addMessage': handleAddMessage,
})
