'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useStudioTheme } from '@/lib/useStudioTheme'
import StudioNavbar from '@/components/StudioNavbar'

export default function IntelPage() {
  const [threads, setThreads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null)
  const [zoomImage, setZoomImage] = useState<string | null>(null)
  const { darkMode, toggleTheme } = useStudioTheme()
  const [likes, setLikes] = useState<Record<string, number>>({})

  useEffect(() => {
    fetch('/api/scrape')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setThreads(data.data)
        }
      })
      .catch(err => console.error("Error loading threads:", err))
      .finally(() => setLoading(false))
  }, [])

  const handleCopyPrompt = (id: string, promptText: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    if (navigator.clipboard) {
      navigator.clipboard.writeText(promptText)
      setCopiedPromptId(id)
      setTimeout(() => setCopiedPromptId(null), 2500)
    }
  }

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setLikes(prev => ({ ...prev, [id]: (prev[id] || 150) + 1 }))
  }

  const matchCategory = (cat: string, targetId: string) => {
    if (!cat) return false
    const lower = cat.toLowerCase()
    if (targetId === 'all') return true
    if (targetId === 'papers') return lower.includes('paper') || lower.includes('frontier')
    if (targetId === 'art') return lower.includes('art') || lower.includes('prompt')
    if (targetId === 'coding') return lower.includes('coding') || lower.includes('autonomous') || lower.includes('agent')
    if (targetId === 'design') return lower.includes('design') || lower.includes('motion')
    if (targetId === 'grants') return lower.includes('bansos') || lower.includes('cloud') || lower.includes('quota')
    return false
  }

  const filteredThreads = threads.filter(th => {
    const matchesCat = matchCategory(th.category, activeCategory)
    const matchesQuery = !searchQuery || 
      (th.content && th.content.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (th.author_name && th.author_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (th.category && th.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (th.prompt && th.prompt.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCat && matchesQuery
  })

  const categoryChips = [
    { id: 'all', label: 'Semua Feed' },
    { id: 'papers', label: '📄 Frontier Papers' },
    { id: 'coding', label: '⚡ Coding & Autonomous' },
    { id: 'art', label: '🎨 Generative Art & Prompts' },
    { id: 'design', label: '❤️‍🔥 Design & Motion' },
    { id: 'grants', label: '🎁 Bansos & Cloud Quotas' }
  ]

  return (
    <main className="min-h-screen bg-[#000000] text-zinc-100 font-sans antialiased selection:bg-orange-500 selection:text-white">
      
      {/* 1. UNIFIED STUDIO NAVBAR */}
      <StudioNavbar activeRoute="intel" />

      {/* 2. SUBPAGE HEADER & TABLIST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-6 space-y-6">
        
        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 block">
            {threads.length} intel terverifikasi · sinkronisasi multi-sumber (arXiv + HN + Threads)
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-[300] tracking-[-1px] text-white">
            Community Intel &amp; AI Radar
          </h1>
          <p className="text-sm text-zinc-400 font-sans max-w-2xl leading-relaxed">
            Wawasan developer terverifikasi, riset frontier harian, dan karya visual AI bebas slop lengkap dengan master prompt pembuatannya.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2 border-t border-white/[0.06]">
          {/* Category Filter Chips with Live Counts */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 font-mono text-xs">
            {categoryChips.map(cat => {
              const count = cat.id === 'all' ? threads.length : threads.filter(th => matchCategory(th.category, cat.id)).length
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1 rounded-full border transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    activeCategory === cat.id 
                      ? 'bg-white text-black font-bold border-white' 
                      : 'bg-transparent text-zinc-400 border-white/[0.08] hover:border-white/20'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] ${activeCategory === cat.id ? 'text-zinc-700' : 'text-zinc-500'}`}>
                    ({count})
                  </span>
                </button>
              )
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari riset, author, keyword..."
              className="w-full bg-[#0c0c0e] border border-white/[0.08] rounded-full px-4 py-1 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 font-mono"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xs font-mono"
              >
                ✕
              </button>
            )}
          </div>
        </div>

      </section>

      {/* 3. SIMPLE CARDBOX GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
        
        {loading ? (
          <div className="p-12 text-center font-mono text-xs text-zinc-500">
            Menghubungkan ke live high-signal feed...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredThreads.map(th => (
              <article 
                key={th.id}
                className="silver-beam-wrapper group flex flex-col justify-between !rounded-[14px]"
              >
                <div className="silver-beam-inner flex flex-col justify-between !rounded-[13px] bg-[#0c0c0e] overflow-hidden">
                  {/* 16:9 Image or Media Container */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-950">
                    <img 
                      src={th.image_url || "/screenshots/real/cloudflare_workers_ai.png"} 
                      alt={th.author_name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-transparent"></div>

                    {/* Top-Left Category Badge */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-white text-black shadow">
                        {th.category || "AI Intel"}
                      </span>
                    </div>

                    {/* Top-Right Like Button */}
                    <button 
                      onClick={(e) => handleLike(th.id, e)}
                      className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/60 hover:bg-black/90 text-[10px] font-mono text-zinc-300 backdrop-blur-md border border-white/10 flex items-center gap-1 transition-colors"
                    >
                      <span>♥</span>
                      <span>{likes[th.id] || 210}</span>
                    </button>

                    {/* Center Zoom / Copy Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 backdrop-blur-[2px]">
                      {th.prompt && (
                        <button
                          onClick={(e) => handleCopyPrompt(th.id, th.prompt, e)}
                          className="px-3 py-1.5 rounded-full bg-white text-black font-mono text-[11px] font-bold shadow-xl cursor-pointer"
                        >
                          {copiedPromptId === th.id ? "✓ Copied!" : "Salin Prompt"}
                        </button>
                      )}
                      {th.image_url && (
                        <button
                          onClick={() => setZoomImage(th.image_url)}
                          className="px-3 py-1.5 rounded-full bg-white/[0.15] text-white font-mono text-[11px] font-bold backdrop-blur-md border border-white/20"
                        >
                          Zoom 🔍
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Card Content & Footer */}
                  <div className="p-4 space-y-3 font-mono text-xs flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-2">
                          <img 
                            src={th.author_avatar || "https://avatars.githubusercontent.com/u/241138?v=4"} 
                            alt={th.author_name} 
                            className="w-5 h-5 rounded-full object-cover border border-white/10" 
                          />
                          <span className="font-bold text-white line-clamp-1">{th.author_name}</span>
                        </div>
                        <span className="text-[10px] text-zinc-500 font-mono">@{th.author_handle}</span>
                      </div>

                      <p className="font-sans text-xs text-zinc-300 leading-relaxed line-clamp-3">
                        {th.content}
                      </p>
                    </div>

                    {th.prompt && (
                      <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-[10px] text-zinc-400 font-mono line-clamp-2">
                        <strong className="text-orange-400">Prompt:</strong> {th.prompt}
                      </div>
                    )}

                    <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-zinc-500">
                      <span className="text-zinc-400 font-mono">{th.post_date || "Hari ini"}</span>
                      {th.post_url && (
                        <a href={th.post_url} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white underline">
                          Sumber Asli ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

      </section>

      {/* Lightbox Zoom Modal */}
      {zoomImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setZoomImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl border border-white/20 shadow-2xl">
            <img src={zoomImage} alt="Zoom" className="w-full h-auto max-h-[85vh] object-contain" />
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-white/[0.08] bg-[#000000] py-8 text-center text-xs font-mono text-zinc-500">
        <div>© 2026 OXID LABS. All rights reserved. Built for autonomous engineers.</div>
      </footer>

    </main>
  )
}
