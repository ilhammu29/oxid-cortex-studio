'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const realTools = [
    // --- 5 FREE AI DESIGN RESOURCES (BOOKMARK VAULT) ---
    {
      id: "res_getlayers",
      name: "GetLayers AI",
      category: "AI Design Prompts",
      badge: "100+ FREE PROMPTS",
      logo: "https://www.getlayers.ai/favicon.ico",
      previewImage: "https://www.getlayers.ai/opengraph-image",
      tagline: "100+ free premium website prompts with 1,000+ backgrounds, motion sections and gradients.",
      description: "Prompt generator siap pakai untuk Claude, Cursor, dan v0. Salin prompt lengkap dengan parameter layout, motion easing, dan palet warna.",
      url: "https://getlayers.ai",
      type: "design"
    },
    {
      id: "res_landbook",
      name: "Land-book",
      category: "Design Showcase",
      badge: "CURATED INSPIRATION",
      logo: "https://land-book.com/favicon.ico",
      previewImage: "https://cdn.land-book.com/assets/og-image.webp",
      tagline: "Landing page inspiration, curated well for designers and developers.",
      description: "Galeri kurasi landing page, portfolio, dan web app terbaik di dunia yang diperbarui setiap hari dengan standar visual tinggi.",
      url: "https://land-book.com",
      type: "design"
    },
    {
      id: "res_recentdesign",
      name: "Recent Design",
      category: "Design Gallery",
      badge: "FRESH DAILY",
      logo: "https://recent.design/favicon.ico",
      previewImage: "https://recent.design/og.png",
      tagline: "A great gallery of fresh web design inspiration with human typography.",
      description: "Pameran karya web terkini yang berfokus pada tipografi tajam, ruang bernapas luas, dan keindahan antarmuka bebas slop.",
      url: "https://recent.design",
      type: "design"
    },
    {
      id: "res_landdding",
      name: "Landdding",
      category: "SaaS Showcase",
      badge: "TOP-TIER SAAS",
      logo: "https://landdding.com/favicon.ico",
      previewImage: "https://landdding.com/images/thumbnail.png",
      tagline: "Top-tier landing pages with high conversion and modern micro-interactions.",
      description: "Koleksi khusus landing page SaaS kelas atas dengan tata letak konversi tinggi, mode gelap elegan, dan interaksi interaktif.",
      url: "https://landdding.com",
      type: "design"
    },
    {
      id: "res_fontinlogo",
      name: "FontInLogo",
      category: "Typography Tool",
      badge: "FIND THE FONTS",
      logo: "https://www.fontinlogo.com/favicon.ico",
      previewImage: "https://www.fontinlogo.com/images/1.jpg",
      tagline: "Find the exact fonts used in famous world brands and logos.",
      description: "Mesin pencari font resmi dari brand teknologi, startup unicorn, dan korporat dunia lengkap dengan tautan unduhan font.",
      url: "https://www.fontinlogo.com",
      type: "design"
    },

    // --- SKILLS FOR MOTION, 3D & FINAL POLISH ---
    {
      id: "skill_design_eng",
      name: "Design Engineering (Emil Kowalski)",
      category: "Motion & Craft Skills",
      badge: "MOTION PHYSICS",
      logo: "https://emilkowal.ski/favicon.ico",
      previewImage: "https://emilkowal.ski/opengraph-image.png?892f3fd8543bf349",
      tagline: "Easing, durations, springs & physics-based micro-interactions.",
      description: "Eksplorasi mendalam interaksi mikro: kurva cubic-bezier organik, parameter spring, dan durasi transisi yang membuat UI terasa hidup.",
      url: "https://emilkowal.ski/skill",
      type: "skill"
    },
    {
      id: "skill_shader_dev",
      name: "Shader Dev (MiniMax Skills)",
      category: "3D & ShaderToy",
      badge: "36 SHADER TECHNIQUES",
      logo: "https://github.com/favicon.ico",
      previewImage: "https://opengraph.githubassets.com/1/MiniMax-AI/skills",
      tagline: "36 ShaderToy techniques for high-performance canvas & WebGL.",
      description: "Kompilasi 36 teknik GLSL dan ShaderToy untuk menciptakan efek visual interaktif, partikel dinamis, dan distorsi canvas.",
      url: "https://github.com/MiniMax-AI/skills",
      type: "skill"
    },
    {
      id: "skill_diagram_design",
      name: "Diagram Design",
      category: "Architecture & Systems",
      badge: "44 DIAGRAM TYPES",
      logo: "https://diagramdesign.dev/favicon.ico",
      previewImage: "https://diagramdesign.dev/og.png",
      tagline: "44 editorial diagram types for system architecture and DAG flows.",
      description: "Standar desain diagram teknis editorial: visualisasi alur sistem, pohon keputusan, dan kontrak arsitektur modular.",
      url: "https://diagramdesign.dev",
      type: "skill"
    },
    {
      id: "skill_vercel_guidelines",
      name: "Web Interface Guidelines (Vercel)",
      category: "UI Design Review",
      badge: "INDUSTRY BENCHMARK",
      logo: "https://vercel.com/favicon.ico",
      previewImage: "https://k2mkucxia43oc7fa.public.blob.vercel-storage.com/front/design/guidelines-og.png",
      tagline: "Vercel's official UI review and design quality benchmark.",
      description: "Pedoman audit resmi tim desain Vercel: standar aksesibilitas WCAG, fokus keyboard navigation, dan performa DOM nol slop.",
      url: "https://vercel.com/design/guidelines",
      type: "skill"
    },
    {
      id: "skill_craftwork",
      name: "Craftwork Design",
      category: "Craft Assets",
      badge: "ICONS & 3D COMPONENTS",
      logo: "https://craftwork.design/favicon.ico",
      previewImage: "https://craftwork.design/opengraph-image.png",
      tagline: "Real fonts, vector icons, 3D elements and engineered UI components.",
      description: "Aset desain premium untuk developer: paket ikon vektor pixel-perfect, font siap produksi, dan sistem komponen terstruktur.",
      url: "https://craftwork.design/skill",
      type: "skill"
    },

    // --- DEVELOPER AI TOOLS ---
    {
      id: "tool_ollama",
      name: "Ollama",
      category: "Local LLM Inference Engine",
      badge: "OPEN SOURCE",
      logo: "https://ollama.com/public/ollama.png",
      previewImage: "/images/card_agent_copilot.svg",
      tagline: "Jalankan model open-weights (Llama 3, DeepSeek, Qwen) secara lokal di laptop via single CLI command.",
      description: "Ollama menyederhanakan eksekusi model AI lokal dengan manajemen bobot otomatis, API REST kompatibel OpenAI, dan akselerasi CPU/GPU minimal overhead.",
      url: "https://ollama.com",
      type: "tool"
    },
    {
      id: "tool_scrapling",
      name: "Scrapling",
      category: "Stealth Web Scraping Framework",
      badge: "FREE / OPEN SOURCE",
      logo: "https://avatars.githubusercontent.com/u/10834375?v=4",
      previewImage: "/images/card_swiss_editorial.svg",
      tagline: "Framework web scraping Python modern dengan kemampuan adaptif melewati deteksi anti-bot dan Cloudflare.",
      description: "Dibangun khusus untuk AI crawlers yang membutuhkan throughput tinggi tanpa terhalang Cloudflare Turnstile, browser fingerprinting, atau IP block.",
      url: "https://github.com/D4Vinci/Scrapling",
      type: "tool"
    }
  ]

  const filteredTools = realTools.filter(t => {
    const matchesCategory = activeCategory === 'all' || 
                            (activeCategory === 'design' && t.type === 'design') ||
                            (activeCategory === 'skills' && t.type === 'skill') ||
                            (activeCategory === 'tools' && t.type === 'tool')
    const q = searchQuery.toLowerCase()
    const matchesSearch = t.name.toLowerCase().includes(q) || 
                          t.tagline.toLowerCase().includes(q) ||
                          t.category.toLowerCase().includes(q)
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#f4f4f5] font-sans antialiased selection:bg-orange-500 selection:text-white flex">
      
      {/* 1. LEFT ICON RAIL */}
      <aside className="w-16 sm:w-20 bg-[#0e0e12] border-r border-[#26262e] flex flex-col items-center justify-between py-6 flex-shrink-0 sticky top-0 h-screen z-40">
        <div className="space-y-8 flex flex-col items-center">
          <Link href="/" className="w-10 h-10 rounded-2xl p-1.5 bg-white border border-zinc-200 flex items-center justify-center shadow-lg shadow-orange-500/20 hover:scale-105 transition-transform" title="OXID Labs Home">
            <img src="/images/oxid-logo.png" alt="OXID Labs" className="w-full h-full object-contain" />
          </Link>

          <nav className="flex flex-col items-center space-y-4">
            <Link href="/prompts" className="p-3 rounded-2xl text-zinc-400 hover:text-white hover:bg-[#16161c] transition-all" title="Prompt Lab">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </Link>
            <Link href="/grants" className="p-3 rounded-2xl text-zinc-400 hover:text-white hover:bg-[#16161c] transition-all" title="Bansos AI">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </Link>
            <Link href="/tools" className="p-3 rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/30 transition-all" title="AI Tools & Design Resources (Active)">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path></svg>
            </Link>
            <Link href="/intel" className="p-3 rounded-2xl text-zinc-400 hover:text-white hover:bg-[#16161c] transition-all" title="Threads Intel">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
            </Link>
            <Link href="/templates" className="p-3 rounded-2xl text-zinc-400 hover:text-white hover:bg-[#16161c] transition-all" title="Karya Templates">
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
        
        {/* 2. TOP BAR */}
        <header className="h-20 border-b border-[#26262e] bg-[#0a0a0c]/90 backdrop-blur-md px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-2 font-mono text-xs overflow-x-auto">
            <button 
              onClick={() => setActiveCategory('all')} 
              className={`px-3.5 py-1.5 rounded-full font-bold transition-all ${activeCategory === 'all' ? 'bg-orange-500 text-white' : 'bg-[#16161c] text-zinc-400 hover:text-white'}`}
            >
              Semua ({realTools.length})
            </button>
            <button 
              onClick={() => setActiveCategory('design')} 
              className={`px-3.5 py-1.5 rounded-full font-bold transition-all ${activeCategory === 'design' ? 'bg-orange-500 text-white' : 'bg-[#16161c] text-zinc-400 hover:text-white'}`}
            >
              ❤️‍🔥 Design Vault (5)
            </button>
            <button 
              onClick={() => setActiveCategory('skills')} 
              className={`px-3.5 py-1.5 rounded-full font-bold transition-all ${activeCategory === 'skills' ? 'bg-orange-500 text-white' : 'bg-[#16161c] text-zinc-400 hover:text-white'}`}
            >
              ✦ Motion &amp; Craft (5)
            </button>
            <button 
              onClick={() => setActiveCategory('tools')} 
              className={`px-3.5 py-1.5 rounded-full font-bold transition-all ${activeCategory === 'tools' ? 'bg-orange-500 text-white' : 'bg-[#16161c] text-zinc-400 hover:text-white'}`}
            >
              CLI &amp; Engine
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <input 
              type="text" 
              placeholder="Search resource, font, shader..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#121216] border border-[#26262e] text-xs px-4 py-2 rounded-full text-zinc-200 focus:outline-none focus:border-orange-500 w-60 font-mono"
            />
            <Link 
              href="/templates" 
              className="px-5 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-mono text-xs font-bold transition-all shadow-md shadow-orange-500/25 whitespace-nowrap"
            >
              Templates
            </Link>
          </div>
        </header>

        {/* 3. MAIN CENTER AREA + RIGHT SIDEBAR */}
        <div className="flex-1 flex flex-col xl:flex-row min-w-0">
          
          <main className="flex-1 p-6 sm:p-8 space-y-8 min-w-0 overflow-y-auto">
            
            {/* HERO HEADER */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-orange-500 uppercase tracking-widest bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                CURATED DESIGN RADAR &amp; FRONTIER CRAFT
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-black text-white">
                5 AI Design Resources &amp; Motion Engineering Skills
              </h1>
              <p className="text-sm text-zinc-400 max-w-3xl leading-relaxed font-sans">
                Kompilasi sumber daya desain web terpopuler dan panduan teknik tingkat lanjut untuk motion physics, WebGL shader, diagram arsitektur, dan tipografi brand dunia.
              </p>
            </div>

            {/* RESOURCE & TOOLS CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTools.map(tool => (
                <div key={tool.id} className="bg-[#121216] border border-[#26262e] hover:border-orange-500/50 rounded-3xl p-6 flex flex-col justify-between space-y-5 shadow-xl transition-all group">
                  <div className="space-y-4">
                    
                    {/* Visual Website Capture Header */}
                    {tool.previewImage && (
                      <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-inner">
                        <img 
                          src={tool.previewImage} 
                          alt={tool.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono text-orange-400 border border-white/10">
                          {tool.badge}
                        </div>
                      </div>
                    )}

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold uppercase text-zinc-500">{tool.category}</span>
                      <h3 className="font-serif text-xl font-bold text-white leading-snug group-hover:text-orange-400 transition-colors">
                        {tool.name}
                      </h3>
                    </div>

                    <p className="text-xs text-orange-400/90 font-mono leading-relaxed">{tool.tagline}</p>
                    <p className="text-xs text-zinc-300 font-sans leading-relaxed">{tool.description}</p>
                  </div>

                  <div className="pt-3 border-t border-[#26262e] flex items-center justify-between font-mono text-xs">
                    <span className="text-[11px] text-zinc-500 truncate max-w-[180px]">{tool.url.replace('https://', '')}</span>
                    <a 
                      href={tool.url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all shadow-md shadow-orange-500/20 text-xs"
                    >
                      Buka Web ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </main>

          {/* 4. RIGHT SIDEBAR */}
          <aside className="w-full xl:w-80 bg-[#0e0e12] border-t xl:border-t-0 xl:border-l border-[#26262e] p-6 space-y-8 flex-shrink-0">
            <div className="bg-[#121218] border border-[#26262e] rounded-3xl p-6 space-y-3 shadow-xl font-mono text-xs">
              <span className="text-orange-500 font-bold uppercase block">Ingestion Source</span>
              <p className="text-zinc-400 leading-relaxed text-[11px]">
                Disinkronkan secara otomatis dari radar komunitas Threads dan kurasi kurator terdepan di ekosistem web engineering global.
              </p>
              <div className="pt-2 border-t border-[#26262e] flex items-center justify-between text-[10px]">
                <span className="text-zinc-500">Live Status:</span>
                <span className="text-emerald-400 font-bold">10 Resources Active</span>
              </div>
            </div>

            <div className="bg-[#121218] border border-[#26262e] rounded-3xl p-6 space-y-3 shadow-xl font-mono text-xs">
              <span className="text-zinc-300 font-bold uppercase block">Quick Action</span>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Gunakan tombol <strong>Ctrl+K</strong> kapan saja untuk mencari font, shader, atau prompt web dari seluruh database.
              </p>
            </div>
          </aside>

        </div>

      </div>

    </div>
  )
}
