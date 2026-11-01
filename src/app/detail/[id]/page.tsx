'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useStudioTheme } from '@/lib/useStudioTheme'

export default function DetailPage() {
  const params = useParams()
  const id = params?.id as string
  const [copied, setCopied] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { darkMode, toggleTheme } = useStudioTheme()

  const allDetails: Record<string, any> = {
    grant_gcp_1: {
      title: "Google AI Studio & Gemini 1.5 Pro Free Quota",
      provider: "Google Cloud",
      type: "Free Tier / API Grant",
      badge: "Free 1M TPM",
      value: "Gratis (Up to 15 RPM / 1M TPM)",
      claimUrl: "https://aistudio.google.com/",
      category: "Bansos AI",
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
      type: "Hardware Inference",
      badge: "800 T/s LPU",
      value: "Ribuan Request Harian Gratis",
      claimUrl: "https://console.groq.com/",
      category: "Inference Engine",
      summary: "Inference model open-weights kelas dunia (Llama 3.1 70B, Mixtral 8x7B) dengan kecepatan rendering token hingga 800+ token per detik berbasis arsitektur LPU (Language Processing Unit).",
      overview: "Groq merevolusi kecepatan inferensi LLM dengan chip Language Processing Unit (LPU) rancangan mandiri. Untuk para pengembang, Groq menyediakan Cloud Console gratis dengan batas harian ribuan request yang kompatibel 100% dengan OpenAI SDK format.",
      specs: [
        { label: "Model Tersedia", value: "Llama-3.1-70B-Versatile, Llama-3.1-8B-Instant, Mixtral" },
        { label: "Kecepatan Render", value: "500 - 850 Token / Detik" },
        { label: "Batas Request", value: "Hingga 30 RPM / 14,400 RPD gratis" },
        { label: "Kompatibilitas", value: "OpenAI Client Drop-in Replacement" }
      ],
      steps: [
        "Buka https://console.groq.com/ dan buat akun gratis.",
        "Buka menu API Keys dan buat kunci baru.",
        "Arahkan baseURL OpenAI client ke https://api.groq.com/openai/v1."
      ],
      codeSnippet: `import OpenAI from "openai";

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function runGroqInference(prompt: string) {
  return await groq.chat.completions.create({
    model: "llama-3.1-70b-versatile",
    messages: [{ role: "user", content: prompt }],
  });
}`
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
    <main className="min-h-screen bg-[#000000] text-zinc-100 font-sans antialiased selection:bg-orange-500 selection:text-white">
      
      {/* 1. TOP NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#000000]/90 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3">
          
          <Link href="/" className="flex items-center gap-2.5 group cursor-pointer flex-shrink-0" title="OXID CORTEX STUDIO">
            <div className="w-7 h-7 rounded-full bg-white p-1 flex items-center justify-center shadow-md shadow-white/10 group-hover:scale-105 transition-transform flex-shrink-0">
              <img src="/images/oxid-logo.png" alt="OXID" className="w-full h-full object-contain" />
            </div>
            <div className="flex items-center font-sans text-sm font-bold tracking-tight text-white">
              <span>OXID</span>
              <span className="text-zinc-400 font-light ml-1">CORTEX</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono font-medium text-zinc-400 space-x-5">
            <Link href="/templates" className="hover:text-white transition-colors">Templates</Link>
            <Link href="/prompts" className="hover:text-white transition-colors">Prompt Lab</Link>
            <Link href="/grants" className="hover:text-white transition-colors">Bansos AI</Link>
            <Link href="/tools" className="hover:text-white transition-colors">Tools Radar</Link>
            <Link href="/intel" className="hover:text-white transition-colors">Threads Intel</Link>
          </nav>

          <div className="flex items-center space-x-2">
            <Link 
              href="/grants" 
              className="px-4 py-1.5 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-mono font-bold transition-all"
            >
              ← Kembali ke Radar
            </Link>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-400"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
          </div>

        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/[0.08] bg-[#000000]/95 backdrop-blur-2xl p-4 space-y-3 font-mono text-xs">
            <Link href="/templates" onClick={() => setMobileMenuOpen(false)} className="block p-2.5 rounded-xl bg-white/[0.04] text-white">✨ Templates</Link>
            <Link href="/prompts" onClick={() => setMobileMenuOpen(false)} className="block p-2.5 rounded-xl bg-white/[0.04] text-white">⚡ Prompt Lab</Link>
            <Link href="/grants" onClick={() => setMobileMenuOpen(false)} className="block p-2.5 rounded-xl bg-white/[0.04] text-emerald-400">🎁 Bansos AI</Link>
            <Link href="/tools" onClick={() => setMobileMenuOpen(false)} className="block p-2.5 rounded-xl bg-white/[0.04] text-white">🛠️ Tools Radar</Link>
            <Link href="/intel" onClick={() => setMobileMenuOpen(false)} className="block p-2.5 rounded-xl bg-white/[0.04] text-white">🌐 Threads Intel</Link>
          </div>
        )}
      </header>

      {/* 2. READER VIEW CONTENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-20 space-y-8">
        
        {/* Header Breadcrumb */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white text-black">
              {current.badge}
            </span>
            <span className="text-xs font-mono text-zinc-500">•</span>
            <span className="text-xs font-mono text-zinc-400">{current.category}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-[300] tracking-[-1px] text-white">
            {current.title}
          </h1>

          <p className="text-base text-zinc-400 max-w-3xl leading-relaxed font-sans">
            {current.summary}
          </p>
        </div>

        {/* 2-Column Clean Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Overview & Specs */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Overview Card */}
            <div className="p-6 rounded-2xl bg-[#0c0c0e] border border-white/[0.08] space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold block">Overview</span>
              <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                {current.overview}
              </p>
            </div>

            {/* Specs Table Card */}
            <div className="p-6 rounded-2xl bg-[#0c0c0e] border border-white/[0.08] space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold block">Spesifikasi Teknis</span>
              <div className="space-y-2.5 font-mono text-xs">
                {current.specs?.map((s: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-zinc-500">{s.label}</span>
                    <span className="text-white font-bold text-right">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Claim Action */}
            <a 
              href={current.claimUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full block py-3 rounded-full bg-white text-black font-mono text-xs font-bold text-center hover:bg-zinc-200 transition-all shadow-xl"
            >
              Kunjungi Portal Resmi &amp; Klaim ↗
            </a>

          </div>

          {/* Right Column: Code & Steps */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Code Snippet Card */}
            {current.codeSnippet && (
              <div className="rounded-2xl bg-[#0c0c0e] border border-white/[0.08] overflow-hidden">
                <div className="p-4 bg-white/[0.02] border-b border-white/[0.06] flex items-center justify-between font-mono text-xs">
                  <span className="text-zinc-400 text-[11px]">Integration Snippet</span>
                  <button 
                    onClick={handleCopyCode}
                    className="px-3 py-1 rounded-full bg-white text-black font-bold text-[10px] hover:bg-zinc-200 transition-all cursor-pointer"
                  >
                    {copied ? "✓ Tersalin" : "Salin Kode"}
                  </button>
                </div>
                <pre className="p-5 font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed max-h-72">
                  <code>{current.codeSnippet}</code>
                </pre>
              </div>
            )}

            {/* Steps Checklist Card */}
            {current.steps && (
              <div className="p-6 rounded-2xl bg-[#0c0c0e] border border-white/[0.08] space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold block">Langkah Integrasi</span>
                <ol className="space-y-2.5 font-sans text-xs text-zinc-300 list-decimal pl-4">
                  {current.steps.map((st: string, idx: number) => (
                    <li key={idx} className="leading-relaxed pl-1">{st}</li>
                  ))}
                </ol>
              </div>
            )}

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
