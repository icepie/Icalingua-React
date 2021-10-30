import { Spin } from 'antd'
import styles from './Loading.module.scss'

export function Loading() {
  return (
    <div className={styles.loading}>
      <Spin spinning={true} size="large" />
      <p>页面正在加载，请稍候...</p>
    </div>
  )
}
