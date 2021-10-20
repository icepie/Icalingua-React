import LastMessage from './LastMessage'

export default interface Room {
  roomId: number;
  roomName: string;
  avatar: string;
  index: number;
  unreadCount: number;
  utime: number; // UpdateTime
  at?: boolean | 'all';
  lastMessage: LastMessage;
}
