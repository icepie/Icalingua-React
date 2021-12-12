import { Button, Grid, TextField } from '@mui/material'
import { getConfig, saveConfig } from 'providers/configProvider'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const requireLogin = getConfig().server === '' || getConfig().privateKey === ''
  const navigate = useNavigate()
  useEffect(() => {
    if (!requireLogin) navigate('/')
  }, [])

  const { register, setValue, getValues } = useForm()

  useEffect(() => {
    setValue('server', getConfig().server)
    setValue('privateKey', getConfig().privateKey)
  }, [])

  const login = async () => {
    saveConfig({ server: getValues('server'), privateKey: getValues('privateKey') })
    navigate('/', { replace: true }) // 不在 history 里留记录，因为不应该留
  }

  return (
    <form onSubmit={login} style={{ width: '60%', margin: '6rem auto' }}>
      <Grid container justifyContent="center" flexDirection="column" gap={2}>
        <h1 style={{ textAlign: 'center' }}>连接服务器</h1>
        <TextField label="服务器地址" {...register('server')} />
        <TextField label="私钥" {...register('privateKey')} />
        <Button onClick={login} type="submit">
          登录
        </Button>
      </Grid>
    </form>
  )
}
