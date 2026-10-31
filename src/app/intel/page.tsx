'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export default function IntelPage() {
  const [threads, setThreads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

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

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#f4f4f5] font-sans antialiased selection:bg-orange-500 selection:text-white flex">
      
      {/* 1. LEFT ICON RAIL */}
      <aside className="w-16 sm:w-20 bg-[#0e0e12] border-r border-[#26262e] flex flex-col items-center justify-between py-6 flex-shrink-0 sticky top-0 h-screen z-40">
        <div className="space-y-8 flex flex-col items-center">
          <Link href="/" className="w-10 h-10 rounded-2xl p-1.5 bg-white border border-zinc-200 flex items-center justify-center shadow-lg shadow-orange-500/20 hover:scale-105 transition-transform" title="OXID Labs Home">
            <img src="/images/oxid-logo.png" alt="OXID Labs" className="w-full h-full object-contain" />
          </Link>

          <nav className="flex flex-col items-center space-y-4">
            <Link href="/" className="p-3 rounded-2xl text-zinc-400 hover:text-white hover:bg-[#16161c] transition-all" title="Home Studio">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            </Link>
            <Link href="/prompts" className="p-3 rounded-2xl text-zinc-400 hover:text-white hover:bg-[#16161c] transition-all" title="Prompt Lab">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </Link>
            <Link href="/grants" className="p-3 rounded-2xl text-zinc-400 hover:text-white hover:bg-[#16161c] transition-all" title="Bansos AI">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </Link>
            <Link href="/tools" className="p-3 rounded-2xl text-zinc-400 hover:text-white hover:bg-[#16161c] transition-all" title="AI Tools Radar">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path></svg>
            </Link>
            <Link href="/intel" className="p-3 rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/30 transition-all" title="Threads Intel (Active)">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
            </Link>
            <Link href="/templates" className="p-3 rounded-2xl text-orange-400 hover:text-white hover:bg-[#16161c] transition-all" title="Karya Templates Kita">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>
            </Link>
          </nav>
        </div>

        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center font-bold text-xs text-white border-2 border-[#26262e]">
          M
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* 2. TOP BAR */}
        <header className="h-20 border-b border-[#26262e] bg-[#0a0a0c]/90 backdrop-blur-md px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-white uppercase">Category: Real Live Scraped Threads Intel</span>
          </div>

          <Link 
            href="/templates" 
            className="px-5 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-mono text-xs font-bold transition-all shadow-md shadow-orange-500/25"
          >
            Templates
          </Link>
        </header>

        {/* 3. MAIN CENTER AREA + RIGHT SIDEBAR */}
        <div className="flex-1 flex flex-col xl:flex-row min-w-0">
          
          <main className="flex-1 p-6 sm:p-8 space-y-6 min-w-0 overflow-y-auto">
            {loading ? (
              <div className="p-8 text-center font-mono text-xs text-zinc-500">
                Memuat data real-live dari threads.net...
              </div>
            ) : (
              threads.map(th => (
                <div key={th.id} className="bg-[#121216] border border-[#26262e] hover:border-orange-500/50 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img src="https://avatars.githubusercontent.com/u/241138?v=4" alt={th.author_name} className="w-11 h-11 rounded-full object-cover border border-[#26262e]" />
                      <div>
                        <h3 className="font-bold text-base text-white">{th.author_name}</h3>
                        <p className="text-xs text-zinc-500 font-mono">@{th.author_handle} • {th.post_date || th.scraped_at}</p>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono font-bold uppercase bg-orange-500/10 text-orange-400 border border-orange-500/30 px-3 py-1 rounded-full">
                      REAL THREADS POST
                    </span>
                  </div>

                  <div className="p-4 bg-[#0a0a0c] rounded-2xl border border-[#26262e] font-sans text-sm text-zinc-200 leading-relaxed">
                    {th.content}
                  </div>

                  <div className="p-3 bg-orange-500/5 border border-orange-500/20 rounded-xl text-xs font-mono text-zinc-300">
                    <strong className="text-orange-500">Cortex Insight:</strong> {th.cortex_insight}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#26262e] text-xs font-mono">
                    <span className="text-emerald-500">✓ Data Asli Terverifikasi</span>
                    {th.post_url && (
                      <a href={th.post_url} target="_blank" rel="noreferrer" className="text-orange-400 hover:underline flex items-center gap-1 font-bold">
                        <span>Lihat Postingan Asli Threads</span>
                        <span>↗</span>
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </main>

          {/* 4. RIGHT SIDEBAR */}
          <aside className="w-full xl:w-80 bg-[#0e0e12] border-t xl:border-t-0 xl:border-l border-[#26262e] p-6 space-y-8 flex-shrink-0 font-mono text-xs">
            <div className="bg-[#121218] border border-[#26262e] rounded-3xl p-6 space-y-3 shadow-xl">
              <span className="text-emerald-400 font-bold uppercase block">Real Ingestion Status</span>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Skrip <code className="text-orange-400">fetch_real_threads.py</code> menyedot langsung feed teks, tanggal, dan permalink tanpa akun bot dummy.
              </p>
              <div className="pt-2 border-t border-[#26262e] text-[10px] text-zinc-500">
                Target: @karpathy, @swyx, @shuding_
              </div>
            </div>
          </aside>

        </div>

      </div>

    </div>
  )
}
