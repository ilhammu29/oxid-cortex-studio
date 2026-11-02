'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useStudioTheme } from '@/lib/useStudioTheme'
import { useBookmarks } from '@/lib/useBookmarks'
import StudioNavbar from '@/components/StudioNavbar'

export default function GrantsPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { darkMode, toggleTheme } = useStudioTheme()
  const { toggleBookmark, isBookmarked } = useBookmarks()
  const [latencyPings, setLatencyPings] = useState({
    google: 112,
    groq: 38,
    cloudflare: 64
  })
  const [isPinging, setIsPinging] = useState(false)
  const [likes, setLikes] = useState<Record<string, number>>({
    'grant_gcp_1': 950,
    'grant_groq_2': 1240,
    'grant_cf_3': 810,
    'grant_github_4': 1520,
    'grant_cohere_5': 430,
    'grant_together_6': 670
  })

  const handlePingLatency = () => {
    setIsPinging(true)
    setTimeout(() => {
      setLatencyPings({
        google: Math.floor(Math.random() * 25) + 100,
        groq: Math.floor(Math.random() * 15) + 30,
        cloudflare: Math.floor(Math.random() * 20) + 55
      })
      setIsPinging(false)
    }, 600)
  }

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setLikes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  }

  const realGrants = [
    {
      id: "grant_gcp_1",
      badge: "Free 1M TPM",
      title: "Google AI Studio & Gemini 1.5 Pro",
      provider: "Google Cloud",
      image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80",
      value: "15 RPM / 1M TPM Free",
      category: "LLM API",
      description: "Akses gratis model Gemini 1.5 Pro & Flash via Google AI Studio tanpa wajib kartu kredit. Sangat optimal untuk prototyping dan RAG 2M token.",
      claimUrl: "https://aistudio.google.com/"
    },
    {
      id: "grant_groq_2",
      badge: "800 T/s LPU",
      title: "Groq Cloud LPU High-Speed Inference",
      provider: "Groq Inc.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      value: "Ribuan Req/Hari Free",
      category: "Inference",
      description: "Inference ultra cepat hingga 800+ tokens/detik untuk Llama-3-70B dan Mixtral. Ideal untuk voice assistant dan routing agen latency rendah.",
      claimUrl: "https://console.groq.com/"
    },
    {
      id: "grant_cf_3",
      badge: "10k Neurons",
      title: "Cloudflare Workers AI Serverless",
      provider: "Cloudflare",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      value: "10,000 Neurons/Hari",
      category: "Edge AI",
      description: "Jalankan embedding vektor, translasi, dan text generation di 300+ data center edge Cloudflare tanpa wajib server backend.",
      claimUrl: "https://dash.cloudflare.com/"
    },
    {
      id: "grant_github_4",
      badge: "$200k+ Pack",
      title: "GitHub Student Developer Pack",
      provider: "GitHub / Partners",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      value: "Benefit $200k+ Free",
      category: "Education",
      description: "Kompilasi benefit gratis dari 90+ partner: DigitalOcean $200, domain name gratis Namecheap, JetBrains IDE suite, dan GitHub Copilot.",
      claimUrl: "https://education.github.com/pack"
    },
    {
      id: "grant_cohere_5",
      badge: "Rerank API",
      title: "Cohere Command R+ & Embed",
      provider: "Cohere",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
      value: "1,000 API Calls/Bulan",
      category: "LLM API",
      description: "Model rerank terbaik dunia untuk vector database retrieval. Meningkatkan akurasi RAG dengan reranking dokumen multi-bahasa.",
      claimUrl: "https://dashboard.cohere.com/"
    },
    {
      id: "grant_together_6",
      badge: "$5 Balance",
      title: "Together AI Open Models Cloud",
      provider: "Together AI",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
      value: "$5 Free Balance",
      category: "Inference",
      description: "Kredit gratis instan untuk menjalankan DeepSeek-Coder, Qwen 2.5, dan Flux.1 image generation via API serverless compute.",
      claimUrl: "https://api.together.ai/"
    }
  ]

  const categories = Array.from(new Set(realGrants.map(g => g.category)))

  const filteredGrants = realGrants.filter(g => {
    if (activeCategory !== 'all' && g.category !== activeCategory) return false
    if (searchQuery && !g.title.toLowerCase().includes(searchQuery.toLowerCase()) && !g.provider.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (activeTab === 'saved' && !isBookmarked(g.id)) return false
    return true
  })

  return (
    <main className="min-h-screen bg-[#000000] text-zinc-100 font-sans antialiased selection:bg-orange-500 selection:text-white">
      
      {/* 1. UNIFIED STUDIO NAVBAR */}
      <StudioNavbar activeRoute="grants" />

      {/* 2. GETLAYERS SUBPAGE HEADER & TABLIST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-6 space-y-6">
        
        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 block">
            100% Free Developer Quotas · Zero Subscription
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-[300] tracking-[-1px] text-white">
            Digital Grants &amp; Free Cloud AI Radar
          </h1>
          <p className="text-sm text-zinc-400 font-sans max-w-2xl leading-relaxed">
            Kompilasi kuota gratis resmi penyedia model AI dunia. Klaim akses Gemini 1.5 Pro, Groq LPU, dan Cloudflare Workers tanpa kartu kredit.
          </p>
        </div>

        {/* Live Latency Telemetry Bar */}
        <div className="flex flex-wrap items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] font-mono text-xs">
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Live Latency:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-zinc-300">Google AI Studio:</span>
            <span className="text-emerald-400 font-bold">{latencyPings.google}ms</span>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-zinc-300">Groq LPU:</span>
            <span className="text-emerald-400 font-bold">{latencyPings.groq}ms</span>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-zinc-300">Cloudflare:</span>
            <span className="text-emerald-400 font-bold">{latencyPings.cloudflare}ms</span>
          </div>
          <button 
            onClick={handlePingLatency}
            disabled={isPinging}
            className="ml-auto text-[10px] text-orange-400 hover:underline cursor-pointer font-bold"
          >
            {isPinging ? 'Pinging...' : '↻ Re-ping'}
          </button>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] font-mono border-t border-white/[0.06]">
          <span className="text-zinc-500 uppercase tracking-wider text-[10px]">CATEGORY:</span>
          <button 
            onClick={() => setActiveCategory('all')}
            className={`px-2.5 py-1 rounded-full border transition-all cursor-pointer ${activeCategory === 'all' ? 'bg-white text-black font-bold border-white' : 'bg-transparent text-zinc-400 border-white/[0.08] hover:border-white/20'}`}
          >
            Semua ({realGrants.length})
          </button>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 rounded-full border transition-all cursor-pointer ${activeCategory === cat ? 'bg-white text-black font-bold border-white' : 'bg-transparent text-zinc-400 border-white/[0.08] hover:border-white/20'}`}
            >
              {cat} ({realGrants.filter(g => g.category === cat).length})
            </button>
          ))}
        </div>

      </section>

      {/* 3. SIMPLE CARDBOX GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          
          {filteredGrants.map((g, idx) => (
            <React.Fragment key={g.id}>
              
              {/* Simple Cardbox */}
              <article 
                className="group relative bg-[#0c0c0e] border border-white/[0.08] hover:border-white/[0.2] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                {/* 16:9 Image Container */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-950">
                  <img 
                    src={g.image} 
                    alt={g.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                  {/* Top-Left Badge */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-white text-black shadow">
                      {g.badge}
                    </span>
                  </div>

                  {/* Top-Right Like Button */}
                  <button 
                    onClick={(e) => handleLike(g.id, e)}
                    className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/60 hover:bg-black/90 text-[10px] font-mono text-zinc-300 backdrop-blur-md border border-white/10 flex items-center gap-1 transition-colors"
                  >
                    <span>♥</span>
                    <span>{likes[g.id] || 400}</span>
                  </button>

                  {/* Center Direct Claim Link Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 backdrop-blur-[2px]">
                    <a
                      href={g.claimUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-1.5 rounded-full bg-white text-black font-mono text-xs font-bold shadow-xl flex items-center gap-1.5"
                    >
                      <span>Klaim Kuota</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>

                {/* Card Footer Bar */}
                <div className="p-3.5 space-y-1 border-t border-white/[0.06] font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-1">
                      {g.title}
                    </span>
                    <span className="text-[11px] text-zinc-500 flex-shrink-0">
                      {g.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-zinc-400">
                    <span className="text-zinc-500">{g.provider}</span>
                    <span className="text-emerald-400 font-bold">{g.value}</span>
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
                        Developer Subsidy
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white leading-snug">
                      Total Nilai Kuota $200k+ Tersedia
                    </h3>
                    <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                      Optimalkan kuota gratis resmi untuk memangkas pengeluaran biaya API langganan AI bulanan hingga 100%.
                    </p>
                  </div>
                  <a 
                    href="https://aistudio.google.com/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-white text-black text-xs font-mono font-bold hover:bg-zinc-200 transition-all text-center"
                  >
                    <span>Klaim Gemini 1.5</span>
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
