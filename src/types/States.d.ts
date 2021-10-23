import { FriendSearchable, GroupSearchable, Message, Room } from './RuntimeTypes'

export default interface States {
  runtime: {
    friends?: FriendSearchable[]
    groups?: GroupSearchable[]
    rooms?: Room[]
  }
  
  currentRoom: {
    room?: Room
    messages?: Message[]
  }
}
