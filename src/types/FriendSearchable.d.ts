import { FriendInfo } from 'oicq'

export default interface FriendSearchable extends FriendInfo {
  sc: string, // 好友检索信息，包括昵称、备注、号码
}