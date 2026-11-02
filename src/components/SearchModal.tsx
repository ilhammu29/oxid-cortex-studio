'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface SearchItem {
  id: string
  title: string
  category: 'Prompts' | 'Bansos AI' | 'Tools' | 'Threads Intel' | 'Templates'
  snippet: string
  link: string
  badge: string
}

const SEARCH_DATABASE: SearchItem[] = [
  {
    id: "prompt_1",
    title: "Senior Full-Stack Architect (Anti-AI Slop)",
    category: "Prompts",
    snippet: "Master prompt arsitektur Next.js, Supabase, Tailwind tanpa boilerplate generik.",
    link: "/detail/code_1",
    badge: "Genesis Prompt"
  },
  {
    id: "prompt_2",
    title: "Zero-Latency Realtime Speech Agent",
    category: "Prompts",
    snippet: "System prompt untuk voice agent deterministik dengan interruption handling.",
    link: "/prompts",
    badge: "Voice AI"
  },
  {
    id: "prompt_3",
    title: "Automated Civil & Construction Estimator",
    category: "Prompts",
    snippet: "Prompt perhitungan kuantitas volume dan analisis harga satuan standar PUPR.",
    link: "/prompts",
    badge: "Engineering"
  },
  {
    id: "grant_1",
    title: "Google AI Studio & Gemini 1.5 Pro (1M TPM)",
    category: "Bansos AI",
    snippet: "Akses frontier model Gemini 1.5 Pro dan 1.5 Flash tanpa kartu kredit (15 RPM / 1M TPM).",
    link: "/detail/grant_gcp_1",
    badge: "Free Quota Active"
  },
  {
    id: "grant_2",
    title: "Groq Cloud LPU High-Speed Inference",
    category: "Bansos AI",
    snippet: "Inference ultra-cepat 800+ tokens/detik Llama 3 dan Mixtral gratis 14,400 req/hari.",
    link: "/detail/grant_groq_2",
    badge: "Ultra Fast"
  },
  {
    id: "grant_3",
    title: "Cloudflare Workers AI Free Tier",
    category: "Bansos AI",
    snippet: "Serverless inference 10,000 neurons/hari di edge CDN global Cloudflare.",
    link: "/grants",
    badge: "Edge Compute"
  },
  {
    id: "tool_1",
    title: "Ollama Local Model Runner",
    category: "Tools",
    snippet: "Jalankan Llama 3, DeepSeek-Coder, dan Mistral di laptop secara lokal dan offline.",
    link: "/tools",
    badge: "Local AI"
  },
  {
    id: "tool_2",
    title: "vLLM High-Throughput Serving Engine",
    category: "Tools",
    snippet: "Engine serving LLM dengan PagedAttention dan continuous batching super efisien.",
    link: "/tools",
    badge: "Inference Engine"
  },
  {
    id: "intel_1",
    title: "Andrej Karpathy on Software 2.0 & LLM OS",
    category: "Threads Intel",
    snippet: "Wawasan mendalam mengenai transformasi software engineering menjadi neural architecture.",
    link: "/intel",
    badge: "Real Threads Feed"
  },
  {
    id: "template_1",
    title: "Autonomous Agent Copilot & Studio (Duke Layout)",
    category: "Templates",
    snippet: "Arsitektur 3-pane cardbox dengan DAG viewer, terminal log, dan inspection drawer.",
    link: "/templates",
    badge: "Template #01"
  },
  {
    id: "template_2",
    title: "OXID Cortex Pro 4-Pane Dashboard",
    category: "Templates",
    snippet: "Layout komprehensif: Left Icon Rail, Header Filter, Split Main Content, dan Right Action Widget.",
    link: "/templates",
    badge: "Template #02"
  },
  {
    id: "res_shadcn",
    title: "shadcn/ui — Re-usable Design System & Components",
    category: "Tools",
    snippet: "Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.",
    link: "/tools",
    badge: "Design System"
  },
  {
    id: "res_landbook",
    title: "Land-book — Curated Landing Page Inspiration",
    category: "Tools",
    snippet: "Landing page inspiration curated well. Discover finest web designs, portfolios, and SaaS apps.",
    link: "/tools",
    badge: "Top Showcase"
  },
  {
    id: "res_recentdesign",
    title: "Recent Design — Fresh Web Gallery",
    category: "Tools",
    snippet: "A great gallery of fresh web design inspiration updated daily with clean Swiss typography focus.",
    link: "/tools",
    badge: "Fresh Daily"
  },
  {
    id: "res_landdding",
    title: "Landdding — Top-Tier Landing Pages",
    category: "Tools",
    snippet: "Top-tier SaaS landing pages with micro-interactions, dark mode elegance, and high-conversion layouts.",
    link: "/tools",
    badge: "High Conversion"
  },
  {
    id: "res_fontinlogo",
    title: "FontInLogo — Find The Fonts in Famous Brands",
    category: "Tools",
    snippet: "Find the exact fonts used in world-famous company logos, tech brands, and startup identities.",
    link: "/tools",
    badge: "Brand Typography"
  },
  {
    id: "skill_design_eng",
    title: "Design Engineering — Easing, Durations & Springs",
    category: "Prompts",
    snippet: "Master micro-interactions by Emil Kowalski: cubic-bezier easing, spring physics, and organic UI transitions.",
    link: "/prompts",
    badge: "Motion Physics"
  },
  {
    id: "skill_shader_dev",
    title: "Shader Dev — 36 ShaderToy Techniques",
    category: "Prompts",
    snippet: "36 production ShaderToy and GLSL techniques for real-time generative canvas visuals in web apps.",
    link: "/prompts",
    badge: "WebGL & Shaders"
  },
  {
    id: "skill_diagram_design",
    title: "Diagram Design — 44 Editorial Diagram Types",
    category: "Prompts",
    snippet: "44 editorial diagram types for architectural documentation, DAG flows, and system engineering.",
    link: "/prompts",
    badge: "44 Diagram Types"
  },
  {
    id: "skill_vercel_guidelines",
    title: "Web Interface Guidelines — Vercel UI Review",
    category: "Prompts",
    snippet: "The gold standard for web interface quality: accessibility, focus states, keyboard shortcuts, and zero-slop UI.",
    link: "/prompts",
    badge: "Design Standards"
  },
  {
    id: "skill_craftwork",
    title: "Craftwork — Real Fonts, Icons & UI Components",
    category: "Prompts",
    snippet: "High-fidelity design assets: vector icons, production fonts, 3D illustrations, and crafted design systems.",
    link: "/prompts",
    badge: "Component Craft"
  },
  {
    id: "gh_openhands",
    title: "All-Hands-AI / OpenHands (Autonomous Agent)",
    category: "Tools",
    snippet: "Autonomous software development agent in bash and browser with 92k+ GitHub stars.",
    link: "/tools",
    badge: "⭐ 92.4k Stars"
  },
  {
    id: "gh_vaul",
    title: "emilkowalski / vaul (Drawer Component)",
    category: "Tools",
    snippet: "Unstyled drawer component for React with organic physics and spring dragging.",
    link: "/tools",
    badge: "⭐ 12.5k Stars"
  },
  {
    id: "gh_three_fiber",
    title: "pmndrs / react-three-fiber (3D Canvas)",
    category: "Tools",
    snippet: "Declarative Three.js WebGL renderer for React & Next.js apps with 28k+ stars.",
    link: "/tools",
    badge: "⭐ 28.1k Stars"
  },
  {
    id: "gh_fastmcp",
    title: "jlowin / fastmcp (Model Context Protocol)",
    category: "Tools",
    snippet: "Fast Model Context Protocol (MCP) servers in Python for AI agents.",
    link: "/tools",
    badge: "⭐ 6.5k Stars"
  },
  {
    id: "gh_shadcn_ui",
    title: "shadcn-ui / ui (Accessible Components)",
    category: "Tools",
    snippet: "Beautifully designed components copy-paste ready for Next.js with 89k+ stars.",
    link: "/tools",
    badge: "⭐ 89.2k Stars"
  }
]

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const categories = ['All', 'Prompts', 'Bansos AI', 'Tools', 'Threads Intel', 'Templates']

  const filteredItems = SEARCH_DATABASE.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    const q = query.toLowerCase()
    const matchesQuery = item.title.toLowerCase().includes(q) ||
                         item.snippet.toLowerCase().includes(q) ||
                         item.category.toLowerCase().includes(q) ||
                         item.badge.toLowerCase().includes(q)
    return matchesCategory && matchesQuery
  })

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Background click to dismiss */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#121216] border border-zinc-200 dark:border-[#26262e] rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh]">
        
        {/* Search Header Input */}
        <div className="p-4 sm:p-5 border-b border-zinc-200 dark:border-[#26262e] flex items-center gap-3">
          <svg className="w-5 h-5 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari prompt, bansos AI, tools, atau template... (ketik apa saja)"
            className="w-full bg-transparent text-sm sm:text-base text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none font-sans"
          />
          <kbd className="hidden sm:inline-block px-2 py-1 text-[10px] font-mono font-bold bg-zinc-100 dark:bg-[#1a1a24] text-zinc-500 rounded-lg border border-zinc-200 dark:border-[#26262e]">
            ESC
          </kbd>
        </div>

        {/* Category Filter Pills */}
        <div className="px-4 py-2.5 bg-zinc-50 dark:bg-[#0a0a0c] border-b border-zinc-200 dark:border-[#26262e] flex items-center gap-2 overflow-x-auto text-xs font-mono">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-all cursor-pointer font-bold ${selectedCategory === cat ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/30' : 'bg-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="p-3 overflow-y-auto space-y-2 flex-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <span className="text-3xl block">🔍</span>
              <p className="text-xs font-mono text-zinc-500">Tidak ada hasil yang cocok dengan &quot;{query}&quot;</p>
            </div>
          ) : (
            filteredItems.map(item => (
              <Link
                key={item.id}
                href={item.link}
                onClick={onClose}
                className="p-3.5 rounded-2xl bg-zinc-50/50 hover:bg-zinc-100 dark:bg-[#0e0e12] dark:hover:bg-[#181822] border border-zinc-200/60 dark:border-[#26262e] hover:border-orange-500/40 transition-all block group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 group-hover:text-zinc-300">
                    {item.badge} ↗
                  </span>
                </div>
                <h4 className="font-sans font-bold text-sm text-zinc-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans mt-0.5 leading-relaxed line-clamp-1">
                  {item.snippet}
                </p>
              </Link>
            ))
          )}
        </div>

        {/* Footer Shortcut Helper */}
        <div className="p-3 border-t border-zinc-200 dark:border-[#26262e] bg-zinc-50 dark:bg-[#0a0a0c] flex items-center justify-between text-[11px] font-mono text-zinc-400">
          <span>Menampilkan {filteredItems.length} hasil relevan</span>
          <span>Tekan ESC untuk menutup</span>
        </div>

      </div>

    </div>
  )
}
