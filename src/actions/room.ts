import { createAction } from '@reduxjs/toolkit'
import { Message } from '../types/RuntimeTypes'

export const addMessage = createAction<Message>('room/addMessage')
