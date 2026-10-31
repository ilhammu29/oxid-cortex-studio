'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function GrantsPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

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
      status: "LIMITED DROP",
      description: "Termasuk gratis GitHub Copilot, kuota cloud DigitalOcean $200, Microsoft Azure credit $100, serta domain dan sertifikat SSL gratis 1 tahun.",
      eligibility: "Pelajar/Mahasiswa aktif dengan email sekolah/kampus",
      claimUrl: "https://education.github.com/pack",
      category: "student"
    }
  ]

  const filteredGrants = realGrants.filter(g => {
    const matchCategory = activeTab === 'all' || g.category === activeTab
    const matchSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase()) || g.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#f4f4f5] font-sans antialiased selection:bg-orange-500 selection:text-white flex">
      
      {/* 1. LEFT ICON RAIL */}
      <aside className="w-16 sm:w-20 bg-[#0e0e12] border-r border-[#26262e] flex flex-col items-center justify-between py-6 flex-shrink-0 sticky top-0 h-screen z-40">
        <div className="space-y-8 flex flex-col items-center">
          <Link href="/" className="w-10 h-10 rounded-2xl p-1 bg-[#121216] border border-orange-500/40 flex items-center justify-center shadow-lg shadow-orange-500/20 hover:scale-105 transition-transform" title="OXID Labs Home">
            <img src="/images/oxid-logo.png" alt="OXID Labs" className="w-full h-full object-contain" />
          </Link>

          <nav className="flex flex-col items-center space-y-4">
            <Link href="/" className="p-3 rounded-2xl text-zinc-400 hover:text-white hover:bg-[#16161c] transition-all" title="Home Studio">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            </Link>
            <Link href="/prompts" className="p-3 rounded-2xl text-zinc-400 hover:text-white hover:bg-[#16161c] transition-all" title="Prompt Lab">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </Link>
            <Link href="/grants" className="p-3 rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/30 transition-all" title="Bansos AI (Active)">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </Link>
            <Link href="/tools" className="p-3 rounded-2xl text-zinc-400 hover:text-white hover:bg-[#16161c] transition-all" title="AI Tools Radar">
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
        
        {/* 2. TOP ACTION BAR */}
        <header className="h-20 border-b border-[#26262e] bg-[#0a0a0c]/90 backdrop-blur-md px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-2 overflow-x-auto font-mono text-xs">
            {[
              { id: 'all', label: 'All Grants' },
              { id: 'llm', label: 'LLM Free Quotas' },
              { id: 'inference', label: 'High-Speed LPU' },
              { id: 'edge', label: 'Edge Serverless' }
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

          <div className="flex items-center space-x-3">
            <input 
              type="text" 
              placeholder="Search bansos AI..." 
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
          
          <main className="flex-1 p-6 sm:p-8 space-y-10 min-w-0 overflow-y-auto">
            
            {/* FEATURED GRANT CARD */}
            <div className="bg-[#121216] border border-[#26262e] rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
              
              <div className="lg:col-span-5 p-8 bg-[#0e0e14] flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-[#26262e] relative group">
                <div className="w-24 h-24 p-4 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  <img src={realGrants[0].logo} alt="Google Cloud" className="w-16 h-16 object-contain" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-orange-400 bg-orange-500/10 border border-orange-500/30 px-3 py-1 rounded-full">
                  {realGrants[0].badge}
                </span>
                <span className="text-xs text-zinc-400 font-mono mt-3">Google Cloud Ecosystem</span>
              </div>

              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-orange-500 font-bold">{realGrants[0].type}</span>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      {realGrants[0].status}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    {realGrants[0].title}
                  </h2>

                  <div className="p-3 bg-[#0a0a0c] border border-[#26262e] rounded-xl font-mono text-xs">
                    <span className="text-[10px] text-zinc-400 block uppercase">NILAI BENEFIT BANSOS:</span>
                    <strong className="text-sm text-orange-400 font-bold">{realGrants[0].value}</strong>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                    {realGrants[0].description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#26262e] flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-500">Syarat: {realGrants[0].eligibility}</span>
                  <a 
                    href={realGrants[0].claimUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-mono text-xs font-bold transition-all shadow-md shadow-orange-500/25 flex items-center gap-1.5"
                  >
                    <span>Klaim Bansos AI</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>

            </div>

            {/* GRANTS GRID */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#26262e] pb-3">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Active Free Grants &amp; Credits ({filteredGrants.length})
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGrants.map(grant => (
                  <div key={grant.id} className="bg-[#121216] border border-[#26262e] hover:border-orange-500/50 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-xl transition-all">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 p-2 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                          <img src={grant.logo} alt={grant.provider} className="w-full h-full object-contain" />
                        </div>
                        <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30">
                          {grant.status}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase text-zinc-500">{grant.provider}</span>
                        <h4 className="font-serif text-base font-bold text-white leading-snug mt-0.5">{grant.title}</h4>
                      </div>

                      <div className="p-3 bg-[#0a0a0c] border border-[#26262e] rounded-xl font-mono text-xs">
                        <span className="text-[9px] text-zinc-400 block uppercase">Benefit:</span>
                        <strong className="text-orange-400 font-bold">{grant.value}</strong>
                      </div>

                      <p className="text-xs text-zinc-300 font-sans leading-relaxed line-clamp-3">
                        {grant.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#26262e] flex items-center justify-between font-mono text-xs">
                      <Link href={`/detail/${grant.id}`} className="text-zinc-400 hover:text-white hover:underline">
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

          {/* 4. RIGHT SAVINGS SIDEBAR */}
          <aside className="w-full xl:w-80 bg-[#0e0e12] border-t xl:border-t-0 xl:border-l border-[#26262e] p-6 space-y-8 flex-shrink-0">
            <div className="bg-[#121218] border border-[#26262e] rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h4 className="font-mono text-xs font-bold uppercase text-emerald-400 tracking-wider">
                  STUDIO SAVINGS
                </h4>
                <span className="text-zinc-500 text-xs">•••</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-zinc-400 uppercase block">Total Nilai Bansos Tersedia:</span>
                <strong className="font-serif text-3xl font-black text-white block">$200,000+</strong>
                <span className="text-[10px] font-mono text-emerald-400">100% Free Developer Quotas</span>
              </div>

              <div className="pt-2">
                <svg className="w-full h-12" viewBox="0 0 200 60" fill="none">
                  <path d="M5 45 Q 40 10, 80 35 T 150 15 T 195 5" stroke="#10b981" strokeWidth="2.5" fill="none" />
                  <circle cx="195" cy="5" r="4" fill="#ff5722" />
                </svg>
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

            <div className="space-y-3 font-mono text-xs">
              <span className="font-bold text-white uppercase block">Verified Providers</span>
              <div className="p-3 bg-[#121216] border border-[#26262e] rounded-2xl flex items-center justify-between">
                <span className="text-zinc-300">Google Cloud</span>
                <span className="text-emerald-400 font-bold">1M TPM Active</span>
              </div>
              <div className="p-3 bg-[#121216] border border-[#26262e] rounded-2xl flex items-center justify-between">
                <span className="text-zinc-300">Groq Cloud</span>
                <span className="text-emerald-400 font-bold">800 T/s Active</span>
              </div>
              <div className="p-3 bg-[#121216] border border-[#26262e] rounded-2xl flex items-center justify-between">
                <span className="text-zinc-300">Cloudflare</span>
                <span className="text-emerald-400 font-bold">10k Neurons</span>
              </div>
            </div>
          </aside>

        </div>

      </div>

    </div>
  )
}
