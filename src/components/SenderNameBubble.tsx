import classNames from 'classnames'
import styles from '../styles/Bubble.module.scss'

export default function SenderNameBubble({name}: { name: string }) {
  return <div className={classNames(styles.container, styles.senderName)}>{name}</div>
}
