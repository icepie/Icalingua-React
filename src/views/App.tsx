import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateFriends, updateGroups, updateRooms } from '../actions/account'
import { getFriends, getGroups } from '../adapters/account'
import AppContainer from '../components/AppContainer'
import AppSidebar from '../components/AppSidebar'
import { Loading } from '../components/Loading'
import { Bridge, createBridge } from '../providers/bridgeProvider'
import { account, ui } from '../providers/eventProvider'
import { Room } from '../types/RoomTypes'

export default function App() {
  const [bot, setBot] = useState<Bridge>()
  const dispatch = useDispatch()
  
  const initSubscribe = () => {
    account.on('updateBot', async (bot: Bridge) => {
      setBot(bot)
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
      {bot ? <>
        <AppSidebar />
        <AppContainer />
      </> : <Loading />}
    </div>
  )
}
