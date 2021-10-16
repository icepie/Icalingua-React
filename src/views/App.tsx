import { MenuOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { bridgeAdapter } from '../adapters/bridgeAdapter'
import ChatRoom from '../components/ChatRoom'
import { Bridge, createBridge } from '../providers/bridgeProvider'
import { account } from '../providers/eventProvider'
import styles from '../styles/App.module.scss'
import FriendSearchable from '../types/FriendSearchable'
import GroupSearchable from '../types/GroupSearchable'

export default function App() {
  const [bot, setBot] = useState<Bridge>()
  const [friends, setFriends] = useState<FriendSearchable[]>()
  const [groups, setGroups] = useState<GroupSearchable[]>()

  useEffect(() => {
    createBridge()

    account.on('updateBot', async (bot: Bridge) => {
      setBot(bot)
      setFriends(await bridgeAdapter.getFriends())
      setGroups(await bridgeAdapter.getGroups())
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
                friends?.map(i => (
                  <div key={i.user_id}>
                    {i.nickname} {i.user_id}
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
