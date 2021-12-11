import { CircularProgress } from '@mui/material'
import styles from './Loading.module.scss'

export function PageLoading() {
  return (
    <div className={styles.loading}>
      <CircularProgress size="large" />
      <p>页面正在加载，请稍候...</p>
    </div>
  )
}
