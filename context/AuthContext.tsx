'use client'

import { createContext, useContext, useState, useEffect } from 'react'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
  address: string
  city: string
  pincode: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<void>
  logout: () => void
  updateUserProfile: (data: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('luxe_user')
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
        setIsLoggedIn(true)
      } catch (error) {
        console.log('[v0] Error loading user from localStorage:', error)
      }
    }
  }, [])

  const login = async (email: string, password: string) => {
    // Simulate API call
    if (!email || !password) {
      throw new Error('Email and password are required')
    }

    // Create user object
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      firstName: email.split('@')[0],
      lastName: 'User',
      phone: '+91 9876543210',
      address: '123 Jewelry Lane',
      city: 'Delhi',
      pincode: '110001',
      createdAt: new Date().toISOString(),
    }

    setUser(newUser)
    setIsLoggedIn(true)
    localStorage.setItem('luxe_user', JSON.stringify(newUser))
  }

  const signup = async (email: string, password: string, firstName: string, lastName: string) => {
    if (!email || !password || !firstName || !lastName) {
      throw new Error('All fields are required')
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      firstName,
      lastName,
      phone: '+91 9876543210',
      address: '',
      city: '',
      pincode: '',
      createdAt: new Date().toISOString(),
    }

    setUser(newUser)
    setIsLoggedIn(true)
    localStorage.setItem('luxe_user', JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem('luxe_user')
  }

  const updateUserProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      localStorage.setItem('luxe_user', JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, signup, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
