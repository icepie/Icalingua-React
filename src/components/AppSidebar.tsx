import { MenuOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React, { useState } from 'react'
import styles from './AppSidebar.module.scss'
import { SidebarRooms } from './SidebarRooms'

export enum FolderType {All, Friends, Group}

export default function AppSidebar() {
  const [folder, setFolder] = useState<FolderType>(FolderType.All)

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
        <div className={styles.foldersTabs}>
          {/* TODO: 支持自定义文件夹 */}
          <Button.Group>
            <Button onClick={() => setFolder(FolderType.All)}>全部会话</Button>
            <Button onClick={() => setFolder(FolderType.Friends)}>好友</Button>
            <Button onClick={() => setFolder(FolderType.Group)}>群组</Button>
          </Button.Group>
        </div>
        <div className={styles.tabsContainer}>
          <SidebarRooms folder={folder} />
        </div>
      </div>
    </div>
  )
}
