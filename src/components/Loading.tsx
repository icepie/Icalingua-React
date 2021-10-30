import { Spin } from 'antd'
import styles from './Loading.module.scss'

export function MessagesLoading() {
  return (
    <div className={styles.loading}>
      <p>正在加载聊天记录...</p>
    </div>
  )
}

export function PageLoading() {
  return (
    <div className={styles.loading}>
      <Spin spinning={true} size="large" />
      <p>页面正在加载，请稍候...</p>
    </div>
  )
}
