'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const realTools = [
    {
      id: "tool_ollama",
      name: "Ollama",
      category: "Local LLM Inference Engine",
      badge: "OPEN SOURCE",
      logo: "https://ollama.com/public/ollama.png",
      tagline: "Jalankan model open-weights (Llama 3, DeepSeek, Qwen) secara lokal di laptop via single CLI command.",
      description: "Ollama menyederhanakan eksekusi model AI lokal dengan manajemen bobot otomatis, API REST kompatibel OpenAI, dan akselerasi CPU/GPU minimal overhead.",
      url: "https://ollama.com",
      github: "https://github.com/ollama/ollama",
      stars: "98.4k"
    },
    {
      id: "tool_scrapling",
      name: "Scrapling",
      category: "Stealth Web Scraping Framework",
      badge: "FREE / OPEN SOURCE",
      logo: "https://avatars.githubusercontent.com/u/10834375?v=4",
      tagline: "Framework web scraping Python modern dengan kemampuan adaptif melewati deteksi anti-bot dan Cloudflare.",
      description: "Dibangun khusus untuk AI crawlers yang membutuhkan throughput tinggi tanpa terhalang Cloudflare Turnstile, browser fingerprinting, atau IP block.",
      url: "https://github.com/D4Vinci/Scrapling",
      github: "https://github.com/D4Vinci/Scrapling",
      stars: "14.2k"
    },
    {
      id: "tool_openhands",
      name: "OpenHands (All-Hands AI)",
      category: "Autonomous Software Agent CLI",
      badge: "COMMUNITY EDITION",
      logo: "https://avatars.githubusercontent.com/u/166649775?v=4",
      tagline: "Platform agen pengembang software otonom yang mampu memprogram, menjalankan terminal, dan membuat PR mandiri.",
      description: "Agen otonom open-source terdepan yang dapat berinteraksi dengan lingkungan bash, mengedit kode multi-file, dan menyelesaikan issues repositori.",
      url: "https://github.com/All-Hands-AI/OpenHands",
      github: "https://github.com/All-Hands-AI/OpenHands",
      stars: "42.1k"
    },
    {
      id: "tool_fastmcp",
      name: "FastMCP",
      category: "Model Context Protocol Tooling",
      badge: "DEVELOPER TOOL",
      logo: "https://avatars.githubusercontent.com/u/153965?v=4",
      tagline: "Cara tercepat membangun server MCP kustom berbasis Python untuk memperluas toolset agent Claude dan Hermes.",
      description: "Menghubungkan LLM dan AI agent dengan database lokal, CLI host, dan sensor eksternal menggunakan standar resmi Anthropic Model Context Protocol.",
      url: "https://github.com/jlowin/fastmcp",
      github: "https://github.com/jlowin/fastmcp",
      stars: "6.5k"
    }
  ]

  const filteredTools = realTools.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#f4f4f5] font-sans antialiased selection:bg-orange-500 selection:text-white flex">
      
      {/* 1. LEFT ICON RAIL */}
      <aside className="w-16 sm:w-20 bg-[#0e0e12] border-r border-[#26262e] flex flex-col items-center justify-between py-6 flex-shrink-0 sticky top-0 h-screen z-40">
        <div className="space-y-8 flex flex-col items-center">
          <Link href="/" className="w-10 h-10 rounded-2xl p-1.5 bg-white border border-zinc-200 flex items-center justify-center shadow-lg shadow-orange-500/20 hover:scale-105 transition-transform" title="OXID Labs Home">
            <img src="/images/oxid-logo.png" alt="OXID Labs" className="w-full h-full object-contain" />
          </Link>

          <nav className="flex flex-col items-center space-y-4">
            <Link href="/" className="p-3 rounded-2xl text-zinc-400 hover:text-white hover:bg-[#16161c] transition-all" title="Home Studio">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            </Link>
            <Link href="/prompts" className="p-3 rounded-2xl text-zinc-400 hover:text-white hover:bg-[#16161c] transition-all" title="Prompt Lab">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </Link>
            <Link href="/grants" className="p-3 rounded-2xl text-zinc-400 hover:text-white hover:bg-[#16161c] transition-all" title="Bansos AI">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </Link>
            <Link href="/tools" className="p-3 rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/30 transition-all" title="AI Tools (Active)">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path></svg>
            </Link>
            <Link href="/intel" className="p-3 rounded-2xl text-zinc-400 hover:text-white hover:bg-[#16161c] transition-all" title="Threads Intel Live">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
            </Link>
            <Link href="/templates" className="p-3 rounded-2xl text-orange-400 hover:text-white hover:bg-[#16161c] transition-all" title="Karya Templates Kita">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>
            </Link>
          </nav>
        </div>

        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center font-bold text-xs text-white border-2 border-[#26262e]">
          M
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* 2. TOP BAR */}
        <header className="h-20 border-b border-[#26262e] bg-[#0a0a0c]/90 backdrop-blur-md px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-2 font-mono text-xs">
            <span className="font-bold text-white uppercase tracking-wider">Category: AI Tools &amp; Local CLI Radar</span>
          </div>

          <div className="flex items-center space-x-3">
            <input 
              type="text" 
              placeholder="Search repo, tools..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#121216] border border-[#26262e] text-xs px-4 py-2 rounded-full text-zinc-200 focus:outline-none focus:border-orange-500 w-60 font-mono"
            />
            <Link 
              href="/templates" 
              className="px-5 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-mono text-xs font-bold transition-all shadow-md shadow-orange-500/25"
            >
              Templates
            </Link>
          </div>
        </header>

        {/* 3. MAIN CENTER AREA + RIGHT SIDEBAR */}
        <div className="flex-1 flex flex-col xl:flex-row min-w-0">
          
          <main className="flex-1 p-6 sm:p-8 space-y-8 min-w-0 overflow-y-auto">
            
            {/* FEATURED TOOL HERO */}
            <div className="bg-[#121216] border border-[#26262e] rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-center space-x-5">
                <div className="w-16 h-16 p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <img src={realTools[0].logo} alt="Ollama" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase bg-orange-500/10 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded">
                      {realTools[0].badge}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">• ⭐ {realTools[0].stars} GitHub Stars</span>
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-white mt-1">{realTools[0].name}</h2>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">{realTools[0].tagline}</p>
                </div>
              </div>

              <a 
                href={realTools[0].url} 
                target="_blank" 
                rel="noreferrer"
                className="px-6 py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-mono text-xs font-bold transition-all shadow-md shadow-orange-500/25 whitespace-nowrap self-start lg:self-auto"
              >
                Visit Official Repo ↗
              </a>
            </div>

            {/* TOOLS 2-COLUMN GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTools.map(tool => (
                <div key={tool.id} className="bg-[#121216] border border-[#26262e] hover:border-orange-500/50 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-xl transition-all">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 p-2.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <img src={tool.logo} alt={tool.name} className="w-full h-full object-contain" />
                      </div>
                      <span className="text-xs font-mono text-orange-400">⭐ {tool.stars}</span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase text-zinc-500">{tool.category}</span>
                      <h3 className="font-serif text-xl font-bold text-white leading-snug mt-0.5">{tool.name}</h3>
                    </div>

                    <p className="text-xs text-orange-400 font-mono leading-relaxed">{tool.tagline}</p>
                    <p className="text-xs text-zinc-300 font-sans leading-relaxed">{tool.description}</p>
                  </div>

                  <div className="pt-3 border-t border-[#26262e] flex items-center justify-between font-mono text-xs">
                    <Link href={`/detail/${tool.id}`} className="text-zinc-400 hover:text-white hover:underline">
                      Docs Detail →
                    </Link>
                    <a 
                      href={tool.url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-1.5 rounded-full bg-[#16161c] hover:bg-orange-500 hover:text-white text-orange-400 border border-[#26262e] font-bold transition-all"
                    >
                      GitHub Repo ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </main>

          {/* 4. RIGHT SIDEBAR */}
          <aside className="w-full xl:w-80 bg-[#0e0e12] border-t xl:border-t-0 xl:border-l border-[#26262e] p-6 space-y-8 flex-shrink-0">
            <div className="bg-[#121218] border border-[#26262e] rounded-3xl p-6 space-y-3 shadow-xl font-mono text-xs">
              <span className="text-orange-500 font-bold uppercase block">Local CLI Toolset</span>
              <p className="text-zinc-400 leading-relaxed text-[11px]">
                Seluruh tools di radar ini telah diuji kompatibel untuk berjalan lokal di lingkungan Linux Arch laptop Minham tanpa membengkakkan konsumsi RAM.
              </p>
              <div className="pt-2 border-t border-[#26262e] flex items-center justify-between text-[10px]">
                <span className="text-zinc-500">Host Engine:</span>
                <span className="text-emerald-400 font-bold">Linux x86_64 Active</span>
              </div>
            </div>
          </aside>

        </div>

      </div>

    </div>
  )
}
