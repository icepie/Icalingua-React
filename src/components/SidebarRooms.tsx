import { Avatar } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { States } from '../data/reducer'
import Room from '../types/Room'
import { getRoomAvatarUrl } from '../utils/apis'
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

const mapStateToProps = (state: States) => ({
  rooms: state.rooms
})

export const SidebarRooms = connect(mapStateToProps)(Rooms)
