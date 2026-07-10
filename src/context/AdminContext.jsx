import { createContext, useContext, useState } from 'react'
import { mockPlatformUsers, mockSellers, mockPlatformOrders } from '../data/admin'

const AdminContext = createContext(null)

// Haqiqiy backend ulanmaguncha barcha so'rovlar shu yerda simulyatsiya qilinadi.
function mockRequest(result, delay = 500) {
  return new Promise((resolve) => setTimeout(() => resolve(result), delay))
}

export function AdminProvider({ children }) {
  const [users, setUsers] = useState(mockPlatformUsers)
  const [sellers, setSellers] = useState(mockSellers)
  const [platformOrders] = useState(mockPlatformOrders)

  async function suspendUser(userId) {
    await mockRequest(null, 400)
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, status: 'suspended' } : u)))
    return { success: true }
  }

  async function reactivateUser(userId) {
    await mockRequest(null, 400)
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, status: 'active' } : u)))
    return { success: true }
  }

  async function approveSeller(sellerId) {
    await mockRequest(null, 500)
    setSellers((prev) => prev.map((s) => (s.id === sellerId ? { ...s, status: 'active' } : s)))
    return { success: true }
  }

  async function rejectSeller(sellerId) {
    await mockRequest(null, 500)
    setSellers((prev) => prev.map((s) => (s.id === sellerId ? { ...s, status: 'rejected' } : s)))
    return { success: true }
  }

  async function suspendSeller(sellerId) {
    await mockRequest(null, 400)
    setSellers((prev) => prev.map((s) => (s.id === sellerId ? { ...s, status: 'suspended' } : s)))
    return { success: true }
  }

  async function reactivateSeller(sellerId) {
    await mockRequest(null, 400)
    setSellers((prev) => prev.map((s) => (s.id === sellerId ? { ...s, status: 'active' } : s)))
    return { success: true }
  }

  const value = {
    users,
    sellers,
    platformOrders,
    suspendUser,
    reactivateUser,
    approveSeller,
    rejectSeller,
    suspendSeller,
    reactivateSeller,
  }

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin AdminProvider ichida ishlatilishi kerak')
  return ctx
}
