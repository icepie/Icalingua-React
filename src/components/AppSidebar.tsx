import { SearchOutlined } from '@ant-design/icons'
import { Avatar, Input } from 'antd'
import React, { useState } from 'react'
import { useStore } from 'react-redux'
import { RootState } from '../app/store'
import { getUserAvatarUrl } from '../utils/apis'
import styles from './AppSidebar.module.scss'
import SidebarRooms from './SidebarRooms'

export type FolderType = 'All' | 'Friends' | 'Group'

export default function AppSidebar() {
  const [folder, setFolder] = useState<FolderType>('All')
  const state: RootState = useStore().getState()

  return (
    <div className={styles.chatSidebar}>
      <div className={styles.sidebarHead}>
        <div className={styles.sidebarTitle}>
          <button className={styles.menuButton}>
            <Avatar src={getUserAvatarUrl(state.onlineData?.uin as number)} />
            {
              // MenuOutlined className={styles.menuIcon}
            }
          </button>
          <div className={styles.searchBox}>
            <Input placeholder="Search" className={styles.searchInput} />
            <SearchOutlined className={styles.searchIcon} />
          </div>
        </div>
        <div className={styles.foldersTabs}>
          {/* TODO: 支持自定义文件夹 */}
          <div>
            <button className={folder === 'All' ? styles.folderActive : ''} onClick={() => setFolder('All')}>
              全部会话
            </button>
            <button className={folder === 'Friends' ? styles.folderActive : ''} onClick={() => setFolder('Friends')}>
              好友
            </button>
            <button className={folder === 'Group' ? styles.folderActive : ''} onClick={() => setFolder('Group')}>
              群组
            </button>
          </div>
        </div>
      </div>
      <div className={styles.sidebarContent}>
        <SidebarRooms folder={folder} />
      </div>
    </div>
  )
}
