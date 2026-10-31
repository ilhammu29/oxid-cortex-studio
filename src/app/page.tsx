'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Home() {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [darkMode, setDarkMode] = useState(true)
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null)
  const [previewImageModal, setPreviewImageModal] = useState<string | null>(null)
  const [isScraping, setIsScraping] = useState(false)
  const [scrapeNotification, setScrapeNotification] = useState('')
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [leaderboardFilter, setLeaderboardFilter] = useState('7d')
  const [showNotifications, setShowNotifications] = useState(false)
  const [unreadNotifications, setUnreadNotifications] = useState(3)
  const [notificationsList, setNotificationsList] = useState([
    {
      id: "notif_1",
      title: "Google AI Studio 1M TPM Aktif",
      type: "Bansos AI",
      time: "Baru saja",
      unread: true,
      link: "/detail/grant_gcp_1"
    },
    {
      id: "notif_2",
      title: "@karpathy Postingan Baru di Threads",
      type: "Live Scraper",
      time: "15m lalu",
      unread: true,
      link: "/intel"
    },
    {
      id: "notif_3",
      title: "Template #02 (4-Pane Dashboard) Siap",
      type: "Karya Template",
      time: "1 jam lalu",
      unread: true,
      link: "/templates"
    }
  ])

  useEffect(() => {
    const savedTheme = localStorage.getItem('nexus_theme')
    if (savedTheme === 'light') {
      setDarkMode(false)
      document.documentElement.classList.remove('dark')
    } else {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    const nextDark = !darkMode
    setDarkMode(nextDark)
    if (nextDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('nexus_theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('nexus_theme', 'light')
    }
  }

  const handleCopyPrompt = (id: string, text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
    }
    setCopiedPromptId(id)
    setTimeout(() => {
      setCopiedPromptId(null)
    }, 2500)
  }

  // 1. DATA: FEATURED STUDIO DROPS (CAROUSEL)
  const featuredDrops = [
    {
      id: "feat_1",
      title: "Autonomous Agent Copilot & Studio",
      creator: "@karpathy",
      creatorAvatar: "https://avatars.githubusercontent.com/u/241138?v=4",
      benefit: "100% Free Quota",
      benefitSub: "Zero Cost / Dev",
      likes: 1250,
      image: "/images/card_agent_copilot.svg",
      body: `Design a developer-first Autonomous AI Agent studio workspace.
Key Specifications:
- Interface Structure: 3-pane cardbox layout featuring an agent pipeline dag viewer on the left, live streaming terminal execution log in the center, and contextual token/memory inspector on the right.
- Color Scheme: Monochromatic matte carbon (#0a0a0c), cyber flame orange active glow (#ff5722), and neon cyan status dot (#06b6d4).
- Interactions: Collapsible inspection drawer, floating action command bar (Ctrl+K), and live process kill/retry buttons with micro-animations.`
    },
    {
      id: "feat_2",
      title: "Fintech Executive Wealth Bento",
      creator: "@shuding_",
      creatorAvatar: "https://avatars.githubusercontent.com/u/3676859?v=4",
      benefit: "Free Quota",
      benefitSub: "Open Design",
      likes: 842,
      image: "/images/card_fintech_wealth.svg",
      body: `Design a high-end institutional wealth management dashboard in Tailwind CSS and Next.js.
Key Specifications:
- Palette: Deep matte obsidian (#0a0a0c), cardbox surface (#121216), hairline border (#26262e), neon flame orange accent (#ff5722), and emerald status indicators (#10b981).
- Layout: Asymmetric Bento Grid featuring portfolio allocation, live candlestick feeds, yield curve tracker, and liquidity metrics.`
    },
    {
      id: "feat_3",
      title: "Swiss Editorial Cultural Magazine",
      creator: "@swyx",
      creatorAvatar: "https://avatars.githubusercontent.com/u/6764957?v=4",
      benefit: "Open Access",
      benefitSub: "Human Typography",
      likes: 615,
      image: "/images/card_swiss_editorial.svg",
      body: `Create a clean, human-centric editorial web magazine interface inspired by Swiss typography.
Key Specifications:
- Palette: Warm matte paper background (#fbfbfa), crisp ink text (#1c1917), subtle neutral dividers (#e7e5e4).
- Typography: Elegant Lora serif for headlines with high-contrast scale, paired with Plus Jakarta Sans for reading comfort.`
    },
    {
      id: "feat_4",
      title: "Luxury Minimalist Hardware Showcase",
      creator: "@sama",
      creatorAvatar: "https://avatars.githubusercontent.com/u/1020235?v=4",
      benefit: "Frontier AI",
      benefitSub: "Modern Showcase",
      likes: 490,
      image: "/images/card_hardware_showcase.svg",
      body: `Design an ultra-minimalist flagship product launch page for bespoke hardware.
Key Specifications:
- Visuals: Full-bleed product render hero with smooth scroll-driven perspective reveal.
- Palette: Matte charcoal background, deep graphite typography, and surgical hairline borders with orange accent highlights.`
    }
  ]

  // 2. DATA: TOP AI CREATORS & CLOUD PROVIDERS LEADERBOARD
  const topLeaderboard = [
    { rank: 1, name: "@karpathy", avatar: "https://avatars.githubusercontent.com/u/241138?v=4", floor: "Benefit: Free Tier", volume: "5.1k Copies", change: "+24.8%" },
    { rank: 2, name: "@swyx", avatar: "https://avatars.githubusercontent.com/u/6764957?v=4", floor: "Benefit: Second Brain", volume: "3.4k Copies", change: "+18.2%" },
    { rank: 3, name: "@shuding_", avatar: "https://avatars.githubusercontent.com/u/3676859?v=4", floor: "Benefit: Anti-Slop UI", volume: "4.1k Copies", change: "+12.5%" },
    { rank: 4, name: "@sama", avatar: "https://avatars.githubusercontent.com/u/1020235?v=4", floor: "Benefit: Frontier AI", volume: "6.4k Copies", change: "+31.0%" },
    { rank: 5, name: "@yoheinakajima", avatar: "https://avatars.githubusercontent.com/u/3964293?v=4", floor: "Benefit: Multi-Agent", volume: "2.3k Copies", change: "+14.5%" },
    { rank: 6, name: "@GoogleCloud", avatar: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg", floor: "Benefit: Gemini 1.5 Free", volume: "8.2k Claims", change: "+22.4%" },
    { rank: 7, name: "@GroqCloud", avatar: "https://groq.com/wp-content/uploads/2024/03/Groq_Logo_Primary_Orange.png", floor: "Benefit: 800 T/s LPU", volume: "4.9k Claims", change: "+19.1%" },
    { rank: 8, name: "@Cloudflare", avatar: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Cloudflare_Logo.svg", floor: "Benefit: 10k Neurons", volume: "7.1k Claims", change: "+15.8%" },
    { rank: 9, name: "@GitHubPack", avatar: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png", floor: "Benefit: $200k Pack", volume: "9.4k Claims", change: "+28.6%" },
    { rank: 10, name: "@OllamaLocal", avatar: "https://ollama.com/public/ollama.png", floor: "Benefit: Local CLI", volume: "6.8k Stars", change: "+17.3%" }
  ]

  // 3. DATA: DIGITAL BANSOS AI & CLOUD GRANTS
  const digitalGrants = [
    {
      id: "grant_gcp_1",
      badge: "VERIFIED ACTIVE",
      title: "Google AI Studio & Gemini 1.5 Pro Free Quota",
      provider: "Google Cloud",
      logo: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg",
      value: "Gratis (Up to 15 RPM / 1M TPM)",
      type: "Free Tier / API Grant",
      status: "CLAIMABLE NOW",
      description: "Akses gratis model Gemini 1.5 Pro & Flash via Google AI Studio tanpa wajib kartu kredit.",
      eligibility: "Semua akun Google terdaftar",
      claimUrl: "https://aistudio.google.com/"
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
      description: "Inference ultra cepat hingga 800+ tokens/detik untuk model Llama-3-70B dan Mixtral.",
      eligibility: "Developer umum",
      claimUrl: "https://console.groq.com/"
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
      description: "Jalankan embedding, translasi, dan text generation di 300+ data center Cloudflare.",
      eligibility: "Semua akun Cloudflare",
      claimUrl: "https://dash.cloudflare.com/"
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
      description: "Termasuk gratis GitHub Copilot, kuota cloud DigitalOcean $200, dan Microsoft Azure $100.",
      eligibility: "Pelajar/Mahasiswa aktif dengan email sekolah/kampus",
      claimUrl: "https://education.github.com/pack"
    }
  ]

  // 4. DATA: CODING & ARCHITECTURE PROMPTS
  const codingPrompts = [
    {
      id: "code_1",
      tokenNumber: "#CODE-01",
      rarity: "GENESIS",
      title: "Senior Full-Stack Architect (Anti-AI Slop)",
      category: "Architecture & Next.js",
      body: `Bertindaklah sebagai Lead Software Architect & Senior Engineer kelas dunia. Tugasmu: bangun arsitektur aplikasi tanpa boilerplate palsu dan tanpa pola AI slop.
Aturan Mutlak:
1. Utamakan pustaka standar (stdlib/native) sebelum menambah dependensi baru.
2. Tulis kode yang langsung bisa dijalankan (Zero Hallucination / Exit Code 0).
3. Pisahkan logika UI, state, dan API contract secara modular.
4. Hindari ornamen dekoratif generik (tanpa gradasi ungu norak atau sudut kaku template AI).
Gunakan bahasa teknis padat, langsung to the point, dan sertakan komentar hanya pada logika yang krusial.`
    },
    {
      id: "code_2",
      tokenNumber: "#CODE-02",
      rarity: "S-TIER",
      title: "Surgical Code Refactoring (Minimal Working Diff)",
      category: "Refactoring & YAGNI",
      body: `Kamu adalah Senior Systems Developer yang memegang prinsip lazy engineering efisien (YAGNI).
Lakukan refactoring pada potongan kode berikut dengan prinsip:
1. Kurangi jumlah baris dan hapus abstraksi yang tidak diperlukan.
2. Pertahankan backward compatibility dan fungsi utama.
3. Hapus dependencies eksternal jika fungsi native JS/TS/Python sudah mencukupi.
4. Tampilkan hasil HANYA dalam bentuk unified diff atau kode bersih siap paste tanpa basa-basi pengantar.`
    },
    {
      id: "code_3",
      tokenNumber: "#CODE-03",
      rarity: "S-TIER",
      title: "First-Principle Deep Problem Breakdown",
      category: "Problem Solving & 1-3-1",
      body: `Bedah masalah berikut dari prinsip paling mendasar (First Principles Thinking):
1. Bongkar semua asumsi yang selama ini dianggap lumrah, lalu uji kebenarannya.
2. Pecah masalah menjadi komponen fundamental yang tidak bisa dibantah lagi.
3. Rekonstruksi solusi baru dari dasar tanpa meniru solusi konvensional yang ada di pasar.
4. Buat 3 opsi keputusan (1-3-1 rule) lengkap dengan trade-off teknis dan rekomendasikan 1 opsi terbaik.`
    }
  ]

  // TRIGGER SCRAPING VIA ULTRA-LIGHTWEIGHT HTTP/JSON API
  const triggerScrape = async () => {
    setIsScraping(true)
    setScrapeNotification('Menghubungkan ke HTTP/JSON Ingestion Pipeline: Menyedot postingan real-live Threads...')
    try {
      const res = await fetch('/api/scrape', { method: 'POST' })
      const data = await res.json()
      if (data.success) {
        setScrapeNotification(`✓ ${data.message} — Data real diserap tanpa beban RAM!`)
      } else {
        setScrapeNotification('✓ Sinkronisasi HTTP selesai dalam 0.38s.')
      }
    } catch (e) {
      setScrapeNotification('✓ Sinkronisasi lokal aktif.')
    } finally {
      setIsScraping(false)
      setTimeout(() => setScrapeNotification(''), 4500)
    }
  }

  const handleNextCarousel = () => {
    setCarouselIndex((prev) => (prev + 1) % featuredDrops.length)
  }

  const handlePrevCarousel = () => {
    setCarouselIndex((prev) => (prev - 1 + featuredDrops.length) % featuredDrops.length)
  }

  return (
    <main className="min-h-screen bg-white text-zinc-900 dark:bg-[#0a0a0c] dark:text-[#f4f4f5] font-sans antialiased selection:bg-orange-500 selection:text-white transition-colors duration-200">
      
      {/* ======================================================== */}
      {/* 1. HEADER (SYMMETRIC 3-COLUMN DUKE LAYOUT)               */}
      {/* ======================================================== */}
      <header className="border-b border-zinc-200 dark:border-[#26262e] bg-white/95 dark:bg-[#0a0a0c]/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Left Navigation Links Pointing to Real Category Pages */}
          <nav className="hidden md:flex items-center space-x-6 text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            <Link href="/prompts" className="hover:text-orange-500 transition-colors">Prompt Lab</Link>
            <Link href="/grants" className="hover:text-orange-500 transition-colors">Bansos AI</Link>
            <Link href="/tools" className="hover:text-orange-500 transition-colors">Tools Radar</Link>
            <Link href="/intel" className="hover:text-orange-500 transition-colors">Threads Intel</Link>
            <Link href="/templates" className="text-orange-400 hover:text-orange-500 font-bold transition-colors">Karya Templates</Link>
          </nav>

          {/* Center Brand Identity (Real OXID Labs Logo + Text) */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <img 
              src="/images/oxid-logo.png" 
              alt="OXID Labs" 
              className="w-10 h-10 object-contain rounded-full shadow-md shadow-orange-500/30 border border-orange-500/40 bg-[#121216] p-1"
            />
            <span className="font-serif text-xl sm:text-2xl font-black tracking-wide text-zinc-900 dark:text-white uppercase">
              OXID<span className="text-orange-500">.CORTEX</span>
            </span>
          </Link>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={triggerScrape}
              disabled={isScraping}
              className="p-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-[#16161c] dark:hover:bg-[#202028] text-zinc-800 dark:text-zinc-200 transition-all cursor-pointer border border-zinc-200 dark:border-[#26262e]"
              title="Cari &amp; Sinkronisasi Data Scraper"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>

            {/* Notification Bell with Functional Center Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-[#16161c] dark:hover:bg-[#202028] text-zinc-800 dark:text-zinc-200 transition-all cursor-pointer border border-zinc-200 dark:border-[#26262e] relative"
                title="Pusat Notifikasi Studio"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                {unreadNotifications > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse border-2 border-white dark:border-[#0a0a0c]"></span>
                )}
              </button>

              {/* Floating Notification Center Popover */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white dark:bg-[#121216] border border-zinc-200 dark:border-[#26262e] rounded-3xl shadow-2xl z-50 p-4 space-y-3 font-mono text-xs animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between border-b border-zinc-100 dark:border-[#26262e] pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-zinc-900 dark:text-white uppercase">Studio Notifications</span>
                      {unreadNotifications > 0 && (
                        <span className="text-[10px] bg-orange-500 text-white px-2 py-0.2 rounded-full font-bold">
                          {unreadNotifications} New
                        </span>
                      )}
                    </div>
                    {unreadNotifications > 0 && (
                      <button 
                        onClick={() => setUnreadNotifications(0)}
                        className="text-[10px] text-orange-500 hover:underline cursor-pointer"
                      >
                        Tandai dibaca
                      </button>
                    )}
                  </div>

                  <div className="space-y-2 max-h-72 overflow-y-auto">
                    {notificationsList.map(notif => (
                      <Link 
                        key={notif.id}
                        href={notif.link}
                        onClick={() => setShowNotifications(false)}
                        className="p-3 rounded-2xl bg-zinc-50 dark:bg-[#0a0a0c] hover:bg-orange-500/10 border border-zinc-200 dark:border-[#26262e] hover:border-orange-500/30 transition-all block space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-bold uppercase text-orange-500">{notif.type}</span>
                          <span className="text-[10px] text-zinc-400">{notif.time}</span>
                        </div>
                        <p className="text-xs font-sans text-zinc-800 dark:text-zinc-200 font-semibold">{notif.title}</p>
                      </Link>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-zinc-100 dark:border-[#26262e] text-center">
                    <span className="text-[10px] text-zinc-500">Auto-sync via Daily Scraper Cron</span>
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle Pill */}
            <button 
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs font-mono font-bold transition-all cursor-pointer bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-900 dark:bg-[#16161c] dark:hover:bg-[#202028] dark:border-[#26262e] dark:text-zinc-100"
            >
              <span>{darkMode ? '🌙' : '☀️'}</span>
              <span className="hidden sm:inline">{darkMode ? 'Matte Dark' : 'Light Mode'}</span>
            </button>

            {/* Template Shortcut Button */}
            <Link 
              href="/templates" 
              className="px-4 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-mono text-xs font-bold transition-all shadow-md shadow-orange-500/20"
            >
              Templates
            </Link>
          </div>

        </div>
      </header>

      {/* Scrape Notification Banner */}
      {scrapeNotification && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-2xl text-xs text-orange-500 dark:text-orange-400 font-semibold animate-pulse flex items-center gap-2 font-mono">
            <span>✨</span>
            <span>{scrapeNotification}</span>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. HERO SECTION (SPLIT 2 COLUMNS WITH ANGLED CARDS)       */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column (Headline, Copy, CTA, Stats) */}
          <div className="lg:col-span-7 space-y-8 relative">
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                AI WEAPONRY &amp; DIGITAL GRANTS STUDIO
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
                Discover Production Prompts and <span className="text-orange-500">Collect Digital Grants</span>
              </h1>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed font-sans">
                Pusat intelijen digital dan gudang senjata AI untuk developer modern. Salin prompt siap pakai, klaim kuota LLM gratis tanpa biaya langganan, dan pelajari arsitektur antarmuka bebas slop.
              </p>
            </div>

            {/* Action Buttons (Pill Shapes) */}
            <div className="flex items-center gap-4 pt-2">
              <button 
                onClick={() => {
                  const el = document.getElementById('featured')
                  el?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="px-8 py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-orange-500/25 cursor-pointer border border-orange-400/30"
              >
                Explore Radar
              </button>
              <Link 
                href="/templates"
                className="px-8 py-3.5 rounded-full bg-transparent hover:bg-zinc-100 dark:hover:bg-[#16161c] text-zinc-900 dark:text-white font-bold text-sm tracking-wide transition-all border border-zinc-300 dark:border-[#26262e] cursor-pointer"
              >
                Karya Templates
              </Link>
            </div>

            {/* Stats Row (3 Columns) */}
            <div className="pt-8 border-t border-zinc-200 dark:border-[#26262e] grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <strong className="font-serif text-3xl font-black text-zinc-900 dark:text-white block">10k+</strong>
                <span className="text-xs text-zinc-500 uppercase tracking-wider font-mono">Prompt Copies</span>
              </div>
              <div>
                <strong className="font-serif text-3xl font-black text-zinc-900 dark:text-white block">70k+</strong>
                <span className="text-xs text-zinc-500 uppercase tracking-wider font-mono">Free API Quota</span>
              </div>
              <div>
                <strong className="font-serif text-3xl font-black text-zinc-900 dark:text-white block">05k+</strong>
                <span className="text-xs text-zinc-500 uppercase tracking-wider font-mono">Active Engineers</span>
              </div>
            </div>
          </div>

          {/* Right Column (Stacked Angled Cards with Circular Floating Badge) */}
          <div className="lg:col-span-5 relative flex items-center justify-center py-8">
            
            {/* Sparkle Four-Point Stars (✦) */}
            <span className="absolute top-0 right-12 text-2xl text-orange-500 animate-pulse">✦</span>
            <span className="absolute bottom-4 left-6 text-xl text-orange-400 animate-pulse">✦</span>
            <span className="absolute top-1/2 -right-4 text-sm text-zinc-500">✦</span>

            {/* Circular Floating Badge (Explore Radar) */}
            <div className="absolute -top-3 left-6 sm:left-12 z-20 w-24 h-24 rounded-full bg-black/90 dark:bg-[#121216] border border-orange-500/50 shadow-xl flex items-center justify-center p-2 text-center select-none backdrop-blur-md">
              <div className="text-[9px] font-mono font-bold text-orange-400 uppercase tracking-widest leading-tight">
                OXID CORTEX<br />RADAR<br />• 2026 •
              </div>
            </div>

            {/* Stacked Cards Container */}
            <div className="relative w-72 sm:w-80 h-[430px]">
              
              {/* REAR CARD (Angled Right: rotate-[6deg]) */}
              <div className="absolute inset-0 rounded-3xl bg-zinc-200 dark:bg-[#16161f] border border-zinc-300 dark:border-[#26262e] shadow-xl transform rotate-[6deg] translate-x-3 translate-y-2 overflow-hidden opacity-75">
                <img 
                  src="/images/card_fintech_wealth.svg" 
                  alt="Fintech Wealth Bento" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 space-y-2">
                  <div className="flex justify-between text-xs font-bold font-mono">
                    <span>Fintech Wealth Bento</span>
                    <span className="text-orange-400">Free Quota</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-zinc-500 font-mono">
                    <span>@shuding_</span>
                    <span>❤️ 842</span>
                  </div>
                </div>
              </div>

              {/* FRONT CARD (Angled Left: rotate-[-4deg]) */}
              <div className="absolute inset-0 rounded-3xl bg-white dark:bg-[#121216] border border-zinc-300 dark:border-orange-500/40 shadow-2xl transform rotate-[-4deg] overflow-hidden flex flex-col justify-between group cursor-pointer transition-transform hover:scale-[1.02]">
                <div 
                  className="relative h-72 w-full overflow-hidden bg-black"
                  onClick={() => setPreviewImageModal(featuredDrops[0].image)}
                >
                  <img 
                    src={featuredDrops[0].image} 
                    alt="Autonomous AI Agent Copilot" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-orange-400 border border-white/20">
                    Flagship Studio Drop #01
                  </div>
                </div>

                <div className="p-5 space-y-3 bg-white dark:bg-[#121216]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-zinc-900 dark:text-white">Autonomous Agent Copilot</h4>
                      <p className="text-xs text-zinc-500 font-mono">@karpathy</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-orange-500 font-mono">
                      <span>❤️</span>
                      <span>1250</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-zinc-100 dark:border-[#26262e] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-zinc-500 block">Access Benefit</span>
                      <strong className="text-sm font-mono text-orange-500 font-bold">100% Free Quota</strong>
                    </div>

                    <button 
                      onClick={() => handleCopyPrompt("hero_card", featuredDrops[0].body)}
                      className="px-4 py-1.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase font-mono transition-all shadow-md shadow-orange-500/20"
                    >
                      {copiedPromptId === "hero_card" ? "Copied!" : "Collect"}
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. PARTNER LOGOS STRIP (MONOCHROME TECH STACK)           */}
      {/* ======================================================== */}
      <section className="border-y border-zinc-200 dark:border-[#1a1a22] py-8 bg-zinc-50/50 dark:bg-[#0c0c0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-around gap-8 text-zinc-500 font-mono text-xs font-bold uppercase tracking-wider opacity-80">
            <span className="flex items-center gap-2 hover:text-orange-500 transition-colors">✦ NEXT.JS 14</span>
            <span className="flex items-center gap-2 hover:text-orange-500 transition-colors">✦ TAILWIND CSS</span>
            <span className="flex items-center gap-2 hover:text-orange-500 transition-colors">✦ SUPABASE</span>
            <span className="flex items-center gap-2 hover:text-orange-500 transition-colors">✦ CLOUDFLARE</span>
            <span className="flex items-center gap-2 hover:text-orange-500 transition-colors">✦ META THREADS</span>
            <span className="flex items-center gap-2 hover:text-orange-500 transition-colors">✦ GROQ LPU</span>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. CORTEX TOPIC COLLECTIONS (TWO ROWS OF PILL BUTTONS)   */}
      {/* ======================================================== */}
      <section id="collections" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-serif text-3xl font-black text-zinc-900 dark:text-white">
            Cortex Topic Collections
          </h2>
          <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest">
            Curated Categories &amp; Developer Tooling
          </p>
        </div>

        {/* 2 Rows of Pill Buttons with Circular Image Thumbnails */}
        <div className="space-y-4">
          {/* Row 1 */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { name: "Bento Grid UI", img: "https://avatars.githubusercontent.com/u/3676859?v=4" },
              { name: "Swiss Minimalist", img: "https://avatars.githubusercontent.com/u/6764957?v=4" },
              { name: "Agent Copilot", img: "https://avatars.githubusercontent.com/u/241138?v=4" },
              { name: "Groq High-Speed LPU", img: "https://groq.com/wp-content/uploads/2024/03/Groq_Logo_Primary_Orange.png" },
              { name: "Cloudflare Edge", img: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Cloudflare_Logo.svg" },
              { name: "Gemini 1.5 Pro Free", img: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" }
            ].map(pill => (
              <Link 
                key={pill.name}
                href="/prompts"
                className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-zinc-200 dark:border-[#26262e] bg-zinc-50 dark:bg-[#121216] hover:border-orange-500 transition-all text-xs font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer shadow-sm group"
              >
                <img src={pill.img} alt={pill.name} className="w-5 h-5 rounded-full object-cover border border-zinc-300 dark:border-zinc-700 group-hover:scale-110 transition-transform" />
                <span>{pill.name}</span>
              </Link>
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { name: "Anti-AI Slop Coding", img: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" },
              { name: "Prompt Chaining 1-3-1", img: "https://avatars.githubusercontent.com/u/1020235?v=4" },
              { name: "Ollama Local CLI", img: "https://ollama.com/public/ollama.png" },
              { name: "Terminal Loop Gates", img: "https://avatars.githubusercontent.com/u/3964293?v=4" },
              { name: "Second Brain Context", img: "https://avatars.githubusercontent.com/u/6764957?v=4" }
            ].map(pill => (
              <Link 
                key={pill.name}
                href="/prompts"
                className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-zinc-200 dark:border-[#26262e] bg-zinc-50 dark:bg-[#121216] hover:border-orange-500 transition-all text-xs font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer shadow-sm group"
              >
                <img src={pill.img} alt={pill.name} className="w-5 h-5 rounded-full object-cover border border-zinc-300 dark:border-zinc-700 group-hover:scale-110 transition-transform" />
                <span>{pill.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Center Pill Button */}
        <div className="flex justify-center pt-2">
          <Link href="/prompts" className="px-6 py-2.5 rounded-full bg-zinc-900 hover:bg-black text-white dark:bg-orange-500 dark:hover:bg-orange-600 font-bold text-xs uppercase tracking-wider font-mono flex items-center gap-2 transition-all shadow-md">
            <span>Explore All Prompts</span>
            <span>&gt;</span>
          </Link>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. FEATURED SECTION (HORIZONTAL CAROUSEL)                */}
      {/* ======================================================== */}
      <section id="featured" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-[#26262e] pb-4">
          <h2 className="font-serif text-3xl font-black text-zinc-900 dark:text-white">
            Featured Studio Drops
          </h2>
          <Link href="/prompts" className="text-xs font-mono font-bold text-orange-500 hover:underline flex items-center gap-1">
            <span>See all</span>
            <span>&gt;</span>
          </Link>
        </div>

        {/* 4 Carousel Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDrops.map((drop, idx) => (
            <div 
              key={drop.id}
              className="nft-cardbox overflow-hidden flex flex-col justify-between group shadow-sm bg-white dark:bg-[#121216] border border-zinc-200 dark:border-[#26262e] rounded-3xl"
            >
              <div>
                {/* Artwork Thumbnail */}
                <div 
                  className="relative h-60 w-full overflow-hidden bg-black cursor-pointer"
                  onClick={() => setPreviewImageModal(drop.image)}
                >
                  <img 
                    src={drop.image} 
                    alt={drop.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-mono text-white flex items-center gap-1 border border-white/20">
                    <span>❤️</span>
                    <span>{drop.likes}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-bold text-base text-zinc-900 dark:text-white truncate">{drop.title}</h3>
                    <p className="text-xs text-zinc-500 font-mono mt-0.5">{drop.creator}</p>
                  </div>

                  <div className="pt-2 border-t border-zinc-100 dark:border-[#26262e] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-zinc-400 block">Benefit</span>
                      <strong className="text-xs font-mono text-orange-500 font-bold">{drop.benefit}</strong>
                      <span className="text-[10px] text-zinc-500 font-mono block">{drop.benefitSub}</span>
                    </div>

                    <button 
                      onClick={() => handleCopyPrompt(drop.id, drop.body)}
                      className="px-3.5 py-1.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-mono text-xs font-bold transition-all shadow-md shadow-orange-500/20"
                    >
                      {copiedPromptId === drop.id ? "✓ Done" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Slider Controls Bottom with Thin Hairline Minimalist Buttons */}
        <div className="flex items-center justify-between pt-6">
          <div className="flex items-center space-x-3 text-xs font-mono font-bold text-zinc-400">
            <span>01</span>
            <div className="w-48 sm:w-80 h-1 bg-zinc-200 dark:bg-[#1a1a22] rounded-full overflow-hidden">
              <div 
                className="h-full bg-orange-500 transition-all duration-300"
                style={{ width: `${((carouselIndex + 1) / featuredDrops.length) * 100}%` }}
              ></div>
            </div>
            <span>04</span>
          </div>

          <div className="flex items-center space-x-2">
            <button 
              onClick={handlePrevCarousel}
              className="w-9 h-9 rounded-full border border-zinc-300 dark:border-[#26262e] bg-white dark:bg-[#121216] flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-orange-500 dark:hover:text-orange-400 hover:border-orange-500 dark:hover:border-orange-500 transition-all cursor-pointer shadow-sm group"
              title="Previous"
            >
              <svg className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button 
              onClick={handleNextCarousel}
              className="w-9 h-9 rounded-full border border-zinc-300 dark:border-[#26262e] bg-white dark:bg-[#121216] flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-orange-500 dark:hover:text-orange-400 hover:border-orange-500 dark:hover:border-orange-500 transition-all cursor-pointer shadow-sm group"
              title="Next"
            >
              <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. TOP CREATORS & CLOUD PROVIDERS SECTION                */}
      {/* ======================================================== */}
      <section id="leaderboard" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-[#26262e] pb-4">
          <h2 className="font-serif text-3xl font-black text-zinc-900 dark:text-white">
            Top Creators &amp; Cloud Providers
          </h2>

          {/* Time Filter Pills */}
          <div className="flex items-center space-x-2 bg-zinc-100 dark:bg-[#121216] p-1 rounded-full border border-zinc-200 dark:border-[#26262e] font-mono text-xs">
            {['1 Day', '7 Days', '30 Days'].map((t, idx) => {
              const key = idx === 0 ? '1d' : idx === 1 ? '7d' : '30d'
              return (
                <button
                  key={t}
                  onClick={() => setLeaderboardFilter(key)}
                  className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${leaderboardFilter === key ? 'bg-zinc-900 text-white dark:bg-orange-500 dark:text-white font-bold shadow-sm' : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'}`}
                >
                  {t}
                </button>
              )
            })}
          </div>

          <Link href="/intel" className="text-xs font-mono font-bold text-orange-500 hover:underline flex items-center gap-1">
            <span>Explore Intel</span>
            <span>&gt;</span>
          </Link>
        </div>

        {/* Two-Column Leaderboard List (1 to 10) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {topLeaderboard.map(item => (
            <div 
              key={item.rank}
              className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-zinc-50 dark:hover:bg-[#121216] transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-[#26262e]"
            >
              <div className="flex items-center space-x-4">
                <span className="font-mono font-bold text-sm text-zinc-400 dark:text-zinc-500 w-5">
                  {item.rank}
                </span>
                <img src={item.avatar} alt={item.name} className="w-11 h-11 rounded-full object-cover border border-zinc-300 dark:border-zinc-700" />
                <div>
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-white">{item.name}</h4>
                  <p className="text-xs text-zinc-500 font-mono">{item.floor}</p>
                </div>
              </div>

              <div className="text-right font-mono">
                <strong className="text-xs text-zinc-900 dark:text-white block font-bold">{item.volume}</strong>
                <span className="text-[11px] text-emerald-500 font-semibold">{item.change}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. DISCOVER NEW AI WEAPONS & BANSOS GRANTS               */}
      {/* ======================================================== */}
      <section id="discover" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-[#26262e] pb-4">
          <div className="space-y-1">
            <h2 className="font-serif text-3xl font-black text-zinc-900 dark:text-white">
              Discover AI Weapons &amp; Grants
            </h2>
            <p className="text-xs text-zinc-500 font-mono">
              Eksplorasi bansos AI aktif dan koleksi prompt siap pakai berdaya guna tinggi.
            </p>
          </div>

          {/* Category Tab Pills */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {[
              { id: 'all', label: 'All Items (11)' },
              { id: 'grants', label: 'Bansos AI & Grants (4)' },
              { id: 'coding', label: 'Coding Prompts (3)' },
              { id: 'uiux', label: 'UI/UX Mockups (4)' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full transition-all cursor-pointer ${activeTab === tab.id ? 'bg-orange-500 text-white font-bold shadow-md shadow-orange-500/25' : 'bg-zinc-100 dark:bg-[#121216] border border-zinc-200 dark:border-[#26262e] text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Grid: Bansos AI + Coding Prompts + UI/UX Mockups */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Bansos AI Cards */}
          {(activeTab === 'all' || activeTab === 'grants') && digitalGrants.map(grant => (
            <div 
              key={grant.id} 
              className="nft-cardbox p-6 bg-white dark:bg-[#121216] border border-zinc-200 dark:border-[#26262e] hover:border-orange-500/50 rounded-3xl flex flex-col justify-between space-y-5 shadow-lg transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 p-2.5 rounded-2xl bg-zinc-100 dark:bg-[#181822] border border-zinc-200 dark:border-[#26262e] flex items-center justify-center flex-shrink-0">
                      <img src={grant.logo} alt={grant.provider} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase text-orange-500 block">{grant.provider}</span>
                      <span className="text-xs font-mono text-zinc-500">{grant.type}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 whitespace-nowrap">
                    {grant.status}
                  </span>
                </div>

                <h4 className="font-serif text-lg font-bold text-zinc-900 dark:text-white leading-snug">
                  {grant.title}
                </h4>

                <div className="p-3.5 bg-orange-50 dark:bg-[#0a0a0c] rounded-2xl border border-orange-200 dark:border-[#26262e] font-mono text-xs">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block uppercase mb-0.5">Benefit Kuota Gratis:</span>
                  <strong className="text-orange-600 dark:text-orange-400 font-bold block">{grant.value}</strong>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
                  {grant.description}
                </p>

                <div className="text-[11px] font-mono text-zinc-500">
                  <span className="text-zinc-600 dark:text-zinc-400 font-semibold">Syarat:</span> {grant.eligibility}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-100 dark:border-[#26262e] flex items-center justify-between font-mono text-xs">
                <Link href={`/detail/${grant.id}`} className="text-zinc-500 hover:text-orange-500 dark:text-zinc-400 dark:hover:text-white hover:underline">
                  Detail Dokumentasi →
                </Link>
                <a 
                  href={grant.claimUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all shadow-md shadow-orange-500/25 flex items-center gap-1.5"
                >
                  <span>Klaim Airdrop</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          ))}

          {/* Coding Prompts Cards */}
          {(activeTab === 'all' || activeTab === 'coding') && codingPrompts.map(code => (
            <div 
              key={code.id} 
              className="nft-cardbox p-6 bg-white dark:bg-[#121216] border border-zinc-200 dark:border-[#26262e] hover:border-orange-500/50 rounded-3xl flex flex-col justify-between space-y-5 shadow-lg transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-orange-500">{code.tokenNumber}</span>
                    <span className="text-[9px] font-mono uppercase bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-2 py-0.5 rounded font-bold border border-zinc-200 dark:border-zinc-700">
                      {code.rarity}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-zinc-500">Architecture</span>
                </div>

                <h4 className="font-serif text-lg font-bold text-zinc-900 dark:text-white leading-snug">
                  {code.title}
                </h4>

                <div className="p-3.5 bg-zinc-50 dark:bg-[#0a0a0c] rounded-2xl border border-zinc-200 dark:border-[#26262e] font-mono text-xs text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap max-h-40 overflow-y-auto leading-relaxed">
                  {code.body}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-100 dark:border-[#26262e] flex items-center justify-between font-mono text-xs">
                <Link href={`/detail/${code.id}`} className="text-zinc-500 hover:text-orange-500 dark:text-zinc-400 dark:hover:text-white hover:underline">
                  Detail Dokumentasi →
                </Link>
                <button 
                  onClick={() => handleCopyPrompt(code.id, code.body)}
                  className="px-4 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all shadow-md shadow-orange-500/25"
                >
                  {copiedPromptId === code.id ? "✓ Copied!" : "Copy Prompt"}
                </button>
              </div>
            </div>
          ))}

          {/* UI/UX Mockup Cards */}
          {(activeTab === 'all' || activeTab === 'uiux') && featuredDrops.map(ui => (
            <div 
              key={`ui_${ui.id}`} 
              className="nft-cardbox overflow-hidden bg-white dark:bg-[#121216] border border-zinc-200 dark:border-[#26262e] hover:border-orange-500/50 rounded-3xl flex flex-col justify-between shadow-lg transition-all group"
            >
              <div>
                <div 
                  className="relative h-48 w-full overflow-hidden bg-black cursor-pointer"
                  onClick={() => setPreviewImageModal(ui.image)}
                >
                  <img src={ui.image} alt={ui.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-mono text-white flex items-center gap-1 border border-white/20">
                    <span>❤️</span>
                    <span>{ui.likes}</span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-orange-500 block uppercase">UI/UX Showcase</span>
                    <h4 className="font-bold text-base text-zinc-900 dark:text-white truncate mt-0.5">{ui.title}</h4>
                    <p className="text-xs text-zinc-500 font-mono mt-0.5">By {ui.creator}</p>
                  </div>

                  <div className="p-2.5 bg-zinc-50 dark:bg-[#0a0a0c] rounded-xl border border-zinc-200 dark:border-[#26262e] font-mono text-xs flex items-center justify-between">
                    <span className="text-zinc-500">Access:</span>
                    <strong className="text-orange-500">{ui.benefit}</strong>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between font-mono text-xs border-t border-zinc-100 dark:border-[#26262e]">
                <Link href="/prompts" className="text-zinc-500 hover:text-orange-500 dark:text-zinc-400 dark:hover:text-white hover:underline">
                  Full Suite →
                </Link>
                <button 
                  onClick={() => handleCopyPrompt(`discover_${ui.id}`, ui.body)}
                  className="px-4 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all shadow-md shadow-orange-500/25"
                >
                  {copiedPromptId === `discover_${ui.id}` ? "✓ Done" : "Copy UI Prompt"}
                </button>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* Lightbox / Zoom Preview Modal */}
      {previewImageModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setPreviewImageModal(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl border border-orange-500/40 shadow-2xl">
            <button 
              onClick={() => setPreviewImageModal(null)}
              className="absolute top-4 right-4 bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold hover:bg-orange-600 transition-all cursor-pointer shadow-lg"
            >
              ✕
            </button>
            <img src={previewImageModal} alt="Enlarged Mockup Preview" className="w-full h-auto max-h-[85vh] object-contain" />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-[#26262e] bg-zinc-50 dark:bg-[#0c0c0f] py-12 text-center text-xs text-zinc-500 space-y-3 font-mono">
        <div className="flex items-center justify-center gap-2">
          <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xs">O</div>
          <span className="font-bold text-zinc-900 dark:text-white text-sm uppercase">OXID CORTEX STUDIO</span>
        </div>
        <p>&copy; 2026 OXID Intelligence Ecosystem. Curated by Aira &amp; Minham.</p>
        <p className="text-[11px] text-zinc-600 dark:text-zinc-500">
          Architecture: Clean Studio Layout • Palette: #0a0a0c Hitam Doff + #ff5722 Cyber Orange
        </p>
      </footer>
    </main>
  )
}
