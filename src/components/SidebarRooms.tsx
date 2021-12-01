import { getRoom } from 'adapters/account'
import { joinRoom } from 'app/features/ui/uiSlices'
import { RootState, useAppDispatch } from 'app/store'
import { connect } from 'react-redux'
import { Room } from 'types/RoomTypes'
import { getRoomAvatarUrl } from 'utils/apis'
import { FolderType } from './AppSidebar'
import styles from './SidebarRooms.module.scss'

const MyRooms = ({ rooms }: { rooms?: Room[] }) => {
  const dispatch = useAppDispatch()

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
              {i.roomId < 0 && `${i.lastMessage.username}: `}
              <span>{i.lastMessage.content}</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default connect((state: RootState, props: { folder: FolderType; search?: string }) => {
  if (props.search !== undefined) {
    return {
      rooms: state.account.rooms?.filter((i) => i.search.toLowerCase().includes(props.search?.toLowerCase() as string)),
    }
  }

  switch (props.folder) {
    case 'All':
      return { rooms: state.account.rooms }
    case 'Friends':
      return state.account.rooms?.filter((room) => room.roomId > 0)
    case 'Group':
      return state.account.rooms?.filter((room) => room.roomId < 0)
  }
})(MyRooms)
