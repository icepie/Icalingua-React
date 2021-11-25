import { message } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getMessages } from '../adapters/room'
import { putMessages } from '../app/actions/room'
import { events } from '../providers/eventProvider'
import { Message, Room } from '../types/RoomTypes'
import styles from './ChatRoom.module.scss'
import ChatBubble from './ChatRoom/ChatBubble'
import ChatInput from './ChatRoom/ChatInput'

export default function ChatRoom({ room }: { room: Room }) {
  const dispatch = useDispatch()
  const [messages, setMessages] = useState<Message[] | undefined>()
  const bottomElem = useRef<HTMLDivElement>(null)

  const scrollToButton = () => {
    bottomElem.current?.scrollIntoView({ behavior: 'auto' })
  }

  const attachEvents = () => {
    events.messages.on('addMessage', (roomId: number, message: Message) => {
      if (roomId === room.roomId) {
        setMessages((messages) => [...(messages || []), message])
        scrollToButton()
      }
    })
  }

  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await getMessages(room.roomId as number)
      dispatch(putMessages(messages))
      setMessages(messages)

      scrollToButton() // 滚动到底部
    }

    message.loading({ content: '正在加载聊天记录...', key: 'chat_message' })
    fetchMessages().then(() => message.destroy('chat_message'))
    attachEvents()
  }, [room.roomId])

  return (
    <div>
      <div className={styles.chatTopBar}>
        <span className={styles.chatTopBarAvatar}>
          <img src={room.avatar} alt="avatar" />
        </span>
        <span className={styles.chatTopBarTitle}>{room.roomName}</span>
      </div>

      <div className={styles.chatBubbles}>
        {messages?.map((i: Message) => {
          return <ChatBubble key={i._id} message={i} />
        })}
      </div>

      <div ref={bottomElem} />

      <ChatInput roomId={room.roomId} />
    </div>
  )
}
