'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useStudioTheme } from '@/lib/useStudioTheme'
import { useBookmarks } from '@/lib/useBookmarks'

export default function PromptsPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [heroTab, setHeroTab] = useState('details')
  const { darkMode, toggleTheme } = useStudioTheme()
  const { toggleBookmark, isBookmarked } = useBookmarks()

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
      creator: "OXID Architecture Collective",
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
    const matchCategory = activeTab === 'all' || 
                          (activeTab === 'bookmarked' && isBookmarked(item.id)) ||
                          item.category === activeTab
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.body.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  })

  const handleExportAllPrompts = () => {
    const bundleText = `# OXID CORTEX STUDIO — MASTER PROMPT BUNDLE
Generated: ${new Date().toLocaleDateString('id-ID')}
Total Prompts: ${promptGrid.length}

${promptGrid.map((p, idx) => `## ${idx + 1}. ${p.title} (${p.category.toUpperCase()})
- Creator: ${p.creator}
- Benefit: ${p.benefit}

\`\`\`markdown
${p.body}
\`\`\`
`).join('\n---\n\n')}
`
    handleCopy("export_bundle", bundleText)
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-[#0a0a0c] dark:text-[#f4f4f5] font-sans antialiased selection:bg-orange-500 selection:text-white flex transition-colors duration-200">
      
      {/* ======================================================== */}
      {/* 1. LEFT ICON RAIL (DESKTOP ONLY)                         */}
      {/* ======================================================== */}
      <aside className="hidden sm:flex w-16 sm:w-20 bg-zinc-50 border-r border-zinc-200 dark:bg-[#0e0e12] dark:border-[#26262e] flex-col items-center justify-between py-6 flex-shrink-0 sticky top-0 h-screen z-40 transition-colors">
        
        {/* Top Logo */}
        <div className="space-y-8 flex flex-col items-center">
          <Link href="/" className="w-10 h-10 rounded-2xl p-1.5 bg-white border border-zinc-200 flex items-center justify-center shadow-lg shadow-orange-500/20 hover:scale-105 transition-transform" title="OXID Labs Home">
            <img src="/images/oxid-logo.png" alt="OXID Labs" className="w-full h-full object-contain" />
          </Link>

          {/* Navigation Icons Rail */}
          <nav className="flex flex-col items-center space-y-4">
            <Link 
              href="/" 
              className="p-3 rounded-2xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-[#16161c] transition-all"
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
              className="p-3 rounded-2xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-[#16161c] transition-all"
              title="Bansos AI & Grants"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </Link>

            <Link 
              href="/tools" 
              className="p-3 rounded-2xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-[#16161c] transition-all"
              title="AI Tools Radar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path></svg>
            </Link>

            <Link 
              href="/intel" 
              className="p-3 rounded-2xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-[#16161c] transition-all"
              title="Threads Intel Live"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
            </Link>

            <Link 
              href="/templates" 
              className="p-3 rounded-2xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-[#16161c] transition-all"
              title="Karya Templates Kita"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>
            </Link>
          </nav>
        </div>

        {/* Bottom Avatar */}
        <div className="w-10 h-10 rounded-2xl bg-white p-1 border border-zinc-200 flex items-center justify-center shadow-lg shadow-orange-500/20" title="OXID Security Verified">
          <img src="/images/oxid-logo.png" alt="OXID" className="w-full h-full object-contain" />
        </div>
      </aside>

      {/* ======================================================== */}
      {/* MAIN LAYOUT (CENTER CONTENT + RIGHT SIDEBAR)             */}
      {/* ======================================================== */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* ======================================================== */}
        {/* 2. TOP BAR (ULTRA COMPACT 1-LINE HEADER ON MOBILE)       */}
        {/* ======================================================== */}
        <header className="border-b border-zinc-200 dark:border-[#26262e] bg-white/95 dark:bg-[#0a0a0c]/95 backdrop-blur-md sticky top-0 z-30 transition-colors">
          <div className="h-14 sm:h-20 px-4 sm:px-8 flex items-center justify-between gap-3">
            {/* Left: Brand / Title */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-white p-1 flex items-center justify-center border border-zinc-200 shadow-sm flex-shrink-0">
                <img src="/images/oxid-logo.png" alt="OXID" className="w-full h-full object-contain" />
              </div>
              <span className="font-serif font-black text-sm sm:text-lg text-zinc-900 dark:text-white uppercase tracking-wider">
                Prompt<span className="text-orange-500">.Lab</span>
              </span>
            </Link>

            {/* Right: Search Input + Theme Toggle + Export Bundle Button */}
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                placeholder="Search prompt..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-zinc-100 dark:bg-[#121216] border border-zinc-300 dark:border-[#26262e] text-xs px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-zinc-900 dark:text-zinc-200 focus:outline-none focus:border-orange-500 w-32 sm:w-60 font-mono transition-colors"
              />

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-1.5 sm:px-3 sm:py-1.5 rounded-full border border-zinc-300 dark:border-[#26262e] bg-zinc-100 hover:bg-zinc-200 dark:bg-[#16161c] dark:hover:bg-[#202028] text-xs font-mono font-bold flex items-center gap-1 cursor-pointer transition-all"
                title="Ganti Tema (Light/Dark)"
              >
                <span>{darkMode ? '🌙' : '☀️'}</span>
                <span className="hidden md:inline text-[11px]">{darkMode ? 'Dark' : 'Light'}</span>
              </button>

              {/* Export Bundle Button */}
              <button 
                onClick={handleExportAllPrompts}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-mono text-xs font-bold transition-all shadow-md shadow-orange-500/25 whitespace-nowrap cursor-pointer"
                title="Salin Seluruh Bundle Prompt ke Clipboard (Siap Pakai untuk Cursor / Claude)"
              >
                <span>{copiedId === "export_bundle" ? "✓ Bundle Tersalin" : "📦 Export Bundle"}</span>
              </button>
            </div>
          </div>

          {/* Slim Horizontal Filter Pills Bar */}
          <div className="px-4 sm:px-8 py-2 bg-zinc-100/80 dark:bg-[#0e0e12]/80 border-t border-zinc-200/80 dark:border-[#26262e]/40 flex items-center space-x-2 font-mono text-xs overflow-x-auto scrollbar-none transition-colors">
            {[
              { id: 'all', label: 'All Prompts' },
              { id: 'bookmarked', label: `⭐ Saved (${promptGrid.filter(p => isBookmarked(p.id)).length})` },
              { id: 'coding', label: 'Architecture & Coding' },
              { id: 'uiux', label: 'UI/UX Bento Design' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer whitespace-nowrap text-[11px] ${activeTab === tab.id ? 'bg-orange-500 text-white shadow-sm' : 'bg-zinc-200/80 text-zinc-600 hover:text-black dark:bg-[#16161c] dark:text-zinc-400 dark:hover:text-white'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </header>

        {/* ======================================================== */}
        {/* 3. MAIN CENTER AREA + RIGHT SIDEBAR                      */}
        {/* ======================================================== */}
        <div className="flex-1 flex flex-col xl:flex-row min-w-0">
          
          {/* CENTER MAIN FEED */}
          <main className="flex-1 p-4 sm:p-8 pb-28 sm:pb-8 space-y-6 sm:space-y-8 min-w-0 overflow-y-auto">
            
            {/* A. FEATURED HERO CARD (EXACT REFERENCE 2-COLUMN SPLIT) */}
            <div className="bg-zinc-50 dark:bg-[#121216] border border-zinc-200 dark:border-[#26262e] rounded-3xl overflow-hidden shadow-sm dark:shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-0 transition-colors">
              
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
                    className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase transition-all shadow-md shadow-orange-500/25 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{copiedId === "hero_feat" ? "✓ Copied" : "Copy Prompt >"}</span>
                  </button>
                </div>
              </div>

              {/* Right Side: Metadata & Parameter Section */}
              <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  
                  {/* Segment Tabs */}
                  <div className="flex items-center space-x-2 border-b border-zinc-200 dark:border-[#26262e] pb-3 text-xs font-mono transition-colors">
                    {['details', 'parameters', 'changelog'].map(tab => (
                      <button
                        key={tab}
                        onClick={() => setHeroTab(tab)}
                        className={`px-3 py-1 rounded-full uppercase transition-all cursor-pointer ${heroTab === tab ? 'bg-orange-500 text-white font-bold' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Date Meta */}
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                    <span>14 OCT 2026</span>
                    <span>•</span>
                    <span className="text-orange-500 font-bold">OXID VERIFIED WORKSPACE</span>
                  </div>

                  {/* Title */}
                  <h2 className="font-serif text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white leading-tight">
                    {heroCard.title}
                  </h2>

                  {/* Author / Creator Line */}
                  <div className="flex items-center gap-3">
                    <img 
                      src={heroCard.avatar} 
                      alt={heroCard.creator}
                      className="w-8 h-8 rounded-full border border-orange-500/40 object-cover" 
                    />
                    <div>
                      <strong className="text-xs font-sans text-zinc-900 dark:text-zinc-200 block">{heroCard.creator}</strong>
                      <span className="text-[10px] font-mono text-zinc-500">{heroCard.handle}</span>
                    </div>
                  </div>

                  {/* Body Text */}
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                    {heroCard.description}
                  </p>

                  {/* Prompt Box */}
                  <div className="p-4 bg-zinc-100 dark:bg-[#0a0a0c] border border-zinc-200 dark:border-[#26262e] rounded-2xl font-mono text-xs text-zinc-800 dark:text-zinc-300 space-y-2 transition-colors">
                    <div className="flex items-center justify-between text-[10px] text-zinc-500 border-b border-zinc-200 dark:border-[#26262e] pb-2">
                      <span className="font-bold uppercase text-orange-500">Live Agent Pipeline Schema</span>
                      <span>Markdown Spec</span>
                    </div>
                    <pre className="text-[11px] leading-relaxed whitespace-pre-wrap font-mono text-zinc-700 dark:text-zinc-300">
                      {heroCard.prompt}
                    </pre>
                  </div>
                </div>

                {/* Footer Action Card */}
                <div className="pt-4 border-t border-zinc-200 dark:border-[#26262e] flex items-center justify-between font-mono text-xs transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-zinc-500 text-[11px]">Ready for Production Scaffolding</span>
                  </div>

                  <button 
                    onClick={() => handleCopy("hero_direct", heroCard.prompt)}
                    className="text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>{copiedId === "hero_direct" ? "✓ Copied" : "Copy Complete Pipeline Prompt →"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* B. 3-COLUMN BENTO GRID CARDS */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">
                    Pustaka Master Prompt &amp; Layout Architectures
                  </h3>
                  <p className="text-xs text-zinc-500 font-mono">
                    Template prompt siap salin dengan instruksi anti-slop tanpa boilerplate berlebih.
                  </p>
                </div>
                <span className="text-xs font-mono text-orange-500 font-bold bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                  {filteredGrid.length} Prompts Active
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGrid.map((card) => (
                  <div 
                    key={card.id}
                    className="bg-zinc-50 dark:bg-[#121216] border border-zinc-200 dark:border-[#26262e] hover:border-orange-500/50 rounded-3xl overflow-hidden shadow-sm dark:shadow-xl transition-all flex flex-col justify-between group"
                  >
                    {/* Top Preview Image Container */}
                    <div className="relative h-48 bg-zinc-100 dark:bg-black/60 overflow-hidden">
                      <img 
                        src={card.image} 
                        alt={card.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Category Badge */}
                      <span className="absolute top-3 left-3 bg-white/90 dark:bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-bold text-orange-600 dark:text-orange-400 border border-zinc-200 dark:border-white/10">
                        {card.category}
                      </span>

                      {/* Bookmark Button */}
                      <button
                        onClick={() => toggleBookmark(card.id)}
                        className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-md border transition-all cursor-pointer ${isBookmarked(card.id) ? 'bg-orange-500 text-white border-orange-500 shadow-md' : 'bg-white/80 dark:bg-black/60 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-white/10 hover:text-orange-500'}`}
                        title={isBookmarked(card.id) ? 'Hapus Bookmark' : 'Simpan ke Personal Vault'}
                      >
                        ⭐
                      </button>

                      {/* Benefit Tag */}
                      <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-black/75 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-mono text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/10 flex items-center gap-1.5">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">{card.benefit}</span>
                        <span>•</span>
                        <span className="text-zinc-500">{card.valueUsd}</span>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-3">
                        {/* Title */}
                        <h4 className="font-serif text-lg font-bold text-zinc-900 dark:text-white leading-snug group-hover:text-orange-500 transition-colors">
                          {card.title}
                        </h4>

                        {/* Creator Tag */}
                        <div className="flex items-center gap-2">
                          <img 
                            src={card.avatar} 
                            alt={card.creator} 
                            className="w-5 h-5 rounded-full border border-orange-500/40 object-cover" 
                          />
                          <span className="text-[11px] font-mono text-zinc-500">{card.creator}</span>
                        </div>

                        {/* Prompt Body Box */}
                        <div className="p-3 bg-zinc-100 dark:bg-[#0a0a0c] border border-zinc-200 dark:border-[#26262e] rounded-xl font-mono text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed max-h-32 overflow-y-auto transition-colors">
                          {card.body}
                        </div>
                      </div>

                      {/* Bottom Footer Actions */}
                      <div className="pt-3 border-t border-zinc-200 dark:border-[#26262e] flex items-center justify-between font-mono text-xs transition-colors">
                        <div className="flex items-center gap-1 text-[11px] text-zinc-500">
                          <span>❤️</span>
                          <span>{card.likes}</span>
                        </div>

                        <button 
                          onClick={() => handleCopy(card.id, card.body)}
                          className="px-4 py-1.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-all shadow-md shadow-orange-500/20 cursor-pointer"
                        >
                          {copiedId === card.id ? "✓ Copied" : "Copy Prompt >"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </main>

          {/* ======================================================== */}
          {/* 4. RIGHT SIDEBAR (REFERENCE INSPECTOR & AUDIT)           */}
          {/* ======================================================== */}
          <aside className="w-full xl:w-80 bg-zinc-50 dark:bg-[#0e0e12] border-t xl:border-t-0 xl:border-l border-zinc-200 dark:border-[#26262e] p-6 space-y-8 flex-shrink-0 transition-colors">
            
            {/* Top Stat Widget */}
            <div className="bg-white dark:bg-[#121218] border border-zinc-200 dark:border-[#26262e] rounded-3xl p-6 space-y-4 shadow-sm dark:shadow-xl font-mono text-xs transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 uppercase tracking-widest text-[10px]">Studio Status</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <div>
                <strong className="text-2xl font-serif text-zinc-900 dark:text-white font-bold block">{promptGrid.length + 1} Master Prompts</strong>
                <span className="text-emerald-600 dark:text-emerald-400 text-[11px]">100% Zero-Slop Standard</span>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed font-sans">
                Setiap prompt dirancang dengan doktrin anti-AI slop: tanpa gradasi ungu norak, layout terstruktur kuat, dan kode siap kompilasi.
              </p>
            </div>

            {/* Ingestion Monitor Widget */}
            <div className="bg-white dark:bg-[#121218] border border-zinc-200 dark:border-[#26262e] rounded-3xl p-6 space-y-4 shadow-sm dark:shadow-xl font-mono text-xs transition-colors">
              <span className="text-orange-500 uppercase tracking-widest text-[10px] font-bold block">Live Quota Feeds</span>
              
              <div className="space-y-3">
                <div className="p-3 bg-zinc-100 dark:bg-[#121216] border border-zinc-200 dark:border-[#26262e] rounded-2xl space-y-1 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-900 dark:text-white font-bold">@karpathy</span>
                    <span className="text-[10px] text-orange-500 font-bold">Threads Feed</span>
                  </div>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 truncate">Old fear: not utilizing GPUs! New fear: token quota...</p>
                </div>

                <div className="p-3 bg-zinc-100 dark:bg-[#121216] border border-zinc-200 dark:border-[#26262e] rounded-2xl space-y-1 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-900 dark:text-white font-bold">@GoogleCloud</span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Grant Active</span>
                  </div>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 truncate">Gemini 1.5 Pro free 1M TPM quota active</p>
                </div>
              </div>
            </div>

          </aside>

        </div>

      </div>

      {/* SLEEK FLOATING MOBILE BOTTOM NAVIGATION BAR */}
      <div className="sm:hidden fixed bottom-3 inset-x-4 z-50 bg-white/95 dark:bg-[#0e0e12]/95 backdrop-blur-xl border border-zinc-200 dark:border-[#26262e] rounded-full p-2 flex items-center justify-around shadow-2xl transition-colors">
        <Link href="/" className="p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white flex flex-col items-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          <span className="text-[9px] font-mono font-bold mt-0.5">Home</span>
        </Link>
        <Link href="/prompts" className="p-2 text-orange-500 flex flex-col items-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          <span className="text-[9px] font-mono font-bold mt-0.5">Prompts</span>
        </Link>
        <Link href="/grants" className="p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white flex flex-col items-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span className="text-[9px] font-mono font-bold mt-0.5">Bansos</span>
        </Link>
        <Link href="/tools" className="p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white flex flex-col items-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path></svg>
          <span className="text-[9px] font-mono font-bold mt-0.5">Radar</span>
        </Link>
        <Link href="/templates" className="p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white flex flex-col items-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>
          <span className="text-[9px] font-mono font-bold mt-0.5">Templates</span>
        </Link>
      </div>

    </div>
  )
}
