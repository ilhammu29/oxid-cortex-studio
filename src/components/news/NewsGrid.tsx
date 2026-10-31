import React from 'react'
import { ArticleData } from './HeroArticle'

export function NewsGrid({ articles }: { articles: ArticleData[] }) {
  return (
    <section className="py-12 border-b border-zinc-200">
      <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-8">
        <h3 className="font-serif text-2xl font-bold text-zinc-950">
          Kabar Terkini & Investigasi
        </h3>
        <span className="text-xs font-semibold text-red-600 hover:underline cursor-pointer">
          Lihat Semua Indeks &rarr;
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((art, idx) => (
          <article key={idx} className="group cursor-pointer space-y-3 flex flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-200 pb-6 md:pb-0 md:pr-6 last:border-r-0">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest">
                {art.category}
              </span>
              <h4 className="font-serif text-xl font-bold text-zinc-900 group-hover:text-red-700 transition-colors leading-snug">
                {art.title}
              </h4>
              <p className="font-serif text-xs text-zinc-600 leading-relaxed line-clamp-3">
                {art.summary}
              </p>
            </div>
            <div className="pt-3 text-[11px] text-zinc-400 border-t border-zinc-100 flex items-center justify-between">
              <span>{art.author}</span>
              <span>{art.readingTime}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
