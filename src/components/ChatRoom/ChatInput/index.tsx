import { sendMessage } from 'adapters/room'
import React, { useRef } from 'react'
import styles from './input.module.scss'

export default function ChatInput({ roomId }: { roomId: number }) {
  const input = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = () => {
    if (input.current?.value.length) {
      console.log({ roomId: roomId, content: input.current.value })
      sendMessage({ roomId: roomId, content: input.current.value, at: [] })
    }
  }

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit()
    }

    return false
  }

  return (
    <div className={styles.chatInputField}>
      <div className={styles.chatInputContainer}>
        {/* TODO: 居然不支持自适应高度？？？ */}
        <textarea placeholder="Type a message..." ref={input} onKeyUp={handleKeyUp} />
      </div>
      <button onClick={handleSubmit}>Send</button>
    </div>
  )
}
