'use client'

import React, { useState } from 'react'
import StudioNavbar from '@/components/StudioNavbar'

export default function ReposPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const repos = [
    {
      id: "openhands",
      name: "All-Hands-AI / OpenHands",
      category: "Autonomous Agents",
      stars: "92.5k",
      forks: "12.8k",
      language: "Python",
      langColor: "#3572A5",
      badge: "Trending Agent",
      image: "https://opengraph.githubassets.com/1/All-Hands-AI/OpenHands",
      url: "https://github.com/All-Hands-AI/OpenHands",
      description: "Autonomous software development agent capable of executing bash commands, editing codebases, browsing the web, and making pull requests.",
      cloneCmd: "docker run -it --pull=always -e SANDBOX_USER_ID=$(id -u) -p 3000:3000 ghcr.io/all-hands-ai/openhands:0.14"
    },
    {
      id: "ollama",
      name: "ollama / ollama",
      category: "Model Runtimes",
      stars: "185.7k",
      forks: "14.2k",
      language: "Go",
      langColor: "#00ADD8",
      badge: "Most Popular",
      image: "https://opengraph.githubassets.com/1/ollama/ollama",
      url: "https://github.com/ollama/ollama",
      description: "Get up and running with large language models locally. Run DeepSeek, Qwen 2.5, Llama 3.3, and Gemma on CPU or GPU with OpenAI-compatible API.",
      cloneCmd: "curl -fsSL https://ollama.com/install.sh | sh && ollama run llama3.3"
    },
    {
      id: "scrapling",
      name: "D4Vinci / Scrapling",
      category: "Autonomous Agents",
      stars: "92.5k",
      forks: "4.1k",
      language: "Python",
      langColor: "#3572A5",
      badge: "Stealth Scraper",
      image: "https://opengraph.githubassets.com/1/D4Vinci/Scrapling",
      url: "https://github.com/D4Vinci/Scrapling",
      description: "Undetectable, blazing-fast web scraping engine that handles Cloudflare Turnstile, dynamic SPAs, and structured JSON normalization.",
      cloneCmd: "pip install scrapling && python -c 'import scrapling; print(scrapling.__version__)'"
    },
    {
      id: "fastmcp",
      name: "jlowin / fastmcp",
      category: "Developer Tools",
      stars: "6.8k",
      forks: "520",
      language: "Python",
      langColor: "#3572A5",
      badge: "Anthropic MCP",
      image: "https://opengraph.githubassets.com/1/jlowin/fastmcp",
      url: "https://github.com/jlowin/fastmcp",
      description: "The fast, Pythonic way to build Model Context Protocol (MCP) servers. Expose custom tools, resources, and filesystem helpers to Claude and cursor agents.",
      cloneCmd: "pip install fastmcp && fastmcp dev server.py"
    },
    {
      id: "r3f",
      name: "pmndrs / react-three-fiber",
      category: "UI Engines",
      stars: "33.4k",
      forks: "2.1k",
      language: "TypeScript",
      langColor: "#3178C6",
      badge: "3D Canvas",
      image: "https://opengraph.githubassets.com/1/pmndrs/react-three-fiber",
      url: "https://github.com/pmndrs/react-three-fiber",
      description: "A React renderer for Three.js. Build declarative, reusable 3D graphics and shaders with smooth physics for Next.js without main-thread blocking.",
      cloneCmd: "npm install three @types/three @react-three/fiber @react-three/drei"
    },
    {
      id: "vaul",
      name: "emilkowalski / vaul",
      category: "UI Engines",
      stars: "12.5k",
      forks: "430",
      language: "TypeScript",
      langColor: "#3178C6",
      badge: "Physics Drawer",
      image: "https://opengraph.githubassets.com/1/emilkowalski/vaul",
      url: "https://github.com/emilkowalski/vaul",
      description: "An unstyled, accessible drawer component for React that can be used on iOS and web with organic velocity gestures and touch physics.",
      cloneCmd: "npm install vaul"
    },
    {
      id: "vllm",
      name: "vllm-project / vllm",
      category: "Model Runtimes",
      stars: "45.2k",
      forks: "7.8k",
      language: "Python / C++",
      langColor: "#3572A5",
      badge: "High Throughput",
      image: "https://opengraph.githubassets.com/1/vllm-project/vllm",
      url: "https://github.com/vllm-project/vllm",
      description: "A high-throughput and memory-efficient inference and serving engine for LLMs with PagedAttention and continuous batching.",
      cloneCmd: "pip install vllm && python -m vllm.entrypoints.openai.api_server --model mistralai/Mistral-7B-Instruct-v0.2"
    },
    {
      id: "vercel_ai",
      name: "vercel / ai",
      category: "Developer Tools",
      stars: "18.9k",
      forks: "2.4k",
      language: "TypeScript",
      langColor: "#3178C6",
      badge: "Streaming SDK",
      image: "https://opengraph.githubassets.com/1/vercel/ai",
      url: "https://github.com/vercel/ai",
      description: "The AI SDK is the TypeScript toolkit designed to help developers build AI-powered applications, chatbots, and streaming generative UIs.",
      cloneCmd: "npm install ai @ai-sdk/openai"
    }
  ]

  const categories = ['All', 'Autonomous Agents', 'Model Runtimes', 'Developer Tools', 'UI Engines']

  const filteredRepos = repos.filter(r => {
    const matchCat = activeFilter === 'All' || r.category === activeFilter
    const matchQuery = !searchQuery || 
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchQuery
  })

  const handleCopyCmd = (id: string, cmd: string) => {
    navigator.clipboard.writeText(cmd)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="min-h-screen bg-[#000000] text-zinc-100 font-sans antialiased selection:bg-white/20 selection:text-white">
      {/* 1. Global Navigation */}
      <StudioNavbar activeRoute="repos" />

      {/* 2. Subpage Header (Matching GetLayers /templates) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-6 space-y-6 border-b border-white/[0.06]">
        {/* Title Group */}
        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block">
            {repos.length} repositori produksi · open-source ai harness
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-[300] tracking-[-1px] text-white">
            GitHub AI Repositories
          </h1>
          <p className="text-sm text-zinc-400 font-sans max-w-2xl leading-relaxed">
            Koleksi repositori kecerdasan buatan, agen otonom, local model runtimes, dan developer tools berkelas dunia yang terverifikasi siap pakai.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 font-mono text-xs">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-white text-black font-bold shadow'
                    : 'bg-white/[0.04] text-zinc-400 hover:text-white border border-white/[0.08]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full sm:w-72">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari repo atau tag..."
              className="w-full bg-[#0c0c0e] border border-white/[0.08] rounded-xl px-4 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 font-mono"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xs font-mono"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 3. Repositories Cardbox Grid (Authentic GetLayers Aspect Ratio & Images) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {filteredRepos.map(repo => (
            <article 
              key={repo.id}
              className="silver-beam-wrapper group flex flex-col justify-between !rounded-[14px]"
            >
              <div className="silver-beam-inner flex flex-col justify-between !rounded-[13px] bg-[#0c0c0e] overflow-hidden">
                {/* Authentic Media Stage: Aspect [960/684] */}
                <div className="relative aspect-[960/684] w-full overflow-hidden bg-zinc-950">
                  <img 
                    src={repo.image} 
                    alt={repo.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-transparent"></div>

                  {/* Top-Left Badge */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-white text-black shadow">
                      {repo.badge}
                    </span>
                  </div>

                  {/* Top-Right Stars Pill */}
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/70 border border-white/10 text-amber-300 font-mono text-[10px] flex items-center gap-1 backdrop-blur-md">
                    <span>★</span>
                    <span className="font-bold text-white">{repo.stars}</span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-sans font-medium text-[15px] text-white group-hover:text-zinc-200 transition-colors mb-1 truncate">
                      {repo.name}
                    </h3>
                    <p className="text-xs text-zinc-400 font-sans leading-relaxed line-clamp-2 mb-3">
                      {repo.description}
                    </p>
                  </div>

                  {/* Bottom Meta & CLI Actions */}
                  <div className="pt-3 border-t border-white/[0.06] space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: repo.langColor }}></span>
                        <span className="text-zinc-400">{repo.language}</span>
                      </div>
                      <span className="text-[10px] text-zinc-400">{repo.category}</span>
                    </div>

                    {/* Quick Install/Clone Snippet */}
                    <div 
                      onClick={() => handleCopyCmd(repo.id, repo.cloneCmd)}
                      className="p-2 rounded-lg bg-black/60 border border-white/[0.06] hover:border-white/20 transition-colors cursor-pointer group/cmd flex items-center justify-between"
                      title="Klik untuk menyalin perintah instalasi"
                    >
                      <code className="text-[10px] font-mono text-zinc-400 truncate max-w-[180px]">
                        {repo.cloneCmd}
                      </code>
                      <span className="text-[9px] font-mono text-zinc-400 group-hover/cmd:text-white flex-shrink-0 ml-1.5">
                        {copiedId === repo.id ? 'Tersalin ✓' : 'Salin'}
                      </span>
                    </div>

                    {/* External Link */}
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2 px-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-xs font-mono text-center text-white transition-all block border border-white/[0.08]"
                    >
                      Buka di GitHub ↗
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}
