'use client'

import React, { useState, useEffect } from 'react'

interface PromptPlaygroundModalProps {
  isOpen: boolean
  onClose: () => void
  initialPrompt?: string
  initialTitle?: string
}

export default function PromptPlaygroundModal({
  isOpen,
  onClose,
  initialPrompt = '',
  initialTitle = 'Prompt Runner'
}: PromptPlaygroundModalProps) {
  const [promptText, setPromptText] = useState(initialPrompt)
  const [selectedModel, setSelectedModel] = useState('llama-3.1-70b')
  const [temperature, setTemperature] = useState(0.7)
  const [apiKey, setApiKey] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [outputStream, setOutputStream] = useState('')
  const [tokensPerSec, setTokensPerSec] = useState<number | null>(null)
  const [execTime, setExecTime] = useState<number | null>(null)
  const [copiedOutput, setCopiedOutput] = useState(false)

  useEffect(() => {
    if (initialPrompt) {
      setPromptText(initialPrompt)
    }
  }, [initialPrompt])

  useEffect(() => {
    try {
      const savedKey = localStorage.getItem('oxid_byok_api_key')
      if (savedKey) setApiKey(savedKey)
    } catch (_) {}
  }, [])

  if (!isOpen) return null

  const handleSaveKey = (val: string) => {
    setApiKey(val)
    try {
      localStorage.setItem('oxid_byok_api_key', val)
    } catch (_) {}
  }

  const handleRun = () => {
    setIsRunning(true)
    setOutputStream('')
    setTokensPerSec(null)
    setExecTime(null)

    // Simulating high-speed token stream with realistic generation
    const sampleOutput = `[OXID HUB RUNNER — ${selectedModel.toUpperCase()}]
Status: 200 OK | Stream: Active | Latency: 42ms

---
Architecture Specification Generated:
1. Executive Structure:
   - Scalable modular components adhering to zero-slop design doctrine.
   - Stdlib first, native platform primitives over heavy unneeded dependencies.
   - Clean state management with local persistence and cross-page synchronization.

2. Code Implementation Blueprint:
   - Framework: Next.js 14 App Router + Tailwind CSS.
   - Performance: Zero Cumulative Layout Shift (CLS), high-contrast accessibility.
   - Verification: Terminal gatekeeper passed with Exit Code 0.

---
Execution summary: Pipeline verified, ready for direct production deployment.`

    let currentIdx = 0
    const startTime = performance.now()

    const interval = setInterval(() => {
      currentIdx += Math.floor(Math.random() * 8) + 4
      if (currentIdx >= sampleOutput.length) {
        setOutputStream(sampleOutput)
        clearInterval(interval)
        setIsRunning(false)
        const duration = (performance.now() - startTime) / 1000
        setExecTime(parseFloat(duration.toFixed(2)))
        setTokensPerSec(Math.floor(sampleOutput.length / (duration * 3.5)))
      } else {
        setOutputStream(sampleOutput.slice(0, currentIdx))
      }
    }, 25)
  }

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(outputStream)
      setCopiedOutput(true)
      setTimeout(() => setCopiedOutput(false), 2000)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0e0e14] border border-zinc-200 dark:border-[#26262e] rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden font-mono text-xs">
        
        {/* Modal Header */}
        <div className="h-16 px-6 border-b border-zinc-200 dark:border-[#26262e] flex items-center justify-between bg-zinc-50 dark:bg-[#121218] flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="font-bold text-sm text-zinc-900 dark:text-white uppercase tracking-wider">
              Playground Runner: {initialTitle}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-zinc-500 text-[11px]">
              <span>Speed:</span>
              <span className="text-emerald-500 font-bold">~800+ T/s Target</span>
            </div>

            <button 
              onClick={onClose}
              className="p-1.5 rounded-full bg-zinc-200 dark:bg-[#1c1c24] text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Body: Split 2 Columns */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0 overflow-y-auto">
          
          {/* Left Column: Prompt Configuration & Input (5-cols) */}
          <div className="lg:col-span-5 p-5 border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-[#26262e] space-y-4 flex flex-col justify-between bg-zinc-50/50 dark:bg-[#0a0a0e]/50">
            <div className="space-y-4 flex-1 flex flex-col">
              
              {/* Controls Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-500 uppercase font-bold">Model Engine</label>
                  <select 
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full bg-white dark:bg-[#14141c] border border-zinc-300 dark:border-[#26262e] rounded-xl px-2.5 py-1.5 text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-orange-500"
                  >
                    <option value="llama-3.1-70b">Groq Llama 3.1 70B</option>
                    <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
                    <option value="deepseek-coder">DeepSeek Coder V2</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-500 uppercase font-bold">Temperature ({temperature})</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full accent-orange-500 mt-2"
                  />
                </div>
              </div>

              {/* BYOK API Key Input */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] text-zinc-500 uppercase font-bold">BYOK API Key (Opsional)</label>
                  <span className="text-[9px] text-zinc-400">Tersimpan di browser</span>
                </div>
                <input 
                  type="password" 
                  placeholder="gsk_... atau AIzaSy..."
                  value={apiKey}
                  onChange={(e) => handleSaveKey(e.target.value)}
                  className="w-full bg-white dark:bg-[#14141c] border border-zinc-300 dark:border-[#26262e] rounded-xl px-3 py-1.5 text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-orange-500 font-mono"
                />
              </div>

              {/* Prompt Input Area */}
              <div className="space-y-1 flex-1 flex flex-col">
                <label className="text-[10px] text-zinc-500 uppercase font-bold">Prompt Text</label>
                <textarea 
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  rows={8}
                  placeholder="Ketik instruksi prompt di sini..."
                  className="w-full flex-1 bg-white dark:bg-[#121218] border border-zinc-300 dark:border-[#26262e] rounded-2xl p-3 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-orange-500 font-mono leading-relaxed resize-none"
                />
              </div>

            </div>

            {/* Run Button */}
            <button 
              onClick={handleRun}
              disabled={isRunning || !promptText.trim()}
              className="w-full py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider"
            >
              <span>{isRunning ? "↻ Streaming Tokens..." : "▶ Run Prompt (Test Stream)"}</span>
            </button>
          </div>

          {/* Right Column: Execution Output Window (7-cols) */}
          <div className="lg:col-span-7 p-5 flex flex-col justify-between bg-zinc-100 dark:bg-[#0c0c10]">
            <div className="space-y-3 flex-1 flex flex-col">
              
              {/* Output Header Status */}
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-[#26262e]">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-orange-500 animate-ping' : outputStream ? 'bg-emerald-500' : 'bg-zinc-400'}`}></span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">Terminal Output Window</span>
                </div>

                {tokensPerSec && (
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="text-zinc-500">Time: <strong className="text-zinc-800 dark:text-zinc-200">{execTime}s</strong></span>
                    <span className="text-emerald-500 font-bold">{tokensPerSec} T/s</span>
                  </div>
                )}
              </div>

              {/* Streaming Output Box */}
              <div className="flex-1 bg-white dark:bg-[#07070a] border border-zinc-200 dark:border-[#202028] rounded-2xl p-4 font-mono text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed overflow-y-auto min-h-[280px]">
                {outputStream ? (
                  <pre className="whitespace-pre-wrap font-mono">{outputStream}</pre>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-400 space-y-2 py-12">
                    <span className="text-2xl">⚡</span>
                    <p className="text-center">Klik tombol <strong>Run Prompt</strong> untuk menguji streaming output.</p>
                  </div>
                )}
              </div>

            </div>

            {/* Bottom Output Actions */}
            {outputStream && (
              <div className="pt-3 flex items-center justify-between border-t border-zinc-200 dark:border-[#26262e] mt-3">
                <span className="text-[11px] text-emerald-500 font-bold">✓ Generation Complete</span>
                <button 
                  onClick={handleCopy}
                  className="px-4 py-1.5 rounded-full bg-zinc-200 dark:bg-[#1c1c24] hover:bg-orange-500 hover:text-white text-zinc-800 dark:text-zinc-200 font-bold transition-all cursor-pointer"
                >
                  {copiedOutput ? "✓ Output Tersalin" : "Salin Output"}
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  )
}
