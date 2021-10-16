import { MenuOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import ChatRoom from '../components/ChatRoom'
import { Bridge, createBridge } from '../providers/bridgeProvider'
import { account } from '../providers/eventProvider'
import styles from '../styles/App.module.scss'

export default function App() {
  const [bot, setBot] = useState<Bridge>()

  useEffect(() => {
    createBridge()

    account.on('updateBot', (bot: Bridge) => {
      setBot(bot)
    })
  }, [])

  return (
    <div className={styles.layout}>
      {bot && <>
        <div className={styles.chatSidebar}>
          <div className={styles.sidebarHead}>
            <Button shape="round" className={styles.menuButton}>
              <MenuOutlined />
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
          <div className={styles.sidebarContent} />

        </div>
        <div className={styles.chatContainer}>
          <ChatRoom />
        </div>
      </>}
    </div>
  )
}
