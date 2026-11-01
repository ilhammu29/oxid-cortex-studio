'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useStudioTheme } from '@/lib/useStudioTheme'
import { useBookmarks } from '@/lib/useBookmarks'

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const { darkMode, toggleTheme } = useStudioTheme()
  const { toggleBookmark, isBookmarked } = useBookmarks()

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
      tagline: "The best hand-picked website design inspiration powered by designers and developers.",
      description: "Katalog kurasi landing page, portfolio, dan SaaS terbaik dunia. Sumber benchmarking visual standar tinggi tanpa generik AI slop.",
      url: "https://land-book.com",
      type: "design"
    },
    {
      id: "res_recentdesign",
      name: "Recent Design",
      category: "Trend Vault",
      badge: "DAILY ARCHIVE",
      logo: "https://recent.design/favicon.ico",
      previewImage: "https://recent.design/og.png",
      tagline: "A curated feed of recent design references for high-craft digital products.",
      description: "Feed harian desain UI/UX interaktif dengan fokus pada tipografi editorial Swiss, micro-animations, dan layout minimalis.",
      url: "https://recent.design",
      type: "design"
    },
    {
      id: "res_landdding",
      name: "Landdding",
      category: "Bento & Component Library",
      badge: "HIGH CONVERTING",
      logo: "https://landdding.com/favicon.ico",
      previewImage: "https://landdding.com/og-image.png",
      tagline: "Landing page inspiration with breakdown of hero sections, pricing tables, and bento grids.",
      description: "Bedah visual struktur landing page berkonversi tinggi. Menampilkan detail padding, kontras warna, dan hierarki visual tombol CTA.",
      url: "https://landdding.com",
      type: "design"
    },
    {
      id: "res_fontinlogo",
      name: "FontInLogo",
      category: "Brand Typography Intel",
      badge: "TYPOGRAPHY RADAR",
      logo: "https://www.fontinlogo.com/favicon.ico",
      previewImage: "https://www.fontinlogo.com/images/meta.png",
      tagline: "Find font used by world top brands and modern tech products.",
      description: "Radar font resmi perusahaan teknologi dunia (Linear, Stripe, OpenAI, Vercel). Menemukan padanan font Google Fonts gratis dengan geometri serupa.",
      url: "https://www.fontinlogo.com",
      type: "design"
    },

    // --- 5 ADVANCED MOTION & CRAFT SKILLS ---
    {
      id: "skill_emil_motion",
      name: "Emil Kowalski — Delightful Animations",
      category: "Micro-Interaction Engineering",
      badge: "✦ MASTERCLASS",
      logo: "https://avatars.githubusercontent.com/u/36730035?v=4",
      previewImage: "https://animations.dev/og.png",
      tagline: "Crafting fluid animations and spring physics in React and Web interfaces.",
      description: "Panduan teknis transisi mikro, gesture springs, dan interruptible motion. Mencegah animasi kaku dan meningkatkan responsivitas antarmuka hingga 60fps.",
      url: "https://animations.dev",
      type: "skill"
    },
    {
      id: "skill_shader_minimax",
      name: "Shader Dev with MiniMax Hailuo",
      category: "WebGL & Generative Canvas",
      badge: "✦ WEBGL SHADER",
      logo: "https://avatars.githubusercontent.com/u/10834375?v=4",
      previewImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      tagline: "Direct GLSL shader compilation and canvas particle engineering via AI prompting.",
      description: "Prompt khusus dan kode fragment shader GLSL untuk background noise cair, iridescent glassmorphism, dan aurora gradient interaktif.",
      url: "https://github.com/topics/glsl-shaders",
      type: "skill"
    },
    {
      id: "skill_diagram_design",
      name: "Diagram Design — Flow & Architecture",
      category: "Data Visualization Craft",
      badge: "✦ ARCHITECTURE",
      logo: "https://avatars.githubusercontent.com/u/2330416?v=4",
      previewImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      tagline: "Architectural blueprint generation and technical system diagrams.",
      description: "Standar representasi diagram sistem backend, database schemas, dan flow AI agent pipeline dengan standar grafis industri.",
      url: "https://github.com/mermaid-js/mermaid",
      type: "skill"
    },
    {
      id: "skill_vercel_guidelines",
      name: "Vercel Web Interface Guidelines",
      category: "Frontend Design Doctrine",
      badge: "✦ BEST PRACTICES",
      logo: "https://assets.vercel.com/image/upload/front/favicon/vercel/favicon.ico",
      previewImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
      tagline: "Performance, accessibility and visual standards for web applications.",
      description: "Doktrin antarmuka web modern: zero cumulative layout shift (CLS), keyboard navigation lengkap (tab index), dan kontras teks WCAG AAA.",
      url: "https://vercel.com/design",
      type: "skill"
    },
    {
      id: "skill_craftwork_assets",
      name: "Craftwork 3D & Vector Vault",
      category: "High-Craft Asset Studio",
      badge: "✦ VECTOR & 3D",
      logo: "https://craftwork.design/favicon.ico",
      previewImage: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80",
      tagline: "High-end 3D illustrations, UI mockups and isometric vector elements.",
      description: "Pustaka aset grafis 3D presisi tinggi untuk hero section dan showcase fitur tanpa ketergantungan pada model rendering berat.",
      url: "https://craftwork.design",
      type: "skill"
    },

    // --- 8 GITHUB REPOSITORIES ---
    {
      id: "gh_openhands",
      name: "All-Hands-AI / OpenHands",
      category: "Autonomous AI Software Developer",
      badge: "⭐ 42.1k STARS",
      logo: "https://avatars.githubusercontent.com/u/163013219?v=4",
      previewImage: "https://opengraph.githubassets.com/1/All-Hands-AI/OpenHands",
      tagline: "Platform agen pengembang perangkat lunak AI open-source dengan eksekusi kode mandiri.",
      description: "Agen AI otonom yang mampu menulis kode, menjalankan terminal, dan memperbaiki bug di repositori secara end-to-end.",
      url: "https://github.com/All-Hands-AI/OpenHands",
      type: "github"
    },
    {
      id: "gh_browser_use",
      name: "browser-use / browser-use",
      category: "AI Agent Web Browser Automation",
      badge: "⭐ 31.4k STARS",
      logo: "https://avatars.githubusercontent.com/u/190875200?v=4",
      previewImage: "https://opengraph.githubassets.com/1/browser-use/browser-use",
      tagline: "Otomasi browser web cerdas untuk AI agents berinteraksi layaknya manusia.",
      description: "Menghubungkan LLM dengan browser nyata untuk mengeksekusi navigasi web, pengisian formulir, dan ekstraksi data dinamis.",
      url: "https://github.com/browser-use/browser-use",
      type: "github"
    },
    {
      id: "gh_eliza",
      name: "elizaOS / eliza",
      category: "Autonomous Multi-Agent Framework",
      badge: "⭐ 12.8k STARS",
      logo: "https://avatars.githubusercontent.com/u/188849764?v=4",
      previewImage: "https://opengraph.githubassets.com/1/elizaOS/eliza",
      tagline: "Sistem multi-agen otonom untuk Discord, Twitter, dan Telegram.",
      description: "Framework agen modular dengan memori jangka panjang, integrasi multi-platform chat, dan interaksi otonom terdesentralisasi.",
      url: "https://github.com/elizaOS/eliza",
      type: "github"
    },
    {
      id: "gh_ollama",
      name: "ollama / ollama",
      category: "Local LLM Inference Engine",
      badge: "⭐ 104.2k STARS",
      logo: "https://avatars.githubusercontent.com/u/152945722?v=4",
      previewImage: "https://opengraph.githubassets.com/1/ollama/ollama",
      tagline: "Menjalankan model Llama 3, Mistral, dan Gemma secara lokal dengan CLI cepat.",
      description: "Engine inferensi lokal tercepat dan paling efisien untuk menjalankan model bahasa besar langsung di CPU atau GPU lokal.",
      url: "https://github.com/ollama/ollama",
      type: "github"
    },
    {
      id: "gh_vllm",
      name: "vllm-project / vllm",
      category: "High-Throughput LLM Serving",
      badge: "⭐ 35.6k STARS",
      logo: "https://avatars.githubusercontent.com/u/137744793?v=4",
      previewImage: "https://opengraph.githubassets.com/1/vllm-project/vllm",
      tagline: "Library throughput tinggi dan hemat memori untuk inferensi dan serving LLM.",
      description: "Engine serving kelas produksi dengan PagedAttention yang mampu melipatgandakan throughput inferensi model AI.",
      url: "https://github.com/vllm-project/vllm",
      type: "github"
    },
    {
      id: "gh_crewAI",
      name: "crewAIInc / crewAI",
      category: "Multi-Agent Orchestration",
      badge: "⭐ 24.5k STARS",
      logo: "https://avatars.githubusercontent.com/u/161832047?v=4",
      previewImage: "https://opengraph.githubassets.com/1/crewAIInc/crewAI",
      tagline: "Framework orkestrasi agen AI kolaboratif berbasis peran mandiri.",
      description: "Memungkinkan kumpulan agen AI berbagi tugas secara sinergis layaknya tim engineer profesional.",
      url: "https://github.com/crewAIInc/crewAI",
      type: "github"
    },
    {
      id: "gh_fastapi",
      name: "fastapi / fastapi",
      category: "High-Performance Python Web API",
      badge: "⭐ 78.9k STARS",
      logo: "https://avatars.githubusercontent.com/u/10298444?v=4",
      previewImage: "https://opengraph.githubassets.com/1/fastapi/fastapi",
      tagline: "Framework web modern dan berkecepatan tinggi untuk membangun API dengan Python.",
      description: "Standar emas backend API untuk aplikasi berbasis kecerdasan buatan dengan auto-generated OpenAPI docs dan async throughput tinggi.",
      url: "https://github.com/fastapi/fastapi",
      type: "github"
    },
    {
      id: "gh_shadcn",
      name: "shadcn-ui / ui",
      category: "Accessible Component Library",
      badge: "⭐ 73.1k STARS",
      logo: "https://avatars.githubusercontent.com/u/139895814?v=4",
      previewImage: "https://opengraph.githubassets.com/1/shadcn-ui/ui",
      tagline: "Komponen antarmuka pengguna siap pakai dan berstandar aksesibilitas tinggi.",
      description: "Pondasi desain web modern dengan Tailwind CSS dan Radix UI tanpa beban runtime stylesheet eksternal.",
      url: "https://github.com/shadcn-ui/ui",
      type: "github"
    },

    // --- ORIGINAL CLI TOOLS ---
    {
      id: "tool_hermes_cli",
      name: "Hermes CLI Automation",
      category: "Autonomous Agent Toolset",
      badge: "⭐ PRODUCTION ENGINE",
      logo: "https://avatars.githubusercontent.com/u/111832050?v=4",
      previewImage: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1200&q=80",
      tagline: "Engine eksekusi autonomous agent lokal terisolasi yang mengendalikan lingkungan CLI laptop.",
      description: "Digunakan oleh Aira untuk mengeksekusi pembangunan file, kompilasi build Next.js, dan pengujian QA secara mandiri.",
      url: "https://github.com/NousResearch/Hermes",
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
                            (activeCategory === 'bookmarked' && isBookmarked(t.id)) ||
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
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-[#0a0a0c] dark:text-[#f4f4f5] font-sans antialiased selection:bg-orange-500 selection:text-white flex transition-colors duration-200">
      
      {/* 1. LEFT ICON RAIL (DESKTOP ONLY) */}
      <aside className="hidden sm:flex w-16 sm:w-20 bg-zinc-50 border-r border-zinc-200 dark:bg-[#0e0e12] dark:border-[#26262e] flex-col items-center justify-between py-6 flex-shrink-0 sticky top-0 h-screen z-40 transition-colors">
        <div className="space-y-8 flex flex-col items-center">
          <Link href="/" className="w-10 h-10 rounded-2xl p-1.5 bg-white border border-zinc-200 flex items-center justify-center shadow-lg shadow-orange-500/20 hover:scale-105 transition-transform" title="OXID Labs Home">
            <img src="/images/oxid-logo.png" alt="OXID Labs" className="w-full h-full object-contain" />
          </Link>

          <nav className="flex flex-col items-center space-y-4">
            <Link href="/prompts" className="p-3 rounded-2xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-[#16161c] transition-all" title="Prompt Lab">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </Link>
            <Link href="/grants" className="p-3 rounded-2xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-[#16161c] transition-all" title="Bansos AI">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </Link>
            <Link href="/tools" className="p-3 rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/30 transition-all" title="AI Tools, Design & GitHub Radar (Active)">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path></svg>
            </Link>
            <Link href="/intel" className="p-3 rounded-2xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-[#16161c] transition-all" title="Threads Intel">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
            </Link>
            <Link href="/templates" className="p-3 rounded-2xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-[#16161c] transition-all" title="Karya Templates">
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
        
        {/* 2. TOP BAR (ULTRA COMPACT 1-LINE HEADER ON MOBILE WITH THEME TOGGLE) */}
        <header className="border-b border-zinc-200 dark:border-[#26262e] bg-white/95 dark:bg-[#0a0a0c]/95 backdrop-blur-md sticky top-0 z-30 transition-colors">
          <div className="h-14 sm:h-20 px-4 sm:px-8 flex items-center justify-between gap-3">
            {/* Left: Brand / Title */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-white p-1 flex items-center justify-center border border-zinc-200 shadow-sm flex-shrink-0">
                <img src="/images/oxid-logo.png" alt="OXID" className="w-full h-full object-contain" />
              </div>
              <span className="font-serif font-black text-sm sm:text-lg text-zinc-900 dark:text-white uppercase tracking-wider">
                Tools<span className="text-orange-500">.Radar</span>
              </span>
            </Link>

            {/* Right: Search + Theme Toggle + Templates Button */}
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                placeholder="Search tools..." 
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
            <button 
              onClick={() => setActiveCategory('all')} 
              className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer whitespace-nowrap text-[11px] ${activeCategory === 'all' ? 'bg-orange-500 text-white shadow-sm' : 'bg-zinc-200/80 text-zinc-600 hover:text-black dark:bg-[#16161c] dark:text-zinc-400 dark:hover:text-white'}`}
            >
              Semua ({realTools.length})
            </button>
            <button 
              onClick={() => setActiveCategory('bookmarked')} 
              className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer whitespace-nowrap text-[11px] ${activeCategory === 'bookmarked' ? 'bg-orange-500 text-white shadow-sm' : 'bg-zinc-200/80 text-zinc-600 hover:text-black dark:bg-[#16161c] dark:text-zinc-400 dark:hover:text-white'}`}
            >
              ⭐ Personal Vault ({realTools.filter(t => isBookmarked(t.id)).length})
            </button>
            <button 
              onClick={() => setActiveCategory('github')} 
              className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer whitespace-nowrap text-[11px] ${activeCategory === 'github' ? 'bg-orange-500 text-white shadow-sm' : 'bg-zinc-200/80 text-zinc-600 hover:text-black dark:bg-[#16161c] dark:text-zinc-400 dark:hover:text-white'}`}
            >
              ⭐ GitHub Repos ({realTools.filter(t => t.type === 'github').length})
            </button>
            <button 
              onClick={() => setActiveCategory('design')} 
              className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer whitespace-nowrap text-[11px] ${activeCategory === 'design' ? 'bg-orange-500 text-white shadow-sm' : 'bg-zinc-200/80 text-zinc-600 hover:text-black dark:bg-[#16161c] dark:text-zinc-400 dark:hover:text-white'}`}
            >
              ❤️‍🔥 Design Vault (5)
            </button>
            <button 
              onClick={() => setActiveCategory('skills')} 
              className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer whitespace-nowrap text-[11px] ${activeCategory === 'skills' ? 'bg-orange-500 text-white shadow-sm' : 'bg-zinc-200/80 text-zinc-600 hover:text-black dark:bg-[#16161c] dark:text-zinc-400 dark:hover:text-white'}`}
            >
              ✦ Motion &amp; Craft (5)
            </button>
            <button 
              onClick={() => setActiveCategory('tools')} 
              className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer whitespace-nowrap text-[11px] ${activeCategory === 'tools' ? 'bg-orange-500 text-white shadow-sm' : 'bg-zinc-200/80 text-zinc-600 hover:text-black dark:bg-[#16161c] dark:text-zinc-400 dark:hover:text-white'}`}
            >
              CLI &amp; Engine
            </button>
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
              <h1 className="font-serif text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white">
                GitHub Repositories, AI Design Vault &amp; Motion Skills
              </h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed font-sans">
                Kompilasi repositori GitHub kelas dunia, sumber daya desain web terpopuler, dan panduan teknik tingkat lanjut untuk WebGL shader, gestur drawer pegas, dan otomasi AI.
              </p>
            </div>

            {/* RESOURCE & TOOLS CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTools.map(tool => (
                <div key={tool.id} className="bg-zinc-50 dark:bg-[#121216] border border-zinc-200 dark:border-[#26262e] hover:border-orange-500/50 rounded-3xl p-6 flex flex-col justify-between space-y-5 shadow-sm dark:shadow-xl transition-all group">
                  <div className="space-y-4">
                    
                    {/* Visual Website Capture Header */}
                    {tool.previewImage && (
                      <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-black/60 shadow-inner">
                        <img 
                          src={tool.previewImage} 
                          alt={tool.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono text-orange-600 dark:text-orange-400 border border-zinc-200 dark:border-white/10 font-bold">
                          {tool.badge}
                        </div>
                        {/* Bookmark Button */}
                        <button
                          onClick={() => toggleBookmark(tool.id)}
                          className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-md border transition-all cursor-pointer ${isBookmarked(tool.id) ? 'bg-orange-500 text-white border-orange-500 shadow-md' : 'bg-white/80 dark:bg-black/60 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-white/10 hover:text-orange-500'}`}
                          title={isBookmarked(tool.id) ? 'Hapus dari Vault' : 'Simpan ke Personal Vault'}
                        >
                          ⭐
                        </button>
                      </div>
                    )}

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold uppercase text-zinc-500">{tool.category}</span>
                      <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white leading-snug group-hover:text-orange-500 transition-colors">
                        {tool.name}
                      </h3>
                    </div>

                    <p className="text-xs text-orange-600 dark:text-orange-400/90 font-mono leading-relaxed">{tool.tagline}</p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 font-sans leading-relaxed">{tool.description}</p>
                  </div>

                  <div className="pt-3 border-t border-zinc-200 dark:border-[#26262e] flex items-center justify-between font-mono text-xs">
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
          <aside className="w-full xl:w-80 bg-zinc-50 dark:bg-[#0e0e12] border-t xl:border-t-0 xl:border-l border-zinc-200 dark:border-[#26262e] p-6 space-y-8 flex-shrink-0 transition-colors">
            <div className="bg-white dark:bg-[#121218] border border-zinc-200 dark:border-[#26262e] rounded-3xl p-6 space-y-3 shadow-sm dark:shadow-xl font-mono text-xs">
              <span className="text-orange-500 font-bold uppercase block">Ingestion Source</span>
              <p className="text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed">
                Database ini terhubung langsung dengan engine scraper otomatis <strong>github_scraper.py</strong> dan repositori desain resmi untuk menyajikan status stars dan rilis terkini.
              </p>
              <div className="pt-2 border-t border-zinc-200 dark:border-[#26262e] text-[10px] text-zinc-500 flex items-center justify-between">
                <span>Active Vault:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{realTools.length} Resources Active</span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#121218] border border-zinc-200 dark:border-[#26262e] rounded-3xl p-6 space-y-3 shadow-sm dark:shadow-xl font-mono text-xs">
              <span className="text-zinc-900 dark:text-zinc-300 font-bold uppercase block">Quick Action</span>
              <p className="text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed">
                Gunakan tombol <strong>Ctrl+K</strong> kapan saja untuk mencari repo GitHub, font, shader, atau prompt web dari seluruh database. Klik tombol ⭐ untuk menyimpan ke Personal Vault.
              </p>
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
        <Link href="/grants" className="p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white flex flex-col items-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span className="text-[9px] font-mono font-bold mt-0.5">Bansos</span>
        </Link>
        <Link href="/tools" className="p-2 text-orange-500 flex flex-col items-center">
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
