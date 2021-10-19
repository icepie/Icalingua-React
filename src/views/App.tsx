import React, { useEffect, useState } from 'react'
import { useDispatch, useStore } from 'react-redux'
import { bridgeAdapter } from '../adapters/bridgeAdapter'
import AppContainer from '../components/AppContainer'
import AppSidebar from '../components/AppSidebar'
import { updateFriends, updateGroups, updateRooms } from '../data/actions'
import { Bridge, createBridge } from '../providers/bridgeProvider'
import { account, ui } from '../providers/eventProvider'
import Room from '../types/Room'

export default function App() {
  const [bot, setBot] = useState<Bridge>()
  const dispatch = useDispatch()
  const store = useStore()
  let state = store.getState()

  const initSubscribe = () => {
    store.subscribe(() => {
      state = store.getState()
    })

    account.on('updateBot', async (bot: Bridge) => {
      setBot(bot)
      dispatch(updateFriends(await bridgeAdapter.getFriends()))
      dispatch(updateGroups(await bridgeAdapter.getGroups()))
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
      {bot && <>
        <AppSidebar />
        <AppContainer />
      </>}
    </div>
  )
}
