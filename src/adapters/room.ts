import { bridgeSocket } from 'providers/bridgeProvider'
import { Message, SendMessageParams } from 'types/RoomTypes'

const GET_MESSAGES_OFFSET = 0

/* getMessages: 从storage中获取当前room的聊天记录 */
const getMessages = (roomId: number): Promise<Message[]> => {
  // TODO: GET_MESSAGES_OFFSET 不应该是一个常量，应该等于现在已加载的消息数量
  return new Promise((resolve) => bridgeSocket.emit('fetchMessages', roomId, GET_MESSAGES_OFFSET, resolve))
}

const sendMessage = (data: SendMessageParams) => {
  bridgeSocket.emit('sendMessage', data)
}

export { getMessages, sendMessage }
