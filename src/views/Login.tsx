import { Button, Grid, TextField } from '@mui/material'
import { getConfig } from 'providers/configProvider'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const requireLogin = getConfig().server === '' || getConfig().privateKey === ''
  const navigate = useNavigate()
  useEffect(() => {
    if (!requireLogin) navigate('/')
  }, [])

  // const [form] = FormGroup.useForm()

  useEffect(() => {
    // form.setFieldsValue(getConfig())
  }, [])

  const login = async () => {
    // saveConfig(form.getFieldsValue())
    navigate('/', { replace: true }) // 不在 history 里留记录，因为不应该留
  }

  return (
    <form onSubmit={login} style={{ width: '60%', margin: '6rem auto' }}>
      <Grid container justifyContent="center" flexDirection="column" gap={2}>
        <h1 style={{ textAlign: 'center' }}>连接服务器</h1>
        <TextField label="服务器地址" name="server" />
        <TextField label="私钥" name="privateKey" />
        <Button onClick={login}>登录</Button>
      </Grid>
    </form>
  )
}
