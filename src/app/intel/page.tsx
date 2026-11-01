'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useStudioTheme } from '@/lib/useStudioTheme'

export default function IntelPage() {
  const [threads, setThreads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null)
  const [zoomImage, setZoomImage] = useState<string | null>(null)
  const { darkMode, toggleTheme } = useStudioTheme()

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

  const handleCopyPrompt = (id: string, promptText: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(promptText)
      setCopiedPromptId(id)
      setTimeout(() => setCopiedPromptId(null), 2500)
    }
  }

  const filteredThreads = threads.filter(th => {
    if (activeCategory === 'all') return true
    if (activeCategory === 'art') return th.category?.includes('Art') || th.category?.includes('Prompt')
    if (activeCategory === 'coding') return th.category?.includes('Coding') || th.category?.includes('Autonomous')
    if (activeCategory === 'design') return th.category?.includes('Design') || th.category?.includes('Motion')
    if (activeCategory === 'grants') return th.category?.includes('Bansos') || th.category?.includes('Cloud')
    return true
  })

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-[#0a0a0c] dark:text-[#f4f4f5] font-sans antialiased selection:bg-orange-500 selection:text-white flex transition-colors duration-200">
      
      {/* 1. LEFT ICON RAIL (DESKTOP ONLY) */}
      <aside className="hidden sm:flex w-16 sm:w-20 bg-zinc-50 border-r border-zinc-200 dark:bg-[#0e0e12] dark:border-[#26262e] flex-col items-center justify-between py-6 flex-shrink-0 sticky top-0 h-screen z-40 transition-colors">
        <div className="space-y-8 flex flex-col items-center">
          <Link href="/" className="w-10 h-10 rounded-2xl p-1.5 bg-white border border-zinc-200 flex items-center justify-center shadow-lg shadow-orange-500/20 hover:scale-105 transition-transform" title="OXID Labs Home">
            <img src="/images/oxid-logo.png" alt="OXID Labs" className="w-full h-full object-contain" />
          </Link>

          <nav className="flex flex-col items-center space-y-4">
            <Link href="/" className="p-3 rounded-2xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-[#16161c] transition-all" title="Home Studio">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            </Link>
            <Link href="/prompts" className="p-3 rounded-2xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-[#16161c] transition-all" title="Prompt Lab">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </Link>
            <Link href="/grants" className="p-3 rounded-2xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-[#16161c] transition-all" title="Bansos AI">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </Link>
            <Link href="/tools" className="p-3 rounded-2xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-[#16161c] transition-all" title="AI Tools Radar">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path></svg>
            </Link>
            <Link href="/intel" className="p-3 rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/30 transition-all" title="Threads Intel (Active)">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
            </Link>
            <Link href="/templates" className="p-3 rounded-2xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-[#16161c] transition-all" title="Karya Templates Kita">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>
            </Link>
          </nav>
        </div>

        <div className="w-10 h-10 rounded-2xl bg-white p-1 border border-zinc-200 flex items-center justify-center shadow-lg shadow-orange-500/20" title="OXID Security Verified">
          <img src="/images/oxid-logo.png" alt="OXID" className="w-full h-full object-contain" />
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* 2. TOP BAR (MOBILE RESPONSIVE COMPACT WITH THEME TOGGLE) */}
        <header className="border-b border-zinc-200 dark:border-[#26262e] bg-white/95 dark:bg-[#0a0a0c]/95 backdrop-blur-md p-4 sm:px-8 sticky top-0 z-30 font-mono text-xs transition-colors">
          <div className="flex items-center justify-between pb-3">
            <div className="flex items-center gap-2">
              <Link href="/" className="sm:hidden w-7 h-7 rounded-full bg-white p-1 flex items-center justify-center mr-1 border border-zinc-200">
                <img src="/images/oxid-logo.png" alt="OXID" className="w-full h-full object-contain" />
              </Link>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-bold text-zinc-900 dark:text-white uppercase text-[11px] sm:text-xs">
                Live Radar &amp; Generative Art Intel
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-1.5 sm:px-3 sm:py-1.5 rounded-full border border-zinc-300 dark:border-[#26262e] bg-zinc-100 hover:bg-zinc-200 dark:bg-[#16161c] dark:hover:bg-[#202028] text-xs font-mono font-bold flex items-center gap-1 cursor-pointer transition-all"
                title="Ganti Tema (Light/Dark)"
              >
                <span>{darkMode ? '🌙' : '☀️'}</span>
                <span className="hidden md:inline text-[11px]">{darkMode ? 'Dark' : 'Light'}</span>
              </button>

              <Link 
                href="/templates" 
                className="px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-mono text-xs font-bold transition-all shadow-md shadow-orange-500/25 whitespace-nowrap"
              >
                Templates
              </Link>
            </div>
          </div>

          {/* Category Filter Pills Bar */}
          <div className="flex items-center space-x-2 pt-2 border-t border-zinc-200/80 dark:border-[#26262e]/40 overflow-x-auto scrollbar-none">
            {[
              { id: 'all', label: `Semua Intel (${threads.length})` },
              { id: 'art', label: '🎨 AI Generative Art & Prompts' },
              { id: 'coding', label: '⚡ Autonomous AI & Coding' },
              { id: 'design', label: '❤️‍🔥 Design & Motion Skills' },
              { id: 'grants', label: '🎁 Bansos AI & Cloud Quotas' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer whitespace-nowrap text-[11px] ${activeCategory === cat.id ? 'bg-orange-500 text-white shadow-sm' : 'bg-zinc-200/80 text-zinc-600 hover:text-black dark:bg-[#16161c] dark:text-zinc-400 dark:hover:text-white'}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </header>

        {/* 3. MAIN CENTER AREA + RIGHT SIDEBAR */}
        <div className="flex-1 flex flex-col xl:flex-row min-w-0">
          
          <main className="flex-1 p-4 sm:p-8 pb-28 sm:pb-8 space-y-6 min-w-0 overflow-y-auto">
            {loading ? (
              <div className="p-8 text-center font-mono text-xs text-zinc-500">
                Memuat data wawasan riil dan prompt AI...
              </div>
            ) : filteredThreads.length === 0 ? (
              <div className="p-12 text-center font-mono text-xs text-zinc-500 bg-zinc-50 dark:bg-[#121216] rounded-3xl border border-zinc-200 dark:border-[#26262e]">
                Belum ada data untuk kategori ini.
              </div>
            ) : (
              filteredThreads.map(th => (
                <div key={th.id} className="bg-zinc-50 dark:bg-[#121216] border border-zinc-200 dark:border-[#26262e] hover:border-orange-500/50 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm dark:shadow-xl transition-all">
                  
                  {/* Author Header & Badges */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={th.author_avatar || "https://avatars.githubusercontent.com/u/241138?v=4"} 
                        alt={th.author_name} 
                        className="w-11 h-11 rounded-full object-cover border border-zinc-300 dark:border-[#26262e] shadow-xs" 
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-base text-zinc-900 dark:text-white">{th.author_name}</h3>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-[#1a1a24] text-zinc-700 dark:text-zinc-300">
                            @{th.author_handle}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 font-mono mt-0.5">
                          {th.post_date || th.scraped_at}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono font-bold uppercase bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/30 px-3 py-1 rounded-full">
                        {th.category || "General Intelligence"}
                      </span>
                      {th.model_used && (
                        <span className="text-[10px] font-mono font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-full">
                          ⚡ {th.model_used}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* AI Generated Image Showcase (If Present) */}
                  {th.image_url && (
                    <div className="space-y-2">
                      <div 
                        onClick={() => setZoomImage(th.image_url)}
                        className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden bg-black/60 border border-zinc-200 dark:border-[#26262e] cursor-pointer group shadow-inner"
                      >
                        <img 
                          src={th.image_url} 
                          alt={th.content} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-4">
                          <span className="text-xs font-mono text-zinc-300 bg-black/70 px-3 py-1 rounded-full border border-white/20">
                            🔍 Klik untuk Zoom Gambar Penuh
                          </span>
                          {th.aspect_ratio && (
                            <span className="text-xs font-mono text-orange-400 bg-black/70 px-2.5 py-0.5 rounded-full border border-white/20 font-bold">
                              AR: {th.aspect_ratio}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Text Content */}
                  <div className="p-4 bg-white dark:bg-[#0a0a0c] rounded-2xl border border-zinc-200 dark:border-[#26262e] font-sans text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed transition-colors">
                    {th.content}
                  </div>

                  {/* AI Prompt Reproduction Box (If Present) */}
                  {th.prompt && (
                    <div className="p-4 bg-zinc-100 dark:bg-[#08080c] border border-zinc-300 dark:border-[#26262e] rounded-2xl font-mono text-xs space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-purple-500 font-bold">✦</span>
                          <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">
                            Master Prompt Pembuatan AI:
                          </span>
                        </div>
                        <button
                          onClick={() => handleCopyPrompt(th.id, th.prompt)}
                          className="px-3.5 py-1 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all shadow-sm cursor-pointer text-[11px]"
                        >
                          {copiedPromptId === th.id ? "✓ Prompt Tersalin!" : "Salin Prompt Gambar"}
                        </button>
                      </div>
                      <div className="p-3 bg-white dark:bg-black/60 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300 leading-relaxed overflow-x-auto whitespace-pre-wrap">
                        {th.prompt}
                      </div>
                    </div>
                  )}

                  {/* Cortex Insight */}
                  <div className="p-3 bg-orange-500/5 border border-orange-500/20 rounded-xl text-xs font-mono text-zinc-700 dark:text-zinc-300">
                    <strong className="text-orange-500">Cortex Insight:</strong> {th.cortex_insight}
                  </div>

                  {/* Bottom Footer Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-[#26262e] text-xs font-mono transition-colors">
                    <span className="text-emerald-600 dark:text-emerald-500 flex items-center gap-1.5 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>Verified High-Signal Content</span>
                    </span>
                    {th.post_url && (
                      <a href={th.post_url} target="_blank" rel="noreferrer" className="text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1 font-bold">
                        <span>Lihat Sumber Asli</span>
                        <span>↗</span>
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </main>

          {/* 4. RIGHT SIDEBAR */}
          <aside className="w-full xl:w-80 bg-zinc-50 dark:bg-[#0e0e12] border-t xl:border-t-0 xl:border-l border-zinc-200 dark:border-[#26262e] p-6 space-y-6 flex-shrink-0 font-mono text-xs transition-colors">
            <div className="bg-white dark:bg-[#121218] border border-zinc-200 dark:border-[#26262e] rounded-3xl p-6 space-y-3 shadow-sm dark:shadow-xl transition-colors">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase block">High-Signal Gateway</span>
              <p className="text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed">
                Filter otomatis membuang postingan pendek, meme, dan teks receh. Hanya menyerap wawasan teknis, kuota gratis, dan seni visual AI dengan prompt reproduksi nyata.
              </p>
              <div className="pt-2 border-t border-zinc-200 dark:border-[#26262e] text-[10px] text-zinc-500 space-y-1">
                <div>Kategori: Coding, Design, Bansos, Generative Art</div>
                <div>Sumber: Komunitas Kreator, GitHub, Meta Threads</div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#121218] border border-zinc-200 dark:border-[#26262e] rounded-3xl p-6 space-y-3 shadow-sm dark:shadow-xl transition-colors">
              <span className="text-orange-500 font-bold uppercase block">Prompt Feature Status</span>
              <p className="text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed">
                Setiap gambar AI yang dibagikan komunitas otomatis diekstrak beserta prompt pembuatannya agar dapat langsung digunakan di Midjourney, Flux, atau Claude.
              </p>
            </div>
          </aside>

        </div>

      </div>

      {/* Lightbox Zoom Modal */}
      {zoomImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setZoomImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl border border-orange-500/40 shadow-2xl">
            <button 
              onClick={() => setZoomImage(null)}
              className="absolute top-4 right-4 bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold hover:bg-orange-600 transition-all cursor-pointer shadow-lg"
            >
              ✕
            </button>
            <img src={zoomImage} alt="AI Artwork Zoom" className="w-full h-auto max-h-[85vh] object-contain" />
          </div>
        </div>
      )}

      {/* SLEEK FLOATING MOBILE BOTTOM NAVIGATION BAR */}
      <div className="sm:hidden fixed bottom-3 inset-x-4 z-50 bg-white/95 dark:bg-[#0e0e12]/95 backdrop-blur-xl border border-zinc-200 dark:border-[#26262e] rounded-full p-2 flex items-center justify-around shadow-2xl transition-colors">
        <Link href="/" className="p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white flex flex-col items-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          <span className="text-[9px] font-mono font-bold mt-0.5">Home</span>
        </Link>
        <Link href="/prompts" className="p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white flex flex-col items-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          <span className="text-[9px] font-mono font-bold mt-0.5">Prompts</span>
        </Link>
        <Link href="/grants" className="p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white flex flex-col items-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span className="text-[9px] font-mono font-bold mt-0.5">Bansos</span>
        </Link>
        <Link href="/tools" className="p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white flex flex-col items-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path></svg>
          <span className="text-[9px] font-mono font-bold mt-0.5">Radar</span>
        </Link>
        <Link href="/intel" className="p-2 text-orange-500 flex flex-col items-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
          <span className="text-[9px] font-mono font-bold mt-0.5">Intel</span>
        </Link>
        <Link href="/templates" className="p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white flex flex-col items-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>
          <span className="text-[9px] font-mono font-bold mt-0.5">Templates</span>
        </Link>
      </div>

    </div>
  )
}
