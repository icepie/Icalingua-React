import React, { useRef } from 'react'
import styles from './input.module.scss'

export default function ChatInput({ roomId }: { roomId: number }) {
  const input = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = () => {
    if (input.current) {
      console.log(input.current)
      // sendMessage({ roomId: roomId, content: input.current.value })
    }
  }

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className={styles.chatInputField} onKeyUp={handleKeyUp}>
      <div className={styles.chatInputContainer}>
        {/* TODO: 居然不支持自适应高度？？？ */}
        <textarea placeholder="Type a message..." ref={input} />
      </div>
      <button onClick={handleSubmit}>Send</button>
    </div>
  )
}
