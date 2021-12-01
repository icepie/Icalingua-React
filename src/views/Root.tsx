import { useEffect } from 'react'
import { getConfig } from 'providers/configProvider'
import { Outlet, useNavigate } from 'react-router-dom'

const Root = () => {
  const requireLogin = getConfig().server === '' || getConfig().privateKey === ''
  console.log({ requireLogin })
  const navigate = useNavigate()
  useEffect(() => {
    if (requireLogin) navigate('/login')
  }, [])
  return (
    <>
      <div />
      <Outlet />
    </>
  )
}

export default Root
