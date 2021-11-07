import { Avatar } from 'antd'
import { Message } from '../../../types/RoomTypes'
import { getUserAvatarUrl } from '../../../utils/apis'
import styles from './bubble.module.scss'

export default function ChatBubble({ message }: { message: Message }) {
  return (
    <div className={styles.bubble}>
      <Avatar src={getUserAvatarUrl(message.senderId as number)} />
      <div className={styles.message}>
        <span>{message.username}</span>
        <p>{message.content}</p>
        <span>{message.timestamp}</span>
      </div>
    </div>
  )
}
