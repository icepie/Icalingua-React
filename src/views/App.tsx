import { MenuOutlined, SearchOutlined } from '@ant-design/icons'
import { configureStore, createAction, createReducer } from '@reduxjs/toolkit'
import { Avatar, Button, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { bridgeAdapter } from '../adapters/bridgeAdapter'
import ChatRoom from '../components/ChatRoom'
import { Bridge, createBridge } from '../providers/bridgeProvider'
import { account, ui } from '../providers/eventProvider'
import styles from '../styles/App.module.scss'
import FriendSearchable from '../types/FriendSearchable'
import GroupSearchable from '../types/GroupSearchable'
import Room from '../types/Room'
import { getRoomAvatarUrl } from '../utils/apis'

const updateFriends = createAction<FriendSearchable[]>('friends/update')
const updateGroups = createAction<GroupSearchable[]>('groups/update')
const updateRooms = createAction<Room[]>('rooms/update')

const initialState = {
  friends: [{}],
  groups: [{}],
  rooms: [{
    roomId: 0,
    roomName: 'NULL'
  }]
}

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(updateFriends, (state, action) => {
    state.friends = action.payload
  }).addCase(updateGroups, (state, action) => {
    state.groups = action.payload
  }).addCase(updateRooms, (state, action) => {
    state.rooms = action.payload
  })
})

const store = configureStore({
  reducer: reducer
})

export default function App() {
  const [bot, setBot] = useState<Bridge>()

  useEffect(() => {
    createBridge()

    account.on('updateBot', async (bot: Bridge) => {
      setBot(bot)
      store.dispatch(updateFriends(await bridgeAdapter.getFriends()))
      store.dispatch(updateGroups(await bridgeAdapter.getGroups()))
    })

    ui.on('updateRooms', (rooms: Room[]) => {
      store.dispatch(updateRooms(rooms))
    })
  }, [])

  return (
    <div className={styles.layout}>
      {bot && <>
        <div className={styles.chatSidebar}>
          <div className={styles.sidebarHead}>
            <Button shape="round" className={styles.menuButton}>
              <MenuOutlined className={styles.menuIcon} />
            </Button>
            {
              // <Popover title={bot.uin} content={bot.nickname}>
              // <Avatar size="large" src={getUserAvatarUrl(bot.uin)} />
              // </Popover>
            }
            <div className={styles.searchBox}>
              <Input placeholder="Search" className={styles.searchInput} />
              <SearchOutlined className={styles.searchIcon} />
            </div>
          </div>
          <div className={styles.sidebarContent}>
            <div className={styles.foldersTabs}>abc</div>
            <div className={styles.tabsContainer}>
              {
                store.getState().rooms.map(i => (
                  <div key={i.roomId}>
                    <Avatar src={getRoomAvatarUrl(i.roomId)} />{i.roomName}
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className={styles.chatContainer}>
          <ChatRoom />
        </div>
      </>}
    </div>
  )
}
