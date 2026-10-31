import React from 'react'
import { Clock, User } from 'lucide-react'

export interface ArticleData {
  title: string
  slug: string
  summary: string
  category: string
  author: string
  date: string
  readingTime: string
}

export function HeroArticle({ article }: { article: ArticleData }) {
  return (
    <article className="space-y-4">
      <div className="flex items-center space-x-2">
        <span className="px-2 py-0.5 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider">
          Laporan Utama
        </span>
        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
          {article.category}
        </span>
      </div>

      <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-[1.15] text-zinc-950 hover:text-zinc-700 transition-colors cursor-pointer">
        {article.title}
      </h2>

      <p className="font-serif text-zinc-700 text-base sm:text-lg leading-relaxed">
        {article.summary}
      </p>

      <div className="pt-2 flex items-center space-x-4 text-xs text-zinc-500 border-t border-zinc-100">
        <span className="flex items-center">
          <User className="w-3.5 h-3.5 mr-1" /> {article.author}
        </span>
        <span>•</span>
        <span className="flex items-center">
          <Clock className="w-3.5 h-3.5 mr-1" /> {article.date} ({article.readingTime})
        </span>
      </div>
    </article>
  )
}
