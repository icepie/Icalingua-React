import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { RootState, useAppSelector } from 'app/store'
import React, { useState } from 'react'
import { getUserAvatarUrl } from 'utils/apis'
import styles from './AppSidebar.module.scss'
import SidebarRooms from './SidebarRooms'

export type FolderType = 'All' | 'Friends' | 'Group'

export default function AppSidebar() {
  const [folder, setFolder] = useState<FolderType>('All')
  const [search, setSearch] = useState<string | undefined>(undefined)
  const onlineData = useAppSelector((state: RootState) => state.account.onlineData)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.length > 0) {
      setSearch(value)
    } else {
      setSearch(undefined)
    }
  }

  return (
    <div className={styles.chatSidebar}>
      <div className={styles.sidebarHead}>
        <div className={styles.sidebarTitle}>
          <div className={styles.menuButton}>
            <span>
              <img src={getUserAvatarUrl(onlineData?.user_id as number)} alt="avatar" />
            </span>
          </div>
          <div className={styles.searchBox}>
            <Input placeholder="Search" className={styles.searchInput} onChange={handleSearch} />
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
        <SidebarRooms folder={folder} search={search} />
      </div>
    </div>
  )
}
