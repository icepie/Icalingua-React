import { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { putMessages } from '../actions/room'
import { getMessages } from '../adapters/room'
import { Message, Room } from '../types/RoomTypes'
import States from '../types/States'

const AMessage = ({ message }: { message: Message }) => (
  <div>
    {message.content}
  </div>
)

const ChatRoom = ({ room }: { room?: Room }) => {
  const dispatch = useDispatch()
  const [messages, setMessages] = useState<Message[]>()
  
  useEffect(() => {
    const fetchMessages = async () => {
      setMessages(await getMessages(room?.roomId as number))
      dispatch(putMessages(messages as Message[]))
    }
    
    fetchMessages()
  }, [])
  
  return (
    <div>
      {messages ? messages.map((i) => {
        return <AMessage key={i._id} message={i} />
      }) : 'Icalingua'}
    </div>
  )
}

const mapRoomStateToProps = (state: States) => ({
  room: state.currentRoom.room,
})

export default connect(mapRoomStateToProps)(ChatRoom)
