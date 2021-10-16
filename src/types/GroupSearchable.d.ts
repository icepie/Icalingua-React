import { GroupInfo } from 'oicq'

export default interface GroupSearchable extends GroupInfo {
  sc: string, // 群组检索信息，包括名称、号码
}