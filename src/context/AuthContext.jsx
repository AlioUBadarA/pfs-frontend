import { createContext, useContext, useState } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('pfs_user')
    return stored ? JSON.parse(stored) : null
  })
  const [loading, setLoading] = useState(false)

  const login = async (email, password) => {
    setLoading(true)
    try {
      const { data } = await api.post('/api/auth/login', { email, password })
      localStorage.setItem('pfs_token', data.token)
      localStorage.setItem('pfs_user', JSON.stringify(data.user))
      setUser(data.user)
      return { ok: true }
    } catch (err) {
      return { ok: false, message: err.response?.data?.error || 'Erreur de connexion' }
    } finally {
      setLoading(false)
    }
  }

  const register = async (formData) => {
    setLoading(true)
    try {
      const { data } = await api.post('/api/auth/register', formData)
      localStorage.setItem('pfs_token', data.token)
      localStorage.setItem('pfs_user', JSON.stringify(data.user))
      setUser(data.user)
      return { ok: true }
    } catch (err) {
      return { ok: false, message: err.response?.data?.error || "Erreur d'inscription" }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('pfs_token')
    localStorage.removeItem('pfs_user')
    setUser(null)
  }

  const isAdmin = user?.role === 'superadmin'

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
