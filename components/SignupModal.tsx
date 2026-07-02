'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { X } from 'lucide-react'

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToLogin: () => void
}

export function SignupModal({ isOpen, onClose, onSwitchToLogin }: SignupModalProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { signup } = useAuth()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await signup(email, password, firstName, lastName)
      onClose()
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg w-full max-w-md relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-primary/60 hover:text-primary transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-8 pt-12">
          {/* Header */}
          <h1 className="text-4xl font-bold text-primary mb-2 text-center">
            Create Your Account
          </h1>
          <p className="text-primary/60 text-center mb-8">
            Join us to enjoy exclusive deals and manage your orders
          </p>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            {/* First Name */}
            <div>
              <label className="block text-primary font-semibold mb-2">First Name</label>
              <input
                type="text"
                placeholder="Your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-primary/10 border border-primary/30 text-primary placeholder:text-primary/40 focus:outline-none focus:border-primary/60 transition-colors"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-primary font-semibold mb-2">Last Name</label>
              <input
                type="text"
                placeholder="Your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-primary/10 border border-primary/30 text-primary placeholder:text-primary/40 focus:outline-none focus:border-primary/60 transition-colors"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-primary font-semibold mb-2">Email Address</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-primary/10 border border-primary/30 text-primary placeholder:text-primary/40 focus:outline-none focus:border-primary/60 transition-colors"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-primary font-semibold mb-2">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-primary/10 border border-primary/30 text-primary placeholder:text-primary/40 focus:outline-none focus:border-primary/60 transition-colors"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/40 text-red-200 text-sm">
                {error}
              </div>
            )}

            {/* Signup Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-background py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {isLoading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-primary/60 mt-6">
            Already have an account?{' '}
            <button
              onClick={() => {
                onClose()
                onSwitchToLogin()
              }}
              className="text-primary font-semibold hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
