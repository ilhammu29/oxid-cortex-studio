'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useStudioTheme } from '@/lib/useStudioTheme'
import { useBookmarks } from '@/lib/useBookmarks'

export default function TemplatesPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('all')
  const [activeTone, setActiveTone] = useState<'all' | 'dark' | 'light'>('all')
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [zoomImage, setZoomImage] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { darkMode, toggleTheme } = useStudioTheme()
  const { toggleBookmark, isBookmarked } = useBookmarks()
  const [likes, setLikes] = useState<Record<string, number>>({
    'lumiere': 142,
    'prisma': 289,
    'vesper': 310,
    'stride': 245,
    'aistudio': 412,
    'dantora': 198,
    'kyoto': 523,
    'clarix': 167,
    'pro_4pane': 340,
    'duke_nft': 275,
    'swiss_journal': 210,
    'hardware_showcase': 185
  })

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

  const templatesList = [
    {
      id: "lumiere",
      title: "Lumière",
      category: "E-commerce",
      tone: "dark",
      badge: "New",
      likes: 142,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
      prompt: `Create a luxury high-end editorial fragrance e-commerce store with minimal Swiss typography, generous whitespace, smooth scroll-driven product reveal, and dark matte aesthetic. Built in Next.js 14 and Tailwind CSS.`
    },
    {
      id: "prisma",
      title: "Prisma",
      category: "AI / Tech",
      tone: "dark",
      badge: "Hot",
      likes: 289,
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      prompt: `Design an immersive developer workspace for autonomous coding agents with neon telemetry charts, dark glassmorphism backplate, and high-performance latency monitors.`
    },
    {
      id: "vesper",
      title: "Vesper",
      category: "SaaS",
      tone: "dark",
      badge: "Popular",
      likes: 310,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      prompt: `Build a modern B2B analytics platform dashboard featuring asymmetric bento grids, real-time candlestick feeds, and dark obsidian aesthetic.`
    },
    {
      id: "stride",
      title: "Stride",
      category: "Fintech",
      tone: "dark",
      badge: "Hot",
      likes: 245,
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
      prompt: `Institutional wealth management portal with clean border-1px lines, multi-currency portfolio breakdown, and micro-interactions.`
    },
    {
      id: "aistudio",
      title: "AI Studio",
      category: "AI / Tech",
      tone: "dark",
      badge: "Frontier",
      likes: 412,
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
      prompt: `Autonomous AI multi-agent orchestration console with live terminal logs, DAG pipeline visualizer, and token consumption analytics.`
    },
    {
      id: "dantora",
      title: "Dantora",
      category: "Health / Science",
      tone: "dark",
      badge: "Featured",
      likes: 198,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
      prompt: `Biotechnology & genomic data explorer web application with clean scientific grid, high contrast data tables, and WCAG AAA compliance.`
    },
    {
      id: "kyoto",
      title: "Kyoto Villa",
      category: "Brutalist 3D",
      tone: "dark",
      badge: "Trending",
      likes: 523,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      prompt: `Ultra-minimalist raw concrete pavilion villa nestled inside misty autumn bamboo forest in Kyoto, cinematic volumetric lighting, raytraced reflections on wet stone pavement, brutalist architectural composition, 8k resolution, photorealistic shot on Hasselblad X2D 100C --ar 16:9 --style raw`
    },
    {
      id: "clarix",
      title: "Clarix",
      category: "AI / Tech",
      tone: "dark",
      badge: "New",
      likes: 167,
      image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80",
      prompt: `Full-bleed minimal developer documentation and API playground portal with instant search, syntax highlighting, and copyable bash snippets.`
    },
    {
      id: "pro_4pane",
      title: "Pro 4-Pane Studio",
      category: "Pro Dashboard",
      tone: "dark",
      badge: "Verified",
      likes: 340,
      image: "/screenshots/template_dashboard.png",
      prompt: `Lead Software Architect dashboard layout: 4-pane responsive grid with Left Navigation Rail, Top Filter Bar, Center Item Grid, and Right Savings & Sparkline Sidebar.`
    },
    {
      id: "duke_nft",
      title: "Duke Showcase",
      category: "Web3 Showcase",
      tone: "dark",
      badge: "Verified",
      likes: 275,
      image: "/screenshots/template_home.png",
      prompt: `Ultra-modern showcase layout: 3-column symmetric header, 3D stacked layered cards hero, and real-time live scraper feed.`
    },
    {
      id: "swiss_journal",
      title: "Swiss Journal",
      category: "Editorial",
      tone: "light",
      badge: "Verified",
      likes: 210,
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
      prompt: `Swiss editorial typography journal with monochrome high-contrast layout, asymmetric columns, and zero unnecessary visual ornament.`
    },
    {
      id: "hardware_showcase",
      title: "Hardware Showcase",
      category: "Hardware",
      tone: "dark",
      badge: "Verified",
      likes: 185,
      image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80",
      prompt: `Industrial hardware showcase with dark matte finish, hairline measurement grids, interactive rotating viewer, and technical specs table.`
    }
  ]

  const filteredTemplates = templatesList.filter(t => {
    if (activeTone !== 'all' && t.tone !== activeTone) return false
    if (activeCategory !== 'all' && t.category !== activeCategory) return false
    if (searchQuery && !t.title.toLowerCase().includes(searchQuery.toLowerCase()) && !t.category.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (activeTab === 'saved' && !isBookmarked(t.id)) return false
    return true
  })

  const categories = Array.from(new Set(templatesList.map(t => t.category)))

  return (
    <main className="min-h-screen bg-[#000000] text-zinc-100 font-sans antialiased selection:bg-orange-500 selection:text-white">
      
      {/* 1. GETLAYERS STICKY TOP NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#000000]/90 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3">
          
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 group cursor-pointer flex-shrink-0" title="OXID CORTEX STUDIO">
            <div className="w-7 h-7 rounded-full bg-white p-1 flex items-center justify-center shadow-md shadow-white/10 group-hover:scale-105 transition-transform flex-shrink-0">
              <img src="/images/oxid-logo.png" alt="OXID" className="w-full h-full object-contain" />
            </div>
            <div className="flex items-center font-sans text-sm font-bold tracking-tight text-white">
              <span>OXID</span>
              <span className="text-zinc-400 font-light ml-1">CORTEX</span>
            </div>
          </Link>

          {/* Search Pill */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-400 w-64">
            <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input 
              type="text" 
              placeholder="Filter templates..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-white text-xs w-full placeholder-zinc-500"
            />
          </div>

          {/* Nav Pills Container */}
          <nav className="hidden lg:flex items-center px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono font-medium text-zinc-400 space-x-5">
            <Link href="/templates" className="text-white font-bold transition-colors">Templates</Link>
            <Link href="/prompts" className="hover:text-white transition-colors">Prompt Lab</Link>
            <Link href="/grants" className="hover:text-white transition-colors flex items-center gap-1.5">
              <span>Bansos AI</span>
              <span className="px-1.5 py-0.2 text-[9px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 rounded-full font-bold">Free</span>
            </Link>
            <Link href="/tools" className="hover:text-white transition-colors">Tools Radar</Link>
            <Link href="/intel" className="hover:text-white transition-colors">Threads Intel</Link>
          </nav>

          {/* Right Action */}
          <div className="flex items-center space-x-2">
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
            <Link href="/templates" onClick={() => setMobileMenuOpen(false)} className="block p-2.5 rounded-xl bg-white/[0.04] text-white font-bold">✨ Templates</Link>
            <Link href="/prompts" onClick={() => setMobileMenuOpen(false)} className="block p-2.5 rounded-xl bg-white/[0.04] text-white">⚡ Prompt Lab</Link>
            <Link href="/grants" onClick={() => setMobileMenuOpen(false)} className="block p-2.5 rounded-xl bg-white/[0.04] text-emerald-400">🎁 Bansos AI</Link>
            <Link href="/tools" onClick={() => setMobileMenuOpen(false)} className="block p-2.5 rounded-xl bg-white/[0.04] text-white">🛠️ Tools Radar</Link>
            <Link href="/intel" onClick={() => setMobileMenuOpen(false)} className="block p-2.5 rounded-xl bg-white/[0.04] text-white">🌐 Threads Intel</Link>
          </div>
        )}
      </header>

      {/* 2. GETLAYERS SUBPAGE HEADER & TABLIST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-6 space-y-6">
        
        {/* Title Group */}
        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block">
            {templatesList.length} template produksi · kurasi zero-slop
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-[300] tracking-[-1px] text-white">
            Immersive website prompts &amp; templates
          </h1>
          <p className="text-sm text-zinc-400 font-sans max-w-2xl leading-relaxed">
            Template web Next.js 14, Tailwind CSS, dan skema Supabase siap pakai. Klik kartu untuk menyalin prompt pembentuknya.
          </p>
        </div>

        {/* Tablist Pill Bar (GetLayers Style) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/[0.08] font-mono text-xs w-fit">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${activeTab === 'all' ? 'bg-white text-black font-bold shadow' : 'text-zinc-400 hover:text-white'}`}
          >
            Semua Template ({templatesList.length})
          </button>
          <button 
            onClick={() => setActiveTab('saved')}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === 'saved' ? 'bg-white text-black font-bold shadow' : 'text-zinc-400 hover:text-white'}`}
          >
            <span>⭐ Favourites</span>
            <span>({templatesList.filter(t => isBookmarked(t.id)).length})</span>
          </button>
        </div>

        {/* Filters Group (Tone & Industry Chips) */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 text-[11px] font-mono border-t border-white/[0.06]">
          
          {/* TONE Group */}
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 uppercase tracking-wider text-[10px]">TONE:</span>
            <button 
              onClick={() => setActiveTone('all')}
              className={`px-2.5 py-1 rounded-full border transition-all cursor-pointer ${activeTone === 'all' ? 'bg-white text-black font-bold border-white' : 'bg-transparent text-zinc-400 border-white/[0.08] hover:border-white/20'}`}
            >
              All {templatesList.length}
            </button>
            <button 
              onClick={() => setActiveTone('dark')}
              className={`px-2.5 py-1 rounded-full border transition-all cursor-pointer ${activeTone === 'dark' ? 'bg-white text-black font-bold border-white' : 'bg-transparent text-zinc-400 border-white/[0.08] hover:border-white/20'}`}
            >
              Dark {templatesList.filter(t => t.tone === 'dark').length}
            </button>
            <button 
              onClick={() => setActiveTone('light')}
              className={`px-2.5 py-1 rounded-full border transition-all cursor-pointer ${activeTone === 'light' ? 'bg-white text-black font-bold border-white' : 'bg-transparent text-zinc-400 border-white/[0.08] hover:border-white/20'}`}
            >
              Light {templatesList.filter(t => t.tone === 'light').length}
            </button>
          </div>

          <span className="hidden sm:inline text-white/10">|</span>

          {/* INDUSTRY Group */}
          <div className="flex flex-wrap items-center gap-2">
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
                {cat} {templatesList.filter(t => t.category === cat).length}
              </button>
            ))}
          </div>

        </div>

      </section>

      {/* 3. SIMPLE CARDBOX GRID (GETLAYERS STYLE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          
          {filteredTemplates.map((tpl, idx) => (
            <React.Fragment key={tpl.id}>
              
              {/* Simple Cardbox */}
              <article 
                onClick={() => handleCopy(tpl.id, tpl.prompt)}
                className="group relative bg-[#0c0c0e] border border-white/[0.08] hover:border-white/[0.2] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between cursor-pointer"
              >
                {/* 16:9 Aspect Media Container */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-950">
                  <img 
                    src={tpl.image} 
                    alt={tpl.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                  {/* Top-Left Badge */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    {tpl.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-white text-black shadow">
                        {tpl.badge}
                      </span>
                    )}
                  </div>

                  {/* Top-Right Like Button */}
                  <button 
                    onClick={(e) => handleLike(tpl.id, e)}
                    className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/60 hover:bg-black/90 text-[10px] font-mono text-zinc-300 backdrop-blur-md border border-white/10 flex items-center gap-1 transition-colors"
                  >
                    <span>♥</span>
                    <span>{likes[tpl.id] || tpl.likes}</span>
                  </button>

                  {/* Center Copy Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                    <span className="px-3.5 py-1.5 rounded-full bg-white text-black font-mono text-xs font-bold shadow-xl">
                      {copiedId === tpl.id ? "✓ Prompt Copied!" : "Salin Prompt"}
                    </span>
                  </div>
                </div>

                {/* Simple Card Footer Bar */}
                <div className="p-3.5 flex items-center justify-between border-t border-white/[0.06] font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white group-hover:text-orange-400 transition-colors">
                      {tpl.title}
                    </span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] bg-white/[0.08] text-zinc-400 font-mono">
                      Free
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-500">
                    {tpl.category}
                  </span>
                </div>
              </article>

              {/* In-Grid Promotional Banner at Slot #4 */}
              {idx === 3 && (
                <div className="bg-[#0c0c0e] border border-white/[0.1] rounded-2xl p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                        Full-Stack Ready
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white leading-snug">
                      Source code with AI orchestration
                    </h3>
                    <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                      Next.js 14 App Router, skema Supabase, dan aturan agen coding terpasang lengkap.
                    </p>
                  </div>
                  <a 
                    href="https://github.com/ilhammu29/oxid-cortex-studio" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-white text-black text-xs font-mono font-bold hover:bg-zinc-200 transition-all text-center"
                  >
                    <span>Clone GitHub</span>
                    <span>↗</span>
                  </a>
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

    </main>
  )
}
