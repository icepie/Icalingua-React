import { States } from '../data/reducer'

export function handleJoinRoom(state: States, action: any) {
  state.room = action.payload
}

export function handleUpdateRoom(state: States, action: any) {
  state.room = action.payload
}
