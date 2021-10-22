import { Avatar } from 'antd'
import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { joinRoom } from '../actions/ui'
import { getRoom } from '../adapters/account'
import { States } from '../data/reducer'
import { Room } from '../types/RuntimeTypes'
import { getRoomAvatarUrl } from '../utils/apis'
import { FolderType } from './AppSidebar'
import styles from './SidebarRooms.module.scss'

const Rooms = ({ rooms }: { rooms: Room[] }) => {
  const dispatch = useDispatch()
  
  const enterRoom = async (roomId: number) => {
    dispatch(joinRoom(await getRoom(roomId)))
  }
  
  return (
    <div className={styles.rooms}>
      {rooms.map((i: Room) => (
        <div className={styles.room} key={i.roomId} onClick={() => enterRoom(i.roomId)}>
          <Avatar className={styles.roomAvatar} src={getRoomAvatarUrl(i.roomId)} />
          <span className={styles.roomName}>{i.roomName}</span>
        </div>
      ))}
    </div>
  )
}

const mapRoomsStateToProps = (state: States) => ({
  rooms: state.runtime.rooms,
})

// TODO: 好友&群组列表？
const mapFriendsStateToProps = (state: States) => ({
  rooms: state.runtime.rooms.filter((room) => room.roomId > 0),
})

const mapGroupsStateToProps = (state: States) => ({
  rooms: state.runtime.rooms.filter((room) => room.roomId < 0),
})

const SidebarAllRooms = connect(mapRoomsStateToProps)(Rooms)
const SidebarFriends = connect(mapFriendsStateToProps)(Rooms)
const SidebarGroups = connect(mapGroupsStateToProps)(Rooms)

export const SidebarRooms = ({ folder }: { folder: FolderType }) => {
  switch (folder) {
    case FolderType.All:
      return <SidebarAllRooms />
    case FolderType.Friends:
      return <SidebarFriends />
    case FolderType.Group:
      return <SidebarGroups />
  }
}
