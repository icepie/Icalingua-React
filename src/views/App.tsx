import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateOnlineData, updateRooms, updateRoomsSingle } from '../app/actions/account'
import { joinRoom, updateRoom } from '../app/actions/ui'
import { AppDispatch } from '../app/store'
import { AppContainer } from '../components/AppContainer'
import AppSidebar from '../components/AppSidebar'
import { PageLoading } from '../components/Loading'
import { Bridge, createBridge } from '../providers/bridgeProvider'
import { events } from '../providers/eventProvider'
import { Room } from '../types/RoomTypes'
import { OnlineData } from '../types/RuntimeTypes'

export default function App() {
  const dispatch: AppDispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  const handleKeyUp = (event: React.KeyboardEvent) => {
    console.log(event)
    if (event.key === 'Escape') {
      dispatch(joinRoom(undefined))
    }
  }

  const initSubscribe = () => {
    events.account.on('updateBot', async (bot: Bridge) => {
      dispatch(updateOnlineData(bot.onlineData as OnlineData))

      // dispatch(updateFriends(await getFriends()))
      // dispatch(updateGroups(await getGroups()))

      setLoading(false)
    })

    events.rooms.on('updateRooms', (rooms: Room[]) => {
      dispatch(updateRooms(rooms))
    })

    events.rooms.on('updateRoom', (room: Room) => {
      dispatch(updateRoomsSingle(room))
    })
  }

  useEffect(() => {
    createBridge()
    initSubscribe()
  }, [])

  return (
    <div className="layout" tabIndex={-1} onKeyUp={handleKeyUp}>
      {!loading ? (
        <>
          <AppSidebar />
          <AppContainer />
        </>
      ) : (
        <PageLoading />
      )}
    </div>
  )
}
