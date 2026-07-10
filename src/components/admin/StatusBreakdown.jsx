import { getStatusMeta } from '../../data/admin'

const TONE_BAR_CLASSES = {
  amber: 'bg-amber-400',
  sky: 'bg-sky-400',
  indigo: 'bg-indigo-400',
  accent: 'bg-neone-accent',
  red: 'bg-red-400',
}

export default function StatusBreakdown({ data }) {
  const max = Math.max(...data.map((d) => d.count))

  return (
    <div className="bg-neone-panel border border-neone-border rounded-2xl p-5">
      <h3 className="text-white font-semibold text-sm mb-5">Buyurtmalar holati bo'yicha taqsimot</h3>
      <div className="flex flex-col gap-4">
        {data.map((d) => {
          const meta = getStatusMeta(d.status)
          return (
            <div key={d.status}>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-neone-muted">{meta.label}</span>
                <span className="text-white font-medium">{d.count.toLocaleString('ru-RU').replace(/,/g, ' ')}</span>
              </div>
              <div className="h-2 bg-neone-card rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${TONE_BAR_CLASSES[meta.tone] || TONE_BAR_CLASSES.amber}`}
                  style={{ width: `${Math.max((d.count / max) * 100, 4)}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
