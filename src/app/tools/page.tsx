'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useStudioTheme } from '@/lib/useStudioTheme'
import { useBookmarks } from '@/lib/useBookmarks'
import StudioNavbar from '@/components/StudioNavbar'

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeTab, setActiveTab] = useState('all')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [toolsList, setToolsList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { darkMode, toggleTheme } = useStudioTheme()
  const { toggleBookmark, isBookmarked } = useBookmarks()
  const [likes, setLikes] = useState<Record<string, number>>({
    'res_shadcn': 350,
    'res_landbook': 410,
    'res_recentdesign': 280,
    'res_landdding': 230,
    'res_fontinlogo': 310,
    'skill_emil_motion': 520,
    'skill_shader_minimax': 460,
    'skill_diagram_design': 380,
    'skill_vercel_guidelines': 690,
    'skill_craftwork_assets': 320,
    'repo_openhands': 1840,
    'repo_claude_code': 2100,
    'repo_hermes_agent': 1450,
    'repo_v0_sdk': 980
  })

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setLikes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  }

  useEffect(() => {
    fetch('/api/tools')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setToolsList(data.data)
        }
      })
      .catch(err => console.error("Error loading tools:", err))
      .finally(() => setLoading(false))
  }, [])

  const realTools = [
    // 5 ESSENTIAL AI DESIGN STACK RESOURCES (MINHAM SELECTION)
    {
      id: "res_jiro",
      name: "jiro.build",
      category: "AI Design Prompts",
      badge: "1,400+ Prompts",
      image: "/screenshots/real/jiro_build.png",
      type: "website",
      url: "https://jiro.build"
    },
    {
      id: "res_landbook",
      name: "Land-book",
      category: "Design Showcase",
      badge: "Top Showcase",
      image: "/screenshots/real/landbook.webp",
      type: "website",
      url: "https://land-book.com"
    },
    {
      id: "res_minimalgallery",
      name: "Minimal Gallery",
      category: "Minimalist Showcase",
      badge: "Clean Design",
      image: "/screenshots/real/minimal_gallery.jpg",
      type: "website",
      url: "https://minimal.gallery"
    },
    {
      id: "res_fontinlogo",
      name: "FontInLogo",
      category: "Typography",
      badge: "Brand Fonts",
      image: "/screenshots/real/fontinlogo.jpg",
      type: "website",
      url: "https://www.fontinlogo.com"
    },
    {
      id: "res_3dicons",
      name: "3dicons",
      category: "3D Visual Assets",
      badge: "Open 3D Icons",
      image: "/screenshots/real/3dicons.jpg",
      type: "website",
      url: "https://3dicons.co"
    },
    {
      id: "res_shadcn",
      name: "shadcn/ui",
      category: "Design System",
      badge: "Open Source",
      image: "/screenshots/real/shadcn_ui.png",
      type: "website",
      url: "https://ui.shadcn.com"
    },
    {
      id: "res_v0",
      name: "v0 by Vercel",
      category: "Generative UI",
      badge: "AI Builder",
      image: "/screenshots/real/v0_dev.png",
      type: "website",
      url: "https://v0.dev"
    },
    {
      id: "res_recentdesign",
      name: "Recent Design",
      category: "Trend Vault",
      badge: "Daily",
      image: "/screenshots/real/recent_design.png",
      type: "website",
      url: "https://recent.design"
    },
    {
      id: "res_landdding",
      name: "Landdding",
      category: "Bento Library",
      badge: "High-Conv",
      image: "/screenshots/real/landdding.png",
      type: "website",
      url: "https://landdding.com"
    },

    // 5 MOTION & CRAFT SKILLS
    {
      id: "skill_emil_motion",
      name: "Emil Kowalski — Vaul & Motion",
      category: "Motion Physics",
      badge: "Masterclass",
      image: "/screenshots/real/emil_animations.png",
      type: "skills",
      url: "https://animations.dev"
    },
    {
      id: "skill_shader_minimax",
      name: "MiniMax 36 Canvas Shaders",
      category: "WebGL Canvas",
      badge: "GLSL Shader",
      image: "https://opengraph.githubassets.com/1/MiniMax-AI/skills",
      type: "skills",
      url: "https://github.com/MiniMax-AI/skills"
    },
    {
      id: "skill_r3f_canvas",
      name: "React Three Fiber 3D Scene",
      category: "3D Canvas",
      badge: "Three.js",
      image: "https://opengraph.githubassets.com/1/pmndrs/react-three-fiber",
      type: "skills",
      url: "https://github.com/pmndrs/react-three-fiber"
    },
    {
      id: "skill_vercel_guidelines",
      name: "Vercel Web Interface Guidelines",
      category: "Standard",
      badge: "Zero-Slop",
      image: "https://opengraph.githubassets.com/1/vercel/ai",
      type: "skills",
      url: "https://vercel.com/design"
    },
    {
      id: "skill_craftwork_assets",
      name: "FastMCP Model Context Protocol",
      category: "Agent Standard",
      badge: "SDK",
      image: "https://opengraph.githubassets.com/1/jlowin/fastmcp",
      type: "skills",
      url: "https://github.com/jlowin/fastmcp"
    },

    // REAL SCRAPED GITHUB AI REPOSITORIES
    {
      id: "repo_openhands",
      name: "All-Hands-AI / OpenHands",
      category: "Agent Platform",
      badge: "★ 92.5k",
      image: "https://opengraph.githubassets.com/1/All-Hands-AI/OpenHands",
      type: "github",
      url: "https://github.com/All-Hands-AI/OpenHands"
    },
    {
      id: "repo_ollama",
      name: "ollama / ollama",
      category: "Local LLM",
      badge: "★ 185.7k",
      image: "https://opengraph.githubassets.com/1/ollama/ollama",
      type: "github",
      url: "https://github.com/ollama/ollama"
    },
    {
      id: "repo_scrapling",
      name: "D4Vinci / Scrapling",
      category: "Scraper Framework",
      badge: "★ 92.5k",
      image: "https://opengraph.githubassets.com/1/D4Vinci/Scrapling",
      type: "github",
      url: "https://github.com/D4Vinci/Scrapling"
    },
    {
      id: "repo_hermes_agent",
      name: "NousResearch / Hermes-Agent",
      category: "Agent Harness",
      badge: "Autonomous",
      image: "https://opengraph.githubassets.com/1/NousResearch/Hermes-Agent",
      type: "github",
      url: "https://github.com/NousResearch/Hermes-Agent"
    },
    {
      id: "repo_v0_sdk",
      name: "Vercel / AI SDK 3.0",
      category: "Framework",
      badge: "★ 85.0k",
      image: "https://opengraph.githubassets.com/1/vercel/ai",
      type: "github",
      url: "https://github.com/vercel/ai"
    }
  ]

  const displayTools = toolsList.length > 0 ? toolsList : realTools

  const filteredTools = displayTools.filter(t => {
    if (activeCategory !== 'all' && t.type !== activeCategory) return false
    if (searchQuery && !t.name.toLowerCase().includes(searchQuery.toLowerCase()) && !t.category.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (activeTab === 'saved' && !isBookmarked(t.id)) return false
    return true
  })

  return (
    <main className="min-h-screen bg-[#000000] text-zinc-100 font-sans antialiased selection:bg-orange-500 selection:text-white">
      
      {/* 1. UNIFIED STUDIO NAVBAR */}
      <StudioNavbar activeRoute="tools" />

      {/* 2. GETLAYERS SUBPAGE HEADER & TABLIST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-6 space-y-6">
        
        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 block">
            {displayTools.length} repositori &amp; resources · sinkronisasi otomatis
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-[300] tracking-[-1px] text-white">
            AI Tools, Repositories &amp; Motion Skills
          </h1>
          <p className="text-sm text-zinc-400 font-sans max-w-2xl leading-relaxed">
            Katalog repositori open-source GitHub, rujukan desain UI/UX, dan GLSL shader canvas terverifikasi untuk developer modern.
          </p>
        </div>

        {/* Tablist Pill Bar */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/[0.08] font-mono text-xs w-fit">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${activeTab === 'all' ? 'bg-white text-black font-bold shadow' : 'text-zinc-400 hover:text-white'}`}
          >
            Semua Resources ({displayTools.length})
          </button>
          <button 
            onClick={() => setActiveTab('saved')}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === 'saved' ? 'bg-white text-black font-bold shadow' : 'text-zinc-400 hover:text-white'}`}
          >
            <span>⭐ Favourites</span>
            <span>({displayTools.filter(t => isBookmarked(t.id)).length})</span>
          </button>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] font-mono border-t border-white/[0.06]">
          <span className="text-zinc-500 uppercase tracking-wider text-[10px]">CATEGORY:</span>
          <button 
            onClick={() => setActiveCategory('all')}
            className={`px-2.5 py-1 rounded-full border transition-all cursor-pointer ${activeCategory === 'all' ? 'bg-white text-black font-bold border-white' : 'bg-transparent text-zinc-400 border-white/[0.08] hover:border-white/20'}`}
          >
            Semua ({displayTools.length})
          </button>
          <button 
            onClick={() => setActiveCategory('website')}
            className={`px-2.5 py-1 rounded-full border transition-all cursor-pointer ${activeCategory === 'website' ? 'bg-white text-black font-bold border-white' : 'bg-transparent text-zinc-400 border-white/[0.08] hover:border-white/20'}`}
          >
            🌐 Websites ({displayTools.filter(t => t.type === 'website').length})
          </button>
          <button 
            onClick={() => setActiveCategory('github')}
            className={`px-2.5 py-1 rounded-full border transition-all cursor-pointer ${activeCategory === 'github' ? 'bg-white text-black font-bold border-white' : 'bg-transparent text-zinc-400 border-white/[0.08] hover:border-white/20'}`}
          >
            🐙 GitHub Repos ({displayTools.filter(t => t.type === 'github').length})
          </button>
          <button 
            onClick={() => setActiveCategory('skills')}
            className={`px-2.5 py-1 rounded-full border transition-all cursor-pointer ${activeCategory === 'skills' ? 'bg-white text-black font-bold border-white' : 'bg-transparent text-zinc-400 border-white/[0.08] hover:border-white/20'}`}
          >
            ✦ Motion &amp; Craft ({displayTools.filter(t => t.type === 'skills').length})
          </button>
        </div>

      </section>

      {/* 3. SIMPLE CARDBOX GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          
          {filteredTools.map((t, idx) => (
            <React.Fragment key={t.id}>
              
              {/* Simple Cardbox with Rotating Silver Beam */}
              <article 
                className="silver-beam-wrapper group flex flex-col justify-between !rounded-[14px]"
              >
                <div className="silver-beam-inner flex flex-col justify-between !rounded-[13px] bg-[#0c0c0e]">
                  {/* Aspect Ratio aspect-[960/684] Media Container */}
                  <div className="relative aspect-[960/684] w-full overflow-hidden bg-zinc-950">
                    <img 
                      src={t.image} 
                      alt={t.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                    {/* Top-Left Badges (Clear visual distinction: Website vs Repo vs Skill) */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-full text-[9.5px] font-mono font-bold bg-white text-black shadow">
                        {t.badge}
                      </span>
                      {t.type === 'website' ? (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 backdrop-blur-md">
                          🌐 Website
                        </span>
                      ) : t.type === 'github' ? (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                          🐙 Repo
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 backdrop-blur-md">
                          ✦ Skill
                        </span>
                      )}
                    </div>

                    {/* Top-Right Like Button */}
                    <button 
                      onClick={(e) => handleLike(t.id, e)}
                      className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/60 hover:bg-black/90 text-[10px] font-mono text-zinc-300 backdrop-blur-md border border-white/10 flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3 text-red-400" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 13.6S2.4 9.9 2.4 6.2A3 3 0 0 1 8 4.7 3 3 0 0 1 13.6 6.2C13.6 9.9 8 13.6 8 13.6Z" />
                      </svg>
                      <span>{likes[t.id] || 320}</span>
                    </button>

                    {/* Center Direct Link Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 backdrop-blur-[2px]">
                      <a
                        href={t.url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-1.5 rounded-full bg-white text-black font-mono text-xs font-bold shadow-xl flex items-center gap-1.5 hover:scale-105 transition-transform"
                      >
                        <span>{t.type === 'website' ? 'Kunjungi Web' : (t.type === 'github' ? 'Lihat Source Code' : 'Buka Modul')}</span>
                        <span>↗</span>
                      </a>
                    </div>
                  </div>

                  {/* Card Footer Bar */}
                  <div className="p-3.5 flex items-center justify-between border-t border-white/[0.06] font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-1">
                        {t.name}
                      </span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] bg-white/[0.08] text-zinc-400 font-mono flex-shrink-0">
                        Free
                      </span>
                    </div>
                    <span className="text-[11px] text-zinc-500 flex-shrink-0">
                      {t.category}
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
                        Lightweight Engine
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white leading-snug">
                      Host-Friendly Scraper Pipeline
                    </h3>
                    <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                      Sistem sinkronisasi REST API murni dengan footprint RAM &lt;15MB, aman untuk host Celeron N5100.
                    </p>
                  </div>
                  <a 
                    href="https://github.com/ilhammu29/oxid-cortex-studio" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-white text-black text-xs font-mono font-bold hover:bg-zinc-200 transition-all text-center"
                  >
                    <span>Lihat Arsitektur</span>
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
