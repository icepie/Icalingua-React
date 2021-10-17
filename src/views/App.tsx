import { MenuOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useStore } from 'react-redux'
import { bridgeAdapter } from '../adapters/bridgeAdapter'
import ChatRoom from '../components/ChatRoom'
import { SidebarRooms } from '../components/sidebarRooms'
import { updateFriends, updateGroups, updateRooms } from '../data/actions'
import { Bridge, createBridge } from '../providers/bridgeProvider'
import { account, ui } from '../providers/eventProvider'
import styles from '../styles/App.module.scss'
import Room from '../types/Room'

export default function App() {
  const [bot, setBot] = useState<Bridge>()
  const dispatch = useDispatch()
  const store = useStore()
  let state = store.getState()

  useEffect(() => {
    createBridge()

    store.subscribe(() => {
      state = store.getState()
      console.log(state)
    })

    account.on('updateBot', async (bot: Bridge) => {
      setBot(bot)
      dispatch(updateFriends(await bridgeAdapter.getFriends()))
      dispatch(updateGroups(await bridgeAdapter.getGroups()))
    })

    ui.on('updateRooms', (rooms: Room[]) => {
      dispatch(updateRooms(rooms))
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
              <SidebarRooms />
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
