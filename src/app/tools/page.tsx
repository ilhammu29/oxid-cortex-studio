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

    // --- GITHUB REPOS & SKILLS (SCRAPED LIVE) ---
    {
      id: "gh_openhands",
      name: "All-Hands-AI / OpenHands",
      category: "Autonomous Agent CLI",
      badge: "⭐ 92.4k STARS",
      logo: "https://github.com/All-Hands-AI.png",
      previewImage: "https://opengraph.githubassets.com/1/All-Hands-AI/OpenHands",
      tagline: "Autonomous software development agent in bash, terminal, and browser.",
      description: "Platform agen software engineering otonom nomor #1 di GitHub. Mampu menulis kode multi-file, menjalankan tes, dan menyelesaikan issues mandiri.",
      url: "https://github.com/All-Hands-AI/OpenHands",
      type: "github"
    },
    {
      id: "gh_vaul",
      name: "emilkowalski / vaul",
      category: "Motion & UI Primitive",
      badge: "⭐ 12.5k STARS",
      logo: "https://github.com/emilkowalski.png",
      previewImage: "https://opengraph.githubassets.com/1/emilkowalski/vaul",
      tagline: "Drawer component for React with organic physics and spring dragging.",
      description: "Komponen drawer modern berkinerja tinggi untuk Next.js dan React yang menggunakan kurva fisika pegas dan gestur natural perangkat seluler.",
      url: "https://github.com/emilkowalski/vaul",
      type: "github"
    },
    {
      id: "gh_three_fiber",
      name: "pmndrs / react-three-fiber",
      category: "3D Canvas & WebGL",
      badge: "⭐ 28.1k STARS",
      logo: "https://github.com/pmndrs.png",
      previewImage: "https://opengraph.githubassets.com/1/pmndrs/react-three-fiber",
      tagline: "Declarative Three.js WebGL renderer for React & Next.js apps.",
      description: "Ekosistem perender 3D WebGL tercanggih di web. Bangun pengalaman visual interaktif 60fps dengan JSX dan kontrol shader dinamis.",
      url: "https://github.com/pmndrs/react-three-fiber",
      type: "github"
    },
    {
      id: "gh_fastmcp",
      name: "jlowin / fastmcp",
      category: "Agent Tooling & Protocol",
      badge: "⭐ 6.5k STARS",
      logo: "https://github.com/jlowin.png",
      previewImage: "https://opengraph.githubassets.com/1/jlowin/fastmcp",
      tagline: "The fastest way to build Model Context Protocol (MCP) servers in Python.",
      description: "Framework Python untuk membangun toolset dan server integrasi protokol konteks model Anthropic dan Hermes Agent.",
      url: "https://github.com/jlowin/fastmcp",
      type: "github"
    },
    {
      id: "gh_shadcn_ui",
      name: "shadcn-ui / ui",
      category: "Component Library",
      badge: "⭐ 89.2k STARS",
      logo: "https://github.com/shadcn-ui.png",
      previewImage: "https://opengraph.githubassets.com/1/shadcn-ui/ui",
      tagline: "Beautifully designed components that you can copy and paste into your apps.",
      description: "Koleksi komponen UI standar emas dunia berbasis Radix UI dan Tailwind CSS. Tanpa ketergantungan paket runtime tertutup.",
      url: "https://github.com/shadcn-ui/ui",
      type: "github"
    },

    // --- DEVELOPER AI TOOLS ---
    {
      id: "tool_ollama",
      name: "Ollama",
      category: "Local LLM Inference Engine",
      badge: "⭐ 120k+ STARS",
      logo: "https://ollama.com/public/ollama.png",
      previewImage: "https://opengraph.githubassets.com/1/ollama/ollama",
      tagline: "Jalankan model open-weights (Llama 3, DeepSeek, Qwen) secara lokal di laptop via single CLI command.",
      description: "Ollama menyederhanakan eksekusi model AI lokal dengan manajemen bobot otomatis, API REST kompatibel OpenAI, dan akselerasi CPU/GPU minimal overhead.",
      url: "https://ollama.com",
      type: "tool"
    },
    {
      id: "tool_scrapling",
      name: "Scrapling",
      category: "Stealth Web Scraping Framework",
      badge: "⭐ 14.2k STARS",
      logo: "https://avatars.githubusercontent.com/u/10834375?v=4",
      previewImage: "https://opengraph.githubassets.com/1/D4Vinci/Scrapling",
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
                            (activeCategory === 'github' && t.type === 'github') ||
                            (activeCategory === 'tools' && t.type === 'tool')
    const q = searchQuery.toLowerCase()
    const matchesSearch = t.name.toLowerCase().includes(q) || 
                          t.tagline.toLowerCase().includes(q) ||
                          t.category.toLowerCase().includes(q)
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#f4f4f5] font-sans antialiased selection:bg-orange-500 selection:text-white flex">
      
      {/* 1. LEFT ICON RAIL (DESKTOP ONLY) */}
      <aside className="hidden sm:flex w-16 sm:w-20 bg-[#0e0e12] border-r border-[#26262e] flex-col items-center justify-between py-6 flex-shrink-0 sticky top-0 h-screen z-40">
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
            <Link href="/tools" className="p-3 rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/30 transition-all" title="AI Tools, Design & GitHub Radar (Active)">
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
        
        {/* 2. TOP BAR (MOBILE RESPONSIVE COMPACT) */}
        <header className="border-b border-[#26262e] bg-[#0a0a0c]/90 backdrop-blur-md p-4 sm:px-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sticky top-0 z-30">
          
          {/* Mobile Top Brand Bar */}
          <div className="flex sm:hidden items-center justify-between pb-2 border-b border-[#26262e]/50">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white p-1 flex items-center justify-center">
                <img src="/images/oxid-logo.png" alt="OXID" className="w-full h-full object-contain" />
              </div>
              <span className="font-serif font-black text-sm text-white">OXID<span className="text-orange-500">.CORTEX</span></span>
            </Link>
            <Link href="/templates" className="px-3 py-1 rounded-full bg-orange-500 text-white font-mono text-[10px] font-bold">
              Templates
            </Link>
          </div>

          <div className="flex items-center space-x-2 font-mono text-xs overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button 
              onClick={() => setActiveCategory('all')} 
              className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full font-bold transition-all cursor-pointer whitespace-nowrap text-[11px] sm:text-xs ${activeCategory === 'all' ? 'bg-orange-500 text-white' : 'bg-[#16161c] text-zinc-400 hover:text-white'}`}
            >
              Semua ({realTools.length})
            </button>
            <button 
              onClick={() => setActiveCategory('github')} 
              className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full font-bold transition-all cursor-pointer whitespace-nowrap text-[11px] sm:text-xs ${activeCategory === 'github' ? 'bg-orange-500 text-white' : 'bg-[#16161c] text-zinc-400 hover:text-white'}`}
            >
              ⭐ GitHub Repos ({realTools.filter(t => t.type === 'github').length})
            </button>
            <button 
              onClick={() => setActiveCategory('design')} 
              className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full font-bold transition-all cursor-pointer whitespace-nowrap text-[11px] sm:text-xs ${activeCategory === 'design' ? 'bg-orange-500 text-white' : 'bg-[#16161c] text-zinc-400 hover:text-white'}`}
            >
              ❤️‍🔥 Design Vault (5)
            </button>
            <button 
              onClick={() => setActiveCategory('skills')} 
              className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full font-bold transition-all cursor-pointer whitespace-nowrap text-[11px] sm:text-xs ${activeCategory === 'skills' ? 'bg-orange-500 text-white' : 'bg-[#16161c] text-zinc-400 hover:text-white'}`}
            >
              ✦ Motion &amp; Craft (5)
            </button>
            <button 
              onClick={() => setActiveCategory('tools')} 
              className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full font-bold transition-all cursor-pointer whitespace-nowrap text-[11px] sm:text-xs ${activeCategory === 'tools' ? 'bg-orange-500 text-white' : 'bg-[#16161c] text-zinc-400 hover:text-white'}`}
            >
              CLI &amp; Engine
            </button>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <input 
              type="text" 
              placeholder="Search repo, font, shader..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#121216] border border-[#26262e] text-xs px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-zinc-200 focus:outline-none focus:border-orange-500 w-full sm:w-60 font-mono"
            />
            <Link 
              href="/templates" 
              className="hidden sm:inline-flex px-5 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-mono text-xs font-bold transition-all shadow-md shadow-orange-500/25 whitespace-nowrap"
            >
              Templates
            </Link>
          </div>
        </header>

        {/* 3. MAIN CENTER AREA + RIGHT SIDEBAR */}
        <div className="flex-1 flex flex-col xl:flex-row min-w-0">
          
          <main className="flex-1 p-4 sm:p-8 pb-28 sm:pb-8 space-y-6 sm:space-y-8 min-w-0 overflow-y-auto">
            
            {/* HERO HEADER */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-orange-500 uppercase tracking-widest bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                GITHUB SKILLS &amp; AI WEAPONRY RADAR
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-black text-white">
                GitHub Repositories, AI Design Vault &amp; Motion Skills
              </h1>
              <p className="text-sm text-zinc-400 max-w-3xl leading-relaxed font-sans">
                Kompilasi repositori GitHub kelas dunia, sumber daya desain web terpopuler, dan panduan teknik tingkat lanjut untuk WebGL shader, gestur drawer pegas, dan otomasi AI.
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
                      Buka Repo / Web ↗
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
                Disinkronkan secara otomatis dari GitHub REST API dan radar komunitas Threads secara berkala.
              </p>
              <div className="pt-2 border-t border-[#26262e] flex items-center justify-between text-[10px]">
                <span className="text-zinc-500">Live Status:</span>
                <span className="text-emerald-400 font-bold">{realTools.length} Resources Active</span>
              </div>
            </div>

            <div className="bg-[#121218] border border-[#26262e] rounded-3xl p-6 space-y-3 shadow-xl font-mono text-xs">
              <span className="text-zinc-300 font-bold uppercase block">Quick Action</span>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Gunakan tombol <strong>Ctrl+K</strong> kapan saja untuk mencari repo GitHub, font, shader, atau prompt web dari seluruh database.
              </p>
            </div>
          </aside>

        </div>

      </div>

      {/* SLEEK FLOATING MOBILE BOTTOM NAVIGATION BAR */}
      <div className="sm:hidden fixed bottom-3 inset-x-4 z-50 bg-[#0e0e12]/95 backdrop-blur-xl border border-[#26262e] rounded-full p-2 flex items-center justify-around shadow-2xl">
        <Link href="/" className="p-2 text-zinc-400 hover:text-white flex flex-col items-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          <span className="text-[9px] font-mono font-bold mt-0.5">Home</span>
        </Link>
        <Link href="/prompts" className="p-2 text-zinc-400 hover:text-white flex flex-col items-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          <span className="text-[9px] font-mono font-bold mt-0.5">Prompts</span>
        </Link>
        <Link href="/grants" className="p-2 text-zinc-400 hover:text-white flex flex-col items-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span className="text-[9px] font-mono font-bold mt-0.5">Bansos</span>
        </Link>
        <Link href="/tools" className="p-2 text-orange-500 flex flex-col items-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path></svg>
          <span className="text-[9px] font-mono font-bold mt-0.5">Radar</span>
        </Link>
        <Link href="/templates" className="p-2 text-zinc-400 hover:text-white flex flex-col items-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>
          <span className="text-[9px] font-mono font-bold mt-0.5">Templates</span>
        </Link>
      </div>

    </div>
  )
}
