import { useEffect } from 'react'
import { getConfig } from 'providers/configProvider'
import { Outlet, useNavigate } from 'react-router-dom'

const Root = () => {
  const requireLogin = getConfig().server === '' || getConfig().privateKey === ''
  const navigate = useNavigate()
  useEffect(() => {
    if (requireLogin) navigate('/login')
  }, [])
  return <Outlet />
}

export default Root
