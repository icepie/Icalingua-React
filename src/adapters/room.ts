import { GET_MESSAGES_OFFSET } from '../constants'
import { bridgeSocket } from '../providers/bridgeProvider'
import { Message } from '../types/RuntimeTypes'

/* getMessages: 从storage中获取当前room的聊天记录 */
const getMessages = (roomId: number): Promise<Message[]> => {
  return new Promise(resolve => bridgeSocket.emit('fetchMessages', roomId, GET_MESSAGES_OFFSET, resolve))
}

export { getMessages }
