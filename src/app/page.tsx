'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import SearchModal from '@/components/SearchModal'
import ModelComparisonArenaModal from '@/components/ModelComparisonArenaModal'
import CommunitySubmitModal from '@/components/CommunitySubmitModal'
import FlueHeroCanvas from '@/components/FlueHeroCanvas'
import StudioNavbar from '@/components/StudioNavbar'

export default function Home() {
  const [darkMode, setDarkMode] = useState(true)
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isArenaOpen, setIsArenaOpen] = useState(false)
  const [isSubmitOpen, setIsSubmitOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [unreadNotifications, setUnreadNotifications] = useState(0)
  const [notificationsList, setNotificationsList] = useState<any[]>([])
  const [liveIngestedThreads, setLiveIngestedThreads] = useState<any[]>([])
  
  // Interactive Bento / Workflow States
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0)
  const [devicePreviewMode, setDevicePreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false)
  const [likedCards, setLikedCards] = useState<Record<string, number>>({
    'lumiere': 142,
    'prisma': 289,
    'vesper': 310,
    'stride': 245,
    'aistudio': 412,
    'dantora': 198,
    'clarix': 167,
    'kyoto': 523
  })

  useEffect(() => {
    fetch('/api/notifications')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.notifications) {
          setNotificationsList(data.notifications)
          const unreadCount = data.notifications.filter((n: any) => n.unread).length
          setUnreadNotifications(unreadCount > 0 ? unreadCount : 1)
        }
      })
      .catch(err => console.error("Error loading notifications:", err))

    fetch('/api/scrape')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setLiveIngestedThreads(data.data.slice(0, 3))
        }
      })
      .catch(err => console.error("Error loading live threads:", err))
  }, [])

  // Keyboard shortcut listener (Ctrl+K or '/' to open search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsSearchOpen(prev => !prev)
      } else if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

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
      setCopiedPromptId(id)
      setTimeout(() => setCopiedPromptId(null), 2500)
    }
  }

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setLikedCards(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }))
  }

  // Curated GetLayers-Style Immersive Templates with Authentic Images and Categories
  const templateCatalog = [
    {
      id: "lumiere",
      title: "Lumière",
      category: "E-commerce",
      badge: "New",
      image: "https://storage.getlayers.ai/templates/lumi-re-9893947dfd.webp",
      prompt: `Create a luxury high-end editorial fragrance e-commerce store with minimal Swiss typography, generous whitespace, smooth scroll-driven product reveal, and dark matte aesthetic. Built in Next.js 14 and Tailwind CSS.`
    },
    {
      id: "prisma",
      title: "Prisma",
      category: "AI / Tech",
      badge: "New",
      image: "https://storage.getlayers.ai/templates/prisma-574345227d.webp",
      prompt: `Design an immersive developer workspace for autonomous coding agents with neon telemetry charts, dark glassmorphism backplate, and high-performance latency monitors.`
    },
    {
      id: "vesper",
      title: "Vesper",
      category: "SaaS",
      badge: "Popular",
      image: "https://storage.getlayers.ai/templates/vesper-1eb7223b93.webp",
      prompt: `Build a modern B2B analytics platform dashboard featuring asymmetric bento grids, real-time candlestick feeds, and dark obsidian aesthetic.`
    },
    {
      id: "stride",
      title: "Stride",
      category: "Fintech",
      badge: "Hot",
      image: "https://storage.getlayers.ai/templates/stride.webp",
      prompt: `Institutional wealth management portal with clean border-1px lines, multi-currency portfolio breakdown, and micro-interactions.`
    },
    {
      id: "aistudio",
      title: "AI Studio",
      category: "AI / Tech",
      badge: "Frontier",
      image: "https://storage.getlayers.ai/templates/ai-studio-419b674eb8.webp",
      prompt: `Autonomous AI multi-agent orchestration console with live terminal logs, DAG pipeline visualizer, and token consumption analytics.`
    },
    {
      id: "dantora",
      title: "Dantora",
      category: "Health / Science",
      badge: "Featured",
      image: "https://storage.getlayers.ai/templates/dantora-f9c3ffb5f0.webp",
      prompt: `Biotechnology & genomic data explorer web application with clean scientific grid, high contrast data tables, and WCAG AAA compliance.`
    },
    {
      id: "clarix",
      title: "Clarix",
      category: "AI / Tech",
      badge: "New",
      image: "https://storage.getlayers.ai/templates/clarix-1da2281a4b.webp",
      prompt: `Full-bleed minimal developer documentation and API playground portal with instant search, syntax highlighting, and copyable bash snippets.`
    },
    {
      id: "kyoto",
      title: "Kyoto Villa",
      category: "Brutalist 3D",
      badge: "Trending",
      image: "https://storage.getlayers.ai/templates/house-22508188f8.webp",
      prompt: `Ultra-minimalist raw concrete pavilion villa nestled inside misty autumn bamboo forest in Kyoto, cinematic volumetric lighting, raytraced reflections on wet stone pavement, brutalist architectural composition, 8k resolution, photorealistic shot on Hasselblad X2D 100C --ar 16:9 --style raw`
    }
  ]

  // Free SVG Category Icon Helper
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'E-commerce':
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        )
      case 'AI / Tech':
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        )
      case 'SaaS':
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        )
      case 'Fintech':
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        )
      case 'Health / Science':
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        )
      case 'Brutalist 3D':
      default:
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        )
    }
  }

  // Workflow steps
  const workflowSteps = [
    {
      step: "01",
      title: "Find it",
      description: "Search 100+ production-ready prompts, UI templates, and developer grants curated without generic AI slop.",
      preview: {
        title: "Prompt Search Engine (/) ",
        badge: "0.2s Response",
        meta: "Indexed 100+ templates with verified syntax & clean tokens."
      }
    },
    {
      step: "02",
      title: "Make it yours",
      description: "Customize design tokens, typography, dark obsidian palettes, and tailwind component classes in seconds.",
      preview: {
        title: "Bespoke Token Crafting",
        badge: "Tailwind v3.4",
        meta: "bg-matte-black, hairline borders, zero-overhead CSS motion."
      }
    },
    {
      step: "03",
      title: "Ship it",
      description: "Deploy instantly to Vercel and Cloudflare Edge with 100 PageSpeed scores, zero DNS lag, and auto SSL.",
      preview: {
        title: "Global Edge Deployment",
        badge: "100 PageSpeed",
        meta: "cortex.oxidlabs.my.id verified live across 250+ PoPs worldwide."
      }
    },
    {
      step: "04",
      title: "Or let your agent do it all",
      description: "Provide the prompt directly to Claude Code, Hermes, Cursor, or Windsurf. Everything is structured for agent reading.",
      preview: {
        title: "Autonomous Agent Harness",
        badge: "Claude / Codex Ready",
        meta: "Pre-configured .claude/ hooks, skills, and CLI verify script."
      }
    }
  ]

  // FAQ items
  const faqList = [
    {
      q: "Can I use these prompts and templates for commercial client projects?",
      a: "Yes, 100%. Everything in the OXID Cortex library is open and royalty-free. You can use the prompts, components, and code directly in personal projects, agency client builds, or commercial SaaS products."
    },
    {
      q: "Which AI coding assistants and models work best with these prompts?",
      a: "The prompts are engineered and benchmarked against Claude 3.7 Sonnet, Claude Code CLI, Cursor, Windsurf, v0 by Vercel, and OpenAI o3-mini. They provide exact specifications, color tokens, and layout constraints so the AI generates production code on the first attempt."
    },
    {
      q: "How do you ensure these designs don't look like generic 'AI slop'?",
      a: "We follow strict Anti-AI Slop design doctrines: no clunky purple gradients, no meaningless floating abstract shapes, no generic placeholder copy. Everything uses real typography hierarchy, 1px hairline borders, generous negative space, and real engineering metrics."
    },
    {
      q: "Is there real source code available for full-stack deployment?",
      a: "Yes! In addition to visual prompts, each template includes Next.js App Router architecture, Supabase schema scripts, Tailwind configs, and Cloudflare edge configurations ready to run locally with `npm run build`."
    }
  ]

  return (
    <main className="min-h-screen bg-[#000000] text-zinc-100 font-sans antialiased selection:bg-orange-500 selection:text-white transition-colors duration-200">
      
      {/* ======================================================== */}
      {/* 1. UNIFIED STUDIO NAVBAR                                 */}
      {/* ======================================================== */}
      <StudioNavbar activeRoute="home" />

      {/* ======================================================== */}
      {/* 2. GETLAYERS CINEMATIC HERO SECTION (COMPACT STAGE BOX)  */}
      {/* ======================================================== */}
      <section className="hero-region max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-6 sm:pb-8">
        <div className="hero-stage relative rounded-[24px] sm:rounded-[32px] border border-white/[0.08] overflow-hidden min-h-[300px] sm:min-h-[330px] flex items-center justify-center p-6 sm:p-9 text-center bg-[#050505] shadow-2xl">
          
          {/* Flue Plain WebGL2 Canvas Background */}
          <FlueHeroCanvas />

          {/* Hero Content Box (Overlaid Above Canvas) */}
          <div className="hero-content relative z-10 max-w-3xl mx-auto flex flex-col items-center pointer-events-auto">
            
            {/* Hero Display Headline (Opsi C: High-Signal AI Prompts & Modern Web Blueprints) */}
            <h1 
              className="hero-title text-[34px] sm:text-[46px] lg:text-[52px] font-[300] tracking-[-1.28px] leading-[1.08] max-w-3xl mx-auto"
              style={{
                background: 'linear-gradient(122deg, rgb(245, 245, 245) 0%, rgb(245, 245, 245) 18%, rgb(166, 166, 166) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: 'var(--font-sans, system-ui, sans-serif)'
              }}
            >
              High-Signal AI Prompts &amp; Modern Web Blueprints, <br className="sm:hidden" aria-hidden="true" />made clean
            </h1>

            {/* Subtitle Paragraph */}
            <p 
              className="hero-subtitle mt-3 max-w-lg mx-auto text-pretty text-[14.5px] sm:text-[15.5px] leading-relaxed font-sans"
              style={{ color: 'rgb(166, 166, 166)' }}
            >
              Salin master prompt terverifikasi, klaim kuota LLM gratis tanpa biaya langganan, dan bangun arsitektur web modern bebas slop.
            </p>

            {/* Hero CTA Button: High Opacity + Rotating Silver Border Beam */}
            <div className="mt-6 flex items-center justify-center">
              <Link 
                href="/templates" 
                className="silver-beam-wrapper !rounded-full group inline-block p-[1.5px]"
              >
                <div 
                  className="silver-beam-inner !rounded-full !bg-[#121216]/95 px-6 py-2.5 flex items-center gap-3 border border-white/20 shadow-xl"
                >
                  <span className="font-sans font-semibold text-[14px] text-white tracking-tight">
                    Jelajahi Library &amp; Bansos AI
                  </span>
                  <span className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M16.4043 15.75C16.4488 15.7501 16.4923 15.7633 16.5293 15.7881C16.5664 15.8129 16.5953 15.8484 16.6123 15.8896L16.9502 17.0732C17.1004 17.6058 17.3851 18.0911 17.7764 18.4824C18.1676 18.8736 18.653 19.1574 19.1855 19.3076L20.3691 19.6465C20.4142 19.6594 20.4541 19.6863 20.4824 19.7236C20.5108 19.7612 20.5263 19.8074 20.5264 19.8545C20.5264 19.9017 20.5108 19.9477 20.4824 19.9854C20.454 20.0229 20.4144 20.0505 20.3691 20.0635L19.1855 20.4014C18.6529 20.5516 18.1677 20.8362 17.7764 21.2275C17.3851 21.6189 17.1004 22.1041 16.9502 22.6367L16.6123 23.8193C16.5994 23.8648 16.5718 23.9051 16.5342 23.9336C16.4967 23.9618 16.4512 23.9774 16.4043 23.9775C16.3572 23.9775 16.311 23.9619 16.2734 23.9336C16.2358 23.9051 16.2082 23.8648 16.1953 23.8193L15.8574 22.6367C15.7073 22.1041 15.4226 21.6189 15.0312 21.2275C14.6399 20.8362 14.1547 20.5516 13.6221 20.4014L12.4395 20.0635C12.394 20.0506 12.3537 20.023 12.3252 19.9854C12.2968 19.9477 12.2812 19.9017 12.2812 19.8545C12.2813 19.8074 12.2968 19.7612 12.3252 19.7236C12.3536 19.6861 12.3941 19.6593 12.4395 19.6465L13.6221 19.3076C14.1546 19.1574 14.64 18.8736 15.0312 18.4824C15.4225 18.0911 15.7072 17.6058 15.8574 1.32324L16.1953 0.139648C16.2123 0.0983879 16.2412 0.0629391 16.2783 0.0380859C16.3155 0.0132357 16.3596 0 16.4043 0Z" fill="currentColor" />
                      <path d="M8.53516 4.875C8.61253 4.875 8.68866 4.89833 8.75293 4.94141C8.81701 4.98447 8.86714 5.04576 8.89648 5.11719L9.48047 7.16211C9.74017 8.08328 10.2324 8.92285 10.9092 9.59961C11.5858 10.2762 12.4248 10.7676 13.3457 11.0273L15.3916 11.6123C15.4701 11.6346 15.5396 11.6819 15.5889 11.7471C15.638 11.8122 15.6641 11.892 15.6641 11.9736C15.664 12.055 15.6379 12.1342 15.5889 12.1992C15.5396 12.2644 15.4701 12.3117 15.3916 12.334L13.3457 12.9189C12.4248 13.1787 11.5858 13.6701 10.9092 14.3467C10.2324 15.0234 9.74017 15.863 9.48047 16.7842L8.89648 18.8301C8.87417 18.9084 8.82666 18.9772 8.76172 19.0264C8.69658 19.0756 8.6168 19.1025 8.53516 19.1025C8.45366 19.1025 8.37462 19.0755 8.30957 19.0264C8.24458 18.9773 8.19716 18.9084 8.1748 18.8301L7.58984 16.7842C7.33014 15.863 6.83789 15.0234 6.16113 14.3467C5.48446 13.6701 4.64557 13.1786 3.72461 12.9189L1.67871 12.334C1.6003 12.3117 1.53158 12.2643 1.48242 12.1992C1.43328 12.1342 1.40633 12.0551 1.40625 11.9736C1.40625 11.892 1.4332 11.8122 1.48242 11.7471C1.53158 11.6821 1.60034 11.6346 1.67871 11.6123L3.72461 11.0273C4.6456 10.7677 5.48446 10.2762 6.16113 9.59961C6.83789 8.92285 7.33014 8.08328 7.58984 7.16211L8.1748 5.11719C8.2042 5.04562 8.25409 4.98449 8.31836 4.94141C8.38257 4.89838 8.45787 4.87503 8.53516 4.875Z" fill="currentColor" />
                      <path d="M16.4043 0C16.4488 9.07153e-05 16.4923 0.0133377 16.5293 0.0380859C16.5664 0.0629351 16.5953 0.0983965 16.6123 0.139648L16.9502 1.32324C17.1004 1.85582 17.3851 2.34114 17.7764 2.73242C18.1676 3.12365 18.653 3.40742 19.1855 3.55762L20.3691 3.89648C20.4142 3.90941 20.4541 3.93625 20.4824 3.97363C20.5108 4.01123 20.5263 4.05738 20.5264 4.10449C20.5264 4.15167 20.5108 4.1977 20.4824 4.23535C20.454 4.27291 20.4144 4.30054 20.3691 4.31348L19.1855 4.65137C18.6529 4.80156 18.1677 5.08623 17.7764 5.47754C17.3851 5.86887 17.1004 6.35408 16.9502 6.88672L16.6123 8.06934C16.5994 8.11476 16.5718 8.15513 16.5342 8.18359C16.4967 8.2118 16.4512 8.22744 16.4043 8.22754C16.3572 8.22754 16.311 8.21191 16.2734 8.18359C16.2358 8.15513 16.2082 8.11476 16.1953 8.06934L15.8574 6.88672C15.7073 6.35407 15.4226 5.86888 15.0312 5.47754C14.6399 5.08622 14.1547 4.80156 13.6221 4.65137L12.4395 4.31348C12.394 4.30058 12.3537 4.27302 12.3252 4.23535C12.2968 4.1977 12.2812 4.15166 12.2812 4.10449C12.2813 4.05738 12.2968 4.01123 12.3252 3.97363C12.3536 3.93609 12.3941 3.90935 12.4395 3.89648L13.6221 3.55762C14.1546 3.40743 14.64 3.12365 15.0312 2.73242C15.4225 2.34114 15.7072 1.85582 15.8574 1.32324L16.1953 0.139648C16.2123 0.0983879 16.2412 0.0629391 16.2783 0.0380859C16.3155 0.0132357 16.3596 0 16.4043 0Z" fill="currentColor" />
                    </svg>
                  </span>
                </div>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. GETLAYERS IMMERSIVE TEMPLATES GRID & OVERFLOW MASK   */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
        
        {/* Section Header with Left Content and Right Link (NO Tanya AI Button) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.08] pb-5 relative">
          
          {/* Left Title & Eyebrow */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block">
              Kurasi Mingguan Terverifikasi
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight">
              Immersive website prompts &amp; templates
            </h2>
          </div>

          {/* Right Link */}
          <Link 
            href="/templates" 
            className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors self-start md:self-end"
          >
            <span>Semua Template &amp; Prompt</span>
            <span>→</span>
          </Link>
        </div>

        {/* 4-Column Card Grid Container with Relative Overflow Mask */}
        <div className="relative">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {templateCatalog.map(tpl => (
              <article 
                key={tpl.id}
                onClick={() => handleCopyPrompt(tpl.id, tpl.prompt)}
                className="silver-beam-wrapper group cursor-pointer flex flex-col justify-between !rounded-[14px]"
              >
                <div className="silver-beam-inner flex flex-col justify-between !rounded-[13px] bg-[#0c0c0e]">
                  {/* Aspect Ratio aspect-[960/684] Media Container */}
                  <div className="relative aspect-[960/684] w-full overflow-hidden bg-zinc-950">
                    <img 
                      src={tpl.image} 
                      alt={tpl.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                    {/* Badges on Top Left (New Pill + Free SVG Category Icon Badge) */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      {tpl.badge && (
                        <span className="px-2 py-0.5 rounded-full text-[9.5px] font-mono font-bold bg-white text-black shadow">
                          {tpl.badge}
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-full text-[9.5px] font-mono font-semibold bg-white/[0.12] text-zinc-200 backdrop-blur-md border border-white/10 flex items-center gap-1">
                        {getCategoryIcon(tpl.category)}
                        <span>{tpl.category}</span>
                      </span>
                    </div>

                    {/* Like Button on Top Right */}
                    <button 
                      onClick={(e) => handleLike(tpl.id, e)}
                      className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/60 hover:bg-black/90 text-[10px] font-mono text-zinc-300 backdrop-blur-md border border-white/10 flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-3 h-3 text-red-400" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 13.6S2.4 9.9 2.4 6.2A3 3 0 0 1 8 4.7 3 3 0 0 1 13.6 6.2C13.6 9.9 8 13.6 8 13.6Z" />
                      </svg>
                      <span>{likedCards[tpl.id] || 150}</span>
                    </button>

                    {/* Copy Prompt Hover Overlay Pill */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                      <span className="px-3.5 py-1.5 rounded-full bg-white text-black font-mono text-xs font-bold shadow-xl">
                        {copiedPromptId === tpl.id ? "✓ Prompt Copied!" : "Copy Prompt"}
                      </span>
                    </div>
                  </div>

                  {/* Card Meta Footer (GetLayers Exact Typography) */}
                  <div className="p-3.5 flex items-center justify-between border-t border-white/[0.06] font-mono text-xs">
                    <span className="font-sans font-medium text-[15px] text-white group-hover:text-orange-400 transition-colors">
                      {tpl.title}
                    </span>
                    <span className="text-[11.5px] text-zinc-500 font-mono">
                      {tpl.category}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Iconic GetLayers Gradient Fade-Out & Floating Capsule CTA */}
          <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-[#000000] via-[#000000]/90 to-transparent flex items-end justify-center pb-2 pointer-events-none">
            <Link 
              href="/templates" 
              className="pointer-events-auto px-6 py-3 rounded-full bg-white/[0.08] hover:bg-white text-white hover:text-black border border-white/[0.2] text-xs font-mono font-bold transition-all shadow-2xl backdrop-blur-xl flex items-center gap-2 group"
            >
              <span>Explore 100+ Templates & Prompts</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. GETLAYERS TECHNICAL PROOF BENTO GRID                  */}
      {/* "Fast, findable, and yours to rebuild"                   */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-8">
        
        <div className="space-y-1">
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block">
            Before you ask
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight">
            Fast, findable, and yours to rebuild
          </h2>
        </div>

        {/* Bento Grid Layout (GetLayers Style) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Bento 1: Optimized for Performance (7 Cols) */}
          <div className="silver-beam-wrapper md:col-span-7 !rounded-3xl p-[1px]">
            <div className="silver-beam-inner !rounded-[23px] bg-[#0c0c0e] p-6 sm:p-8 space-y-6 flex flex-col justify-between h-full">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Optimized for performance</h3>
                <p className="text-xs font-mono text-zinc-400">
                  Google PageSpeed Insights · median scores across every template & deploy edge
                </p>
              </div>

              {/* Score Metrics Comparison */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center space-y-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">Mobile</span>
                  <strong className="text-3xl font-mono font-bold text-emerald-400 block">98</strong>
                  <span className="text-[9px] text-zinc-500 font-mono">Slow 4G Median</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center space-y-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">Desktop</span>
                  <strong className="text-3xl font-mono font-bold text-emerald-400 block">100</strong>
                  <span className="text-[9px] text-zinc-500 font-mono">Lighthouse Max</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center space-y-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">Access</span>
                  <strong className="text-3xl font-mono font-bold text-emerald-400 block">100</strong>
                  <span className="text-[9px] text-zinc-500 font-mono">WCAG AAA</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center space-y-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">Best Pract</span>
                  <strong className="text-3xl font-mono font-bold text-emerald-400 block">100</strong>
                  <span className="text-[9px] text-zinc-500 font-mono">Zero Errors</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 flex items-center gap-2">
                <span>✓</span>
                <span>Compiled locally on host with zero build errors & verified on Vercel Edge.</span>
              </div>
            </div>
          </div>

          {/* Bento 2: 100 SEO & Security (5 Cols) */}
          <div className="silver-beam-wrapper md:col-span-5 !rounded-3xl p-[1px]">
            <div className="silver-beam-inner !rounded-[23px] bg-[#0c0c0e] p-6 sm:p-8 space-y-5 flex flex-col justify-between h-full">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white">100 SEO & Security</h3>
                <p className="text-xs font-mono text-zinc-400">Out of the box on every single deploy</p>
              </div>

              {/* Checklist Chips */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-zinc-300">
                {['sitemap.xml', 'robots.txt', 'canonical URLs', 'X-Frame-Options', 'X-Content-Type', 'JSON-LD Schema', 'Open Graph', 'Twitter Cards', 'Permissions Policy', 'Semantic HTML'].map(item => (
                  <div key={item} className="flex items-center gap-1.5 p-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-emerald-400">✓</span>
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-[11px] font-mono text-zinc-500">
                Hardened with HTTP security headers & zero secret leakage protocols.
              </div>
            </div>
          </div>

          {/* Bento 3: Designed for Every Screen (5 Cols) */}
          <div className="silver-beam-wrapper md:col-span-5 !rounded-3xl p-[1px]">
            <div className="silver-beam-inner !rounded-[23px] bg-[#0c0c0e] p-6 sm:p-8 space-y-5 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white">Designed for every screen</h3>
                  <p className="text-xs font-mono text-zinc-400">Fluid responsive viewports</p>
                </div>

                {/* Viewport Switcher */}
                <div className="flex items-center p-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono">
                  {(['desktop', 'tablet', 'mobile'] as const).map(mode => (
                    <button
                      key={mode}
                      onClick={() => setDevicePreviewMode(mode)}
                      className={`px-2.5 py-1 rounded-full capitalize cursor-pointer transition-all ${devicePreviewMode === mode ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-white'}`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Device Frame Simulation */}
              <div className="p-4 rounded-2xl bg-black border border-white/[0.08] flex items-center justify-center min-h-[160px]">
                <div className={`transition-all duration-300 rounded-xl border border-white/[0.15] bg-[#121216] p-3 text-center space-y-2 ${
                  devicePreviewMode === 'desktop' ? 'w-full' : devicePreviewMode === 'tablet' ? 'w-3/4' : 'w-1/2'
                }`}>
                  <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500 border-b border-white/[0.06] pb-1">
                    <span>OXID CORTEX</span>
                    <span>{devicePreviewMode === 'desktop' ? '1440px' : devicePreviewMode === 'tablet' ? '768px' : '390px'}</span>
                  </div>
                  <div className="h-2 w-2/3 bg-white/20 rounded mx-auto"></div>
                  <div className="h-1.5 w-1/2 bg-white/10 rounded mx-auto"></div>
                </div>
              </div>

              <p className="text-[11px] font-mono text-zinc-500">
                No horizontal scroll leaks, mobile navigation drawer, and bottom floating dock on phones.
              </p>
            </div>
          </div>

          {/* Bento 4: Source code with AI orchestration (7 Cols) */}
          <div className="silver-beam-wrapper md:col-span-7 !rounded-3xl p-[1px]">
            <div className="silver-beam-inner !rounded-[23px] bg-[#0c0c0e] p-6 sm:p-8 space-y-5 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-orange-400 font-bold block">Full Stack</span>
                  <h3 className="text-xl font-bold text-white">Source code with AI orchestration</h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-white/[0.08] text-xs font-mono text-zinc-300">Next.js 14 App Router</span>
              </div>

              {/* Terminal File Tree (GetLayers Style) */}
              <div className="p-4 rounded-2xl bg-black border border-white/[0.08] font-mono text-xs space-y-1.5 max-h-48 overflow-y-auto text-zinc-300">
                <div className="text-zinc-500">cortex-studio/</div>
                <div className="pl-4 text-orange-400">├── .claude/ <span className="text-zinc-500 text-[10px]">(agent harness & hooks)</span></div>
                <div className="pl-4 text-purple-400">├── skills/ <span className="text-zinc-500 text-[10px]">(16 design & motion skills)</span></div>
                <div className="pl-8 text-zinc-400">├── antislop-ui/</div>
                <div className="pl-8 text-zinc-400">├── vercel-react-best-practices/</div>
                <div className="pl-8 text-zinc-400">└── motion-physics/</div>
                <div className="pl-4 text-emerald-400">├── scripts/ <span className="text-zinc-500 text-[10px]">(verify.sh & scraper cron)</span></div>
                <div className="pl-4 text-blue-400">├── supabase/ <span className="text-zinc-500 text-[10px]">(schema.sql & RLS rules)</span></div>
                <div className="pl-4 text-zinc-300">└── src/app/ <span className="text-zinc-500 text-[10px]">(page.tsx, layout.tsx, api/)</span></div>
              </div>

              <p className="text-[11px] font-mono text-zinc-400">
                The exact rules and architecture your coding agent reads before it touches anything.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. INTERACTIVE VERTICAL WORKFLOW (IDEA TO INTERFACE)     */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-10 border-t border-white/[0.08]">
        
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
            Workflow Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight">
            One prompt from idea to interface
          </h2>
        </div>

        {/* 2-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: 4 Stepper Cards */}
          <div className="lg:col-span-5 space-y-3">
            {workflowSteps.map((ws, idx) => (
              <div 
                key={ws.step}
                onClick={() => setActiveWorkflowStep(idx)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  activeWorkflowStep === idx 
                    ? 'bg-[#0c0c0e] border-white/30 shadow-lg' 
                    : 'bg-transparent border-white/[0.04] hover:border-white/[0.1] opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className={`font-mono text-xs font-bold ${activeWorkflowStep === idx ? 'text-orange-400' : 'text-zinc-500'}`}>
                    {ws.step}
                  </span>
                  <h4 className="text-base font-bold text-white">{ws.title}</h4>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans pl-7">
                  {ws.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column: Dynamic Preview Card */}
          <div className="lg:col-span-7 bg-[#0c0c0e] border border-white/[0.1] rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-mono text-xs font-bold text-white uppercase">
                  {workflowSteps[activeWorkflowStep].preview.title}
                </span>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 font-bold">
                {workflowSteps[activeWorkflowStep].preview.badge}
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-black border border-white/[0.06] font-mono text-xs space-y-3">
              <div className="text-zinc-500 text-[10px]">EXECUTION PAYLOAD:</div>
              <p className="text-zinc-200 text-sm leading-relaxed">
                {workflowSteps[activeWorkflowStep].preview.meta}
              </p>
              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-zinc-400">
                <span>Deterministic Zero-Slop</span>
                <span className="text-emerald-400">Exit Code 0 ✓</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-zinc-500 pt-2">
              <span>Step {activeWorkflowStep + 1} of 4</span>
              <button 
                onClick={() => setActiveWorkflowStep((prev) => (prev + 1) % workflowSteps.length)}
                className="text-white hover:text-orange-400 font-bold transition-colors cursor-pointer"
              >
                Next Step →
              </button>
            </div>
          </div>

        </div>

      </section>

      {/* ======================================================== */}
      {/* 6. REAL LIVE INGESTED INTELLIGENCE (SCRAPED THREADS & ART)*/}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6 border-t border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/[0.08] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">
                LIVE INGESTED INTELLIGENCE RADAR
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight">
              Community Radar & Generative Art
            </h2>
            <p className="text-xs text-zinc-400 font-mono">
              Real high-signal data scraped from public developer feeds with reproduction prompts.
            </p>
          </div>
          <Link 
            href="/intel"
            className="text-xs font-mono text-orange-400 hover:text-orange-300 flex items-center gap-1 font-bold"
          >
            <span>Buka Semua Intel ({liveIngestedThreads.length})</span>
            <span>→</span>
          </Link>
        </div>

        {liveIngestedThreads.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {liveIngestedThreads.map((th: any) => (
              <div 
                key={th.id}
                className="bg-[#0c0c0e] border border-white/[0.08] hover:border-white/[0.2] rounded-2xl p-5 flex flex-col justify-between space-y-4 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img 
                        src={th.author_avatar || "https://avatars.githubusercontent.com/u/241138?v=4"} 
                        alt={th.author_name} 
                        className="w-8 h-8 rounded-full border border-white/10 object-cover" 
                      />
                      <div>
                        <h4 className="font-bold text-xs text-white line-clamp-1">{th.author_name}</h4>
                        <span className="text-[10px] text-zinc-500 font-mono">@{th.author_handle}</span>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      LIVE
                    </span>
                  </div>

                  {th.image_url && (
                    <div className="relative h-40 w-full rounded-xl overflow-hidden border border-white/10 bg-black/60">
                      <img src={th.image_url} alt={th.content} className="w-full h-full object-cover" />
                      {th.model_used && (
                        <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-mono text-purple-400 font-bold border border-white/10">
                          {th.model_used}
                        </div>
                      )}
                    </div>
                  )}

                  <p className="text-xs text-zinc-300 font-sans leading-relaxed line-clamp-3">
                    {th.content}
                  </p>

                  <div className="p-2.5 bg-white/[0.02] border border-white/[0.06] rounded-xl text-[11px] font-mono text-zinc-400">
                    <strong className="text-orange-400">Insight:</strong> {th.cortex_insight}
                  </div>
                </div>

                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-zinc-500">{th.post_date || th.scraped_at}</span>
                  <div className="flex items-center gap-2">
                    {th.prompt && (
                      <button 
                        onClick={() => handleCopyPrompt(th.id, th.prompt)}
                        className="text-orange-400 hover:underline font-bold cursor-pointer"
                      >
                        {copiedPromptId === th.id ? "✓ Tersalin" : "Salin Prompt"}
                      </button>
                    )}
                    {th.post_url && (
                      <a href={th.post_url} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white">
                        ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-[#0c0c0e] border border-white/[0.08] text-center font-mono text-xs text-zinc-500">
            Sedang menghubungkan ke feed scraping riil...
          </div>
        )}
      </section>

      {/* ======================================================== */}
      {/* 7. GETLAYERS ACCORDION FAQ SECTION                       */}
      {/* ======================================================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-8 border-t border-white/[0.08]">
        <div className="text-center space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">Frequently Asked Questions</span>
          <h2 className="text-3xl font-sans font-bold text-white tracking-tight">Everything you need to know</h2>
        </div>

        <div className="space-y-3">
          {faqList.map((faq, idx) => (
            <div 
              key={faq.q}
              className="rounded-2xl border border-white/[0.08] bg-[#0c0c0e] overflow-hidden transition-all"
            >
              <button 
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between text-sm font-semibold text-white cursor-pointer hover:bg-white/[0.02]"
              >
                <span>{faq.q}</span>
                <span className="font-mono text-zinc-400 text-base">{openFaqIndex === idx ? '−' : '+'}</span>
              </button>
              {openFaqIndex === idx && (
                <div className="px-5 pb-5 pt-1 text-xs text-zinc-400 font-sans leading-relaxed border-t border-white/[0.04]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. GETLAYERS NEWSLETTER & MASSIVE WATERMARK FOOTER       */}
      {/* ======================================================== */}
      <footer className="relative border-t border-white/[0.08] bg-[#000000] overflow-hidden pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          
          {/* Top Newsletter & Directory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Newsletter Column (5 Cols) */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white p-0.5 flex items-center justify-center">
                  <img src="/images/oxid-logo.png" alt="OXID" className="w-full h-full object-contain" />
                </div>
                <span className="font-mono text-sm font-bold text-white">getlayers.ai / oxid</span>
              </div>
              <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
                Stay updated with weekly prompt drops, free AI grants, and zero-slop UI components delivered straight to your inbox.
              </p>
              
              <form 
                onSubmit={(e) => {
                  e.preventDefault()
                  if (newsletterEmail) setNewsletterSubscribed(true)
                }}
                className="flex items-center gap-2 max-w-sm"
              >
                <input 
                  type="email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email" 
                  required
                  className="flex-1 bg-white/[0.04] border border-white/[0.1] rounded-full px-4 py-2 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-white/30"
                />
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-full bg-white text-black font-mono text-xs font-bold hover:bg-zinc-200 transition-all cursor-pointer whitespace-nowrap"
                >
                  {newsletterSubscribed ? "✓ Subscribed" : "Subscribe"}
                </button>
              </form>
            </div>

            {/* Links Columns (7 Cols) */}
            <div className="md:col-span-7 grid grid-cols-3 gap-6 font-mono text-xs">
              <div className="space-y-3">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block">Library</span>
                <ul className="space-y-2 text-zinc-400">
                  <li><Link href="/templates" className="hover:text-white transition-colors">Templates</Link></li>
                  <li><Link href="/prompts" className="hover:text-white transition-colors">Prompt Lab</Link></li>
                  <li><Link href="/grants" className="hover:text-white transition-colors">Bansos AI</Link></li>
                </ul>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block">Ecosystem</span>
                <ul className="space-y-2 text-zinc-400">
                  <li><Link href="/tools" className="hover:text-white transition-colors">Tools Radar</Link></li>
                  <li><Link href="/intel" className="hover:text-white transition-colors">Live Intel</Link></li>
                  <li><a href="https://github.com/ilhammu29/oxid-cortex-studio" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub Repo ↗</a></li>
                </ul>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block">Legal &amp; Host</span>
                <ul className="space-y-2 text-zinc-400">
                  <li><span className="text-zinc-500">Cloudflare Edge</span></li>
                  <li><span className="text-zinc-500">Vercel Deploy</span></li>
                  <li><span className="text-emerald-400">Status: 100% Online</span></li>
                </ul>
              </div>
            </div>

          </div>

          {/* Bottom Copyright & Massive Watermark */}
          <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-500 gap-4">
            <div>
              © 2026 OXID LABS. All rights reserved. Built for autonomous engineers.
            </div>
            <div className="flex items-center gap-4">
              <span>cortex.oxidlabs.my.id</span>
              <span>•</span>
              <span>promptlabs-oxid.vercel.app</span>
            </div>
          </div>

        </div>

        {/* Huge Background Watermark */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[14vw] font-black font-sans text-white/[0.02] select-none pointer-events-none whitespace-nowrap leading-none tracking-tighter">
          GETLAYERS
        </div>
      </footer>

      {/* Global Modals */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <ModelComparisonArenaModal isOpen={isArenaOpen} onClose={() => setIsArenaOpen(false)} />
      <CommunitySubmitModal isOpen={isSubmitOpen} onClose={() => setIsSubmitOpen(false)} />

    </main>
  )
}
