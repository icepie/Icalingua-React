import { updateOnlineData, updateRooms, updateRoomsSingle } from 'app/features/account/accountSlices'
import { joinRoom } from 'app/features/ui/uiSlices'
import { useAppDispatch } from 'app/store'
import AppContainer from 'components/AppContainer'
import AppSidebar from 'components/AppSidebar'
import { PageLoading } from 'components/Loading'
import { Bridge, createBridge } from 'providers/bridgeProvider'
import { getConfig } from 'providers/configProvider'
import { events } from 'providers/eventProvider'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Room } from 'types/RoomTypes'
import { OnlineData } from 'types/RuntimeTypes'

export default function App() {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      dispatch(joinRoom(null))
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

  const navigate = useNavigate()

  useEffect(() => {
    const requireLogin = getConfig().server === '' || getConfig().privateKey === ''
    if (requireLogin) return navigate('/login', { replace: true }) // 在这里检查配置是否完成，若未完成则不初始化 bridge
    createBridge()
    initSubscribe()
  }, [])

  return (
    <div tabIndex={-1} onKeyUp={handleKeyUp} style={{ height: '100%' }}>
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
