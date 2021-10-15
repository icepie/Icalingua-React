import { Avatar, Layout, Popover } from 'antd'
import React, { useEffect, useState } from 'react'
import ChatRoom from '../components/ChatRoom'
import { Bridge, createBridge } from '../providers/bridgeProvider'
import { account } from '../providers/eventProvider'
import styles from '../styles/App.module.scss'
import { getUserAvatarUrl } from '../utils/apis'

export default function App() {
  const [bot, setBot] = useState<Bridge>()

  useEffect(() => {
    createBridge()

    account.on('updateBot', (bot: Bridge) => {
      setBot(bot)
    })
  }, [])

  return (
    <Layout className={styles.layout}>
      {bot && <>
        <Layout.Sider width="4rem" className={styles.sidebar}>
          <Popover title={bot.uin} content={bot.nickname}>
            <Avatar size="large" src={getUserAvatarUrl(bot.uin)} />
          </Popover>
        </Layout.Sider>
        <Layout.Content className={styles.main}>
          <ChatRoom />
        </Layout.Content>
      </>}
    </Layout>
  )
}
