import React from 'react'
import { connect, useStore } from 'react-redux'
import { RootState } from '../app/store'
import { Room } from '../types/RoomTypes'
import styles from './AppContainer.module.scss'
import ChatRoom from './ChatRoom'

function Container({ room }: { room?: Room }) {
  const store = useStore()

  return (
    <div className={styles.chatContainer}>
      {room ? (
        <ChatRoom room={room} />
      ) : (
        <div style={{ padding: 8 }}>
          <p>Icalingua-React 1.0</p>

          <p>
            {store
              .getState()
              .onlineData?.sysInfo.split('\n')
              .map((i: string) => (
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

const mapRoomsStateToProps = (state: RootState) => ({
  room: state.currentRoom.room,
})

export const AppContainer = connect(mapRoomsStateToProps)(Container)
