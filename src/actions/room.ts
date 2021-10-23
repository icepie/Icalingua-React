import { createAction } from '@reduxjs/toolkit'
import { Message } from '../types/RoomTypes'

export const putMessages = createAction<Message[]>('room/putMessages')
export const addMessage = createAction<Message>('room/addMessage')
