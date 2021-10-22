import { States } from '../data/reducer'

export function handleUpdateFriends(state: States, action: any) {
  state.runtime.friends = action.payload
}

export function handleUpdateGroups(state: States, action: any) {
  state.runtime.groups = action.payload
}

export function handleUpdateRooms(state: States, action: any) {
  state.runtime.rooms = action.payload
}
