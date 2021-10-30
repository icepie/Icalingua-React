import React, { useEffect } from 'react'
import { useDispatch, useStore } from 'react-redux'
import { updateFriends, updateGroups, updateOnlineData, updateRooms } from '../actions/account'
import { getFriends, getGroups } from '../adapters/account'
import AppContainer from '../components/AppContainer'
import AppSidebar from '../components/AppSidebar'
import { PageLoading } from '../components/Loading'
import { Bridge, createBridge } from '../providers/bridgeProvider'
import { account, ui } from '../providers/eventProvider'
import { Room } from '../types/RoomTypes'
import { OnlineData } from '../types/RuntimeTypes'

export default function App() {
  const store = useStore()
  const dispatch = useDispatch()
  
  const initSubscribe = () => {
    account.on('updateBot', async (bot: Bridge) => {
      dispatch(updateOnlineData(bot.onlineData as OnlineData))
      dispatch(updateFriends(await getFriends()))
      dispatch(updateGroups(await getGroups()))
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
      {store.getState().onlineData?.online ? <>
        <AppSidebar />
        <AppContainer />
      </> : <PageLoading />}
    </div>
  )
}
