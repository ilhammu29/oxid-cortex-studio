'use client'

import React, { useState } from 'react'

interface CommunitySubmitModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CommunitySubmitModal({
  isOpen,
  onClose
}: CommunitySubmitModalProps) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<'prompt' | 'grant' | 'tool' | 'template'>('prompt')
  const [providerOrAuthor, setProviderOrAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [content, setContent] = useState('')
  const [submittedBy, setSubmittedBy] = useState('')
  const [statusMessage, setStatusMessage] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    // Security Sanitization: URL Scheme Validation (Prevent XSS/javascript: URI schemes)
    if (url.trim()) {
      const isValidScheme = /^https?:\/\//i.test(url.trim())
      if (!isValidScheme) {
        setStatusMessage('⚠️ Keamanan: Tautan harus diawali dengan https:// atau http:// yang valid.')
        return
      }
    }

    const sanitizedTitle = title.replace(/<[^>]*>?/gm, '').trim()
    const sanitizedAuthor = submittedBy.replace(/<[^>]*>?/gm, '').trim()

    const submission = {
      id: `sub_${Date.now()}`,
      title: sanitizedTitle,
      category,
      providerOrAuthor: providerOrAuthor.replace(/<[^>]*>?/gm, '').trim(),
      url: url.trim(),
      content: content.trim(),
      submittedBy: sanitizedAuthor || 'Anonymous Contributor',
      createdAt: new Date().toISOString(),
      status: 'PENDING_VERIFICATION'
    }

    try {
      const existing = localStorage.getItem('oxid_community_submissions')
      const list = existing ? JSON.parse(existing) : []
      list.unshift(submission)
      localStorage.setItem('oxid_community_submissions', JSON.stringify(list))
    } catch (_) {}

    setStatusMessage('✓ Terima kasih! Senjata AI / Prompt berhasil disubmit untuk diverifikasi.')
    setTimeout(() => {
      setStatusMessage('')
      onClose()
    }, 2200)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0e0e14] border border-zinc-200 dark:border-[#26262e] rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden font-mono text-xs">
        
        {/* Modal Header */}
        <div className="h-16 px-6 border-b border-zinc-200 dark:border-[#26262e] flex items-center justify-between bg-zinc-50 dark:bg-[#121218] flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-base">🚀</span>
            <div>
              <span className="font-bold text-sm text-zinc-900 dark:text-white uppercase tracking-wider block">
                Submit AI Weapon / Grant / Prompt
              </span>
              <span className="text-[10px] text-zinc-500">Kanal sumbangan aset &amp; kuota AI dari komunitas developer</span>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-full bg-zinc-200 dark:bg-[#1c1c24] text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          {statusMessage && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-600 dark:text-emerald-400 font-bold text-center">
              {statusMessage}
            </div>
          )}

          {/* Type Selector */}
          <div className="space-y-1">
            <label className="text-[10px] text-zinc-500 uppercase font-bold">Kategori Entitas</label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'prompt', label: '⚡ Prompt' },
                { id: 'grant', label: '🎁 Bansos AI' },
                { id: 'tool', label: '🛠️ Tool/Repo' },
                { id: 'template', label: '✨ Template' }
              ].map(cat => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setCategory(cat.id as any)}
                  className={`py-2 rounded-xl text-center font-bold transition-all cursor-pointer ${category === cat.id ? 'bg-orange-500 text-white shadow-sm' : 'bg-zinc-100 dark:bg-[#16161c] text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-[#26262e]'}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Title Input */}
          <div className="space-y-1">
            <label className="text-[10px] text-zinc-500 uppercase font-bold">Nama Tool / Judul Prompt *</label>
            <input 
              type="text" 
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Groq High-Speed Routing Prompt..."
              className="w-full bg-zinc-50 dark:bg-[#121216] border border-zinc-300 dark:border-[#26262e] rounded-xl px-3.5 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-orange-500 font-sans"
            />
          </div>

          {/* Provider / Author & URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] text-zinc-500 uppercase font-bold">Provider / Pencipta</label>
              <input 
                type="text" 
                value={providerOrAuthor}
                onChange={(e) => setProviderOrAuthor(e.target.value)}
                placeholder="Contoh: Google / Karpathy / GitHub"
                className="w-full bg-zinc-50 dark:bg-[#121216] border border-zinc-300 dark:border-[#26262e] rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-orange-500 font-sans"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-zinc-500 uppercase font-bold">Tautan Resmi / Repo URL</label>
              <input 
                type="url" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://..."
                className="w-full bg-zinc-50 dark:bg-[#121216] border border-zinc-300 dark:border-[#26262e] rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Prompt / Code / Spec Content */}
          <div className="space-y-1">
            <label className="text-[10px] text-zinc-500 uppercase font-bold">Instruksi Prompt / Deskripsi Teknis *</label>
            <textarea 
              rows={6}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tuliskan isi prompt lengkap, parameter konfigurasi, atau detail kuota gratis di sini..."
              className="w-full bg-zinc-50 dark:bg-[#121216] border border-zinc-300 dark:border-[#26262e] rounded-2xl p-3.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-orange-500 font-mono leading-relaxed resize-none"
            />
          </div>

          {/* Submitted By */}
          <div className="space-y-1">
            <label className="text-[10px] text-zinc-500 uppercase font-bold">Kontributor (Nama / Handle Discord)</label>
            <input 
              type="text" 
              value={submittedBy}
              onChange={(e) => setSubmittedBy(e.target.value)}
              placeholder="@developer_handle"
              className="w-full bg-zinc-50 dark:bg-[#121216] border border-zinc-300 dark:border-[#26262e] rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-orange-500 font-mono"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button 
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all shadow-md shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider"
            >
              <span>🚀 Kirim Sumbangan ke Studio</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}
