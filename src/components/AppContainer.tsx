import { RootState } from 'app/store'
import React from 'react'
import { connect, useSelector } from 'react-redux'
import { Room } from 'types/RoomTypes'
import styles from './AppContainer.module.scss'
import ChatRoom from './ChatRoom'

function MyContainer({ room }: { room: Room | null }) {
  const onlineData = useSelector((state: RootState) => state.account.onlineData)

  return (
    <div className={styles.chatContainer}>
      {room ? (
        <ChatRoom room={room} />
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

const mapRoomsState = (state: RootState) => ({
  room: state.ui.room,
})

export const AppContainer = connect(mapRoomsState)(MyContainer)
