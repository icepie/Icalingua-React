import React from 'react'
import { useStore } from 'react-redux'
import styles from './AppContainer.module.scss'
import ChatRoom from './ChatRoom'

export default function AppContainer() {
  const store = useStore()
  
  return (
    <div className={styles.chatContainer}>
      {store.getState().currentRoom.room ? <ChatRoom room={store.getState().currentRoom.room} /> : <div>
        <p>Icalingua-React 1.0</p>
        <p>{store.getState().onlineData?.sysInfo}</p>
      </div>}
    </div>
  )
}
