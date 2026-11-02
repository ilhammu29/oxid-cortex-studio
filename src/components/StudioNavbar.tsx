'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import SearchModal from '@/components/SearchModal'

interface StudioNavbarProps {
  activeRoute?: 'home' | 'prompts' | 'grants' | 'tools' | 'intel' | 'templates' | 'detail'
}

export default function StudioNavbar({ activeRoute = 'home' }: StudioNavbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#000000]/90 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4">
          
          {/* 1. Left: Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group cursor-pointer flex-shrink-0" title="OXID CORTEX STUDIO">
            <div className="w-7 h-7 rounded-full bg-white p-1 flex items-center justify-center shadow-md shadow-white/10 group-hover:scale-105 transition-transform flex-shrink-0">
              <img src="/images/oxid-logo.png" alt="OXID" className="w-full h-full object-contain" />
            </div>
            <div className="flex items-center font-sans text-sm font-bold tracking-tight text-white">
              <span>OXID</span>
              <span className="text-zinc-400 font-light ml-1">CORTEX</span>
            </div>
          </Link>

          {/* 2. Center: Single Focused Navigation Pill Container */}
          <nav className="hidden md:flex items-center px-5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono font-medium space-x-6">
            <Link 
              href="/templates" 
              className={`transition-colors ${activeRoute === 'templates' ? 'text-white font-bold' : 'text-zinc-400 hover:text-white'}`}
            >
              Templates
            </Link>

            <Link 
              href="/prompts" 
              className={`transition-colors ${activeRoute === 'prompts' ? 'text-white font-bold' : 'text-zinc-400 hover:text-white'}`}
            >
              Prompts
            </Link>
            
            <Link 
              href="/grants" 
              className={`transition-colors flex items-center gap-1.5 ${activeRoute === 'grants' ? 'text-white font-bold' : 'text-zinc-400 hover:text-white'}`}
            >
              <span>Bansos AI</span>
              <span className="px-1.5 py-0.2 text-[9px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 rounded-full font-bold">Free</span>
            </Link>

            <Link 
              href="/intel" 
              className={`transition-colors ${activeRoute === 'intel' ? 'text-white font-bold' : 'text-zinc-400 hover:text-white'}`}
            >
              Intel Radar
            </Link>
          </nav>

          {/* 3. Far Right: Search Button in the Corner */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer"
              title="Cari (/)"
            >
              <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="hidden sm:inline text-[11px]">Cari</span>
              <kbd className="px-1.5 py-0.2 rounded bg-white/[0.08] text-[10px] text-zinc-400 font-mono border border-white/[0.1]">/</kbd>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-400 hover:text-white transition-all cursor-pointer"
              title="Menu Navigasi"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/[0.08] bg-[#000000]/95 backdrop-blur-2xl p-4 space-y-2.5 font-mono text-xs">
            <Link 
              href="/templates" 
              onClick={() => setMobileMenuOpen(false)} 
              className={`block p-2.5 rounded-xl border transition-all ${activeRoute === 'templates' ? 'bg-white text-black font-bold border-white' : 'bg-white/[0.03] text-zinc-300 border-white/[0.06]'}`}
            >
              ✨ Templates
            </Link>

            <Link 
              href="/prompts" 
              onClick={() => setMobileMenuOpen(false)} 
              className={`block p-2.5 rounded-xl border transition-all ${activeRoute === 'prompts' ? 'bg-white text-black font-bold border-white' : 'bg-white/[0.03] text-zinc-300 border-white/[0.06]'}`}
            >
              ⚡ Prompts
            </Link>

            <Link 
              href="/grants" 
              onClick={() => setMobileMenuOpen(false)} 
              className={`block p-2.5 rounded-xl border transition-all ${activeRoute === 'grants' ? 'bg-white text-black font-bold border-white' : 'bg-white/[0.03] text-emerald-400 border-white/[0.06]'}`}
            >
              🎁 Bansos AI Free
            </Link>

            <Link 
              href="/intel" 
              onClick={() => setMobileMenuOpen(false)} 
              className={`block p-2.5 rounded-xl border transition-all ${activeRoute === 'intel' ? 'bg-white text-black font-bold border-white' : 'bg-white/[0.03] text-zinc-300 border-white/[0.06]'}`}
            >
              🌐 Intel Radar
            </Link>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
