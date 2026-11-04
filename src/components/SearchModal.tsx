'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface SearchItem {
  id: string
  title: string
  category: 'Templates' | 'GitHub Repos' | 'Prompts' | 'Bansos AI' | 'Websites' | 'Intel'
  snippet: string
  link: string
  badge: string
}

const SEARCH_DATABASE: SearchItem[] = [
  // 1. Templates & Blueprints (UI/UX)
  {
    id: "tpl_lumiere",
    title: "Lumière — Editorial E-Commerce",
    category: "Templates",
    snippet: "Minimalist fashion and luxury lifestyle web layout with Swiss typography and bespoke product grids.",
    link: "/detail/lumiere",
    badge: "E-commerce"
  },
  {
    id: "tpl_prisma",
    title: "Prisma — Dark Bento AI Platform",
    category: "Templates",
    snippet: "High-density dark mode SaaS dashboard with live status cards, metric meters, and hairline borders.",
    link: "/detail/prisma",
    badge: "AI & Tech"
  },
  {
    id: "tpl_vesper",
    title: "Vesper — Fintech Analytics Dashboard",
    category: "Templates",
    snippet: "Institutional yield curve tracking, candlestick charts, and liquidity pool metrics in Next.js 14.",
    link: "/detail/vesper",
    badge: "Fintech"
  },
  {
    id: "tpl_stride",
    title: "Stride — Digital Banking Experience",
    category: "Templates",
    snippet: "Multi-currency digital banking app interface with fluid card drag animations and instant settlement flow.",
    link: "/detail/stride",
    badge: "Fintech"
  },
  {
    id: "tpl_kyoto",
    title: "Kyoto Villa — Brutalist 3D Architecture",
    category: "Templates",
    snippet: "Architectural showcase with perspective scroll reveal, Three.js spatial viewport, and stone textures.",
    link: "/detail/kyoto_villa",
    badge: "Brutalist 3D"
  },

  // 2. GitHub Repositories (Curated Open-Source)
  {
    id: "gh_openhands",
    title: "All-Hands-AI / OpenHands (92.5k ★)",
    category: "GitHub Repos",
    snippet: "Autonomous software development agent capable of editing files, executing bash, and web exploration.",
    link: "/repos",
    badge: "Autonomous Agent"
  },
  {
    id: "gh_ollama",
    title: "ollama / ollama (185.7k ★)",
    category: "GitHub Repos",
    snippet: "Run open LLMs locally on CPU and GPU: DeepSeek, Qwen 2.5, Llama 3.3 with OpenAI-compatible API.",
    link: "/repos",
    badge: "Model Runtime"
  },
  {
    id: "gh_scrapling",
    title: "D4Vinci / Scrapling (92.5k ★)",
    category: "GitHub Repos",
    snippet: "Undetectable stealth web scraper capable of Cloudflare Turnstile bypass and structured JSON normalization.",
    link: "/repos",
    badge: "Stealth Scraper"
  },
  {
    id: "gh_fastmcp",
    title: "jlowin / fastmcp (6.8k ★)",
    category: "GitHub Repos",
    snippet: "Fast Pythonic Model Context Protocol (MCP) server framework for Claude and cursor agents.",
    link: "/repos",
    badge: "Developer Tool"
  },
  {
    id: "gh_r3f",
    title: "pmndrs / react-three-fiber (33.4k ★)",
    category: "GitHub Repos",
    snippet: "Declarative Three.js WebGL canvas renderer for React & Next.js applications.",
    link: "/repos",
    badge: "UI Engine"
  },
  {
    id: "gh_vaul",
    title: "emilkowalski / vaul (12.5k ★)",
    category: "GitHub Repos",
    snippet: "Unstyled drawer component for React with organic physics, spring dragging, and zero layout shift.",
    link: "/repos",
    badge: "UI Engine"
  },
  {
    id: "gh_vllm",
    title: "vllm-project / vllm (45.2k ★)",
    category: "GitHub Repos",
    snippet: "High-throughput and memory-efficient LLM inference and serving engine with PagedAttention.",
    link: "/repos",
    badge: "Model Runtime"
  },
  {
    id: "gh_shadcn",
    title: "shadcn-ui / ui (89.2k ★)",
    category: "GitHub Repos",
    snippet: "Accessible, customizable Tailwind component system copy-paste ready for Next.js applications.",
    link: "/repos",
    badge: "Design System"
  },

  // 3. Prompts & Architecture Blueprints
  {
    id: "pmt_copilot",
    title: "Autonomous Agent Copilot Workspace",
    category: "Prompts",
    snippet: "Master prompt: 3-pane cardbox layout with DAG agent viewer, streaming terminal, and token inspector.",
    link: "/prompts",
    badge: "Agent Blueprint"
  },
  {
    id: "pmt_architect",
    title: "Senior Full-Stack Architect (Anti-AI Slop)",
    category: "Prompts",
    snippet: "System prompt for clean, unbloated Next.js, Supabase, and Tailwind code generation.",
    link: "/prompts",
    badge: "Production Code"
  },
  {
    id: "pmt_refactor",
    title: "Surgical Code Refactoring (YAGNI)",
    category: "Prompts",
    snippet: "Minimal diffs, stdlib-first, remove dead abstractions while preserving full backward compatibility.",
    link: "/prompts",
    badge: "Refactoring"
  },

  // 4. Cloud Bansos AI
  {
    id: "grt_gemini",
    title: "Google AI Studio & Gemini 1.5 Pro (1M TPM)",
    category: "Bansos AI",
    snippet: "Free frontier multimodal API access up to 2,000,000 token context without credit card requirements.",
    link: "/grants",
    badge: "Free Tier"
  },
  {
    id: "grt_groq",
    title: "Groq Cloud LPU High-Speed Inference (800 T/s)",
    category: "Bansos AI",
    snippet: "Sub-second token rendering at 800+ tokens/sec on dedicated Language Processing Unit chips.",
    link: "/grants",
    badge: "Ultra Fast"
  },
  {
    id: "grt_cf",
    title: "Cloudflare Workers AI Serverless",
    category: "Bansos AI",
    snippet: "Serverless edge model execution with 10,000 free neuron executions daily on 300+ data centers.",
    link: "/grants",
    badge: "Edge Compute"
  },

  // 5. Frontier Intel Radar
  {
    id: "intl_hf",
    title: "Hugging Face Daily Papers Ingestion",
    category: "Intel",
    snippet: "Automated pipeline indexing latest arXiv machine learning papers with community peer upvotes.",
    link: "/intel",
    badge: "Research"
  },
  {
    id: "intl_hn",
    title: "HackerNews Autonomous AI Drops",
    category: "Intel",
    snippet: "Real-time discussions and open-weights drops filtered from HackerNews Algolia stream.",
    link: "/intel",
    badge: "Community Radar"
  },

  // 6. Curated AI Design Stack (Minham Selection - Websites)
  {
    id: "res_jiro",
    title: "Jiro (jiro.build) — 1,400+ Design Resources & Prompts",
    category: "Websites",
    snippet: "1,400+ design resources with AI-ready prompts and source code to design better with AI.",
    link: "/tools",
    badge: "AI Prompts"
  },
  {
    id: "res_landbook",
    title: "Land-book (land-book.com) — Curated Landing Pages",
    category: "Websites",
    snippet: "Huge gallery of real landing pages, web apps, portfolios, and corporate showcases.",
    link: "/tools",
    badge: "Showcase"
  },
  {
    id: "res_minimalgallery",
    title: "Minimal Gallery (minimal.gallery) — Clean Beats Clever",
    category: "Websites",
    snippet: "Curated web design gallery for when clean beats clever. Clean Swiss grid and human typography.",
    link: "/tools",
    badge: "Clean Design"
  },
  {
    id: "res_fontinlogo",
    title: "FontInLogo (fontinlogo.com) — Brand Typography",
    category: "Websites",
    snippet: "Find the exact fonts used in world-famous company logos, tech brands, and startup identities.",
    link: "/tools",
    badge: "Typography"
  },
  {
    id: "res_3dicons",
    title: "3dicons (3dicons.co) — 1,400+ Free 3D Icons",
    category: "Websites",
    snippet: "Free 3D icons & meshes in PNG, GLTF, and Blender formats for personal and commercial projects.",
    link: "/tools",
    badge: "3D Assets"
  }
]

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
      setTimeout(() => inputRef.current?.focus(), 50)
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const categories = ['All', 'Websites', 'GitHub Repos', 'Templates', 'Prompts', 'Bansos AI', 'Intel']

  const filteredItems = SEARCH_DATABASE.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    const q = query.toLowerCase().trim()
    if (!q) return matchesCategory
    return matchesCategory && (
      item.title.toLowerCase().includes(q) ||
      item.snippet.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.badge.toLowerCase().includes(q)
    )
  })

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredItems.length))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length))
    } else if (e.key === 'Enter') {
      if (filteredItems[selectedIndex]) {
        e.preventDefault()
        router.push(filteredItems[selectedIndex].link)
        onClose()
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Sleek Minimalist Modal Dialog */}
      <div 
        onKeyDown={handleKeyDown}
        className="relative w-full max-w-xl bg-[#0c0c0e] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[75vh]"
      >
        {/* Clean Search Input */}
        <div className="p-4 border-b border-white/[0.06] flex items-center gap-3 bg-[#0a0a0c]">
          <svg className="w-4 h-4 text-zinc-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            ref={inputRef}
            type="text" 
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            placeholder="Cari templates, repos, prompts, atau bansos..."
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none font-sans"
          />
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white/[0.04] text-zinc-400 rounded border border-white/[0.08]">
            ESC
          </kbd>
        </div>

        {/* Minimal Monochromatic Category Filter */}
        <div className="px-4 py-2 border-b border-white/[0.06] flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono bg-[#09090b]">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat)
                setSelectedIndex(0)
              }}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat 
                  ? 'bg-white text-black font-semibold' 
                  : 'bg-transparent text-zinc-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="p-2 overflow-y-auto space-y-1 flex-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 font-mono text-xs">
              Tidak ada hasil untuk &quot;{query}&quot;
            </div>
          ) : (
            filteredItems.map((item, idx) => (
              <Link
                key={item.id}
                href={item.link}
                onClick={onClose}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`p-3 rounded-xl transition-all flex items-center justify-between gap-3 group ${
                  selectedIndex === idx 
                    ? 'bg-white/[0.06] border border-white/[0.12]' 
                    : 'bg-transparent border border-transparent hover:bg-white/[0.03]'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-medium text-zinc-400">
                      {item.category}
                    </span>
                    <span className="text-zinc-600 text-[10px]">•</span>
                    <span className="text-[10px] font-mono text-zinc-500 truncate">
                      {item.badge}
                    </span>
                  </div>
                  <h4 className="font-sans font-medium text-sm text-white group-hover:text-zinc-200 truncate">
                    {item.title}
                  </h4>
                  <p className="text-xs text-zinc-400 font-sans mt-0.5 line-clamp-1 leading-relaxed">
                    {item.snippet}
                  </p>
                </div>

                <div className="flex-shrink-0 text-zinc-600 group-hover:text-zinc-300 text-xs font-mono">
                  ↵
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Minimal Footer Helper */}
        <div className="px-4 py-2.5 border-t border-white/[0.06] bg-black/50 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>{filteredItems.length} hasil ditemukan</span>
          <span className="hidden sm:inline">Gunakan ↑ ↓ untuk navigasi · Enter untuk pilih</span>
        </div>
      </div>
    </div>
  )
}
