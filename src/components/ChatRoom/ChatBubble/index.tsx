import { RootState, useAppSelector } from 'app/store'
import { Message } from 'types/RoomTypes'
import { getUserAvatarUrl } from 'utils/apis'
import { randomUsernameColor } from 'utils/tools'
import styles from './bubble.module.scss'

export default function ChatBubble({ message }: { message: Message }) {
  // TODO: 进入房间每个人获取一个颜色
  const onlineData = useAppSelector((state: RootState) => state.account.onlineData)

  // 兼容Bridge：把You换成nickname
  const username = message.senderId === onlineData?.user_id ? onlineData?.nickname : message.username

  return (
    <div className={styles.bubble}>
      <span>
        <img className={styles.userAvatar} src={getUserAvatarUrl(message.senderId as number)} alt="avatar" />
      </span>
      <div className={styles.message}>
        <span className={styles.username} style={{ color: randomUsernameColor() }}>
          {username}
        </span>
        <p className={styles.content}>{message.content}</p>
        <span className={styles.timestamp}>{message.timestamp}</span>
      </div>
    </div>
  )
}
