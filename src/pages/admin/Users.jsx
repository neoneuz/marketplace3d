import { useState } from 'react'
import { Search, Ban, RotateCcw } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'
import EmptyState from '../../components/EmptyState'
import { useAdmin } from '../../context/AdminContext'
import { formatSom, formatOrderDate, getUserStatusMeta, getUserStatusBadgeClass } from '../../data/admin'

const FILTERS = [
  { key: 'all', label: 'Barchasi' },
  { key: 'active', label: 'Faol' },
  { key: 'suspended', label: 'Bloklangan' },
]

export default function AdminUsers({ onNavigate, onLogout, onBack }) {
  const { users, suspendUser, reactivateUser } = useAdmin()
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [pendingId, setPendingId] = useState(null)

  const filtered = users.filter((u) => {
    if (filter !== 'all' && u.status !== filter) return false
    if (!query.trim()) return true
    const q = query.toLowerCase()
    return `${u.firstName} ${u.lastName}`.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
  })

  async function handleToggle(u) {
    setPendingId(u.id)
    if (u.status === 'active') await suspendUser(u.id)
    else await reactivateUser(u.id)
    setPendingId(null)
  }

  return (
    <AdminLayout title="Foydalanuvchilar" active="admin-users" onNavigate={onNavigate} onLogout={onLogout} onBack={onBack}>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neone-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ism yoki email bo'yicha qidirish"
            className="w-full bg-neone-card border border-neone-border rounded-xl pl-10 pr-3.5 py-3 text-sm text-white placeholder:text-neone-muted outline-none transition-colors focus-ring focus:border-neone-accent"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`shrink-0 px-4 py-2 rounded-lg border text-sm focus-ring ${
                filter === f.key ? 'border-neone-accent text-white bg-neone-card' : 'border-neone-border text-neone-muted hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Search} title="Foydalanuvchi topilmadi" message="Qidiruv yoki filtrni o'zgartirib ko'ring" />
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((u) => {
            const meta = getUserStatusMeta(u.status)
            const busy = pendingId === u.id
            return (
              <div key={u.id} className="bg-neone-panel border border-neone-border rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-white text-sm font-medium truncate">
                      {u.firstName} {u.lastName}
                    </p>
                    <span className={`inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-md ${getUserStatusBadgeClass(u.status)}`}>
                      {meta.label}
                    </span>
                  </div>
                  <p className="text-neone-muted text-xs mt-1 truncate">
                    {u.email} · {u.region}
                  </p>
                  <p className="text-neone-muted text-xs mt-0.5">
                    {u.ordersCount} ta buyurtma · {formatSom(u.totalSpent)} · {formatOrderDate(u.joinedAt)}dan beri
                  </p>
                </div>
                <button
                  onClick={() => handleToggle(u)}
                  disabled={busy}
                  className={`shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg focus-ring disabled:opacity-50 ${
                    u.status === 'active'
                      ? 'text-red-400 border border-red-500/30 hover:bg-red-500/10'
                      : 'text-neone-accent border border-neone-accent/30 hover:bg-neone-accent/10'
                  }`}
                >
                  {u.status === 'active' ? <Ban size={14} /> : <RotateCcw size={14} />}
                  {busy ? '...' : u.status === 'active' ? 'Bloklash' : 'Faollashtirish'}
                </button>
              </div>
            )
          })}
        </div>
      )}
    </AdminLayout>
  )
}
