import FriendSearchable from './FriendSearchable'
import GroupSearchable from './GroupSearchable'

export default interface BridgeAdapter {
  getFriends: () => Promise<FriendSearchable[]>

  getGroups: () => Promise<GroupSearchable[]>
}
