'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function DetailPage() {
  const params = useParams()
  const id = (params?.id as string) || "grant_gcp_1"
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  // Master Entity Registry
  const masterData: Record<string, any> = {
    "grant_gcp_1": {
      title: "Google AI Studio & Gemini 1.5 Pro Free Quota",
      category: "Bansos AI & Cloud Credits",
      type: "Free Tier / API Grant",
      badge: "VERIFIED ACTIVE",
      provider: "Google Cloud",
      logo: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg",
      value: "Gratis (Up to 15 RPM / 1M TPM)",
      valueSub: "Unlimited Prototyping Quota",
      summary: "Akses kuota gratis model frontier Gemini 1.5 Pro dan Gemini 1.5 Flash melalui Google AI Studio tanpa wajib memasukkan kartu kredit (No Credit Card Required).",
      overview: `Google AI Studio menyediakan kuota gratis tingkat produksi untuk model Gemini 1.5 Pro dan 1.5 Flash. Model ini memiliki context window hingga 2 Juta Token, menjadikannya model dengan jendela konteks terpanjang di industri AI saat ini. Sangat optimal untuk RAG multi-dokumen, analisis video panjang, dan agen otonom.`,
      specs: [
        { label: "Rate Limit (RPM)", value: "15 Requests Per Minute" },
        { label: "Token Limit (TPM)", value: "1,000,000 Tokens Per Minute" },
        { label: "Daily Limit (RPD)", value: "1,500 Requests Per Day" },
        { label: "Context Window", value: "2,000,000 Tokens (Native)" },
        { label: "Credit Card Required", value: "TIDAK (0% Kartu Kredit)" },
        { label: "SLA Availability", value: "99.9% Uptime SLA" }
      ],
      steps: [
        "Kunjungi portal resmi Google AI Studio di https://aistudio.google.com/.",
        "Login menggunakan akun Google biasa (Gmail personal atau Google Workspace).",
        "Klik tombol 'Get API key' di bilah navigasi kiri.",
        "Pilih 'Create API key in new project' dan salin token API kamu.",
        "Tempelkan API key ke environment variable: GEMINI_API_KEY=your_key."
      ],
      codeSnippet: `import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

const prompt = "Analisis dokumen arsitektur ini secara First-Principle.";
const result = await model.generateContent(prompt);
console.log(result.response.text());`,
      claimUrl: "https://aistudio.google.com/"
    },
    "grant_groq_2": {
      title: "Groq Cloud LPU High-Speed Inference Free Tier",
      category: "Inference Engine & Hardware",
      type: "Free Tier / High Speed LPU",
      badge: "ULTRA FAST 800 T/s",
      provider: "Groq Inc.",
      logo: "https://groq.com/wp-content/uploads/2024/03/Groq_Logo_Primary_Orange.png",
      value: "Gratis Ribuan Request/Hari",
      valueSub: "Llama-3-70B & Mixtral",
      summary: "Inference ultra cepat hingga 800+ tokens/detik untuk model open-weights Llama 3 dan Mixtral ditenagai arsitektur hardware LPU (Language Processing Unit).",
      overview: `Groq LPU (Language Processing Unit) dirancang dari silikon khusus untuk eksekusi deterministik tanpa GPU contention. Menghasilkan latency time-to-first-token kurang dari 100ms, sangat krusial untuk agen suara (Voice AI) dan multi-step agent reasoning loops.`,
      specs: [
        { label: "Throughput LPU", value: "800+ Tokens / Detik" },
        { label: "Latency TTFT", value: "< 120 ms Time-to-First-Token" },
        { label: "Supported Models", value: "Llama-3.1-70B, Llama-3.1-8B, Mixtral" },
        { label: "API Protocol", value: "100% OpenAI-compatible SDK" },
        { label: "Free Tier Quota", value: "14,400 Requests Per Day" }
      ],
      steps: [
        "Buka console resmi Groq di https://console.groq.com/.",
        "Daftar menggunakan akun GitHub atau Google.",
        "Buka menu 'API Keys' dan klik 'Create API Key'.",
        "Gunakan baseURL 'https://api.groq.com/openai/v1' pada klien OpenAI SDK kamu."
      ],
      codeSnippet: `import OpenAI from "openai";

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const chatCompletion = await groq.chat.completions.create({
  messages: [{ role: "user", content: "Tulis skrip bash deterministik." }],
  model: "llama-3.1-70b-versatile",
});
console.log(chatCompletion.choices[0].message.content);`,
      claimUrl: "https://console.groq.com/"
    },
    "code_1": {
      title: "Senior Full-Stack Architect (Anti-AI Slop)",
      category: "Architecture & Next.js",
      type: "Genesis Master Prompt",
      badge: "S-TIER VERIFIED",
      provider: "OXID Intelligence Studio",
      logo: "https://avatars.githubusercontent.com/u/241138?v=4",
      value: "Production-Ready Architecture",
      valueSub: "Zero Hallucination",
      summary: "Master prompt arsitektur rekayasa perangkat lunak untuk menghasilkan kode Next.js, Supabase, dan Tailwind CSS tanpa boilerplate palsu dan tanpa pola AI slop.",
      overview: `Prompt ini menginstruksikan LLM bertindak sebagai Chief Software Architect. Mengunci prinsip lazy engineering (YAGNI), memprioritaskan library standar (stdlib/native), serta mewajibkan verifikasi terminal loop (Exit Code 0) sebelum tugas dinyatakan selesai.`,
      specs: [
        { label: "Kompatibilitas LLM", value: "Claude 3.7 Sonnet, GPT-4o, DeepSeek-V3" },
        { label: "Target Stack", value: "Next.js App Router, Supabase, Tailwind" },
        { label: "Prinsip Utama", value: "YAGNI, Minimal Working Diff, Exit Code 0" },
        { label: "Gaya Bahasa", value: "Swiss Technical, Staccato, Zero-Filler" }
      ],
      steps: [
        "Salin teks master prompt di bawah ini.",
        "Buka sesi percakapan baru di Claude, ChatGPT, v0, atau Hermes CLI.",
        "Tempelkan sebagai System Prompt atau instruksi awal.",
        "Sampaikan ide modul atau fitur yang ingin dibangun."
      ],
      codeSnippet: `Bertindaklah sebagai Lead Software Architect & Senior Engineer kelas dunia. Tugasmu: bangun arsitektur aplikasi tanpa boilerplate palsu dan tanpa pola AI slop.
Aturan Mutlak:
1. Utamakan pustaka standar (stdlib/native) sebelum menambah dependensi baru.
2. Tulis kode yang langsung bisa dijalankan (Zero Hallucination / Exit Code 0).
3. Pisahkan logika UI, state, dan API contract secara modular.
4. Hindari ornamen dekoratif generik (tanpa gradasi ungu norak atau sudut kaku template AI).
Gunakan bahasa teknis padat, langsung to the point, dan sertakan komentar hanya pada logika yang krusial.`,
      claimUrl: "/prompts"
    }
  }

  const current = masterData[id] || masterData["grant_gcp_1"]

  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(current.codeSnippet || current.overview)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#f4f4f5] font-sans antialiased selection:bg-orange-500 selection:text-white flex">
      
      {/* 1. LEFT ICON RAIL */}
      <aside className="w-16 sm:w-20 bg-[#0e0e12] border-r border-[#26262e] flex flex-col items-center justify-between py-6 flex-shrink-0 sticky top-0 h-screen z-40">
        <div className="space-y-8 flex flex-col items-center">
          <Link href="/" className="w-10 h-10 rounded-2xl p-1.5 bg-white border border-zinc-200 flex items-center justify-center shadow-lg shadow-orange-500/20 hover:scale-105 transition-transform" title="OXID Labs Home">
            <img src="/images/oxid-logo.png" alt="OXID Labs" className="w-full h-full object-contain" />
          </Link>

          <nav className="flex flex-col items-center space-y-4">
            <Link href="/" className="p-3 rounded-2xl text-zinc-400 hover:text-white hover:bg-[#16161c] transition-all" title="Home Studio">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            </Link>
            <Link href="/prompts" className="p-3 rounded-2xl text-zinc-400 hover:text-white hover:bg-[#16161c] transition-all" title="Prompt Lab">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </Link>
            <Link href="/grants" className="p-3 rounded-2xl text-zinc-400 hover:text-white hover:bg-[#16161c] transition-all" title="Bansos AI">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </Link>
            <Link href="/tools" className="p-3 rounded-2xl text-zinc-400 hover:text-white hover:bg-[#16161c] transition-all" title="AI Tools Radar">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path></svg>
            </Link>
            <Link href="/templates" className="p-3 rounded-2xl text-orange-400 hover:text-white hover:bg-[#16161c] transition-all" title="Karya Templates Kita">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>
            </Link>
          </nav>
        </div>

        <div className="w-10 h-10 rounded-2xl bg-white p-1 border border-zinc-200 flex items-center justify-center shadow-lg shadow-orange-500/20" title="OXID Security Verified">
          <img src="/images/oxid-logo.png" alt="OXID" className="w-full h-full object-contain" />
        </div>
      </aside>

      {/* 2. EXPANSIVE FULL-WIDTH MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Navigation */}
        <header className="h-20 border-b border-[#26262e] bg-[#0a0a0c]/90 backdrop-blur-md px-6 sm:px-10 flex items-center justify-between sticky top-0 z-30 font-mono text-xs">
          <div className="flex items-center gap-3">
            <Link href="/" className="px-3.5 py-1.5 rounded-full bg-[#16161c] hover:bg-[#202028] text-orange-500 border border-[#26262e] transition-all">
              ← Studio Home
            </Link>
            <span className="text-zinc-500">•</span>
            <span className="text-zinc-400 uppercase font-bold">{current.category}</span>
          </div>

          <div className="flex items-center space-x-3">
            <Link 
              href="/grants"
              className="px-4 py-2 rounded-full bg-[#16161c] hover:bg-[#202028] text-zinc-300 border border-[#26262e] transition-all"
            >
              All Grants
            </Link>
            <Link 
              href="/prompts"
              className="px-4 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all shadow-md shadow-orange-500/25"
            >
              Prompt Lab
            </Link>
          </div>
        </header>

        {/* EXPANSIVE 2-COLUMN STUDIO LAYOUT (ANTI-FORM) */}
        <div className="max-w-7xl mx-auto w-full p-6 sm:p-10 space-y-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* ======================================================== */}
            {/* LEFT COLUMN (4-COLS): IDENTITY, VALUE BOX & ACTIONS      */}
            {/* ======================================================== */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              
              <div className="bg-[#121216] border border-[#26262e] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
                
                {/* Provider Logo Header */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <img src={current.logo} alt={current.provider} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-orange-500 block">{current.provider}</span>
                    <h3 className="font-serif text-xl font-bold text-white">{current.type}</h3>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center justify-between font-mono text-xs pt-3 border-t border-[#26262e]">
                  <span className="text-zinc-500 uppercase">Verification:</span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold text-[10px]">
                    {current.badge}
                  </span>
                </div>

                {/* Benefit Highlight Box */}
                <div className="p-4 bg-[#0a0a0c] border border-orange-500/30 rounded-2xl font-mono space-y-1">
                  <span className="text-[10px] uppercase text-zinc-400 block font-bold">NILAI BENEFIT BANSOS:</span>
                  <strong className="text-lg text-orange-400 font-extrabold block">{current.value}</strong>
                  <span className="text-xs text-zinc-500">{current.valueSub}</span>
                </div>

                {/* Main Action Buttons */}
                <div className="space-y-3 pt-2">
                  {current.claimUrl.startsWith("http") ? (
                    <a 
                      href={current.claimUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-mono text-xs font-bold text-center block transition-all shadow-lg shadow-orange-500/30 tracking-wider uppercase"
                    >
                      Klaim Airdrop Resmi ↗
                    </a>
                  ) : (
                    <Link
                      href={current.claimUrl}
                      className="w-full py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-mono text-xs font-bold text-center block transition-all shadow-lg shadow-orange-500/30 tracking-wider uppercase"
                    >
                      Buka Suite Prompt ↗
                    </Link>
                  )}

                  <button
                    onClick={handleCopyCode}
                    className="w-full py-3 rounded-2xl bg-[#16161c] hover:bg-[#202028] text-zinc-300 font-mono text-xs font-bold border border-[#26262e] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{copied ? "✓" : "📋"}</span>
                    <span>{copied ? "Tersalin ke Clipboard!" : "Copy Parameter Code"}</span>
                  </button>
                </div>

                {/* Curator Info */}
                <div className="pt-4 border-t border-[#26262e] flex items-center justify-between text-xs font-mono text-zinc-500">
                  <span>Host Verified</span>
                  <span className="text-zinc-400">Arch Linux • 2026</span>
                </div>

              </div>

            </div>

            {/* ======================================================== */}
            {/* RIGHT COLUMN (8-COLS): EXPANSIVE DEEP DOCUMENTATION       */}
            {/* ======================================================== */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Main Title & Executive Summary */}
              <div className="bg-[#121216] border border-[#26262e] rounded-3xl p-6 sm:p-10 space-y-5 shadow-xl">
                <span className="text-xs font-mono font-bold uppercase text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full">
                  OFFICIAL DEEP SPECIFICATION
                </span>

                <h1 className="font-serif text-3xl sm:text-5xl font-black text-white leading-tight">
                  {current.title}
                </h1>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
                  {current.summary}
                </p>

                {/* Segment Navigation */}
                <div className="flex items-center space-x-2 border-b border-[#26262e] pt-4 text-xs font-mono">
                  {['overview', 'specifications', 'implementation'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 uppercase font-bold transition-all border-b-2 cursor-pointer ${activeTab === tab ? 'border-orange-500 text-orange-400' : 'border-transparent text-zinc-500 hover:text-white'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Tab Content 1: Overview */}
                {activeTab === 'overview' && (
                  <div className="space-y-4 pt-2 font-sans text-sm text-zinc-300 leading-relaxed">
                    <p>{current.overview}</p>
                    <div className="p-4 bg-[#0a0a0c] border border-[#26262e] rounded-2xl font-mono text-xs text-zinc-400 space-y-1">
                      <span className="text-orange-500 font-bold block uppercase">Keunggulan Strategis:</span>
                      <p>Mengurangi biaya operasional developer hingga $0 dengan memanfaatkan alokasi quota gratis resmi dari penyedia AI papan atas.</p>
                    </div>
                  </div>
                )}

                {/* Tab Content 2: Technical Specs Table */}
                {activeTab === 'specifications' && (
                  <div className="pt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                      {current.specs?.map((spec: any, idx: number) => (
                        <div key={idx} className="p-3.5 bg-[#0a0a0c] border border-[#26262e] rounded-2xl flex flex-col justify-between space-y-1">
                          <span className="text-[10px] text-zinc-500 uppercase">{spec.label}</span>
                          <strong className="text-white text-xs">{spec.value}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab Content 3: Step-by-Step Implementation */}
                {activeTab === 'implementation' && (
                  <div className="pt-2 space-y-3 font-mono text-xs">
                    {current.steps?.map((step: string, idx: number) => (
                      <div key={idx} className="p-3.5 bg-[#0a0a0c] border border-[#26262e] rounded-2xl flex items-start space-x-3">
                        <span className="w-5 h-5 rounded-full bg-orange-500 text-black font-bold flex items-center justify-center flex-shrink-0 text-[10px]">
                          {idx + 1}
                        </span>
                        <p className="text-zinc-300 leading-relaxed font-sans">{step}</p>
                      </div>
                    ))}
                  </div>
                )}

              </div>

              {/* Code Snippet & Implementation Inspector */}
              <div className="bg-[#121216] border border-[#26262e] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-orange-500 font-mono font-bold text-xs uppercase">Executable Implementation Snippet</span>
                  </div>
                  <button 
                    onClick={handleCopyCode}
                    className="text-xs font-mono text-orange-400 hover:underline flex items-center gap-1 cursor-pointer font-bold"
                  >
                    <span>{copied ? "✓ Copied!" : "Copy Code"}</span>
                  </button>
                </div>

                <div className="p-5 bg-[#0a0a0c] border border-[#26262e] rounded-2xl font-mono text-xs text-zinc-200 whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
                  {current.codeSnippet}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}
