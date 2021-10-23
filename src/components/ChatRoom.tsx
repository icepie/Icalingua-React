import { connect, useStore } from 'react-redux'
import { Message } from '../types/RuntimeTypes'
import States from '../types/States'

const AMessage = (message: Message) => (
  <div>
    {message.content}
  </div>
)

const Room = () => {
  const store = useStore()
  let state: States = store.getState()
  
  return (
    <div>
      qwq
      {state.currentRoom.room?.roomId}
    </div>
  )
}

const mapRoomStateToProps = (state: States) => ({
  room: state.currentRoom,
})

export const ChatRoom = connect(mapRoomStateToProps)(Room)

