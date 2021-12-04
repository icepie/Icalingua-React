import { getRoom } from 'adapters/account'
import { joinRoom } from 'app/features/ui/uiSlices'
import { RootState, useAppDispatch, useAppSelector } from 'app/store'
import { connect } from 'react-redux'
import { Room } from 'types/RoomTypes'
import { getRoomAvatarUrl } from 'utils/apis'
import { FolderType } from './AppSidebar'
import styles from './SidebarRooms.module.scss'

const SidebarRooms = ({ folder, search }: { folder: FolderType; search: string | undefined }) => {
  const dispatch = useAppDispatch()

  const rooms = useAppSelector((state) => {
    if (search !== undefined) {
      return state.account.rooms?.filter((i) => i.search.toLowerCase().includes(search?.toLowerCase() as string))
    }
    switch (folder) {
      case 'All':
        return state.account.rooms
      case 'Friends':
        return state.account.rooms?.filter((room) => room.roomId > 0)
      case 'Group':
        return state.account.rooms?.filter((room) => room.roomId < 0)
    }
  })

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

export default SidebarRooms
