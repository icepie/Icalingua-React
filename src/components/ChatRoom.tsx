import { useEffect, useState } from 'react'
import { useDispatch, useStore } from 'react-redux'
import { putMessages } from '../actions/room'
import { getMessages } from '../adapters/room'
import { Message, Room } from '../types/RoomTypes'
import { MessagesLoading } from './Loading'

const AMessage = ({ message }: { message: Message }) => (
  <div>
    <span>
      {message.username} | {message.date} {message.timestamp}
    </span>
    <p>
      {message.content}
    </p>
  </div>
)

export default function ChatRoom({ room }: { room: Room }) {
  const dispatch = useDispatch()
  const store = useStore()
  const [messages, setMessages] = useState<Message[] | undefined>()
  
  useEffect(() => {
    const fetchMessages = async () => {
      dispatch(putMessages(await getMessages(room.roomId as number)))
      setMessages(store.getState().currentRoom.messages)
    }
    
    fetchMessages()
  })
  
  return (
    <div>
      {messages ? messages.map((i) => {
        return <AMessage key={i._id} message={i} />
      }) : <MessagesLoading />}
    </div>
  )
}
