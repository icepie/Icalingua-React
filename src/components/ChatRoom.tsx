import { useStore } from 'react-redux'

export default function ChatRoom() {
  const store = useStore()
  let state = store.getState()
  
  return (
    <div>
      qwq
      {state.room?.roomId}
    </div>
  )
}
