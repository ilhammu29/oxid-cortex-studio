'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import StudioNavbar from '@/components/StudioNavbar'

export default function DetailPage() {
  const params = useParams()
  const rawId = (params?.id as string) || 'lumiere'
  const id = rawId.toLowerCase()
  const [copiedPrompt, setCopiedPrompt] = useState(false)
  const [likes, setLikes] = useState<Record<string, number>>({})

  // Free SVG Category Icon Helper
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'E-commerce':
        return (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        )
      case 'AI / Tech':
        return (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        )
      case 'SaaS':
        return (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        )
      case 'Fintech':
        return (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        )
      case 'Health / Science':
        return (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        )
      case 'Brutalist 3D':
      default:
        return (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        )
    }
  }

  // Template Library Database
  const templatesDb: Record<string, any> = {
    lumiere: {
      id: "lumiere",
      title: "Lumière",
      category: "E-commerce",
      badge: "New",
      image: "https://storage.getlayers.ai/templates/lumi-re-9893947dfd.webp",
      tagline: "High-end luxury fragrance store with Swiss typography & scroll-driven motion.",
      overview: "Lumière dirancang untuk merek e-commerce mewah yang menuntut tipografi presisi tinggi, komposisi whitespace luas, dan tata letak editorial bergaya majalah Swiss. Dilengkapi dengan transisi produk berbasis interaksi scroll halus dan estetika matte gelap anti-slop.",
      prompt: `Create a luxury high-end editorial fragrance e-commerce store with minimal Swiss typography, generous whitespace, smooth scroll-driven product reveal, and dark matte aesthetic. Built in Next.js 14 and Tailwind CSS. Avoid generic gradients, use 1px hairline borders, and ensure full responsiveness.`,
      specs: [
        { label: "Arsitektur", value: "Next.js 14 (App Router / SSR)" },
        { label: "Styling", value: "Tailwind CSS v3.4 + Custom Tokens" },
        { label: "Motion", value: "Scrollcraft Stagger & CSS Physics" },
        { label: "Palet Warna", value: "#050505 (Obsidian), #F5F5F5 (Silver), #141416" },
        { label: "Kompatibilitas", value: "Claude Code, Hermes, Cursor, Windsurf" },
        { label: "PageSpeed Median", value: "100 Desktop / 98 Mobile" }
      ],
      tokens: [
        "bg-[#050505]", "text-[#f5f5f5]", "border-white/[0.08]", "font-sans", "tracking-tight", "rounded-[14px]"
      ]
    },
    prisma: {
      id: "prisma",
      title: "Prisma",
      category: "AI / Tech",
      badge: "New",
      image: "https://storage.getlayers.ai/templates/prisma-574345227d.webp",
      tagline: "Developer telemetry workspace for autonomous agents & LLM pipelines.",
      overview: "Prisma adalah blueprint interface untuk ruang kerja engineering agen AI. Memadukan panel telemetri neon kontras tinggi dengan backplate kaca gelap dan visualizer latensi responsif.",
      prompt: `Design an immersive developer workspace for autonomous coding agents with neon telemetry charts, dark glassmorphism backplate, and high-performance latency monitors. Next.js 14, Tailwind CSS, zero external UI libraries.`,
      specs: [
        { label: "Arsitektur", value: "Next.js 14 App Router" },
        { label: "Styling", value: "Tailwind CSS + Glassmorphism Tokens" },
        { label: "Telemetry", value: "Realtime WebSocket / Edge Streaming" },
        { label: "Palet Warna", value: "#08080a, #ff6600, #10b981" }
      ],
      tokens: ["bg-[#08080a]", "border-white/[0.1]", "backdrop-blur-xl", "font-mono"]
    },
    vesper: {
      id: "vesper",
      title: "Vesper",
      category: "SaaS",
      badge: "Popular",
      image: "https://storage.getlayers.ai/templates/vesper-1eb7223b93.webp",
      tagline: "Asymmetric bento grid analytics for modern B2B SaaS platforms.",
      overview: "Vesper mengusung tata letak asymmetric bento grid yang intuitif, dirancang khusus untuk menyajikan metrik keuangan, retensi pengguna, dan feed candlestick real-time secara elegan.",
      prompt: `Build a modern B2B analytics platform dashboard featuring asymmetric bento grids, real-time candlestick feeds, and dark obsidian aesthetic. Ensure high density information display without clutter.`,
      specs: [
        { label: "Arsitektur", value: "Next.js 14 + Server Components" },
        { label: "Grid System", value: "12-Column Asymmetric Bento" },
        { label: "Typography", value: "Geist Sans & JetBrains Mono" }
      ],
      tokens: ["grid-cols-12", "rounded-2xl", "bg-[#0c0c0e]"]
    },
    stride: {
      id: "stride",
      title: "Stride",
      category: "Fintech",
      badge: "Hot",
      image: "https://storage.getlayers.ai/templates/stride.webp",
      tagline: "Institutional wealth management portal with micro-interactions.",
      overview: "Stride adalah portal manajemen aset dan kekayaan institusi. Memiliki garis pembatas presisi 1px, visualisasi alokasi multi-mata uang, dan animasi transaksi staccato.",
      prompt: `Institutional wealth management portal with clean border-1px lines, multi-currency portfolio breakdown, and micro-interactions. Zero AI slop, WCAG AAA compliant.`,
      specs: [
        { label: "Arsitektur", value: "Next.js 14 + Supabase Edge" },
        { label: "Security", value: "Hardened Content-Security-Policy" },
        { label: "Compliance", value: "WCAG AAA Accessible" }
      ],
      tokens: ["border-white/[0.08]", "font-sans", "text-emerald-400"]
    },
    aistudio: {
      id: "aistudio",
      title: "AI Studio",
      category: "AI / Tech",
      badge: "Frontier",
      image: "https://storage.getlayers.ai/templates/ai-studio-419b674eb8.webp",
      tagline: "Multi-agent autonomous orchestration console & DAG visualizer.",
      overview: "AI Studio menghadirkan antarmuka orkestrator multi-agen dengan terminal log interaktif, diagram alur DAG terintegrasi, dan analitik konsumsi token yang komprehensif.",
      prompt: `Autonomous AI multi-agent orchestration console with live terminal logs, DAG pipeline visualizer, and token consumption analytics.`,
      specs: [
        { label: "Arsitektur", value: "Next.js 14 + WebWorker Pipeline" },
        { label: "Console", value: "Virtual Scroll PTY Output" }
      ],
      tokens: ["font-mono", "bg-black", "border-zinc-800"]
    },
    dantora: {
      id: "dantora",
      title: "Dantora",
      category: "Health / Science",
      badge: "Featured",
      image: "https://storage.getlayers.ai/templates/dantora-f9c3ffb5f0.webp",
      tagline: "Biotechnology & genomic data explorer with scientific typography.",
      overview: "Dantora didedikasikan untuk platform bioteknologi dan eksplorasi genomik. Menawarkan struktur data ilmiah yang tajam, kontras visual tinggi, dan penyajian data tabular yang kokoh.",
      prompt: `Biotechnology & genomic data explorer web application with clean scientific grid, high contrast data tables, and WCAG AAA compliance.`,
      specs: [
        { label: "Arsitektur", value: "Next.js 14 App Router" },
        { label: "Data Engine", value: "Vector Tabular Search" }
      ],
      tokens: ["bg-[#070709]", "font-sans", "text-sky-400"]
    },
    clarix: {
      id: "clarix",
      title: "Clarix",
      category: "AI / Tech",
      badge: "New",
      image: "https://storage.getlayers.ai/templates/clarix-1da2281a4b.webp",
      tagline: "Minimal developer documentation and interactive API playground.",
      overview: "Clarix adalah dokumentasi API minimalis dengan pencarian instan, syntax highlighting tanpa library berat, dan blok cuplikan curl/SDK yang dapat disalin satu klik.",
      prompt: `Full-bleed minimal developer documentation and API playground portal with instant search, syntax highlighting, and copyable bash snippets.`,
      specs: [
        { label: "Arsitektur", value: "Next.js 14 + MDX Engine" },
        { label: "Search", value: "Client-side Trie In-Memory" }
      ],
      tokens: ["font-mono", "bg-[#09090b]"]
    },
    kyoto: {
      id: "kyoto",
      title: "Kyoto Villa",
      category: "Brutalist 3D",
      badge: "Trending",
      image: "https://storage.getlayers.ai/templates/house-22508188f8.webp",
      tagline: "Raw concrete pavilion architectural showcase with volumetric lighting.",
      overview: "Kyoto Villa adalah etalase arsitektur brutalist dengan pencahayaan volumetrik sinematik. Menampilkan paviliun beton mentah di tengah hutan bambu Kyoto yang basah berkabut.",
      prompt: `Ultra-minimalist raw concrete pavilion villa nestled inside misty autumn bamboo forest in Kyoto, cinematic volumetric lighting, raytraced reflections on wet stone pavement, brutalist architectural composition, 8k resolution, photorealistic shot on Hasselblad X2D 100C --ar 16:9 --style raw`,
      specs: [
        { label: "Arsitektur", value: "Next.js 14 + WebGL2 Background" },
        { label: "Lighting", value: "Volumetric Shader Simulation" }
      ],
      tokens: ["bg-[#050505]", "font-serif", "tracking-tight"]
    }
  }

  const current = templatesDb[id] || templatesDb['lumiere']

  const handleCopyPrompt = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(current.prompt)
    }
    setCopiedPrompt(true)
    setTimeout(() => setCopiedPrompt(false), 2500)
  }

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    setLikes(prev => ({ ...prev, [current.id]: (prev[current.id] || 150) + 1 }))
  }

  // Related 4 templates
  const relatedTemplates = Object.values(templatesDb).filter(t => t.id !== current.id).slice(0, 4)

  return (
    <main className="min-h-screen bg-[#000000] text-zinc-100 font-sans antialiased selection:bg-orange-500 selection:text-white">
      
      {/* 1. UNIFIED STUDIO NAVBAR */}
      <StudioNavbar activeRoute="templates" />

      {/* 2. GETLAYERS STAGE SHOWCASE (MEDIA VIEWER) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-16 space-y-10">
        
        {/* Breadcrumb Bar */}
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
          <Link href="/templates" className="hover:text-white transition-colors">
            Templates
          </Link>
          <span>/</span>
          <span className="text-zinc-400">{current.category}</span>
          <span>/</span>
          <span className="text-white font-bold">{current.title}</span>
        </div>

        {/* Large Media Stage Showcase (16:9 Aspect with Silver Beam) */}
        <div className="silver-beam-wrapper !rounded-2xl p-[1px] shadow-2xl">
          <div className="silver-beam-inner !rounded-[15px] bg-[#0c0c0e] overflow-hidden">
            <div className="relative aspect-[960/540] sm:aspect-[960/500] w-full overflow-hidden bg-zinc-950">
              <img 
                src={current.image} 
                alt={current.title} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>

              {/* Top Badges Overlay */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white text-black shadow-lg">
                  {current.badge}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-white/[0.12] text-zinc-200 backdrop-blur-md border border-white/10 flex items-center gap-1.5 shadow-lg">
                  {getCategoryIcon(current.category)}
                  <span>{current.category}</span>
                </span>
              </div>

              {/* Like Button on Top Right */}
              <button 
                onClick={handleLike}
                className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 hover:bg-black/90 text-xs font-mono text-zinc-200 backdrop-blur-md border border-white/10 flex items-center gap-1.5 transition-colors shadow-lg cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 text-red-400" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 13.6S2.4 9.9 2.4 6.2A3 3 0 0 1 8 4.7 3 3 0 0 1 13.6 6.2C13.6 9.9 8 13.6 8 13.6Z" />
                </svg>
                <span>{likes[current.id] || 150}</span>
              </button>

              {/* Bottom Stage Overlay Info */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-1">
                  <h1 className="text-3xl sm:text-5xl font-sans font-[300] tracking-[-1px] text-white">
                    {current.title}
                  </h1>
                  <p className="text-sm sm:text-base text-zinc-300 max-w-2xl font-sans">
                    {current.tagline}
                  </p>
                </div>

                <button 
                  onClick={handleCopyPrompt}
                  className="px-6 py-2.5 rounded-full bg-white text-black font-mono text-xs font-bold hover:bg-zinc-200 transition-all shadow-2xl flex items-center gap-2 self-start sm:self-auto cursor-pointer"
                >
                  <span>{copiedPrompt ? "✓ Master Prompt Tersalin!" : "Salin Master Prompt"}</span>
                  <span>↗</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Split Details (GetLayers Architecture) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (7 Cols): Master Prompt & Architectural Overview */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Master Prompt Code Container */}
            <div className="silver-beam-wrapper !rounded-2xl p-[1px]">
              <div className="silver-beam-inner !rounded-[15px] bg-[#0c0c0e] p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
                    <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                      Master Prompt (Agent Blueprint)
                    </span>
                  </div>
                  <button 
                    onClick={handleCopyPrompt}
                    className="text-[11px] font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedPrompt ? "✓ Copied" : "Copy"}
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-black border border-white/[0.06] font-mono text-xs text-zinc-300 leading-relaxed max-h-64 overflow-y-auto selection:bg-orange-500">
                  {current.prompt}
                </div>

                <div className="text-[11px] font-mono text-zinc-500 flex items-center justify-between">
                  <span>Structured for Claude Code, Hermes, Cursor &amp; Windsurf</span>
                  <span className="text-emerald-400">Zero Slop Certified ✓</span>
                </div>
              </div>
            </div>

            {/* Design Narrative Overview */}
            <div className="silver-beam-wrapper !rounded-2xl p-[1px]">
              <div className="silver-beam-inner !rounded-[15px] bg-[#0c0c0e] p-6 space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold block">
                  Filosofi &amp; Desain Arsitektur
                </span>
                <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                  {current.overview}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column (5 Cols): Technical Specs & Tokens */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Specs Table */}
            <div className="silver-beam-wrapper !rounded-2xl p-[1px]">
              <div className="silver-beam-inner !rounded-[15px] bg-[#0c0c0e] p-6 space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold block">
                  Spesifikasi Teknis
                </span>

                <div className="space-y-2.5 font-mono text-xs">
                  {current.specs?.map((s: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <span className="text-zinc-500">{s.label}</span>
                      <span className="text-white font-bold text-right">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Design Tokens Pill Stack */}
            {current.tokens && (
              <div className="silver-beam-wrapper !rounded-2xl p-[1px]">
                <div className="silver-beam-inner !rounded-[15px] bg-[#0c0c0e] p-6 space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold block">
                    Core Tailwind Tokens
                  </span>

                  <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                    {current.tokens.map((tk: string) => (
                      <span key={tk} className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-zinc-300">
                        {tk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Quick Action Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.01] border border-white/[0.1] space-y-3">
              <span className="text-xs font-mono font-bold text-white block">
                Siap Deploy ke Vercel &amp; Cloudflare Edge?
              </span>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Salin prompt di samping lalu tempel langsung ke agen coding Anda. Seluruh komponen akan dirakit secara deterministik.
              </p>
              <button 
                onClick={handleCopyPrompt}
                className="w-full py-2.5 rounded-full bg-white text-black font-mono text-xs font-bold hover:bg-zinc-200 transition-all shadow-xl cursor-pointer"
              >
                {copiedPrompt ? "✓ Master Prompt Tersalin!" : "Salin Prompt & Mulai"}
              </button>
            </div>

          </div>

        </div>

        {/* 3. RELATED TEMPLATES SECTION (GETLAYERS CARDBOX STYLE) */}
        <div className="border-t border-white/[0.08] pt-12 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                Eksplorasi Lainnya
              </span>
              <h2 className="text-2xl font-sans font-bold text-white tracking-tight">
                Related Templates &amp; Blueprints
              </h2>
            </div>
            <Link href="/templates" className="text-xs font-mono text-zinc-400 hover:text-white transition-colors">
              Lihat Semua →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedTemplates.map(tpl => (
              <Link 
                key={tpl.id}
                href={`/detail/${tpl.id}`}
                className="silver-beam-wrapper group cursor-pointer flex flex-col justify-between !rounded-[14px]"
              >
                <div className="silver-beam-inner flex flex-col justify-between !rounded-[13px] bg-[#0c0c0e]">
                  <div className="relative aspect-[960/684] w-full overflow-hidden bg-zinc-950">
                    <img 
                      src={tpl.image} 
                      alt={tpl.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-white text-black shadow">
                        {tpl.badge}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold bg-white/[0.12] text-zinc-200 backdrop-blur-md border border-white/10 flex items-center gap-1">
                        {getCategoryIcon(tpl.category)}
                        <span>{tpl.category}</span>
                      </span>
                    </div>

                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/60 text-[10px] font-mono text-zinc-300 backdrop-blur-md border border-white/10 flex items-center gap-1">
                      <svg className="w-2.5 h-2.5 text-red-400" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 13.6S2.4 9.9 2.4 6.2A3 3 0 0 1 8 4.7 3 3 0 0 1 13.6 6.2C13.6 9.9 8 13.6 8 13.6Z" />
                      </svg>
                      <span>150</span>
                    </div>
                  </div>

                  <div className="p-3.5 flex items-center justify-between border-t border-white/[0.06] font-mono text-xs">
                    <span className="font-sans font-medium text-[14px] text-white group-hover:text-orange-400 transition-colors">
                      {tpl.title}
                    </span>
                    <span className="text-[11px] text-zinc-500">
                      {tpl.category}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.08] bg-[#000000] py-8 text-center text-xs font-mono text-zinc-500">
        <div>© 2026 OXID LABS. All rights reserved. Built for autonomous engineers.</div>
      </footer>

    </main>
  )
}
