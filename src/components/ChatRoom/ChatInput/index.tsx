import { useRef } from 'react'
import styles from './input.module.scss'

export default function ChatInput({ roomId }: { roomId: number }) {
  const input = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    if (input.current) {
      // sendMessage({ roomId: roomId, content: input.current.value })
    }
  }

  return (
    <div className={styles.chatInputField}>
      <div className={styles.chatInputContainer}>
        <input type="text" placeholder="Type a message..." ref={input} />
      </div>
      <button onClick={handleSubmit}>Send</button>
    </div>
  )
}
