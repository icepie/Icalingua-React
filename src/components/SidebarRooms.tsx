import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { joinRoom } from '../actions/ui'
import { getRoom } from '../adapters/account'
import { RootState } from '../app/store'
import { Room } from '../types/RoomTypes'
import { getRoomAvatarUrl } from '../utils/apis'
import { FolderType } from './AppSidebar'
import styles from './SidebarRooms.module.scss'

const Rooms = ({ rooms }: { rooms?: Room[] }) => {
  const dispatch = useDispatch()

  const enterRoom = async (roomId: number) => {
    dispatch(joinRoom(await getRoom(roomId)))
  }

  return (
    <ul className={styles.rooms}>
      {rooms?.map((i: Room) => (
        <li className={styles.room} key={i.roomId} onClick={() => enterRoom(i.roomId)}>
          <span>
            <img className={styles.roomAvatar} src={getRoomAvatarUrl(i.roomId)} alt="Room avatar" />
          </span>
          <div className={styles.caption}>
            <p className={styles.roomName}>{i.roomName}</p>
            <p className={styles.lastMessage}>
              {i.lastMessage.username}: <span>{i.lastMessage.content}</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}

const mapRoomsStateToProps = (state: RootState) => ({
  rooms: state.runtime.rooms,
})

// TODO: 好友&群组列表？
const mapFriendsStateToProps = (state: RootState) => ({
  rooms: state.runtime.rooms?.filter((room) => room.roomId > 0),
})

const mapGroupsStateToProps = (state: RootState) => ({
  rooms: state.runtime.rooms?.filter((room) => room.roomId < 0),
})

const SidebarAllRooms = connect(mapRoomsStateToProps)(Rooms)
const SidebarFriends = connect(mapFriendsStateToProps)(Rooms)
const SidebarGroups = connect(mapGroupsStateToProps)(Rooms)

export default ({ folder }: { folder: FolderType }) => {
  switch (folder) {
    case 'All':
      return <SidebarAllRooms />
    case 'Friends':
      return <SidebarFriends />
    case 'Group':
      return <SidebarGroups />
  }
}
