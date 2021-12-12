import { CircularProgress } from '@mui/material'

export function PageLoading() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        height: '90%',
      }}
    >
      <CircularProgress size={72} />
      <p style={{ fontSize: 18, marginTop: '2rem' }}>页面正在加载，请稍候...</p>
    </div>
  )
}
