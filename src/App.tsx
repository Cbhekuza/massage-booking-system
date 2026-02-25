import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './stores/AuthStore'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Booking from './pages/Booking'
import MyBookings from './pages/MyBookings'
import AdminDashboard from './pages/Admin/AdminDashboard'
import ManagerDashboard from './pages/Manager/ManagerDashboard'

function App() {
  const { user } = useAuthStore()

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="register" element={user ? <Navigate to="/" /> : <Register />} />
          <Route path="booking" element={user ? <Booking /> : <Navigate to="/login" />} />
          <Route path="my-bookings" element={user ? <MyBookings /> : <Navigate to="/login" />} />
          <Route 
            path="admin" 
            element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} 
          />
          <Route 
            path="manager" 
            element={user?.role === 'manager' || user?.role === 'admin' ? <ManagerDashboard /> : <Navigate to="/" />} 
          />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
