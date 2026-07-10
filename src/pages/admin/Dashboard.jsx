import { Users, Store, Package, Wallet, Clock } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'
import StatCard from '../../components/admin/StatCard'
import RevenueChart from '../../components/admin/RevenueChart'
import StatusBreakdown from '../../components/admin/StatusBreakdown'
import OrderStatusBadge from '../../components/orders/OrderStatusBadge'
import { useAdmin } from '../../context/AdminContext'
import { platformStats, revenueTrend, orderStatusBreakdown, recentActivity, formatSom, formatOrderDate } from '../../data/admin'

function formatCount(n) {
  return n.toLocaleString('ru-RU').replace(/,/g, ' ')
}

export default function AdminDashboard({ onNavigate, onLogout, onBack }) {
  const { sellers, platformOrders } = useAdmin()
  const pendingSellers = sellers.filter((s) => s.status === 'pending')

  return (
    <AdminLayout title="Umumiy ko'rinish" active="admin-dashboard" onNavigate={onNavigate} onLogout={onLogout} onBack={onBack}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Wallet} label="Umumiy daromad" value={formatSom(platformStats.totalRevenue)} deltaPct={platformStats.revenueDeltaPct} />
        <StatCard icon={Package} label="Umumiy buyurtmalar" value={formatCount(platformStats.totalOrders)} deltaPct={platformStats.ordersDeltaPct} />
        <StatCard icon={Users} label="Foydalanuvchilar" value={formatCount(platformStats.totalUsers)} deltaPct={platformStats.usersDeltaPct} />
        <StatCard icon={Store} label="Sotuvchilar" value={formatCount(platformStats.totalSellers)} deltaPct={platformStats.sellersDeltaPct} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-5 mb-6">
        <RevenueChart data={revenueTrend} />
        <StatusBreakdown data={orderStatusBreakdown} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-neone-panel border border-neone-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold text-sm">Kutilayotgan sotuvchi arizalari</h3>
            <button onClick={() => onNavigate('admin-sellers')} className="text-neone-accent text-xs font-medium hover:underline focus-ring">
              Barchasi
            </button>
          </div>
          {pendingSellers.length === 0 ? (
            <p className="text-neone-muted text-sm">Hozircha kutilayotgan ariza yo'q.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {pendingSellers.slice(0, 4).map((s) => (
                <div key={s.id} className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">{s.businessName}</p>
                    <p className="text-neone-muted text-xs truncate">{s.category} · {s.region}</p>
                  </div>
                  <span className="text-neone-muted text-xs shrink-0">{formatOrderDate(s.appliedAt)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-neone-panel border border-neone-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold text-sm">So'nggi buyurtmalar</h3>
            <button onClick={() => onNavigate('admin-orders')} className="text-neone-accent text-xs font-medium hover:underline focus-ring">
              Barchasi
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {platformOrders.slice(0, 4).map((o) => (
              <div key={o.id} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-white text-sm font-medium truncate">{o.customerName}</p>
                  <p className="text-neone-muted text-xs">{o.id}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-white text-sm font-medium">{formatSom(o.total)}</p>
                  <OrderStatusBadge status={o.status} className="mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-neone-panel border border-neone-border rounded-2xl p-5 mt-5">
        <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
          <Clock size={15} className="text-neone-muted" /> So'nggi faoliyat
        </h3>
        <div className="flex flex-col gap-3">
          {recentActivity.map((a) => (
            <div key={a.id} className="flex items-start justify-between gap-4 text-sm">
              <p className="text-neone-muted">{a.text}</p>
              <span className="text-neone-muted text-xs shrink-0">{formatOrderDate(a.at, true)}</span>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
