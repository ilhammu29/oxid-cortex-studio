'use client'

import React, { useState } from 'react'

interface ModelComparisonArenaModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ModelComparisonArenaModal({
  isOpen,
  onClose
}: ModelComparisonArenaModalProps) {
  const [promptText, setPromptText] = useState(
    'Buat ringkasan arsitektur micro-agent pipeline dengan verifikasi terminal otomatis dan zero-slop UI standard.'
  )
  const [modelA, setModelA] = useState('groq-llama-70b')
  const [modelB, setModelB] = useState('gemini-1.5-flash')
  const [isComparing, setIsComparing] = useState(false)
  const [outputA, setOutputA] = useState('')
  const [outputB, setOutputB] = useState('')
  const [statsA, setStatsA] = useState<{ speed: number; time: number } | null>(null)
  const [statsB, setStatsB] = useState<{ speed: number; time: number } | null>(null)
  const [copiedCol, setCopiedCol] = useState<'A' | 'B' | null>(null)

  if (!isOpen) return null

  const handleRunComparison = () => {
    setIsComparing(true)
    setOutputA('')
    setOutputB('')
    setStatsA(null)
    setStatsB(null)

    const textA = `[GROQ LPU — LLAMA 3.1 70B]
Throughput: Ultra-High Speed | Engine: Custom LPU Hardware

Arsitektur Pipeline Terpilih:
1. Orchestrator DAG: Memetakan dependensi tugas tanpa cyclic loop.
2. Terminal Gatekeeper: Menjalankan eksekusi uji 'npm run build' di lingkungan lokal terisolasi sebelum menandai tiket selesai.
3. Zero-Slop Constraint: Menolak gradasi ungu berlebihan, mengutamakan layout presisi Swiss & kontras teks WCAG AAA.

Kesimpulan: Model optimal untuk komputasi instan berulang dengan latensi sub-50ms.`

    const textB = `[GOOGLE AI STUDIO — GEMINI 1.5 FLASH]
Throughput: High Concurrency | Context: 1M Tokens Capacity

Arsitektur Pipeline Terpilih:
1. Deep Context Ingestion: Mengintegrasikan seluruh dokumen PRD & codebase ke dalam satu konteks raksasa tanpa chunking terfragmentasi.
2. Multi-Turn Verification: Menganalisis diff kode baris per baris terhadap potensi regresi runtime.
3. Ergonomi Antarmuka: Menyediakan komponen drawer responsif dan docking bottom bar ramah sentuhan jempol.

Kesimpulan: Model optimal untuk analisis dokumen multi-file dan instruksi bernuansa kompleks.`

    let idxA = 0
    let idxB = 0
    const start = performance.now()

    // Model A streams faster (Groq LPU simulation)
    const intervalA = setInterval(() => {
      idxA += Math.floor(Math.random() * 10) + 6
      if (idxA >= textA.length) {
        setOutputA(textA)
        clearInterval(intervalA)
        const dur = (performance.now() - start) / 1000
        setStatsA({ speed: Math.floor(textA.length / (dur * 3.5)), time: parseFloat(dur.toFixed(2)) })
      } else {
        setOutputA(textA.slice(0, idxA))
      }
    }, 20)

    // Model B streams steadily
    const intervalB = setInterval(() => {
      idxB += Math.floor(Math.random() * 8) + 4
      if (idxB >= textB.length) {
        setOutputB(textB)
        clearInterval(intervalB)
        const dur = (performance.now() - start) / 1000
        setStatsB({ speed: Math.floor(textB.length / (dur * 3.5)), time: parseFloat(dur.toFixed(2)) })
        setIsComparing(false)
      } else {
        setOutputB(textB.slice(0, idxB))
      }
    }, 30)
  }

  const handleCopy = (col: 'A' | 'B', text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
      setCopiedCol(col)
      setTimeout(() => setCopiedCol(null), 2000)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0e0e14] border border-zinc-200 dark:border-[#26262e] rounded-3xl w-full max-w-6xl max-h-[94vh] flex flex-col shadow-2xl overflow-hidden font-mono text-xs">
        
        {/* Modal Header */}
        <div className="h-16 px-6 border-b border-zinc-200 dark:border-[#26262e] flex items-center justify-between bg-zinc-50 dark:bg-[#121218] flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-base">⚔️</span>
            <div>
              <span className="font-bold text-sm text-zinc-900 dark:text-white uppercase tracking-wider block">
                Side-by-Side Model Comparison Arena
              </span>
              <span className="text-[10px] text-zinc-500">Bandingkan kecepatan inferensi &amp; kualitas penalaran model AI secara langsung</span>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-full bg-zinc-200 dark:bg-[#1c1c24] text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Prompt Input & Trigger Bar */}
        <div className="p-4 bg-zinc-100/60 dark:bg-[#07070a]/60 border-b border-zinc-200 dark:border-[#26262e] space-y-3 flex-shrink-0">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <input 
              type="text" 
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="Masukkan instruksi prompt yang ingin dikomparasikan..."
              className="flex-1 bg-white dark:bg-[#14141c] border border-zinc-300 dark:border-[#26262e] rounded-2xl px-4 py-2.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-orange-500 font-mono"
            />
            <button 
              onClick={handleRunComparison}
              disabled={isComparing || !promptText.trim()}
              className="px-6 py-2.5 rounded-2xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold transition-all shadow-md shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <span>{isComparing ? "↻ Menguji Kedua Model..." : "⚔️ Mulai Komparasi"}</span>
            </button>
          </div>
        </div>

        {/* Comparison Arena: 2 Columns Side by Side */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-[#26262e] min-h-0 overflow-y-auto">
          
          {/* Column A: Model A */}
          <div className="p-5 flex flex-col justify-between space-y-3 bg-white dark:bg-[#0c0c10]">
            <div className="space-y-3 flex-1 flex flex-col">
              {/* Header Model A */}
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-[#26262e]">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-orange-500/10 text-orange-500 font-bold px-2.5 py-0.5 rounded-full border border-orange-500/20">MODEL A</span>
                  <select 
                    value={modelA}
                    onChange={(e) => setModelA(e.target.value)}
                    className="bg-transparent font-bold text-zinc-900 dark:text-white focus:outline-none"
                  >
                    <option value="groq-llama-70b" className="bg-white dark:bg-zinc-900">Groq Llama 3.1 70B (800+ T/s)</option>
                    <option value="deepseek-coder" className="bg-white dark:bg-zinc-900">DeepSeek Coder V2 (Specialist)</option>
                  </select>
                </div>

                {statsA && (
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="text-zinc-500">{statsA.time}s</span>
                    <span className="text-emerald-500 font-bold">{statsA.speed} T/s</span>
                  </div>
                )}
              </div>

              {/* Output Content A */}
              <div className="flex-1 bg-zinc-50 dark:bg-[#07070a] border border-zinc-200 dark:border-[#202028] rounded-2xl p-4 leading-relaxed overflow-y-auto min-h-[260px] text-zinc-800 dark:text-zinc-200">
                {outputA ? (
                  <pre className="whitespace-pre-wrap font-mono text-[11px]">{outputA}</pre>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-400 py-12">
                    <span className="text-xl">⚡</span>
                    <p className="text-center text-[11px] mt-1">Siap untuk pengujian Model A</p>
                  </div>
                )}
              </div>
            </div>

            {outputA && (
              <div className="pt-2 flex items-center justify-between border-t border-zinc-200 dark:border-[#26262e]">
                <span className="text-[10px] text-zinc-500">Latency: ~38ms</span>
                <button 
                  onClick={() => handleCopy('A', outputA)}
                  className="px-3.5 py-1 rounded-full bg-zinc-100 dark:bg-[#181822] hover:bg-orange-500 hover:text-white text-zinc-700 dark:text-zinc-300 transition-all font-bold cursor-pointer"
                >
                  {copiedCol === 'A' ? "✓ Tersalin" : "Salin Output A"}
                </button>
              </div>
            )}
          </div>

          {/* Column B: Model B */}
          <div className="p-5 flex flex-col justify-between space-y-3 bg-zinc-50/50 dark:bg-[#0e0e14]/50">
            <div className="space-y-3 flex-1 flex flex-col">
              {/* Header Model B */}
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-[#26262e]">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-500 font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/20">MODEL B</span>
                  <select 
                    value={modelB}
                    onChange={(e) => setModelB(e.target.value)}
                    className="bg-transparent font-bold text-zinc-900 dark:text-white focus:outline-none"
                  >
                    <option value="gemini-1.5-flash" className="bg-white dark:bg-zinc-900">Gemini 1.5 Flash (1M Context)</option>
                    <option value="cf-workers-ai" className="bg-white dark:bg-zinc-900">Cloudflare Workers Llama 3 (Edge)</option>
                  </select>
                </div>

                {statsB && (
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="text-zinc-500">{statsB.time}s</span>
                    <span className="text-emerald-500 font-bold">{statsB.speed} T/s</span>
                  </div>
                )}
              </div>

              {/* Output Content B */}
              <div className="flex-1 bg-white dark:bg-[#07070a] border border-zinc-200 dark:border-[#202028] rounded-2xl p-4 leading-relaxed overflow-y-auto min-h-[260px] text-zinc-800 dark:text-zinc-200">
                {outputB ? (
                  <pre className="whitespace-pre-wrap font-mono text-[11px]">{outputB}</pre>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-400 py-12">
                    <span className="text-xl">🌐</span>
                    <p className="text-center text-[11px] mt-1">Siap untuk pengujian Model B</p>
                  </div>
                )}
              </div>
            </div>

            {outputB && (
              <div className="pt-2 flex items-center justify-between border-t border-zinc-200 dark:border-[#26262e]">
                <span className="text-[10px] text-zinc-500">Latency: ~112ms</span>
                <button 
                  onClick={() => handleCopy('B', outputB)}
                  className="px-3.5 py-1 rounded-full bg-zinc-100 dark:bg-[#181822] hover:bg-orange-500 hover:text-white text-zinc-700 dark:text-zinc-300 transition-all font-bold cursor-pointer"
                >
                  {copiedCol === 'B' ? "✓ Tersalin" : "Salin Output B"}
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  )
}
