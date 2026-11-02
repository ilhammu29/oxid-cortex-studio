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
      case 'Autonomous Agents':
        return (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        )
      case 'Cloud Grants & Quotas':
        return (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        )
      case 'AI Engineering':
        return (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
      case 'UI/UX Architecture':
        return (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        )
      case 'Frontier Research':
      default:
        return (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        )
    }
  }

  // Template Library Database
  const templatesDb: Record<string, any> = {
    openhands: {
      id: "openhands",
      title: "OpenHands Developer Agent",
      category: "Autonomous Agents",
      badge: "92.5k Stars",
      image: "https://opengraph.githubassets.com/1/All-Hands-AI/OpenHands",
      tagline: "Autonomous AI software engineer harness with virtual environment & git sandbox.",
      overview: "OpenHands (sebelumnya OpenDevin) adalah agen pengembang perangkat lunak otonom yang mampu menulis kode, mengeksekusi perintah bash, menjelajahi web, dan berinteraksi dengan GitHub PR secara mandiri.",
      prompt: `Build an autonomous AI-driven development agent harness with virtual sandbox, git version control integration, multi-model LLM router, and real-time terminal streaming interface. Next.js 14 App Router and Tailwind CSS.`,
      specs: [
        { label: "Arsitektur", value: "Docker Sandbox + Python/TypeScript Engine" },
        { label: "LLM Provider", value: "Anthropic, OpenAI, Ollama, DeepSeek" },
        { label: "GitHub Stars", value: "92,500+ Stars (Verified)" },
        { label: "Lisensi", value: "MIT Open Source" }
      ],
      tokens: ["bg-[#0c0c0e]", "border-white/[0.08]", "font-mono", "rounded-[14px]"]
    },
    ollama: {
      id: "ollama",
      title: "Ollama Local Core",
      category: "AI Engineering",
      badge: "185k Stars",
      image: "https://opengraph.githubassets.com/1/ollama/ollama",
      tagline: "Run open-weights LLMs locally with zero cloud lock & ultra-low latency.",
      overview: "Ollama memungkinkan pengembang menjalankan model AI frontier (Llama 3, DeepSeek, Qwen, Mistral) langsung di laptop lokal dengan runtime C++ teroptimasi dan endpoint kompatibel OpenAI.",
      prompt: `Deploy and run local open-weights LLMs (Kimi, DeepSeek, Qwen, Gemma) with zero cloud dependency, OpenAI-compatible local endpoints, and low VRAM footprint.`,
      specs: [
        { label: "Runtime", value: "Go + llama.cpp Hardware Accelerated" },
        { label: "GitHub Stars", value: "185,700+ Stars" },
        { label: "Batas VRAM", value: "Quantized 4-bit / 8-bit Support" },
        { label: "Lisensi", value: "MIT Open Source" }
      ],
      tokens: ["font-mono", "bg-black", "text-zinc-200"]
    },
    gemini_grant: {
      id: "gemini_grant",
      title: "Google AI Studio & Gemini 1.5 Pro Grant",
      category: "Cloud Grants & Quotas",
      badge: "2M Context",
      image: "/screenshots/real/google_ai_studio.png",
      tagline: "Free tier access for multimodal frontier reasoning up to 2,000,000 tokens.",
      overview: "Alokasi resmi tanpa biaya dari Google Cloud untuk model Gemini 1.5 Pro dan Flash dengan kuota 1,000,000 TPM dan rate limit longgar tanpa perlu kartu kredit.",
      prompt: `Architect an enterprise multi-modal intelligence portal consuming Google AI Studio Gemini 1.5 Pro free API tier with 1,000,000 TPM, video-audio parsing, and zero credit card lock.`,
      specs: [
        { label: "Jendela Konteks", value: "2,000,000 Token (Audio, Video, PDF)" },
        { label: "Batas Gratis", value: "15 RPM, 1,000,000 TPM, 1,500 RPD" },
        { label: "Format Output", value: "JSON Schema Structured Output" }
      ],
      tokens: ["text-white", "bg-[#050505]", "border-white/[0.08]"]
    },
    groq_lpu: {
      id: "groq_lpu",
      title: "Groq Cloud LPU High-Speed Inference",
      category: "AI Engineering",
      badge: "800 T/s LPU",
      image: "/screenshots/real/groq_console.png",
      tagline: "Sub-second token rendering at 800+ tokens/sec on LPU hardware.",
      overview: "Inferensi model open-weights (Llama 3.1 70B) dengan kecepatan rendering tercepat di dunia berkat chip Language Processing Unit (LPU) khusus dari Groq.",
      prompt: `Integrate Groq Cloud Language Processing Unit (LPU) ultra-low latency inference engine running Llama-3.1-70B at 800+ tokens per second with Next.js 14 streaming response.`,
      specs: [
        { label: "Kecepatan Render", value: "500 - 850 Token / Detik" },
        { label: "Batas Harian", value: "Ribuan Request Gratis per Hari" },
        { label: "Kompatibilitas", value: "OpenAI Client Drop-in" }
      ],
      tokens: ["text-orange-400", "font-mono", "bg-[#0a0a0c]"]
    },
    r3f: {
      id: "r3f",
      title: "React Three Fiber Canvas",
      category: "UI/UX Architecture",
      badge: "33.4k Stars",
      image: "https://opengraph.githubassets.com/1/pmndrs/react-three-fiber",
      tagline: "Declarative Three.js WebGL canvas for React & Next.js applications.",
      overview: "Pustaka standar industri dari Poimandres untuk merender grafis 3D interaktif di React dengan performa 60fps tanpa membebani main thread.",
      prompt: `Craft a declarative 3D canvas experience using Three.js and React Three Fiber with custom GLSL shaders, camera physics, and anti-aliased dark scene rendering.`,
      specs: [
        { label: "Renderer", value: "Three.js WebGL / WebGPU" },
        { label: "GitHub Stars", value: "33,400+ Stars" }
      ],
      tokens: ["aspect-[16/9]", "rounded-2xl", "bg-black"]
    },
    scrapling: {
      id: "scrapling",
      title: "Scrapling Framework",
      category: "Autonomous Agents",
      badge: "92.5k Stars",
      image: "https://opengraph.githubassets.com/1/D4Vinci/Scrapling",
      tagline: "Stealth autonomous web scraping framework with DOM parser.",
      overview: "Framework scraping generasi terbaru yang dirancang untuk agen otonom, mampu menembus proteksi Cloudflare dan mengekstraksi data web dengan efisiensi memori tinggi.",
      prompt: `High-throughput autonomous web scraping framework capable of bypassing modern bot barriers, DOM stealth emulation, and JSON structured data normalization.`,
      specs: [
        { label: "Bahasa", value: "Python 3.10+" },
        { label: "Stars", value: "92,500+ Stars" }
      ],
      tokens: ["font-mono", "bg-[#08080a]"]
    },
    fastmcp: {
      id: "fastmcp",
      title: "FastMCP Protocol Server",
      category: "Autonomous Agents",
      badge: "Verified",
      image: "https://opengraph.githubassets.com/1/jlowin/fastmcp",
      tagline: "Anthropic Model Context Protocol server SDK for developer agents.",
      overview: "Implementasi standar MCP yang memungkinkan agen seperti Claude Desktop dan Hermes memanggil tool eksternal secara aman dan terstruktur.",
      prompt: `Standard Model Context Protocol (MCP) server implementation exposing autonomous tools, resource endpoints, and deterministic schema validation to LLMs.`,
      specs: [
        { label: "Standar", value: "Model Context Protocol (MCP)" },
        { label: "Integrasi", value: "Claude Code, Hermes, Cursor" }
      ],
      tokens: ["font-mono", "bg-[#09090b]"]
    },
    vaul: {
      id: "vaul",
      title: "Vaul Drawer Motion",
      category: "UI/UX Architecture",
      badge: "8.7k Stars",
      image: "https://opengraph.githubassets.com/1/emilkowalski/vaul",
      tagline: "Unstyled drawer component for React with spring touch physics.",
      overview: "Komponen drawer mobile berstandar kelas dunia karya Emil Kowalski dengan physics peredam pegas halus yang mencegah layout shift pada smartphone.",
      prompt: `Minimalist iOS-style draggable drawer component for mobile web applications with spring physics, touch gesture velocity tracking, and zero layout shift.`,
      specs: [
        { label: "Framework", value: "React & React Native Web" },
        { label: "Ukuran Bundle", value: "< 5 KB Minified" }
      ],
      tokens: ["rounded-t-3xl", "backdrop-blur-xl"]
    }
  }

  const current = templatesDb[id] || templatesDb['openhands']

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
