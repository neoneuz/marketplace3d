import { useState } from 'react'
import { Search } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'
import EmptyState from '../../components/EmptyState'
import OrderStatusBadge from '../../components/orders/OrderStatusBadge'
import { useAdmin } from '../../context/AdminContext'
import { formatSom, formatOrderDate } from '../../data/admin'

const FILTERS = [
  { key: 'all', label: 'Barchasi' },
  { key: 'processing', label: 'Jarayonda' },
  { key: 'confirmed', label: 'Tasdiqlangan' },
  { key: 'shipped', label: "Jo'natilgan" },
  { key: 'delivered', label: 'Yetkazilgan' },
  { key: 'cancelled', label: 'Bekor qilingan' },
]

export default function AdminOrders({ onNavigate, onLogout, onBack }) {
  const { platformOrders } = useAdmin()
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')

  const filtered = platformOrders.filter((o) => {
    if (filter !== 'all' && o.status !== filter) return false
    if (!query.trim()) return true
    const q = query.toLowerCase()
    return o.id.toLowerCase().includes(q) || o.customerName.toLowerCase().includes(q)
  })

  return (
    <AdminLayout title="Buyurtmalar" active="admin-orders" onNavigate={onNavigate} onLogout={onLogout} onBack={onBack}>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neone-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buyurtma raqami yoki mijoz bo'yicha qidirish"
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
        <EmptyState icon={Search} title="Buyurtma topilmadi" message="Qidiruv yoki filtrni o'zgartirib ko'ring" />
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((o) => (
            <div key={o.id} className="bg-neone-panel border border-neone-border rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-white text-sm font-medium">{o.id}</p>
                <p className="text-neone-muted text-xs mt-1 truncate">
                  {o.customerName} · {o.itemsCount} ta mahsulot · {formatOrderDate(o.createdAt, true)}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-white text-sm font-medium">{formatSom(o.total)}</p>
                <OrderStatusBadge status={o.status} className="mt-1" />
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
