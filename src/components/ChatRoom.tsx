import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { putMessages } from '../actions/room'
import { getMessages } from '../adapters/room'
import { Message, Room } from '../types/RoomTypes'
import styles from './AppContainer.module.scss'
import ChatBubble from './ChatRoom/ChatBubble'
import { MessagesLoading } from './Loading'

export default function ChatRoom({ room }: { room: Room }) {
  const dispatch = useDispatch()
  const [messages, setMessages] = useState<Message[] | undefined>()
  
  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await getMessages(room.roomId as number)
      dispatch(putMessages(messages))
      setMessages(messages)
    }
    
    fetchMessages()
  })
  
  return (
    <div className={styles.chatContainer}>
      {messages ? messages.map((i: Message) => {
        return <ChatBubble key={i._id} message={i} />
      }) : <MessagesLoading />}
    </div>
  )
}
