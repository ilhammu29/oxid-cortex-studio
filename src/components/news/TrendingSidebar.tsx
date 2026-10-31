import React from 'react'
import { TrendingUp } from 'lucide-react'

export interface TrendingItem {
  number: string
  title: string
  category: string
  timeAgo: string
}

export function TrendingSidebar({ items }: { items: TrendingItem[] }) {
  return (
    <aside className="space-y-6">
      <div className="flex items-center space-x-2 border-b-2 border-zinc-900 pb-2">
        <TrendingUp className="w-4 h-4 text-red-600" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-900">
          Terpopuler & Trending
        </h3>
      </div>

      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-start space-x-4 group cursor-pointer border-b border-zinc-100 pb-4 last:border-b-0">
            <span className="font-serif text-2xl font-black text-zinc-300 group-hover:text-red-600 transition-colors">
              {item.number}
            </span>
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                {item.category} • {item.timeAgo}
              </span>
              <h4 className="font-serif text-sm font-semibold text-zinc-900 group-hover:underline leading-snug">
                {item.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}
