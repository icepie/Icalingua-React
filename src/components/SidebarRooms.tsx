import { Avatar } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { States } from '../data/reducer'
import Room from '../types/Room'
import { getRoomAvatarUrl } from '../utils/apis'
import { FolderType } from './AppSidebar'
import styles from './SidebarRooms.module.scss'

const Rooms = ({ rooms }: { rooms: Room[] }) => (
  <div className={styles.rooms}>
    {rooms.map((i: Room) => (
      <div className={styles.room} key={i.roomId}>
        <Avatar className={styles.roomAvatar} src={getRoomAvatarUrl(i.roomId)} />
        <span className={styles.roomName}>{i.roomName}</span>
      </div>
    ))}
  </div>
)

const mapRoomsStateToProps = (state: States) => ({
  rooms: state.rooms
})

// TODO: 好友&群组列表？
const mapFriendsStateToProps = (state: States) => ({
  rooms: state.rooms.filter((room) => room.roomId > 0)
})

const mapGroupsStateToProps = (state: States) => ({
  rooms: state.rooms.filter((room) => room.roomId < 0)
})

const SidebarAllRooms = connect(mapRoomsStateToProps)(Rooms)
const SidebarFriends = connect(mapFriendsStateToProps)(Rooms)
const SidebarGroups = connect(mapGroupsStateToProps)(Rooms)

export const SidebarRooms = ({folder}:{folder:FolderType}) => {
  switch (folder) {
    case FolderType.All:
      return <SidebarAllRooms />
    case FolderType.Friends:
      return <SidebarFriends />
    case FolderType.Group:
      return <SidebarGroups />
  }
}
