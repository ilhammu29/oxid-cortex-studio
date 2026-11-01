'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useStudioTheme } from '@/lib/useStudioTheme'
import { useBookmarks } from '@/lib/useBookmarks'
import PromptPlaygroundModal from '@/components/PromptPlaygroundModal'
import ModelComparisonArenaModal from '@/components/ModelComparisonArenaModal'

export default function PromptsPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [isArenaOpen, setIsArenaOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [playgroundData, setPlaygroundData] = useState<{ open: boolean; prompt: string; title: string }>({
    open: false,
    prompt: '',
    title: ''
  })
  const { darkMode, toggleTheme } = useStudioTheme()
  const { toggleBookmark, isBookmarked } = useBookmarks()
  const [likes, setLikes] = useState<Record<string, number>>({
    'hero_agent_copilot': 1250,
    'prompt_bento_1': 842,
    'prompt_swiss_2': 615,
    'prompt_arch_3': 1820,
    'prompt_refactor_4': 940,
    'prompt_first_principle_5': 730,
    'prompt_luxury_6': 490,
    'prompt_db_7': 880
  })

  const openPlayground = (title: string, prompt: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setPlaygroundData({ open: true, title, prompt })
  }

  const handleCopy = (id: string, text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
    }
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2500)
  }

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setLikes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  }

  const promptGrid = [
    {
      id: "hero_agent_copilot",
      title: "Autonomous Agent Copilot",
      creator: "Andrej Karpathy",
      category: "Architecture",
      badge: "Flagship",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
      body: `Design a developer-first Autonomous AI Agent studio workspace.
Key Specifications:
- Structure: 3-pane cardbox layout with DAG agent viewer on left, live streaming terminal log in center, and contextual token/memory inspector on right.
- Color: Monochromatic matte carbon (#0a0a0c), cyber flame orange glow (#ff5722), neon cyan status (#06b6d4).
- Interactions: Collapsible drawer, floating command bar (Ctrl+K), and live process kill/retry buttons.`
    },
    {
      id: "prompt_arch_3",
      title: "Senior Full-Stack Architect",
      creator: "OXID Architecture Collective",
      category: "Architecture",
      badge: "Hot",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
      body: `Bertindaklah sebagai Lead Software Architect kelas dunia. Bangun arsitektur aplikasi tanpa boilerplate palsu dan tanpa pola AI slop. Utamakan stdlib/native, exit code 0, dan modular API contract.`
    },
    {
      id: "prompt_refactor_4",
      title: "Surgical Code Refactoring",
      creator: "Aira Core",
      category: "Refactoring",
      badge: "Core",
      image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&auto=format&fit=crop&q=80",
      body: `Senior Systems Developer yang memegang prinsip lazy engineering efisien (YAGNI). Refactoring kode dengan memangkas baris, hapus abstraksi berlebih, pertahankan backward compatibility.`
    },
    {
      id: "prompt_bento_1",
      title: "Fintech Wealth Bento",
      creator: "Shu Ding",
      category: "UI/UX Bento",
      badge: "Popular",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
      body: `Design a high-end institutional wealth management dashboard in Tailwind CSS and Next.js. Bento Grid with live candlestick feeds, yield curve tracker, and liquidity metrics.`
    },
    {
      id: "prompt_swiss_2",
      title: "Swiss Editorial Journal",
      creator: "swyx",
      category: "UI/UX Bento",
      badge: "Verified",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=80",
      body: `Create a clean, human-centric editorial web magazine interface inspired by Swiss typography. Lora serif headlines, generous white space, and zero noisy banners.`
    },
    {
      id: "prompt_first_principle_5",
      title: "First-Principle Problem Breakdown",
      creator: "OXID Metacortex",
      category: "Reasoning",
      badge: "Core",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=80",
      body: `Bedah masalah dari prinsip paling mendasar: bongkar asumsi lumrah, pecah ke komponen fundamental, rekonstruksi solusi baru tanpa meniru pasar, hasilkan 3 opsi keputusan 1-3-1.`
    },
    {
      id: "prompt_luxury_6",
      title: "Luxury Minimalist Hardware Showcase",
      creator: "Shu Ding",
      category: "UI/UX Bento",
      badge: "Trending",
      image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=800&auto=format&fit=crop&q=80",
      body: `Ultra-minimalist flagship product launch page for bespoke hardware. Full-bleed product render hero, smooth scroll perspective reveal, and exploded view components.`
    },
    {
      id: "prompt_db_7",
      title: "Deterministic Supabase Schema & RLS",
      creator: "OXID Database Engineer",
      category: "Architecture",
      badge: "Verified",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
      body: `Tulis skema database PostgreSQL Supabase kelas produksi: foreign key terindeks, RLS policies ketat, enum types, trigger auto-updated_at, dan security hardening.`
    }
  ]

  const categories = Array.from(new Set(promptGrid.map(p => p.category)))

  const filteredPrompts = promptGrid.filter(p => {
    if (activeCategory !== 'all' && p.category !== activeCategory) return false
    if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase()) && !p.body.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (activeTab === 'saved' && !isBookmarked(p.id)) return false
    return true
  })

  return (
    <main className="min-h-screen bg-[#000000] text-zinc-100 font-sans antialiased selection:bg-orange-500 selection:text-white">
      
      {/* 1. GETLAYERS STICKY TOP NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#000000]/90 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3">
          
          <Link href="/" className="flex items-center gap-2.5 group cursor-pointer flex-shrink-0" title="OXID CORTEX STUDIO">
            <div className="w-7 h-7 rounded-full bg-white p-1 flex items-center justify-center shadow-md shadow-white/10 group-hover:scale-105 transition-transform flex-shrink-0">
              <img src="/images/oxid-logo.png" alt="OXID" className="w-full h-full object-contain" />
            </div>
            <div className="flex items-center font-sans text-sm font-bold tracking-tight text-white">
              <span>OXID</span>
              <span className="text-zinc-400 font-light ml-1">CORTEX</span>
            </div>
          </Link>

          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-400 w-64">
            <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input 
              type="text" 
              placeholder="Search prompts..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-white text-xs w-full placeholder-zinc-500"
            />
          </div>

          <nav className="hidden lg:flex items-center px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono font-medium text-zinc-400 space-x-5">
            <Link href="/templates" className="hover:text-white transition-colors">Templates</Link>
            <Link href="/prompts" className="text-white font-bold transition-colors">Prompt Lab</Link>
            <Link href="/grants" className="hover:text-white transition-colors flex items-center gap-1.5">
              <span>Bansos AI</span>
              <span className="px-1.5 py-0.2 text-[9px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 rounded-full font-bold">Free</span>
            </Link>
            <Link href="/tools" className="hover:text-white transition-colors">Tools Radar</Link>
            <Link href="/intel" className="hover:text-white transition-colors">Threads Intel</Link>
          </nav>

          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setIsArenaOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-zinc-300"
            >
              <span>⚔️ Arena</span>
            </button>

            <Link 
              href="/" 
              className="px-4 py-1.5 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-mono font-bold transition-all"
            >
              ← Beranda
            </Link>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-400"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
          </div>

        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/[0.08] bg-[#000000]/95 backdrop-blur-2xl p-4 space-y-3 font-mono text-xs">
            <Link href="/templates" onClick={() => setMobileMenuOpen(false)} className="block p-2.5 rounded-xl bg-white/[0.04] text-white">✨ Templates</Link>
            <Link href="/prompts" onClick={() => setMobileMenuOpen(false)} className="block p-2.5 rounded-xl bg-white/[0.04] text-white font-bold">⚡ Prompt Lab</Link>
            <Link href="/grants" onClick={() => setMobileMenuOpen(false)} className="block p-2.5 rounded-xl bg-white/[0.04] text-emerald-400">🎁 Bansos AI</Link>
            <Link href="/tools" onClick={() => setMobileMenuOpen(false)} className="block p-2.5 rounded-xl bg-white/[0.04] text-white">🛠️ Tools Radar</Link>
            <Link href="/intel" onClick={() => setMobileMenuOpen(false)} className="block p-2.5 rounded-xl bg-white/[0.04] text-white">🌐 Threads Intel</Link>
          </div>
        )}
      </header>

      {/* 2. GETLAYERS SUBPAGE HEADER & TABLIST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-6 space-y-6">
        
        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block">
            {promptGrid.length} master prompts · zero hallucination &amp; anti-slop
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-[300] tracking-[-1px] text-white">
            Production AI Prompts &amp; Engineering Doctrines
          </h1>
          <p className="text-sm text-zinc-400 font-sans max-w-2xl leading-relaxed">
            Kumpulan master prompt teruji untuk Claude Code, Cursor, Windsurf, dan Hermes. Salin prompt atau jalankan langsung di browser playground.
          </p>
        </div>

        {/* Tablist Pill Bar */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/[0.08] font-mono text-xs w-fit">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${activeTab === 'all' ? 'bg-white text-black font-bold shadow' : 'text-zinc-400 hover:text-white'}`}
          >
            Semua Prompts ({promptGrid.length})
          </button>
          <button 
            onClick={() => setActiveTab('saved')}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === 'saved' ? 'bg-white text-black font-bold shadow' : 'text-zinc-400 hover:text-white'}`}
          >
            <span>⭐ Favourites</span>
            <span>({promptGrid.filter(p => isBookmarked(p.id)).length})</span>
          </button>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] font-mono border-t border-white/[0.06]">
          <span className="text-zinc-500 uppercase tracking-wider text-[10px]">CATEGORY:</span>
          <button 
            onClick={() => setActiveCategory('all')}
            className={`px-2.5 py-1 rounded-full border transition-all cursor-pointer ${activeCategory === 'all' ? 'bg-white text-black font-bold border-white' : 'bg-transparent text-zinc-400 border-white/[0.08] hover:border-white/20'}`}
          >
            Semua
          </button>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 rounded-full border transition-all cursor-pointer ${activeCategory === cat ? 'bg-white text-black font-bold border-white' : 'bg-transparent text-zinc-400 border-white/[0.08] hover:border-white/20'}`}
            >
              {cat} ({promptGrid.filter(p => p.category === cat).length})
            </button>
          ))}
        </div>

      </section>

      {/* 3. SIMPLE CARDBOX GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          
          {filteredPrompts.map((p, idx) => (
            <React.Fragment key={p.id}>
              
              {/* Simple Cardbox */}
              <article 
                onClick={() => handleCopy(p.id, p.body)}
                className="group relative bg-[#0c0c0e] border border-white/[0.08] hover:border-white/[0.2] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between cursor-pointer"
              >
                {/* 16:9 Image Container */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-950">
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                  {/* Top-Left Badge */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-white text-black shadow">
                      {p.badge}
                    </span>
                  </div>

                  {/* Top-Right Like Button */}
                  <button 
                    onClick={(e) => handleLike(p.id, e)}
                    className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/60 hover:bg-black/90 text-[10px] font-mono text-zinc-300 backdrop-blur-md border border-white/10 flex items-center gap-1 transition-colors"
                  >
                    <span>♥</span>
                    <span>{likes[p.id] || 350}</span>
                  </button>

                  {/* Center Copy / Run Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 backdrop-blur-[2px]">
                    <span className="px-3 py-1.5 rounded-full bg-white text-black font-mono text-[11px] font-bold shadow-xl">
                      {copiedId === p.id ? "✓ Copied!" : "Salin Prompt"}
                    </span>
                    <button
                      onClick={(e) => openPlayground(p.title, p.body, e)}
                      className="px-3 py-1.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-mono text-[11px] font-bold shadow-xl"
                    >
                      ▶ Run
                    </button>
                  </div>
                </div>

                {/* Card Footer Bar */}
                <div className="p-3.5 flex items-center justify-between border-t border-white/[0.06] font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-1">
                      {p.title}
                    </span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] bg-white/[0.08] text-zinc-400 font-mono flex-shrink-0">
                      Free
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-500 flex-shrink-0">
                    {p.category}
                  </span>
                </div>
              </article>

              {/* In-Grid Promotional Banner at Slot #4 */}
              {idx === 3 && (
                <div className="bg-[#0c0c0e] border border-white/[0.1] rounded-2xl p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-orange-400 font-bold">
                        Interactive Runner
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white leading-snug">
                      In-Browser AI Prompt Playground
                    </h3>
                    <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                      Jalankan prompt secara langsung dengan streaming live token dan integrasi multi-model.
                    </p>
                  </div>
                  <button 
                    onClick={() => openPlayground(p.title, p.body)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-white text-black text-xs font-mono font-bold hover:bg-zinc-200 transition-all text-center cursor-pointer"
                  >
                    <span>Buka Playground</span>
                    <span>→</span>
                  </button>
                </div>
              )}

            </React.Fragment>
          ))}

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.08] bg-[#000000] py-8 text-center text-xs font-mono text-zinc-500">
        <div>© 2026 OXID LABS. All rights reserved. Built for autonomous engineers.</div>
      </footer>

      {/* Modals */}
      <PromptPlaygroundModal
        isOpen={playgroundData.open}
        onClose={() => setPlaygroundData({ open: false, prompt: '', title: '' })}
        initialPrompt={playgroundData.prompt}
        initialTitle={playgroundData.title}
      />
      <ModelComparisonArenaModal
        isOpen={isArenaOpen}
        onClose={() => setIsArenaOpen(false)}
      />

    </main>
  )
}
