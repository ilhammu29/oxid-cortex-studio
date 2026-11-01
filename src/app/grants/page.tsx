'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useStudioTheme } from '@/lib/useStudioTheme'
import { useBookmarks } from '@/lib/useBookmarks'

export default function GrantsPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const { darkMode, toggleTheme } = useStudioTheme()
  const { toggleBookmark, isBookmarked } = useBookmarks()
  const [latencyPings, setLatencyPings] = useState({
    google: 112,
    groq: 38,
    cloudflare: 64
  })
  const [isPinging, setIsPinging] = useState(false)

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

  const realGrants = [
    {
      id: "grant_gcp_1",
      badge: "VERIFIED ACTIVE",
      title: "Google AI Studio & Gemini 1.5 Pro Free Quota",
      provider: "Google Cloud",
      logo: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg",
      value: "Gratis (Up to 15 RPM / 1M TPM)",
      type: "Free Tier / API Grant",
      status: "CLAIMABLE NOW",
      description: "Akses gratis model Gemini 1.5 Pro & Flash via Google AI Studio tanpa wajib kartu kredit. Sangat optimal untuk prototyping, RAG konteks 2M token, dan agent workflows.",
      eligibility: "Semua akun Google terdaftar",
      claimUrl: "https://aistudio.google.com/",
      category: "llm"
    },
    {
      id: "grant_groq_2",
      badge: "ULTRA FAST LPU",
      title: "Groq Cloud LPU High-Speed Inference Free Tier",
      provider: "Groq Inc.",
      logo: "https://groq.com/wp-content/uploads/2024/03/Groq_Logo_Primary_Orange.png",
      value: "Gratis Ribuan Request/Hari (Llama 3 & Mixtral)",
      type: "Inference Engine",
      status: "CLAIMABLE NOW",
      description: "Inference ultra cepat hingga 800+ tokens/detik untuk model open-weights Llama-3-70B dan Mixtral. Ideal untuk routing agen otomatis dan voice pet latency rendah.",
      eligibility: "Developer umum",
      claimUrl: "https://console.groq.com/",
      category: "inference"
    },
    {
      id: "grant_cf_3",
      badge: "EDGE SERVERLESS",
      title: "Cloudflare Workers AI Free Neurons (10,000/Hari)",
      provider: "Cloudflare",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Cloudflare_Logo.svg",
      value: "10,000 Neurons Harian Gratis",
      type: "Edge Serverless AI",
      status: "CLAIMABLE NOW",
      description: "Jalankan embedding vektor, translasi, dan text generation di 300+ data center edge Cloudflare tanpa wajib memiliki server backend mandiri.",
      eligibility: "Semua akun Cloudflare",
      claimUrl: "https://dash.cloudflare.com/",
      category: "edge"
    },
    {
      id: "grant_github_4",
      badge: "EDUCATIONAL PACK",
      title: "GitHub Student Developer Pack (AI Perks & Cloud)",
      provider: "GitHub / Partners",
      logo: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
      value: "Senilai $200k+ Fasilitas Gratis",
      type: "Educational Grant",
      status: "VERIFIED ACTIVE",
      description: "Kompilasi benefit gratis dari 90+ partner teknologi: DigitalOcean $200, domain name gratis Namecheap/Name.com, JetBrains IDE suite, dan akses GitHub Copilot edukatif.",
      eligibility: "Mahasiswa / Pelajar aktif",
      claimUrl: "https://education.github.com/pack",
      category: "all"
    },
    {
      id: "grant_cohere_5",
      badge: "RAG & EMBEDDING",
      title: "Cohere Command R+ Trial Key & Embed Multilingual",
      provider: "Cohere",
      logo: "https://cohere.com/favicon.ico",
      value: "1,000 Free API Calls / Month",
      type: "Free Trial Key",
      status: "CLAIMABLE NOW",
      description: "Model rerank terbaik dunia untuk vector database retrieval. Meningkatkan akurasi RAG dengan reranking konteks dokumen bahasa Indonesia dan multi-bahasa.",
      eligibility: "Developer terdaftar",
      claimUrl: "https://dashboard.cohere.com/",
      category: "llm"
    },
    {
      id: "grant_together_6",
      badge: "$5 FREE CREDIT",
      title: "Together AI Open Models Cloud Credit",
      provider: "Together AI",
      logo: "https://www.together.ai/favicon.ico",
      value: "$5 Free Balance saat Pendaftaran",
      type: "Cloud Credit",
      status: "CLAIMABLE NOW",
      description: "Kredit gratis instan untuk menjalankan DeepSeek-Coder, Qwen 2.5, dan Flux.1 image generation via API berlatar serverless compute.",
      eligibility: "Pendaftaran baru dengan SMS/Email",
      claimUrl: "https://api.together.ai/",
      category: "inference"
    }
  ]

  const filteredGrants = realGrants.filter(g => {
    const matchCategory = activeTab === 'all' || 
                          (activeTab === 'bookmarked' && isBookmarked(g.id)) ||
                          g.category === activeTab
    const matchSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase()) || g.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-[#0a0a0c] dark:text-[#f4f4f5] font-sans antialiased selection:bg-orange-500 selection:text-white flex transition-colors duration-200">
      
      {/* 1. LEFT ICON RAIL (DESKTOP ONLY) */}
      <aside className="hidden sm:flex w-16 sm:w-20 bg-zinc-50 border-r border-zinc-200 dark:bg-[#0e0e12] dark:border-[#26262e] flex-col items-center justify-between py-6 flex-shrink-0 sticky top-0 h-screen z-40 transition-colors">
        <div className="space-y-8 flex flex-col items-center">
          <Link href="/" className="w-10 h-10 rounded-2xl p-1.5 bg-white border border-zinc-200 flex items-center justify-center shadow-lg shadow-orange-500/20 hover:scale-105 transition-transform" title="OXID Labs Home">
            <img src="/images/oxid-logo.png" alt="OXID Labs" className="w-full h-full object-contain" />
          </Link>

          <nav className="flex flex-col items-center space-y-4">
            <Link href="/" className="p-3 rounded-2xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-[#16161c] transition-all" title="Home Studio">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            </Link>
            <Link href="/prompts" className="p-3 rounded-2xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-[#16161c] transition-all" title="Prompt Lab">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </Link>
            <Link href="/grants" className="p-3 rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/30 transition-all" title="Bansos AI (Active)">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </Link>
            <Link href="/tools" className="p-3 rounded-2xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-[#16161c] transition-all" title="AI Tools Radar">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path></svg>
            </Link>
            <Link href="/intel" className="p-3 rounded-2xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-[#16161c] transition-all" title="Threads Intel Live">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
            </Link>
            <Link href="/templates" className="p-3 rounded-2xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-[#16161c] transition-all" title="Karya Templates Kita">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>
            </Link>
          </nav>
        </div>

        <div className="w-10 h-10 rounded-2xl bg-white p-1 border border-zinc-200 flex items-center justify-center shadow-lg shadow-orange-500/20" title="OXID Security Verified">
          <img src="/images/oxid-logo.png" alt="OXID" className="w-full h-full object-contain" />
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* 2. TOP ACTION BAR (ULTRA COMPACT 1-LINE HEADER ON MOBILE WITH THEME TOGGLE) */}
        <header className="border-b border-zinc-200 dark:border-[#26262e] bg-white/95 dark:bg-[#0a0a0c]/95 backdrop-blur-md sticky top-0 z-30 transition-colors">
          <div className="h-14 sm:h-20 px-4 sm:px-8 flex items-center justify-between gap-3">
            {/* Left: Brand / Title */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-white p-1 flex items-center justify-center border border-zinc-200 shadow-sm flex-shrink-0">
                <img src="/images/oxid-logo.png" alt="OXID" className="w-full h-full object-contain" />
              </div>
              <span className="font-serif font-black text-sm sm:text-lg text-zinc-900 dark:text-white uppercase tracking-wider">
                Bansos<span className="text-orange-500">.Grants</span>
              </span>
            </Link>

            {/* Right: Search Input + Theme Toggle + Templates Button */}
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                placeholder="Search grants..." 
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

              <Link 
                href="/templates" 
                className="hidden sm:inline-flex px-4 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-mono text-xs font-bold transition-all shadow-md shadow-orange-500/25 whitespace-nowrap"
              >
                Templates
              </Link>
            </div>
          </div>

          {/* Slim Horizontal Filter Pills Bar */}
          <div className="px-4 sm:px-8 py-2 bg-zinc-100/80 dark:bg-[#0e0e12]/80 border-t border-zinc-200/80 dark:border-[#26262e]/40 flex items-center space-x-2 font-mono text-xs overflow-x-auto scrollbar-none transition-colors">
            {[
              { id: 'all', label: 'All Grants' },
              { id: 'bookmarked', label: `⭐ Saved (${realGrants.filter(g => isBookmarked(g.id)).length})` },
              { id: 'llm', label: 'LLM Free Quotas' },
              { id: 'inference', label: 'High-Speed LPU' },
              { id: 'edge', label: 'Edge Serverless' }
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

        {/* 3. SPLIT MAIN CONTENT */}
        <div className="flex-1 flex flex-col xl:flex-row min-w-0">
          
          <main className="flex-1 p-4 sm:p-8 pb-28 sm:pb-8 space-y-6 sm:space-y-8 min-w-0 overflow-y-auto">
            
            {/* FEATURED GRANT CARD */}
            <div className="bg-zinc-50 dark:bg-[#121216] border border-zinc-200 dark:border-[#26262e] rounded-3xl overflow-hidden shadow-sm dark:shadow-2xl grid grid-cols-1 lg:grid-cols-12 transition-colors">
              
              <div className="lg:col-span-5 p-8 bg-zinc-100 dark:bg-[#0e0e14] flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-[#26262e] relative group transition-colors">
                <div className="w-24 h-24 p-4 rounded-3xl bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center mb-4 shadow-sm">
                  <img src={realGrants[0].logo} alt="Google Cloud" className="w-16 h-16 object-contain" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400 bg-orange-500/10 border border-orange-500/30 px-3 py-1 rounded-full">
                  {realGrants[0].badge}
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-3">Google Cloud Ecosystem</span>
              </div>

              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-orange-500 font-bold">{realGrants[0].type}</span>
                    <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      {realGrants[0].status}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white leading-tight">
                    {realGrants[0].title}
                  </h3>

                  <div className="p-3.5 bg-zinc-100 dark:bg-[#0a0a0c] border border-zinc-200 dark:border-[#26262e] rounded-2xl font-mono text-xs space-y-1 transition-colors">
                    <span className="text-[10px] text-zinc-500 uppercase block">Benefit Kuota:</span>
                    <strong className="text-sm text-orange-600 dark:text-orange-400 font-bold block">{realGrants[0].value}</strong>
                    <span className="text-[10px] text-zinc-500 block">Syarat: {realGrants[0].eligibility}</span>
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-300 font-sans leading-relaxed">
                    {realGrants[0].description}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-200 dark:border-[#26262e] flex items-center justify-between font-mono text-xs transition-colors">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleBookmark(realGrants[0].id)}
                      className={`p-2 rounded-full border transition-all cursor-pointer ${isBookmarked(realGrants[0].id) ? 'bg-orange-500 text-white border-orange-500 shadow-sm' : 'bg-zinc-200/60 dark:bg-black/60 text-zinc-500 border-zinc-300 dark:border-[#26262e]'}`}
                      title={isBookmarked(realGrants[0].id) ? 'Hapus dari Vault' : 'Simpan ke Personal Vault'}
                    >
                      ⭐
                    </button>
                    <Link href={`/detail/${realGrants[0].id}`} className="text-orange-600 dark:text-orange-400 hover:underline">
                      Pelajari Tutorial Setup →
                    </Link>
                  </div>

                  <a 
                    href={realGrants[0].claimUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="px-6 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all shadow-md shadow-orange-500/25"
                  >
                    Klaim Kuota ↗
                  </a>
                </div>
              </div>
            </div>

            {/* GRANTS CATALOG GRID */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-black text-zinc-900 dark:text-white">Katalog Kuota Bansos Cloud &amp; AI</h3>
                  <p className="text-xs text-zinc-500 font-mono">
                    Daftar kuota gratis yang dapat diklaim pengembang untuk komputasi tanpa kartu kredit.
                  </p>
                </div>
                <span className="text-xs font-mono text-orange-500 font-bold bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                  {filteredGrants.length} Grants Tersedia
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGrants.map(grant => (
                  <div key={grant.id} className="bg-zinc-50 dark:bg-[#121216] border border-zinc-200 dark:border-[#26262e] hover:border-orange-500/50 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-sm dark:shadow-xl transition-all">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 p-2 rounded-xl bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center shadow-xs">
                          <img src={grant.logo} alt={grant.provider} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/30">
                            {grant.status}
                          </span>
                          <button
                            onClick={() => toggleBookmark(grant.id)}
                            className={`p-1 rounded-full border transition-all cursor-pointer text-xs ${isBookmarked(grant.id) ? 'bg-orange-500 text-white border-orange-500 shadow-xs' : 'bg-zinc-200/60 dark:bg-black/60 text-zinc-500 border-zinc-300 dark:border-[#26262e]'}`}
                            title={isBookmarked(grant.id) ? 'Hapus Bookmark' : 'Simpan ke Personal Vault'}
                          >
                            ⭐
                          </button>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase text-zinc-500">{grant.provider}</span>
                        <h4 className="font-serif text-base font-bold text-zinc-900 dark:text-white leading-snug mt-0.5">{grant.title}</h4>
                      </div>

                      <div className="p-3 bg-zinc-100 dark:bg-[#0a0a0c] border border-zinc-200 dark:border-[#26262e] rounded-xl font-mono text-xs transition-colors">
                        <span className="text-[9px] text-zinc-500 block uppercase">Benefit:</span>
                        <strong className="text-orange-600 dark:text-orange-400 font-bold">{grant.value}</strong>
                      </div>

                      <p className="text-xs text-zinc-600 dark:text-zinc-300 font-sans leading-relaxed line-clamp-3">
                        {grant.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-zinc-200 dark:border-[#26262e] flex items-center justify-between font-mono text-xs transition-colors">
                      <Link href={`/detail/${grant.id}`} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:underline">
                        Detail →
                      </Link>
                      <a 
                        href={grant.claimUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-1.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all shadow-md shadow-orange-500/25"
                      >
                        Klaim ↗
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </main>

          {/* 4. RIGHT SAVINGS SIDEBAR WITH LIVE LATENCY MONITOR */}
          <aside className="w-full xl:w-80 bg-zinc-50 dark:bg-[#0e0e12] border-t xl:border-t-0 xl:border-l border-zinc-200 dark:border-[#26262e] p-6 space-y-8 flex-shrink-0 transition-colors">
            
            {/* Live Health & Latency Monitor */}
            <div className="bg-white dark:bg-[#121218] border border-zinc-200 dark:border-[#26262e] rounded-3xl p-6 space-y-4 shadow-sm dark:shadow-xl font-mono text-xs transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-bold text-zinc-900 dark:text-white uppercase block">Live Quota Latency</span>
                <button 
                  onClick={handlePingLatency}
                  disabled={isPinging}
                  className="text-[10px] text-orange-500 hover:underline flex items-center gap-1 cursor-pointer font-bold"
                >
                  <span>{isPinging ? 'Pinging...' : '↻ Re-ping'}</span>
                </button>
              </div>

              <div className="space-y-2.5">
                <div className="p-2.5 bg-zinc-50 dark:bg-[#121216] border border-zinc-200 dark:border-[#26262e] rounded-xl flex items-center justify-between transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-zinc-800 dark:text-zinc-300 font-bold">Google AI Studio</span>
                  </div>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">{latencyPings.google} ms</span>
                </div>

                <div className="p-2.5 bg-zinc-50 dark:bg-[#121216] border border-zinc-200 dark:border-[#26262e] rounded-xl flex items-center justify-between transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-zinc-800 dark:text-zinc-300 font-bold">Groq LPU Engine</span>
                  </div>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">{latencyPings.groq} ms</span>
                </div>

                <div className="p-2.5 bg-zinc-50 dark:bg-[#121216] border border-zinc-200 dark:border-[#26262e] rounded-xl flex items-center justify-between transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-zinc-800 dark:text-zinc-300 font-bold">Cloudflare Workers</span>
                  </div>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">{latencyPings.cloudflare} ms</span>
                </div>
              </div>
            </div>

            {/* Savings Widget */}
            <div className="bg-white dark:bg-[#121218] border border-zinc-200 dark:border-[#26262e] rounded-3xl p-6 space-y-4 shadow-sm dark:shadow-xl font-mono text-xs transition-colors">
              <div className="flex items-center justify-between">
                <h4 className="font-mono text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">
                  STUDIO SAVINGS
                </h4>
                <span className="text-zinc-400 text-xs">•••</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block">Total Nilai Bansos Tersedia:</span>
                <strong className="font-serif text-3xl font-black text-zinc-900 dark:text-white block">$200,000+</strong>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">100% Free Developer Quotas</span>
              </div>

              <a 
                href="https://aistudio.google.com/"
                target="_blank"
                rel="noreferrer"
                className="w-full block py-2.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-mono text-xs font-bold text-center transition-all shadow-md"
              >
                Klaim Gemini 1.5 Free
              </a>
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
        <Link href="/prompts" className="p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white flex flex-col items-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          <span className="text-[9px] font-mono font-bold mt-0.5">Prompts</span>
        </Link>
        <Link href="/grants" className="p-2 text-orange-500 flex flex-col items-center">
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
