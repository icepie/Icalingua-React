import { RootState, useAppSelector } from 'app/store'
import React from 'react'
import styles from './AppContainer.module.scss'
import ChatRoom from './ChatRoom'

export default function AppContainer() {
  const onlineData = useAppSelector((state: RootState) => state.account.onlineData)
  const room = useAppSelector((state: RootState) => state.ui.room)

  return (
    <div className={styles.chatContainer}>
      {room ? (
        <ChatRoom />
      ) : (
        <div style={{ padding: 8 }}>
          <p>Icalingua-React 1.0</p>

          <p>
            {onlineData?.sysInfo?.split('\n').map((i: string) => (
              <span key={i} style={{ display: 'block' }}>
                {i}
              </span>
            ))}
          </p>
        </div>
      )}
    </div>
  )
}
