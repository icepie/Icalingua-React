import React from 'react'
import styles from './AppContainer.module.scss'
import ChatRoom from './ChatRoom'

export default function AppContainer() {
  return (
    <div className={styles.chatContainer}>
      <ChatRoom />
    </div>
  )
}