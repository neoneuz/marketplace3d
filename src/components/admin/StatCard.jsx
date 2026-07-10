import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

export default function StatCard({ icon: Icon, label, value, deltaPct, deltaLabel = 'shu oyda' }) {
  const hasDelta = typeof deltaPct === 'number'
  const isPositive = deltaPct >= 0

  return (
    <div className="bg-neone-panel border border-neone-border rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="w-9 h-9 rounded-xl bg-neone-card flex items-center justify-center text-neone-accent">
          {Icon && <Icon size={18} />}
        </span>
        {hasDelta && (
          <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${isPositive ? 'text-neone-accent' : 'text-red-400'}`}>
            {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {Math.abs(deltaPct)}%
          </span>
        )}
      </div>
      <p className="text-white text-2xl font-bold leading-tight truncate">{value}</p>
      <p className="text-neone-muted text-sm mt-1">{label}</p>
      {hasDelta && <p className="text-neone-muted text-[11px] mt-2">{deltaLabel}</p>}
    </div>
  )
}
