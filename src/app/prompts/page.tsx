'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function PromptsPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [heroTab, setHeroTab] = useState('details')

  const handleCopy = (id: string, text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
    }
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2500)
  }

  // Hero Card Data
  const heroCard = {
    id: "hero_agent_copilot",
    title: "Autonomous Agent Copilot & Studio Workspace",
    creator: "Andrej Karpathy",
    handle: "@karpathy",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    benefit: "100% Free Quota",
    benefitSub: "$0.00 / Dev",
    description: "Flagship developer-first agent studio workspace. Built with strict terminal verification gates, live stream execution logs, and contextual memory inspectors without generic AI slop.",
    prompt: `Design a developer-first Autonomous AI Agent studio workspace.
Key Specifications:
- Interface Structure: 3-pane cardbox layout featuring an agent pipeline dag viewer on the left, live streaming terminal execution log in the center, and contextual token/memory inspector on the right.
- Color Scheme: Monochromatic matte carbon (#0a0a0c), cyber flame orange active glow (#ff5722), and neon cyan status dot (#06b6d4).
- Interactions: Collapsible inspection drawer, floating action command bar (Ctrl+K), and live process kill/retry buttons with micro-animations.`
  }

  // Grid Items (3 Columns)
  const promptGrid = [
    {
      id: "prompt_bento_1",
      title: "Fintech Wealth Bento",
      creator: "Shu Ding",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
      benefit: "Free Quota",
      valueUsd: "$0.00 / Open",
      category: "uiux",
      likes: 842,
      body: `Design a high-end institutional wealth management dashboard in Tailwind CSS and Next.js. Bento Grid with live candlestick feeds, yield curve tracker, and liquidity metrics.`
    },
    {
      id: "prompt_swiss_2",
      title: "Swiss Editorial Journal",
      creator: "swyx",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=80",
      benefit: "Open Access",
      valueUsd: "$0.00 / Swiss",
      category: "uiux",
      likes: 615,
      body: `Create a clean, human-centric editorial web magazine interface inspired by Swiss typography. Lora serif headlines, generous white space, and zero noisy banners.`
    },
    {
      id: "prompt_arch_3",
      title: "Senior Full-Stack Architect",
      creator: "Minham & Aira",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
      benefit: "Architecture",
      valueUsd: "Zero Hallucination",
      category: "coding",
      likes: 1820,
      body: `Bertindaklah sebagai Lead Software Architect kelas dunia. Bangun arsitektur aplikasi tanpa boilerplate palsu dan tanpa pola AI slop. Utamakan stdlib/native, exit code 0, dan modular API contract.`
    },
    {
      id: "prompt_refactor_4",
      title: "Surgical Code Refactoring",
      creator: "Aira Core",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&auto=format&fit=crop&q=80",
      benefit: "Clean Diff",
      valueUsd: "YAGNI Principle",
      category: "coding",
      likes: 940,
      body: `Senior Systems Developer yang memegang prinsip lazy engineering efisien (YAGNI). Refactoring kode dengan memangkas baris, hapus abstraksi berlebih, pertahankan backward compatibility.`
    },
    {
      id: "prompt_first_principle_5",
      title: "First-Principle Breakdown",
      creator: "OXID Metacortex",
      avatar: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=100&h=100&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=80",
      benefit: "1-3-1 Rule",
      valueUsd: "Metacognition",
      category: "coding",
      likes: 730,
      body: `Bedah masalah dari prinsip paling mendasar: bongkar asumsi lumrah, pecah ke komponen fundamental, rekonstruksi solusi baru tanpa meniru solusi pasar, hasilkan 3 opsi keputusan 1-3-1.`
    },
    {
      id: "prompt_luxury_6",
      title: "Luxury Minimalist E-Commerce",
      creator: "Shu Ding",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=800&auto=format&fit=crop&q=80",
      benefit: "Neo-Brutalism",
      valueUsd: "Framer Motion",
      category: "uiux",
      likes: 490,
      body: `Ultra-minimalist flagship product launch page for bespoke hardware. Full-bleed product render hero, smooth scroll perspective reveal, and exploded view components.`
    }
  ]

  const filteredGrid = promptGrid.filter(item => {
    const matchCategory = activeTab === 'all' || item.category === activeTab
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.body.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#f4f4f5] font-sans antialiased selection:bg-orange-500 selection:text-white flex">
      
      {/* ======================================================== */}
      {/* 1. LEFT ICON RAIL (EXACT REFERENCE DESIGN)               */}
      {/* ======================================================== */}
      <aside className="w-16 sm:w-20 bg-[#0e0e12] border-r border-[#26262e] flex flex-col items-center justify-between py-6 flex-shrink-0 sticky top-0 h-screen z-40">
        
        {/* Top Logo */}
        <div className="space-y-8 flex flex-col items-center">
          <Link href="/" className="w-10 h-10 rounded-2xl bg-orange-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-500/30">
            ⚡
          </Link>

          {/* Navigation Icons Rail */}
          <nav className="flex flex-col items-center space-y-4">
            <Link 
              href="/" 
              className="p-3 rounded-2xl text-zinc-400 hover:text-white hover:bg-[#16161c] transition-all"
              title="Home Studio"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            </Link>

            {/* Active Rail Item with Curved Pill Tab */}
            <Link 
              href="/prompts" 
              className="p-3 rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/30 transition-all"
              title="Prompt Lab (Active)"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </Link>

            <Link 
              href="/grants" 
              className="p-3 rounded-2xl text-zinc-400 hover:text-white hover:bg-[#16161c] transition-all"
              title="Bansos AI & Grants"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </Link>

            <Link 
              href="/tools" 
              className="p-3 rounded-2xl text-zinc-400 hover:text-white hover:bg-[#16161c] transition-all"
              title="AI Tools Radar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path></svg>
            </Link>

            <Link 
              href="/intel" 
              className="p-3 rounded-2xl text-zinc-400 hover:text-white hover:bg-[#16161c] transition-all"
              title="Threads Intel Live"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
            </Link>

            <Link 
              href="/templates" 
              className="p-3 rounded-2xl text-orange-400 hover:text-white hover:bg-[#16161c] transition-all"
              title="Karya Templates Kita"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>
            </Link>
          </nav>
        </div>

        {/* Bottom Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center font-bold text-xs text-white border-2 border-[#26262e]">
          M
        </div>
      </aside>

      {/* ======================================================== */}
      {/* MAIN LAYOUT (CENTER CONTENT + RIGHT SIDEBAR)             */}
      {/* ======================================================== */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* ======================================================== */}
        {/* 2. TOP BAR (EXACT REFERENCE DESIGN)                      */}
        {/* ======================================================== */}
        <header className="h-20 border-b border-[#26262e] bg-[#0a0a0c]/90 backdrop-blur-md px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          
          {/* Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto font-mono text-xs">
            {[
              { id: 'all', label: 'All Prompts' },
              { id: 'coding', label: 'Architecture & Coding' },
              { id: 'uiux', label: 'UI/UX Bento Design' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full transition-all cursor-pointer whitespace-nowrap ${activeTab === tab.id ? 'bg-[#121216] text-orange-400 border border-orange-500/40 font-bold shadow-md' : 'text-zinc-400 hover:text-white'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Bar Capsule & Right Actions */}
          <div className="flex items-center space-x-3">
            <div className="relative hidden md:block">
              <input 
                type="text" 
                placeholder="Search weapons, prompts..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#121216] border border-[#26262e] text-xs px-4 py-2 rounded-full text-zinc-200 focus:outline-none focus:border-orange-500 w-60 font-mono"
              />
            </div>

            <button 
              onClick={() => handleCopy("top_sync", "curl -s http://localhost:3000/api/scrape")}
              className="px-5 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-mono text-xs font-bold transition-all shadow-md shadow-orange-500/25 flex items-center gap-1.5 cursor-pointer"
            >
              <span>⚡</span>
              <span className="hidden sm:inline">Sync Radar</span>
            </button>
          </div>
        </header>

        {/* Content Body: Center Main + Right Sidebar */}
        <div className="flex-1 flex flex-col xl:flex-row min-w-0">
          
          {/* ======================================================== */}
          {/* 3. MAIN CENTER CONTENT AREA                              */}
          {/* ======================================================== */}
          <main className="flex-1 p-6 sm:p-8 space-y-10 min-w-0 overflow-y-auto">
            
            {/* A. FEATURED HERO CARD (EXACT REFERENCE 2-COLUMN SPLIT) */}
            <div className="bg-[#121216] border border-[#26262e] rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              {/* Left Side: Visual Preview Render */}
              <div className="lg:col-span-6 relative h-80 sm:h-96 lg:h-auto overflow-hidden bg-black group">
                <img 
                  src={heroCard.image} 
                  alt={heroCard.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Top-Left: Avatars Badge */}
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/20">
                  <div className="flex -space-x-2">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50" className="w-5 h-5 rounded-full border border-black" />
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50" className="w-5 h-5 rounded-full border border-black" />
                  </div>
                  <span className="text-[10px] font-mono text-white font-bold">+28 Engineers</span>
                </div>

                {/* Top-Right: Countdown Timer */}
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center gap-2 border border-white/20 font-mono text-[10px] text-zinc-300">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                  <span>Quota Refresh:</span>
                  <strong className="text-white">14H : 17M : 34S</strong>
                </div>

                {/* Bottom Overlay Pill: Benefit + Action CTA */}
                <div className="absolute bottom-4 inset-x-4 bg-black/80 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 flex items-center justify-between font-mono">
                  <div>
                    <span className="text-[10px] text-zinc-400 block uppercase">Access Benefit</span>
                    <strong className="text-xs text-emerald-400 font-bold">{heroCard.benefit}</strong>
                    <span className="text-[10px] text-zinc-400 ml-1.5">({heroCard.benefitSub})</span>
                  </div>

                  <button 
                    onClick={() => handleCopy("hero_feat", heroCard.prompt)}
                    className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase transition-all shadow-md shadow-orange-500/25 flex items-center gap-1.5"
                  >
                    <span>{copiedId === "hero_feat" ? "✓ Copied" : "Copy Prompt >"}</span>
                  </button>
                </div>
              </div>

              {/* Right Side: Metadata & Parameter Section */}
              <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  
                  {/* Segment Tabs */}
                  <div className="flex items-center space-x-2 border-b border-[#26262e] pb-3 text-xs font-mono">
                    {['details', 'parameters', 'changelog'].map(tab => (
                      <button
                        key={tab}
                        onClick={() => setHeroTab(tab)}
                        className={`px-3 py-1 rounded-full uppercase transition-all cursor-pointer ${heroTab === tab ? 'bg-orange-500 text-white font-bold' : 'text-zinc-500 hover:text-white'}`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Date Meta */}
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                    <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <span>Live Verified: May 01, 2026, 12:01 PM</span>
                  </div>

                  {/* Title & Body */}
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                    {heroCard.title}
                  </h2>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                    {heroCard.description}
                  </p>

                  {/* Prompt Preview Snippet */}
                  <div className="p-3.5 bg-[#0a0a0c] rounded-2xl border border-[#26262e] font-mono text-xs text-zinc-300 max-h-36 overflow-y-auto">
                    {heroCard.prompt}
                  </div>
                </div>

                {/* Footer Creator Profile */}
                <div className="pt-4 border-t border-[#26262e] flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={heroCard.avatar} alt={heroCard.creator} className="w-10 h-10 rounded-full object-cover border border-[#26262e]" />
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 block uppercase">Lead AI Architect</span>
                      <strong className="text-xs text-white block">{heroCard.creator}</strong>
                    </div>
                  </div>

                  <Link 
                    href="/intel"
                    className="px-4 py-2 rounded-full bg-[#16161c] hover:bg-orange-500 hover:text-white text-orange-400 border border-[#26262e] font-mono text-xs font-bold transition-all"
                  >
                    Other Works &gt;
                  </Link>
                </div>
              </div>

            </div>

            {/* B. ALL WEAPONS SECTION (3-COLUMN ITEM GRID) */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#26262e] pb-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    All Studio Weapons
                  </h3>
                  <span className="text-xs font-mono text-zinc-500">({filteredGrid.length} items)</span>
                </div>

                <div className="text-xs font-mono text-orange-500 flex items-center gap-1 cursor-pointer">
                  <span>Sort by: Today</span>
                  <span>▼</span>
                </div>
              </div>

              {/* Grid 3 Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGrid.map(item => (
                  <div 
                    key={item.id}
                    className="bg-[#121216] border border-[#26262e] hover:border-orange-500/50 rounded-3xl p-5 flex flex-col justify-between space-y-4 shadow-xl transition-all group"
                  >
                    <div>
                      {/* Top Action Row */}
                      <div className="flex items-center justify-between pb-3 text-xs font-mono text-zinc-500">
                        <span>•••</span>
                        <span className="text-orange-500 flex items-center gap-1">
                          ❤️ {item.likes}
                        </span>
                      </div>

                      {/* Visual Thumbnail with Avatar on Bottom Left */}
                      <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-black mb-3">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute bottom-2 left-2 w-8 h-8 rounded-full border-2 border-black overflow-hidden shadow-md">
                          <img src={item.avatar} alt={item.creator} className="w-full h-full object-cover" />
                        </div>
                      </div>

                      {/* Title & Meta */}
                      <div className="space-y-1">
                        <h4 className="font-bold text-base text-white truncate">{item.title}</h4>
                        <p className="text-xs font-mono text-zinc-500">By {item.creator}</p>
                      </div>

                      <div className="pt-2 flex items-center justify-between font-mono text-xs">
                        <span className="text-zinc-400">{item.benefit}</span>
                        <strong className="text-orange-400 font-bold">{item.valueUsd}</strong>
                      </div>
                    </div>

                    {/* Bottom Two Action Buttons */}
                    <div className="pt-3 border-t border-[#26262e] grid grid-cols-2 gap-2 font-mono text-xs">
                      <Link 
                        href={`/detail/${item.id}`}
                        className="py-2 rounded-xl bg-[#16161c] hover:bg-[#202028] text-zinc-300 text-center font-bold border border-[#26262e] transition-all"
                      >
                        Inspect
                      </Link>
                      <button 
                        onClick={() => handleCopy(item.id, item.body)}
                        className="py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-center font-bold transition-all shadow-md shadow-orange-500/25"
                      >
                        {copiedId === item.id ? "✓ Done" : "Copy"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </main>

          {/* ======================================================== */}
          {/* 4. RIGHT SIDEBAR (SAVINGS, CREATORS, HISTORY)            */}
          {/* ======================================================== */}
          <aside className="w-full xl:w-80 bg-[#0e0e12] border-t xl:border-t-0 xl:border-l border-[#26262e] p-6 space-y-8 flex-shrink-0">
            
            {/* A. Studio Quota & Savings Container (Dark Navy / Black) */}
            <div className="bg-[#121218] border border-[#26262e] rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h4 className="font-mono text-xs font-bold uppercase text-emerald-400 tracking-wider">
                  STUDIO SAVINGS
                </h4>
                <span className="text-zinc-500 text-xs cursor-pointer">•••</span>
              </div>

              {/* Provider Pills */}
              <div className="flex items-center space-x-1.5 font-mono text-[10px]">
                <span className="px-2.5 py-1 rounded-full bg-orange-500 text-white font-bold">• Gemini Free</span>
                <span className="px-2 py-1 rounded-full bg-[#181822] text-zinc-400">• Groq</span>
                <span className="px-2 py-1 rounded-full bg-[#181822] text-zinc-400">• Cloudflare</span>
              </div>

              {/* Balance Amount */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">Total Free Value Saved:</span>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">+61.2% Eff</span>
                </div>
                <strong className="font-serif text-3xl font-black text-white block">
                  $28,672.10
                </strong>
              </div>

              {/* Sparkline Curve Chart (SVG) */}
              <div className="pt-2">
                <svg className="w-full h-14" viewBox="0 0 200 60" fill="none">
                  <path d="M5 45 Q 40 10, 80 35 T 150 15 T 195 5" stroke="#10b981" strokeWidth="2.5" fill="none" />
                  <circle cx="80" cy="35" r="3" fill="#10b981" />
                  <circle cx="150" cy="15" r="3" fill="#10b981" />
                  <circle cx="195" cy="5" r="4" fill="#ff5722" />
                </svg>
              </div>

              <button 
                onClick={() => handleCopy("sidebar_quota", "echo 'Quota refreshed successfully.'")}
                className="w-full py-2.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-mono text-xs font-bold transition-all shadow-md shadow-orange-500/25"
              >
                Refresh Quota +
              </button>
            </div>

            {/* B. Featured Creators */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#26262e] pb-2 font-mono text-xs">
                <span className="font-bold text-white uppercase">Featured Creators</span>
                <Link href="/intel" className="text-orange-500 hover:underline">See All &gt;</Link>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" className="w-9 h-9 rounded-full object-cover border border-[#26262e]" />
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 block uppercase">Lead Architect</span>
                    <strong className="text-xs text-white">Andrej Karpathy</strong>
                  </div>
                </div>
                <span className="text-xs font-mono text-orange-500 cursor-pointer hover:underline">+ Follow</span>
              </div>

              {/* Mini Cards */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-[#121216] border border-[#26262e] rounded-2xl space-y-2">
                  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200" className="w-full h-16 rounded-xl object-cover" />
                  <div className="font-mono text-[10px]">
                    <span className="text-white block font-bold truncate">Wealth Bento</span>
                    <span className="text-orange-400">Free Tier</span>
                  </div>
                </div>

                <div className="p-3 bg-[#121216] border border-[#26262e] rounded-2xl space-y-2">
                  <img src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=200" className="w-full h-16 rounded-xl object-cover" />
                  <div className="font-mono text-[10px]">
                    <span className="text-white block font-bold truncate">Swiss Journal</span>
                    <span className="text-orange-400">Open Access</span>
                  </div>
                </div>
              </div>
            </div>

            {/* C. Live Real Ingestion History */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#26262e] pb-2 font-mono text-xs">
                <span className="font-bold text-white uppercase">Live Activity</span>
                <Link href="/intel" className="text-orange-500 hover:underline">See All &gt;</Link>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 bg-[#121216] border border-[#26262e] rounded-2xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">@karpathy</span>
                    <span className="text-[10px] text-zinc-500">Live Threads</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate">Old fear: not utilizing GPUs! New fear: token quota...</p>
                </div>

                <div className="p-3 bg-[#121216] border border-[#26262e] rounded-2xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">@GoogleCloud</span>
                    <span className="text-[10px] text-emerald-400">Grant Active</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate">Gemini 1.5 Pro free 1M TPM quota active</p>
                </div>
              </div>
            </div>

          </aside>

        </div>

      </div>

    </div>
  )
}
