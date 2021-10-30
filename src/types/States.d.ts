import { Message, Room } from './RoomTypes'
import { FriendSearchable, GroupSearchable, OnlineData } from './RuntimeTypes'

export default interface States {
  runtime: {
    friends?: FriendSearchable[]
    groups?: GroupSearchable[]
    rooms?: Room[]
  }
  
  onlineData?: OnlineData
  
  currentRoom: {
    room?: Room
    messages?: Message[]
  }
}
