import { MenuOutlined, SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import React, { useState } from 'react'
import styles from './AppSidebar.module.scss'
import SidebarRooms from './SidebarRooms'

export enum FolderType {All, Friends, Group}

export default function AppSidebar() {
  const [folder, setFolder] = useState<FolderType>(FolderType.All)

  return (
    <div className={styles.chatSidebar}>
      <div className={styles.sidebarHead}>
        <button className={styles.menuButton}>
          <MenuOutlined className={styles.menuIcon} />
        </button>
        <div className={styles.searchBox}>
          <Input placeholder="Search" className={styles.searchInput} />
          <SearchOutlined className={styles.searchIcon} />
        </div>
      </div>
      <div className={styles.sidebarContent}>
        <div className={styles.foldersTabs}>
          {/* TODO: 支持自定义文件夹 */}
          <div>
            <button className={folder === FolderType.All ? styles.folderActive : ''}
                    onClick={() => setFolder(FolderType.All)}>全部会话
            </button>
            <button className={folder === FolderType.Friends ? styles.folderActive : ''}
                    onClick={() => setFolder(FolderType.Friends)}>好友
            </button>
            <button className={folder === FolderType.Group ? styles.folderActive : ''}
                    onClick={() => setFolder(FolderType.Group)}>群组
            </button>
          </div>
        </div>
  
        <SidebarRooms folder={folder} />
      </div>
    </div>
  )
}
