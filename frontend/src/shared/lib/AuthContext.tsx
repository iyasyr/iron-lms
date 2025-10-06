import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import toast from 'react-hot-toast'
import { authAPI, type User } from '../api/auth'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<User>
  register: (email: string, password: string, fullName: string) => Promise<User>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem('token')
    if (token) {
      // Validate token with backend
      validateToken()
    } else {
      setLoading(false)
    }
  }, [])

  const validateToken = async () => {
    try {
      const user = await authAPI.validateToken()
      setUser(user)
    } catch (error) {
      // Token is invalid, remove it
      localStorage.removeItem('token')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<User> => {
    try {
      setLoading(true)

      const data = await authAPI.login({ email, password })
      console.log('data', data);

      // Store token and user data
      localStorage.setItem('token', data.token)
      setUser(data.user)

      toast.success('Welcome back! 🎉')
      return data.user
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (email: string, password: string, fullName: string): Promise<User> => {
    try {
      setLoading(true)

      const data = await authAPI.register({ email, password, fullName })

      // Store token and user data
      localStorage.setItem('token', data.token)
      setUser(data.user)

      toast.success('Account created successfully! 🚀')
      return data.user
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Registration failed')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    toast.success('Logged out successfully! 👋')
  }

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    loading
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}