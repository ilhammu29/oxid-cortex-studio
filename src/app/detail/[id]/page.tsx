'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useStudioTheme } from '@/lib/useStudioTheme'

export default function DetailPage() {
  const params = useParams()
  const id = params?.id as string
  const [activeTab, setActiveTab] = useState('overview')
  const [copied, setCopied] = useState(false)
  const { darkMode, toggleTheme } = useStudioTheme()

  const allDetails: Record<string, any> = {
    grant_gcp_1: {
      title: "Google AI Studio & Gemini 1.5 Pro Free Quota",
      provider: "Google Cloud Ecosystem",
      type: "Free Tier / API Developer Grant",
      badge: "VERIFIED ACTIVE",
      value: "Gratis (Up to 15 RPM / 1M TPM)",
      valueSub: "Zero Dollar ($0) per Month",
      claimUrl: "https://aistudio.google.com/",
      logo: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg",
      category: "Bansos Cloud AI",
      summary: "Akses tanpa biaya untuk model multimodal mutakhir Gemini 1.5 Pro dan Gemini 1.5 Flash langsung dari Google Cloud dengan batas rate limit harian yang sangat longgar.",
      overview: "Google AI Studio menyediakan jalur resmi tercepat bagi pengembang untuk memanfaatkan model AI tercanggih dengan jendela konteks raksasa hingga 2 juta token. Tanpa perlu memasukkan kartu kredit untuk tier gratis, pengembang mendapatkan alokasi 15 Request Per Minute (RPM) dan 1 Juta Token Per Minute (TPM), cukup untuk menggerakkan pipeline autonomous agent harian.",
      specs: [
        { label: "Model Didukung", value: "Gemini 1.5 Pro, Flash, Gemini 1.0 Pro" },
        { label: "Jendela Konteks", value: "Hingga 2,000,000 Token (Audio, Video, PDF)" },
        { label: "Rate Limit Gratis", value: "15 RPM, 1,000,000 TPM, 1,500 RPD" },
        { label: "Kebutuhan CC", value: "Tidak Wajib (Tier Gratis Bebas Kartu Kredit)" },
        { label: "Format Respons", value: "JSON Structured Output, System Instructions" },
        { label: "SDK Resmi", value: "@google/generative-ai (Node.js & Python)" }
      ],
      steps: [
        "Kunjungi portal Google AI Studio di https://aistudio.google.com/ dan login menggunakan akun Google biasa.",
        "Klik tombol 'Get API key' pada bilah navigasi sisi kiri dan pilih 'Create API key in new project'.",
        "Salin API Key yang dihasilkan dan simpan ke file .env.local aplikasi Anda sebagai GEMINI_API_KEY.",
        "Gunakan library resmi Google GenAI untuk memanggil model dengan parameter temperatur dan format respons JSON murni."
      ],
      codeSnippet: `import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateAnalysis(prompt: string) {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: { responseMimeType: "application/json" }
  });

  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
}`
    },
    grant_groq_2: {
      title: "Groq Cloud LPU High-Speed Inference Free Tier",
      provider: "Groq Inc.",
      type: "High-Throughput LPU Inference",
      badge: "ULTRA FAST LPU",
      value: "Ribuan Request Harian Gratis (800+ T/s)",
      valueSub: "Extreme Low-Latency Compute",
      claimUrl: "https://console.groq.com/",
      logo: "https://groq.com/wp-content/uploads/2024/03/Groq_Logo_Primary_Orange.png",
      category: "Hardware Inference",
      summary: "Inference model open-weights kelas dunia (Llama 3.1 70B, Mixtral 8x7B) dengan kecepatan rendering token hingga 800+ token per detik berbasis arsitektur LPU (Language Processing Unit).",
      overview: "Groq merevolusi kecepatan inferensi LLM dengan chip Language Processing Unit (LPU) rancangan mandiri. Untuk para pengembang, Groq menyediakan Cloud Console gratis dengan batas harian ribuan request yang kompatibel 100% dengan OpenAI SDK format.",
      specs: [
        { label: "Model Tersedia", value: "Llama-3.1-70B-Versatile, Llama-3.1-8B-Instant, Mixtral" },
        { label: "Kecepatan Render", value: "500 - 850 Token / Detik" },
        { label: "Protokol API", value: "OpenAI Compatible (v1/chat/completions)" },
        { label: "Biaya Tier Awal", value: "Gratis untuk Developer Sandbox" },
        { label: "Kesesuaian", value: "Agent Routing, Fast Synthesizer, Voice Bot" }
      ],
      steps: [
        "Buka https://console.groq.com/ dan login via GitHub atau Google Account.",
        "Masuk ke menu 'API Keys' dan klik 'Create API Key'.",
        "Gunakan baseURL 'https://api.groq.com/openai/v1' pada klien OpenAI standar di aplikasi Next.js Anda.",
        "Panggil model 'llama-3.1-70b-versatile' untuk penalaran kompleks atau 'llama-3.1-8b-instant' untuk kecepatan kilat."
      ],
      codeSnippet: `import OpenAI from "openai";

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

export async function fastInference(userMessage: string) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-70b-versatile",
    messages: [{ role: "user", content: userMessage }],
    temperature: 0.2
  });
  return completion.choices[0].message.content;
}`
    },
    grant_cf_3: {
      title: "Cloudflare Workers AI Free Neurons (10,000/Hari)",
      provider: "Cloudflare",
      type: "Serverless Edge AI",
      badge: "EDGE SERVERLESS",
      value: "10,000 Neurons Harian Gratis",
      valueSub: "Distributed in 300+ Cities",
      claimUrl: "https://dash.cloudflare.com/",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Cloudflare_Logo.svg",
      category: "Serverless Edge",
      summary: "Komputasi model kecerdasan buatan terdistribusi di ratusan edge data center dunia tanpa server terpusat dengan jatah 10,000 neuron komputasi gratis setiap harinya.",
      overview: "Workers AI memungkinkan eksekusi model machine learning langsung di edge network Cloudflare. Dengan alokasi neuron gratis harian, Anda dapat menjalankan model embedding vektor seperti BAAI bge-large, Llama 3 8B, dan model image generation Flux tanpa beban biaya server bulanan.",
      specs: [
        { label: "Alokasi Gratis", value: "10,000 Neurons / Hari (Reset 00:00 UTC)" },
        { label: "Latency Edge", value: "< 25ms ke POP Cloudflare terdekat" },
        { label: "Dukungan Model", value: "Embedding, Text Gen, Vision, Audio Speech-to-Text" },
        { label: "Integrasi Database", value: "Cloudflare Vectorize & D1 Database" }
      ],
      steps: [
        "Login ke Cloudflare Dashboard di https://dash.cloudflare.com/.",
        "Buat Worker baru dan tambahkan binding 'AI' pada konfigurasi wrangler.toml.",
        "Eksekusi 'env.AI.run()' untuk memproses prompt atau vektorisasi dokumen secara serverless.",
        "Gunakan Cloudflare Vectorize untuk menyimpan hasil embedding tanpa biaya eksternal."
      ],
      codeSnippet: `export default {
  async fetch(request, env) {
    const response = await env.AI.run("@cf/meta/llama-3-8b-instruct", {
      messages: [{ role: "user", content: "Halo dari Edge Cloudflare!" }]
    });
    return Response.json(response);
  }
};`
    }
  }

  const current = allDetails[id] || allDetails["grant_gcp_1"]

  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(current.codeSnippet || current.overview)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

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
            <Link href="/grants" className="p-3 rounded-2xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-[#16161c] transition-all" title="Bansos AI">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </Link>
            <Link href="/tools" className="p-3 rounded-2xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-[#16161c] transition-all" title="AI Tools Radar">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path></svg>
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

      {/* 2. EXPANSIVE FULL-WIDTH MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Navigation (Compact Mobile with Theme Toggle) */}
        <header className="h-16 sm:h-20 border-b border-zinc-200 dark:border-[#26262e] bg-white/95 dark:bg-[#0a0a0c]/95 backdrop-blur-md px-4 sm:px-10 flex items-center justify-between sticky top-0 z-30 font-mono text-xs transition-colors">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/" className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-[#16161c] dark:hover:bg-[#202028] text-orange-500 border border-zinc-200 dark:border-[#26262e] transition-all text-[11px] sm:text-xs">
              ← Studio Home
            </Link>
            <span className="text-zinc-500 hidden sm:inline">•</span>
            <span className="text-zinc-500 dark:text-zinc-400 uppercase font-bold text-[10px] sm:text-xs truncate max-w-[120px] sm:max-w-none">{current.category}</span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
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
              href="/grants"
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-[#16161c] dark:hover:bg-[#202028] text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-[#26262e] transition-all text-xs"
            >
              Grants
            </Link>
            <Link 
              href="/prompts"
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all shadow-md shadow-orange-500/25 text-xs"
            >
              Prompts
            </Link>
          </div>
        </header>

        {/* 3. SCROLLABLE ARTICLE BODY */}
        <div className="flex-1 p-4 sm:p-12 pb-28 sm:pb-12 max-w-6xl mx-auto w-full space-y-8 sm:space-y-12 overflow-y-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* ======================================================== */}
            {/* LEFT COLUMN (4-COLS): IDENTITY, VALUE BOX & ACTIONS      */}
            {/* ======================================================== */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              
              <div className="bg-zinc-50 dark:bg-[#121216] border border-zinc-200 dark:border-[#26262e] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm dark:shadow-2xl transition-colors">
                
                {/* Provider Logo Header */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 p-3 rounded-2xl bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center flex-shrink-0 shadow-xs">
                    <img src={current.logo} alt={current.provider} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-orange-500 block">{current.provider}</span>
                    <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white">{current.type}</h3>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center justify-between font-mono text-xs pt-3 border-t border-zinc-200 dark:border-[#26262e]">
                  <span className="text-zinc-500 uppercase">Verification:</span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold text-[10px]">
                    {current.badge}
                  </span>
                </div>

                {/* Benefit Highlight Box */}
                <div className="p-4 bg-zinc-100 dark:bg-[#0a0a0c] border border-orange-500/30 rounded-2xl font-mono space-y-1 transition-colors">
                  <span className="text-[10px] uppercase text-zinc-500 dark:text-zinc-400 block font-bold">NILAI BENEFIT BANSOS:</span>
                  <strong className="text-lg text-orange-600 dark:text-orange-400 font-extrabold block">{current.value}</strong>
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
                    className="w-full py-3 rounded-2xl bg-zinc-100 hover:bg-zinc-200 dark:bg-[#16161c] dark:hover:bg-[#202028] text-zinc-800 dark:text-zinc-300 font-mono text-xs font-bold border border-zinc-200 dark:border-[#26262e] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{copied ? "✓" : "📋"}</span>
                    <span>{copied ? "Tersalin ke Clipboard!" : "Copy Parameter Code"}</span>
                  </button>
                </div>

                {/* Curator Info */}
                <div className="pt-4 border-t border-zinc-200 dark:border-[#26262e] flex items-center justify-between text-xs font-mono text-zinc-500">
                  <span>Host Verified</span>
                  <span className="text-zinc-600 dark:text-zinc-400">Arch Linux • 2026</span>
                </div>

              </div>

            </div>

            {/* ======================================================== */}
            {/* RIGHT COLUMN (8-COLS): EXPANSIVE DEEP DOCUMENTATION       */}
            {/* ======================================================== */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Main Title & Executive Summary */}
              <div className="bg-zinc-50 dark:bg-[#121216] border border-zinc-200 dark:border-[#26262e] rounded-3xl p-6 sm:p-10 space-y-5 shadow-sm dark:shadow-xl transition-colors">
                <span className="text-xs font-mono font-bold uppercase text-orange-600 dark:text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full">
                  OFFICIAL DEEP SPECIFICATION
                </span>

                <h1 className="font-serif text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white leading-tight">
                  {current.title}
                </h1>

                <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">
                  {current.summary}
                </p>

                {/* Segment Navigation */}
                <div className="flex items-center space-x-2 border-b border-zinc-200 dark:border-[#26262e] pt-4 text-xs font-mono transition-colors">
                  {['overview', 'specifications', 'implementation'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 uppercase font-bold transition-all border-b-2 cursor-pointer ${activeTab === tab ? 'border-orange-500 text-orange-600 dark:text-orange-400' : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Tab Content 1: Overview */}
                {activeTab === 'overview' && (
                  <div className="space-y-4 pt-2 font-sans text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    <p>{current.overview}</p>
                    <div className="p-4 bg-zinc-100 dark:bg-[#0a0a0c] border border-zinc-200 dark:border-[#26262e] rounded-2xl font-mono text-xs text-zinc-600 dark:text-zinc-400 space-y-1 transition-colors">
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
                        <div key={idx} className="p-3.5 bg-zinc-100 dark:bg-[#0a0a0c] border border-zinc-200 dark:border-[#26262e] rounded-2xl flex flex-col justify-between space-y-1 transition-colors">
                          <span className="text-[10px] text-zinc-500 uppercase">{spec.label}</span>
                          <strong className="text-zinc-900 dark:text-white text-xs">{spec.value}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab Content 3: Step-by-Step Implementation */}
                {activeTab === 'implementation' && (
                  <div className="pt-2 space-y-3 font-mono text-xs">
                    {current.steps?.map((step: string, idx: number) => (
                      <div key={idx} className="p-3.5 bg-zinc-100 dark:bg-[#0a0a0c] border border-zinc-200 dark:border-[#26262e] rounded-2xl flex items-start space-x-3 transition-colors">
                        <span className="w-5 h-5 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center flex-shrink-0 text-[10px]">
                          {idx + 1}
                        </span>
                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">{step}</p>
                      </div>
                    ))}
                  </div>
                )}

              </div>

              {/* Code Snippet & Implementation Inspector */}
              <div className="bg-zinc-50 dark:bg-[#121216] border border-zinc-200 dark:border-[#26262e] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm dark:shadow-xl transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-orange-500 font-mono font-bold text-xs uppercase">Executable Implementation Snippet</span>
                  </div>
                  <button 
                    onClick={handleCopyCode}
                    className="text-xs font-mono text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1 cursor-pointer font-bold"
                  >
                    <span>{copied ? "✓ Copied!" : "Copy Code"}</span>
                  </button>
                </div>

                <div className="p-5 bg-zinc-100 dark:bg-[#0a0a0c] border border-zinc-200 dark:border-[#26262e] rounded-2xl font-mono text-xs text-zinc-900 dark:text-zinc-200 whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto transition-colors">
                  {current.codeSnippet}
                </div>
              </div>

            </div>

          </div>

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
