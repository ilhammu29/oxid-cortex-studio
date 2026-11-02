'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useStudioTheme } from '@/lib/useStudioTheme'
import { useBookmarks } from '@/lib/useBookmarks'
import StudioNavbar from '@/components/StudioNavbar'

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

  // Free SVG Category Icon Helper
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'E-commerce':
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        )
      case 'AI / Tech':
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        )
      case 'SaaS':
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        )
      case 'Fintech':
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        )
      case 'Health / Science':
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        )
      case 'Brutalist 3D':
      default:
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        )
    }
  }

  const templatesList = [
    {
      id: "lumiere",
      title: "Lumière",
      category: "E-commerce",
      tone: "dark",
      badge: "New",
      likes: 142,
      image: "https://storage.getlayers.ai/templates/lumi-re-9893947dfd.webp",
      prompt: `Create a luxury high-end editorial fragrance e-commerce store with minimal Swiss typography, generous whitespace, smooth scroll-driven product reveal, and dark matte aesthetic. Built in Next.js 14 and Tailwind CSS.`
    },
    {
      id: "prisma",
      title: "Prisma",
      category: "AI / Tech",
      tone: "dark",
      badge: "Hot",
      likes: 289,
      image: "https://storage.getlayers.ai/templates/prisma-574345227d.webp",
      prompt: `Design an immersive developer workspace for autonomous coding agents with neon telemetry charts, dark glassmorphism backplate, and high-performance latency monitors.`
    },
    {
      id: "vesper",
      title: "Vesper",
      category: "SaaS",
      tone: "dark",
      badge: "Popular",
      likes: 310,
      image: "https://storage.getlayers.ai/templates/vesper-1eb7223b93.webp",
      prompt: `Build a modern B2B analytics platform dashboard featuring asymmetric bento grids, real-time candlestick feeds, and dark obsidian aesthetic.`
    },
    {
      id: "stride",
      title: "Stride",
      category: "Fintech",
      tone: "dark",
      badge: "Hot",
      likes: 245,
      image: "https://storage.getlayers.ai/templates/stride.webp",
      prompt: `Institutional wealth management portal with clean border-1px lines, multi-currency portfolio breakdown, and micro-interactions.`
    },
    {
      id: "aistudio",
      title: "AI Studio",
      category: "AI / Tech",
      tone: "dark",
      badge: "Frontier",
      likes: 412,
      image: "https://storage.getlayers.ai/templates/ai-studio-419b674eb8.webp",
      prompt: `Autonomous AI multi-agent orchestration console with live terminal logs, DAG pipeline visualizer, and token consumption analytics.`
    },
    {
      id: "dantora",
      title: "Dantora",
      category: "Health / Science",
      tone: "dark",
      badge: "Featured",
      likes: 198,
      image: "https://storage.getlayers.ai/templates/dantora-f9c3ffb5f0.webp",
      prompt: `Biotechnology & genomic data explorer web application with clean scientific grid, high contrast data tables, and WCAG AAA compliance.`
    },
    {
      id: "kyoto",
      title: "Kyoto Villa",
      category: "Brutalist 3D",
      tone: "dark",
      badge: "Trending",
      likes: 523,
      image: "https://storage.getlayers.ai/templates/house-22508188f8.webp",
      prompt: `Ultra-minimalist raw concrete pavilion villa nestled inside misty autumn bamboo forest in Kyoto, cinematic volumetric lighting, raytraced reflections on wet stone pavement, brutalist architectural composition, 8k resolution, photorealistic shot on Hasselblad X2D 100C --ar 16:9 --style raw`
    },
    {
      id: "clarix",
      title: "Clarix",
      category: "AI / Tech",
      tone: "dark",
      badge: "New",
      likes: 167,
      image: "https://storage.getlayers.ai/templates/clarix-1da2281a4b.webp",
      prompt: `Full-bleed minimal developer documentation and API playground portal with instant search, syntax highlighting, and copyable bash snippets.`
    },
    {
      id: "relay",
      title: "Relay",
      category: "SaaS",
      tone: "dark",
      badge: "Popular",
      likes: 281,
      image: "https://storage.getlayers.ai/templates/relay-4ee0729d77.webp",
      prompt: `Autonomous multi-tenant cloud queue orchestration dashboard with live throughput monitors and distributed tracing.`
    },
    {
      id: "herbier",
      title: "Herbier Blanc",
      category: "E-commerce",
      tone: "dark",
      badge: "Verified",
      likes: 206,
      image: "https://storage.getlayers.ai/templates/herbier-blanc-b9783f9828.webp",
      prompt: `Botanical luxury apothecary e-commerce experience with minimalist white-space, high-fashion layout, and smooth micro-interactions.`
    },
    {
      id: "baseline",
      title: "Baseline",
      category: "AI / Tech",
      tone: "dark",
      badge: "Free",
      likes: 224,
      image: "https://storage.getlayers.ai/templates/baseline.webp",
      prompt: `Clean, zero-slop developer portfolio and technical blueprint site with monochrome contrast and high accessibility.`
    },
    {
      id: "creative_director",
      title: "Creative Director",
      category: "Portfolio",
      tone: "dark",
      badge: "Featured",
      likes: 144,
      image: "https://storage.getlayers.ai/templates/creative-director.webp",
      prompt: `Cinematic portfolio for design directors and visual technologists with large video frames and high-contrast typography.`
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
      
      {/* 1. UNIFIED STUDIO NAVBAR */}
      <StudioNavbar activeRoute="templates" />

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
              
              {/* Simple Cardbox with Rotating Silver Beam */}
              <article 
                onClick={() => handleCopy(tpl.id, tpl.prompt)}
                className="silver-beam-wrapper group cursor-pointer flex flex-col justify-between !rounded-[14px]"
              >
                <div className="silver-beam-inner flex flex-col justify-between !rounded-[13px] bg-[#0c0c0e]">
                  {/* Aspect Ratio aspect-[960/684] Media Container */}
                  <div className="relative aspect-[960/684] w-full overflow-hidden bg-zinc-950">
                    <img 
                      src={tpl.image} 
                      alt={tpl.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                    {/* Top-Left Badges (New + Free SVG Category Icon) */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      {tpl.badge && (
                        <span className="px-2 py-0.5 rounded-full text-[9.5px] font-mono font-bold bg-white text-black shadow">
                          {tpl.badge}
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-full text-[9.5px] font-mono font-semibold bg-white/[0.12] text-zinc-200 backdrop-blur-md border border-white/10 flex items-center gap-1">
                        {getCategoryIcon(tpl.category)}
                        <span>{tpl.category}</span>
                      </span>
                    </div>

                    {/* Top-Right Like Button */}
                    <button 
                      onClick={(e) => handleLike(tpl.id, e)}
                      className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/60 hover:bg-black/90 text-[10px] font-mono text-zinc-300 backdrop-blur-md border border-white/10 flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3 text-red-400" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 13.6S2.4 9.9 2.4 6.2A3 3 0 0 1 8 4.7 3 3 0 0 1 13.6 6.2C13.6 9.9 8 13.6 8 13.6Z" />
                      </svg>
                      <span>{likes[tpl.id] || tpl.likes}</span>
                    </button>

                    {/* Center Copy / Open Detail Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                      <span className="px-3 py-1.5 rounded-full bg-white text-black font-mono text-xs font-bold shadow-xl">
                        {copiedId === tpl.id ? "✓ Copied!" : "Salin Prompt"}
                      </span>
                      <Link
                        href={`/detail/${tpl.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="px-3 py-1.5 rounded-full bg-white/[0.15] text-white font-mono text-xs font-bold backdrop-blur-md border border-white/20 hover:bg-white hover:text-black transition-all shadow-xl"
                      >
                        Detail ↗
                      </Link>
                    </div>
                  </div>

                  {/* Simple Card Footer Bar */}
                  <div className="p-3.5 flex items-center justify-between border-t border-white/[0.06] font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-sans font-medium text-[15px] text-white group-hover:text-orange-400 transition-colors">
                        {tpl.title}
                      </span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] bg-white/[0.08] text-zinc-400 font-mono">
                        Free
                      </span>
                    </div>
                    <span className="text-[11.5px] text-zinc-500 font-mono">
                      {tpl.category}
                    </span>
                  </div>
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
