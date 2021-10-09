import { Avatar, Layout, Popover } from 'antd'
import React from 'react'
import ChatRoom from '../components/ChatRoom'
import { Bridge } from '../providers/bridgeProvider'
import styles from '../styles/App.module.scss'
import { getUserAvatarUrl } from '../utils/apis'

export default function App(bot: Bridge) {
  return (
    <Layout className={styles.layout}>
      <Layout.Sider width={'4rem'} className={styles.sidebar}>
        <Popover title={bot.uin} content={bot.nickname}>
          <Avatar size={'large'} src={getUserAvatarUrl(bot.uin)} />
        </Popover>
      </Layout.Sider>
      <Layout.Content className={styles.main}>
        <ChatRoom />
      </Layout.Content>
    </Layout>
  )
}
