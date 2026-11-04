'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useStudioTheme } from '@/lib/useStudioTheme'
import { useBookmarks } from '@/lib/useBookmarks'
import PromptPlaygroundModal from '@/components/PromptPlaygroundModal'
import StudioNavbar from '@/components/StudioNavbar'

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
      image: "/images/card_agent_copilot.svg",
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
      image: "/screenshots/real/cloudflare_workers_ai.png",
      body: `Bertindaklah sebagai Lead Software Architect kelas dunia. Bangun arsitektur aplikasi tanpa boilerplate palsu dan tanpa pola AI slop. Utamakan stdlib/native, exit code 0, dan modular API contract.`
    },
    {
      id: "prompt_refactor_4",
      title: "Surgical Code Refactoring",
      creator: "Aira Core",
      category: "Refactoring",
      badge: "Core",
      image: "/screenshots/real/shadcn_ui.png",
      body: `Senior Systems Developer yang memegang prinsip lazy engineering efisien (YAGNI). Refactoring kode dengan memangkas baris, hapus abstraksi berlebih, pertahankan backward compatibility.`
    },
    {
      id: "prompt_bento_1",
      title: "Fintech Wealth Bento",
      creator: "Shu Ding",
      category: "UI/UX Bento",
      badge: "Popular",
      image: "/images/card_fintech_wealth.svg",
      body: `Design a high-end institutional wealth management dashboard in Tailwind CSS and Next.js. Bento Grid with live candlestick feeds, yield curve tracker, and liquidity metrics.`
    },
    {
      id: "prompt_swiss_2",
      title: "Swiss Editorial Journal",
      creator: "swyx",
      category: "UI/UX Bento",
      badge: "Verified",
      image: "/images/card_swiss_editorial.svg",
      body: `Create a clean, human-centric editorial web magazine interface inspired by Swiss typography. Lora serif headlines, generous white space, and zero noisy banners.`
    },
    {
      id: "prompt_first_principle_5",
      title: "First-Principle Problem Breakdown",
      creator: "OXID Metacortex",
      category: "Reasoning",
      badge: "Core",
      image: "/screenshots/real/v0_dev.png",
      body: `Bedah masalah dari prinsip paling mendasar: bongkar asumsi lumrah, pecah ke komponen fundamental, rekonstruksi solusi baru tanpa meniru pasar, hasilkan 3 opsi keputusan 1-3-1.`
    },
    {
      id: "prompt_luxury_6",
      title: "Luxury Minimalist Hardware Showcase",
      creator: "Shu Ding",
      category: "UI/UX Bento",
      badge: "Trending",
      image: "/images/card_hardware_showcase.svg",
      body: `Ultra-minimalist flagship product launch page for bespoke hardware. Full-bleed product render hero, smooth scroll perspective reveal, and exploded view components.`
    },
    {
      id: "prompt_db_7",
      title: "Deterministic Supabase Schema & RLS",
      creator: "OXID Database Engineer",
      category: "Architecture",
      badge: "Verified",
      image: "/screenshots/template_dashboard.png",
      body: `Tulis skema database PostgreSQL Supabase kelas produksi: foreign key terindeks, RLS policies ketat, enum types, trigger auto-updated_at, dan security hardening.`
    },
    {
      id: "prompt_kyoto_villa",
      title: "Kyoto Villa Brutalist Architecture",
      creator: "synth_artisan (Threads Ingest)",
      category: "UI/UX Bento",
      badge: "Flux.1 Schnell",
      image: "/images/card_swiss_editorial.svg",
      body: `Ultra-minimalist raw concrete pavilion villa nestled inside misty autumn bamboo forest in Kyoto, cinematic volumetric lighting, raytraced reflections on wet stone pavement, brutalist architectural composition, 8k resolution, photorealistic shot on Hasselblad X2D 100C --ar 16:9 --style raw`
    },
    {
      id: "prompt_hud_telemetry",
      title: "Sci-Fi HUD Holographic Telemetry",
      creator: "prompt_craft_lab (Threads Ingest)",
      category: "UI/UX Bento",
      badge: "Midjourney v6.1",
      image: "/images/card_hardware_showcase.svg",
      body: `Futuristic sci-fi HUD holographic dashboard card, floating neon cyan and cyber flame orange wireframes, glowing telemetry graphs, dark glassmorphism backplate, hyper-detailed UI elements, clean typography, cinematic studio render in Octane --ar 16:9`
    },
    {
      id: "prompt_karpathy_home",
      title: "Autonomous WhatsApp Local Gateway",
      creator: "Andrej Karpathy (Threads Ingest)",
      category: "Architecture",
      badge: "Claude Code",
      image: "/screenshots/real/shadcn_ui.png",
      body: `Reverse engineer local network IoT gateways using Claude Code CLI harness. Expose bidirectional messaging loop over WhatsApp webhook to control home devices with deterministic function calling.`
    },
    {
      id: "prompt_gemini_flash_agent",
      title: "Gemini 1.5 Flash Zero-Cost Agent",
      creator: "cloud_hunter_id (Threads Ingest)",
      category: "Architecture",
      badge: "1M TPM Free",
      image: "/screenshots/real/google_ai_studio.png",
      body: `const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);\nconst model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash', generationConfig: { responseMimeType: 'application/json' } });\n// High throughput 15 RPM / 1M TPM free tier agent harness without credit card lock.`
    }
  ]

  const [prompts, setPrompts] = useState<any[]>(promptGrid)

  useEffect(() => {
    fetch('/api/scrape')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          const scraped = data.data
            .filter((th: any) => th.prompt && th.prompt.trim().length > 15)
            .map((th: any) => ({
              id: th.id,
              title: th.content ? (th.content.length > 50 ? th.content.slice(0, 50) + '...' : th.content) : `${th.author_name} Prompt`,
              creator: th.author_name || 'Community Engineer',
              category: th.category?.includes('Art') ? 'Generative Art' : (th.category?.includes('Bansos') ? 'Cloud Grants' : 'Architecture'),
              badge: th.model_used || 'Scraped Intel',
              image: th.image_url || '/screenshots/real/recent_design.png',
              body: th.prompt
            }))
          
          const existingIds = new Set(promptGrid.map(p => p.id))
          const newUnique = scraped.filter((s: any) => !existingIds.has(s.id))
          if (newUnique.length > 0) {
            setPrompts([...promptGrid, ...newUnique])
          }
        }
      })
      .catch(() => {})
  }, [])

  const categories = Array.from(new Set(prompts.map(p => p.category)))

  const filteredPrompts = prompts.filter(p => {
    if (activeCategory !== 'all' && p.category !== activeCategory) return false
    if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase()) && !p.body.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (activeTab === 'saved' && !isBookmarked(p.id)) return false
    return true
  })

  return (
    <main className="min-h-screen bg-[#000000] text-zinc-100 font-sans antialiased selection:bg-orange-500 selection:text-white">
      
      {/* 1. UNIFIED STUDIO NAVBAR */}
      <StudioNavbar activeRoute="prompts" />

      {/* 2. GETLAYERS SUBPAGE HEADER & TABLIST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-6 space-y-6">
        
        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 block">
            {prompts.length} master prompts · zero hallucination &amp; anti-slop
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
            Semua Prompts ({prompts.length})
          </button>
          <button 
            onClick={() => setActiveTab('saved')}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === 'saved' ? 'bg-white text-black font-bold shadow' : 'text-zinc-400 hover:text-white'}`}
          >
            <span>⭐ Favourites</span>
            <span>({prompts.filter(p => isBookmarked(p.id)).length})</span>
          </button>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] font-mono border-t border-white/[0.06]">
          <span className="text-zinc-500 uppercase tracking-wider text-[10px]">CATEGORY:</span>
          <button 
            onClick={() => setActiveCategory('all')}
            className={`px-2.5 py-1 rounded-full border transition-all cursor-pointer ${activeCategory === 'all' ? 'bg-white text-black font-bold border-white' : 'bg-transparent text-zinc-400 border-white/[0.08] hover:border-white/20'}`}
          >
            Semua ({prompts.length})
          </button>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 rounded-full border transition-all cursor-pointer ${activeCategory === cat ? 'bg-white text-black font-bold border-white' : 'bg-transparent text-zinc-400 border-white/[0.08] hover:border-white/20'}`}
            >
              {cat} ({prompts.filter(p => p.category === cat).length})
            </button>
          ))}
        </div>

      </section>

      {/* 3. SIMPLE CARDBOX GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          
          {filteredPrompts.map((p, idx) => (
            <React.Fragment key={p.id}>
              
              {/* Simple Cardbox with Rotating Silver Beam */}
              <article 
                onClick={() => handleCopy(p.id, p.body)}
                className="silver-beam-wrapper group cursor-pointer flex flex-col justify-between"
              >
                <div className="silver-beam-inner flex flex-col justify-between">
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

    </main>
  )
}
