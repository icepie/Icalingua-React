import { MenuOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React from 'react'
import styles from './AppSidebar.module.scss'
import { SidebarRooms } from './SidebarRooms'

export default function AppSidebar() {
  return (
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
  )
}