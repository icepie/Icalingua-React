import { Avatar } from 'antd'
import { Message } from '../../../types/RoomTypes'
import { getUserAvatarUrl } from '../../../utils/apis'
import { randomUsernameColor } from '../../../utils/tools'
import styles from './bubble.module.scss'

export default function ChatBubble({ message }: { message: Message }) {
  // TODO: 进入房间每个人获取一个颜色
  
  return (
    <div className={styles.bubble}>
      <Avatar src={getUserAvatarUrl(message.senderId as number)} />
      <div className={styles.message}>
        <span className={styles.username} style={{ color: randomUsernameColor() }}>{message.username}</span>
        <p className={styles.content}>{message.content}</p>
        <span className={styles.timestamp}>{message.timestamp}</span>
      </div>
    </div>
  )
}
