import { createAction } from '@reduxjs/toolkit'
import { Room } from '../../types/RoomTypes'

export const joinRoom = createAction<Room | undefined>('room/join')
export const updateRoom = createAction<Room>('room/update')
