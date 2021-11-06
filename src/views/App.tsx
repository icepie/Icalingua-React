import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateFriends, updateGroups, updateOnlineData, updateRooms } from '../actions/account'
import { getFriends, getGroups } from '../adapters/account'
import { AppDispatch } from '../app/store'
import { AppContainer } from '../components/AppContainer'
import AppSidebar from '../components/AppSidebar'
import { PageLoading } from '../components/Loading'
import { Bridge, createBridge } from '../providers/bridgeProvider'
import { account, ui } from '../providers/eventProvider'
import { Room } from '../types/RoomTypes'
import { OnlineData } from '../types/RuntimeTypes'

export default function App() {
  const dispatch: AppDispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  
  const initSubscribe = () => {
    account.on('updateBot', async (bot: Bridge) => {
      dispatch(updateOnlineData(bot.onlineData as OnlineData))
      dispatch(updateFriends(await getFriends()))
      dispatch(updateGroups(await getGroups()))
      
      setLoading(false)
    })
    
    ui.on('updateRooms', (rooms: Room[]) => {
      dispatch(updateRooms(rooms))
    })
  }
  
  useEffect(() => {
    createBridge()
    initSubscribe()
  }, [])
  
  return (
    <div className="layout">
      {!loading ? <>
        <AppSidebar />
        <AppContainer />
      </> : <PageLoading />}
    </div>
  )
}
