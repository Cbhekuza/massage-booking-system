import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: number
  name: string
  email: string
  role: 'client' | 'manager' | 'admin'
  phone?: string
}

interface AuthState {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string, phone: string) => Promise<boolean>
  logout: () => void
  resetPassword: (email: string) => Promise<boolean>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      
      login: async (email: string, password: string) => {
        try {
          // Simulated API call - replace with actual API endpoint
          // const response = await fetch('http://localhost/api/auth/login.php', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({ email, password })
          // })
          
          // Mock login for demo
          if (email === 'admin@massage.com' && password === 'admin123') {
            set({
              user: { id: 1, name: 'Admin User', email, role: 'admin' },
              token: 'mock-token-admin'
            })
            return true
          } else if (email === 'manager@massage.com' && password === 'manager123') {
            set({
              user: { id: 2, name: 'Manager User', email, role: 'manager' },
              token: 'mock-token-manager'
            })
            return true
          } else if (email && password) {
            set({
              user: { id: 3, name: 'Client User', email, role: 'client' },
              token: 'mock-token-client'
            })
            return true
          }
          return false
        } catch (error) {
          console.error('Login error:', error)
          return false
        }
      },
      
      register: async (name: string, email: string, password: string, phone: string) => {
        try {
          // Simulated API call - replace with actual API endpoint
          // const response = await fetch('http://localhost/api/auth/register.php', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({ name, email, password, phone })
          // })
          
          // Mock registration for demo
          set({
            user: { id: Date.now(), name, email, role: 'client', phone },
            token: 'mock-token-' + Date.now()
          })
          return true
        } catch (error) {
          console.error('Registration error:', error)
          return false
        }
      },
      
      logout: () => {
        set({ user: null, token: null })
      },
      
      resetPassword: async (email: string) => {
        try {
          // Simulated API call
          console.log('Password reset requested for:', email)
          return true
        } catch (error) {
          console.error('Password reset error:', error)
          return false
        }
      }
    }),
    {
      name: 'auth-storage'
    }
  )
)
