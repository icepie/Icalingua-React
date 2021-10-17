import { Avatar } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { States } from '../data/reducer'
import Room from '../types/Room'
import { getRoomAvatarUrl } from '../utils/apis'

const Rooms = ({ rooms }: { rooms: Room[] }) => (
  <div>
    {rooms.map((i: Room) => (
      <div key={i.roomId}>
        <Avatar src={getRoomAvatarUrl(i.roomId)} />{i.roomName}
      </div>
    ))}
  </div>
)

const mapStateToProps = (state: States) => ({
  rooms: state.rooms
})

export const SidebarRooms = connect(mapStateToProps)(Rooms)
