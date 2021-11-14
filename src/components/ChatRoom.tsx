import { message } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { putMessages } from '../actions/room'
import { getMessages } from '../adapters/room'
import { Message, Room } from '../types/RoomTypes'
import styles from './AppContainer.module.scss'
import ChatBubble from './ChatRoom/ChatBubble'

export default function ChatRoom({ room }: { room: Room }) {
  const dispatch = useDispatch()
  const [messages, setMessages] = useState<Message[] | undefined>()
  
  const attachEvents = () => {
  
  }
  
  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await getMessages(room.roomId as number)
      dispatch(putMessages(messages))
      setMessages(messages)
    }
    
    message.loading({ content: '正在加载聊天记录...', key: 'chat_message' })
    fetchMessages().then(() => message.destroy('chat_message'))
    attachEvents()
  }, [room.roomId])
  
  return (
    <div className={styles.chatContainer}>
      {messages?.map((i: Message) => {
        return <ChatBubble key={i._id} message={i} />
      })}
    </div>
  )
}
