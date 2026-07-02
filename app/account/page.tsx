'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { LoginModal } from '@/components/LoginModal'
import { SignupModal } from '@/components/SignupModal'
import { Edit2, Loader } from 'lucide-react'

export default function AccountPage() {
  const { user, isLoggedIn, logout, updateUserProfile } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    pincode: user?.pincode || '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = async () => {
    setIsSaving(true)
    try {
      updateUserProfile(formData)
      setIsEditing(false)
    } finally {
      setIsSaving(false)
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        {/* Account Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
            <svg
              className="w-12 h-12 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>

        {/* Login Buttons */}
        <div className="space-y-4 text-center">
          <button
            onClick={() => setShowLoginModal(true)}
            className="w-48 bg-primary text-background py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Login
          </button>
          <button
            onClick={() => setShowSignupModal(true)}
            className="w-48 bg-primary/20 text-primary border-2 border-primary py-3 rounded-lg font-semibold hover:bg-primary/30 transition-colors"
          >
            Sign Up
          </button>
        </div>

        {/* Modals */}
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onSwitchToSignup={() => {
            setShowLoginModal(false)
            setShowSignupModal(true)
          }}
        />
        <SignupModal
          isOpen={showSignupModal}
          onClose={() => setShowSignupModal(false)}
          onSwitchToLogin={() => {
            setShowSignupModal(false)
            setShowLoginModal(true)
          }}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">My Account</h1>
            <p className="text-primary/60">Manage your profile and preferences</p>
          </div>
          <button
            onClick={logout}
            className="px-6 py-2 bg-red-500/20 text-red-300 border border-red-500/40 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Profile Section */}
        <div className="backdrop-blur-md bg-primary/5 border border-primary/20 rounded-lg p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-2xl font-bold text-primary">Profile Information</h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-background rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Edit2 size={18} />
                Edit Profile
              </button>
            )}
          </div>

          {isEditing ? (
            // Edit Form
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-primary font-semibold mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary focus:outline-none focus:border-primary/60"
                  />
                </div>
                <div>
                  <label className="block text-primary font-semibold mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary focus:outline-none focus:border-primary/60"
                  />
                </div>
                <div>
                  <label className="block text-primary font-semibold mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary focus:outline-none focus:border-primary/60"
                  />
                </div>
                <div>
                  <label className="block text-primary font-semibold mb-2">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary focus:outline-none focus:border-primary/60"
                  />
                </div>
              </div>

              <div>
                <label className="block text-primary font-semibold mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary focus:outline-none focus:border-primary/60"
                />
              </div>

              <div>
                <label className="block text-primary font-semibold mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary focus:outline-none focus:border-primary/60"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="flex-1 bg-primary text-background py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSaving ? <Loader size={18} className="animate-spin" /> : null}
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-primary/10 border border-primary/30 text-primary py-3 rounded-lg font-semibold hover:bg-primary/20 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            // Display Mode
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-primary/60 text-sm mb-1">First Name</p>
                  <p className="text-primary font-semibold">{user?.firstName}</p>
                </div>
                <div>
                  <p className="text-primary/60 text-sm mb-1">Last Name</p>
                  <p className="text-primary font-semibold">{user?.lastName}</p>
                </div>
                <div>
                  <p className="text-primary/60 text-sm mb-1">Email</p>
                  <p className="text-primary font-semibold">{user?.email}</p>
                </div>
                <div>
                  <p className="text-primary/60 text-sm mb-1">Phone</p>
                  <p className="text-primary font-semibold">{user?.phone}</p>
                </div>
              </div>

              {user?.address && (
                <div>
                  <p className="text-primary/60 text-sm mb-1">Address</p>
                  <p className="text-primary font-semibold">{user.address}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {user?.city && (
                  <div>
                    <p className="text-primary/60 text-sm mb-1">City</p>
                    <p className="text-primary font-semibold">{user.city}</p>
                  </div>
                )}
                {user?.pincode && (
                  <div>
                    <p className="text-primary/60 text-sm mb-1">Pincode</p>
                    <p className="text-primary font-semibold">{user.pincode}</p>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <p className="text-primary/60 text-sm mb-1">Member Since</p>
                <p className="text-primary font-semibold">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Today'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
