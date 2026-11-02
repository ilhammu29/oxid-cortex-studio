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

  // Free SVG Category Icon Helper for Real Project Categories
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Autonomous Agents':
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        )
      case 'Cloud Grants & Quotas':
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        )
      case 'AI Engineering':
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
      case 'UI/UX Architecture':
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        )
      case 'Frontier Research':
      default:
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        )
    }
  }

  const templatesList = [
    {
      id: "openhands",
      title: "OpenHands Developer Agent",
      category: "Autonomous Agents",
      tone: "dark",
      badge: "92.5k Stars",
      likes: 412,
      image: "https://opengraph.githubassets.com/1/All-Hands-AI/OpenHands",
      prompt: `Build an autonomous AI-driven development agent harness with virtual sandbox, git version control integration, multi-model LLM router, and real-time terminal streaming interface.`
    },
    {
      id: "ollama",
      title: "Ollama Local Core",
      category: "AI Engineering",
      tone: "dark",
      badge: "185k Stars",
      likes: 523,
      image: "https://opengraph.githubassets.com/1/ollama/ollama",
      prompt: `Deploy and run local open-weights LLMs (Kimi, DeepSeek, Qwen, Gemma) with zero cloud dependency, OpenAI-compatible local endpoints, and low VRAM footprint.`
    },
    {
      id: "gemini_grant",
      title: "Gemini 1.5 Pro Grant",
      category: "Cloud Grants & Quotas",
      tone: "dark",
      badge: "2M Context",
      likes: 340,
      image: "/screenshots/real/google_ai_studio.png",
      prompt: `Architect an enterprise multi-modal intelligence portal consuming Google AI Studio Gemini 1.5 Pro free API tier with 1,000,000 TPM, video-audio parsing, and zero credit card lock.`
    },
    {
      id: "groq_lpu",
      title: "Groq LPU 800 T/s Engine",
      category: "AI Engineering",
      tone: "dark",
      badge: "800 T/s LPU",
      likes: 310,
      image: "/screenshots/real/groq_console.png",
      prompt: `Integrate Groq Cloud Language Processing Unit (LPU) ultra-low latency inference engine running Llama-3.1-70B at 800+ tokens per second with Next.js 14 streaming response.`
    },
    {
      id: "r3f",
      title: "React Three Fiber Canvas",
      category: "UI/UX Architecture",
      tone: "dark",
      badge: "33.4k Stars",
      likes: 289,
      image: "https://opengraph.githubassets.com/1/pmndrs/react-three-fiber",
      prompt: `Craft a declarative 3D canvas experience using Three.js and React Three Fiber with custom GLSL shaders, camera physics, and anti-aliased dark scene rendering.`
    },
    {
      id: "scrapling",
      title: "Scrapling Framework",
      category: "Autonomous Agents",
      tone: "dark",
      badge: "92.5k Stars",
      likes: 245,
      image: "https://opengraph.githubassets.com/1/D4Vinci/Scrapling",
      prompt: `High-throughput autonomous web scraping framework capable of bypassing modern bot barriers, DOM stealth emulation, and JSON structured data normalization.`
    },
    {
      id: "fastmcp",
      title: "FastMCP Protocol Server",
      category: "Autonomous Agents",
      tone: "dark",
      badge: "Verified",
      likes: 198,
      image: "https://opengraph.githubassets.com/1/jlowin/fastmcp",
      prompt: `Standard Model Context Protocol (MCP) server implementation exposing autonomous tools, resource endpoints, and deterministic schema validation to LLMs.`
    },
    {
      id: "vaul",
      title: "Vaul Drawer Motion",
      category: "UI/UX Architecture",
      tone: "dark",
      badge: "8.7k Stars",
      likes: 167,
      image: "https://opengraph.githubassets.com/1/emilkowalski/vaul",
      prompt: `Minimalist iOS-style draggable drawer component for mobile web applications with spring physics, touch gesture velocity tracking, and zero layout shift.`
    },
    {
      id: "minimax",
      title: "MiniMax Shader Skills",
      category: "UI/UX Architecture",
      tone: "dark",
      badge: "13.8k Stars",
      likes: 281,
      image: "https://opengraph.githubassets.com/1/MiniMax-AI/skills",
      prompt: `Production library of 36 ShaderToy GLSL Canvas techniques optimized for WebGL2 fluid motion and ambient backgrounds.`
    },
    {
      id: "hf_papers",
      title: "Hugging Face Daily Papers",
      category: "Frontier Research",
      tone: "dark",
      badge: "Live Daily",
      likes: 315,
      image: "https://opengraph.githubassets.com/1/huggingface/transformers",
      prompt: `Automated pipeline indexing frontier arXiv and Hugging Face daily AI research papers with community upvotes and key insight extractions.`
    },
    {
      id: "cloudflare_ai",
      title: "Cloudflare Workers AI",
      category: "Cloud Grants & Quotas",
      tone: "dark",
      badge: "Free 10k/day",
      likes: 224,
      image: "/screenshots/real/cloudflare_workers_ai.png",
      prompt: `Serverless edge AI inference with Cloudflare Workers AI, Vectorize vector database, and 10,000 free neuron executions daily.`
    },
    {
      id: "cortex_obsidian",
      title: "OXID Hub Dashboard",
      category: "UI/UX Architecture",
      tone: "dark",
      badge: "Core System",
      likes: 540,
      image: "/screenshots/real/shadcn_ui.png",
      prompt: `Flagship OXID Hub dark obsidian dashboard featuring rotating silver border beams, WebGL2 Flue canvas, and live multi-source ingestion.`
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
