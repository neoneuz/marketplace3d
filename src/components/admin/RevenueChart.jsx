import { formatSom } from '../../data/admin'

export default function RevenueChart({ data }) {
  const max = Math.max(...data.map((d) => d.value))

  return (
    <div className="bg-neone-panel border border-neone-border rounded-2xl p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-white font-semibold text-sm">Daromad dinamikasi</h3>
        <span className="text-neone-muted text-xs">Oxirgi 6 oy</span>
      </div>
      <div className="flex items-end gap-3 h-40">
        {data.map((d) => (
          <div key={d.label} className="group flex-1 h-full flex flex-col items-center justify-end gap-2">
            <span className="text-neone-muted text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {formatSom(d.value)}
            </span>
            <div
              className="w-full max-w-[28px] rounded-t-md bg-neone-accent/80 group-hover:bg-neone-accent transition-colors"
              style={{ height: `${Math.max((d.value / max) * 100, 6)}%` }}
            />
            <span className="text-neone-muted text-[11px]">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
