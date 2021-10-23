import { Bridge } from '../providers/bridgeProvider'
import { Message, Room } from './RoomTypes'
import { FriendSearchable, GroupSearchable } from './RuntimeTypes'

export default interface States {
  runtime: {
    bot?: Bridge
    friends?: FriendSearchable[]
    groups?: GroupSearchable[]
    rooms?: Room[]
  }
  
  currentRoom: {
    room?: Room
    messages?: Message[]
  }
}
