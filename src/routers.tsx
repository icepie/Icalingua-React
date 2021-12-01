import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Root from 'views/Root'
import App from './views/App'
import Login from './views/Login'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="/login" element={<Login />} />
          <Route path="" element={<App />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
