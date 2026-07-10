import { useState } from 'react'
import { Search, Check, X, Ban, RotateCcw, Star } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'
import EmptyState from '../../components/EmptyState'
import { useAdmin } from '../../context/AdminContext'
import { formatSom, formatOrderDate, getSellerStatusMeta, getSellerStatusBadgeClass } from '../../data/admin'

const FILTERS = [
  { key: 'pending', label: 'Kutilmoqda' },
  { key: 'active', label: 'Faol' },
  { key: 'suspended', label: 'Bloklangan' },
  { key: 'rejected', label: 'Rad etilgan' },
]

export default function AdminSellers({ onNavigate, onLogout, onBack }) {
  const { sellers, approveSeller, rejectSeller, suspendSeller, reactivateSeller } = useAdmin()
  const [filter, setFilter] = useState('pending')
  const [query, setQuery] = useState('')
  const [pendingId, setPendingId] = useState(null)

  const filtered = sellers.filter((s) => {
    if (s.status !== filter) return false
    if (!query.trim()) return true
    const q = query.toLowerCase()
    return s.businessName.toLowerCase().includes(q) || s.ownerName.toLowerCase().includes(q)
  })

  async function runAction(id, fn) {
    setPendingId(id)
    await fn(id)
    setPendingId(null)
  }

  return (
    <AdminLayout title="Sotuvchilar" active="admin-sellers" onNavigate={onNavigate} onLogout={onLogout} onBack={onBack}>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neone-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Do'kon yoki egasi bo'yicha qidirish"
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
        <EmptyState icon={Search} title="Sotuvchi topilmadi" message="Bu bo'limda hozircha hech narsa yo'q" />
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((s) => {
            const meta = getSellerStatusMeta(s.status)
            const busy = pendingId === s.id
            return (
              <div key={s.id} className="bg-neone-panel border border-neone-border rounded-2xl p-4 sm:p-5">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-white text-sm font-medium truncate">{s.businessName}</p>
                    <span className={`inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-md ${getSellerStatusBadgeClass(s.status)}`}>
                      {meta.label}
                    </span>
                  </div>
                  <p className="text-neone-muted text-xs mt-1">
                    {s.ownerName} · {s.category} · {s.region}
                  </p>
                  <p className="text-neone-muted text-xs mt-0.5 flex items-center gap-1">
                    {s.status === 'pending' ? (
                      `${formatOrderDate(s.appliedAt)}da ariza topshirgan`
                    ) : (
                      <>
                        {s.productsCount} ta mahsulot · {formatSom(s.totalSales)}
                        {s.rating && (
                          <span className="inline-flex items-center gap-0.5 ml-1">
                            · <Star size={11} className="text-amber-400 fill-amber-400" /> {s.rating}
                          </span>
                        )}
                      </>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-neone-border">
                  {s.status === 'pending' && (
                    <>
                      <button
                        onClick={() => runAction(s.id, approveSeller)}
                        disabled={busy}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg text-neone-accent border border-neone-accent/30 hover:bg-neone-accent/10 focus-ring disabled:opacity-50"
                      >
                        <Check size={14} /> {busy ? '...' : 'Tasdiqlash'}
                      </button>
                      <button
                        onClick={() => runAction(s.id, rejectSeller)}
                        disabled={busy}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg text-red-400 border border-red-500/30 hover:bg-red-500/10 focus-ring disabled:opacity-50"
                      >
                        <X size={14} /> Rad etish
                      </button>
                    </>
                  )}
                  {s.status === 'active' && (
                    <button
                      onClick={() => runAction(s.id, suspendSeller)}
                      disabled={busy}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg text-red-400 border border-red-500/30 hover:bg-red-500/10 focus-ring disabled:opacity-50"
                    >
                      <Ban size={14} /> {busy ? '...' : 'Bloklash'}
                    </button>
                  )}
                  {s.status === 'suspended' && (
                    <button
                      onClick={() => runAction(s.id, reactivateSeller)}
                      disabled={busy}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg text-neone-accent border border-neone-accent/30 hover:bg-neone-accent/10 focus-ring disabled:opacity-50"
                    >
                      <RotateCcw size={14} /> {busy ? '...' : "Qayta faollashtirish"}
                    </button>
                  )}
                  {s.status === 'rejected' && <span className="text-neone-muted text-xs">Amal talab qilinmaydi</span>}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </AdminLayout>
  )
}
