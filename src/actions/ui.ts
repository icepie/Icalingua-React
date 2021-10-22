import { createAction } from '@reduxjs/toolkit'
import { Room } from '../types/RuntimeTypes'

export const joinRoom = createAction<Room>('room/join')
export const updateRoom = createAction<Room>('room/update')
