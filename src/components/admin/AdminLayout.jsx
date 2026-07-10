import { ChevronLeft, ShieldCheck } from 'lucide-react'
import AdminSidebar from './AdminSidebar'

export default function AdminLayout({ title, active, onNavigate, onLogout, onBack, children }) {
  return (
    <main className="px-4 sm:px-8 py-6">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="text-neone-muted hover:text-white focus-ring">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-white text-xl font-bold">{title}</h1>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-neone-accent bg-neone-accent/10 px-2 py-1 rounded-md">
          <ShieldCheck size={12} /> Admin
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
        <AdminSidebar active={active} onNavigate={onNavigate} onLogout={onLogout} />
        <div className="min-w-0">{children}</div>
      </div>
    </main>
  )
}
