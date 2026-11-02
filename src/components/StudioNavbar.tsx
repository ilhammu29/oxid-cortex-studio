'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import SearchModal from '@/components/SearchModal'
import ModelComparisonArenaModal from '@/components/ModelComparisonArenaModal'
import CommunitySubmitModal from '@/components/CommunitySubmitModal'

interface StudioNavbarProps {
  activeRoute?: 'home' | 'prompts' | 'grants' | 'tools' | 'intel' | 'templates' | 'detail'
}

export default function StudioNavbar({ activeRoute = 'home' }: StudioNavbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isArenaOpen, setIsArenaOpen] = useState(false)
  const [isSubmitOpen, setIsSubmitOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notificationsList, setNotificationsList] = useState<any[]>([])
  const [unreadNotifications, setUnreadNotifications] = useState(1)

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

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#000000]/90 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3">
          
          {/* 1. Left Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group cursor-pointer flex-shrink-0" title="OXID CORTEX STUDIO">
            <div className="w-7 h-7 rounded-full bg-white p-1 flex items-center justify-center shadow-md shadow-white/10 group-hover:scale-105 transition-transform flex-shrink-0">
              <img src="/images/oxid-logo.png" alt="OXID" className="w-full h-full object-contain" />
            </div>
            <div className="flex items-center font-sans text-sm font-bold tracking-tight text-white">
              <span>OXID</span>
              <span className="text-zinc-400 font-light ml-1">CORTEX</span>
            </div>
          </Link>

          {/* 2. Search Pill Button */}
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="hidden xl:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer flex-shrink-0"
            title="Cari Library Prompt (/)"
          >
            <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-[11px]">Cari library prompt</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] text-[9px] text-zinc-400 font-mono border border-white/[0.1]">/</kbd>
          </button>

          {/* 3. Center Navigation Pill Container (Pill Group 1) */}
          <nav className="hidden lg:flex items-center px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono font-medium space-x-5">
            <Link 
              href="/prompts" 
              className={`transition-colors ${activeRoute === 'prompts' ? 'text-white font-bold' : 'text-zinc-400 hover:text-white'}`}
            >
              Prompt Lab
            </Link>
            
            <Link 
              href="/grants" 
              className={`transition-colors flex items-center gap-1.5 ${activeRoute === 'grants' ? 'text-white font-bold' : 'text-zinc-400 hover:text-white'}`}
            >
              <span>Bansos AI</span>
              <span className="px-1.5 py-0.2 text-[9px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 rounded-full font-bold">Free</span>
            </Link>

            <Link 
              href="/tools" 
              className={`transition-colors ${activeRoute === 'tools' ? 'text-white font-bold' : 'text-zinc-400 hover:text-white'}`}
            >
              Tools Radar
            </Link>

            <Link 
              href="/intel" 
              className={`transition-colors ${activeRoute === 'intel' ? 'text-white font-bold' : 'text-zinc-400 hover:text-white'}`}
            >
              Threads Intel
            </Link>

            <Link 
              href="/templates" 
              className={`transition-colors ${activeRoute === 'templates' ? 'text-white font-bold' : 'text-zinc-400 hover:text-white'}`}
            >
              Templates
            </Link>
          </nav>

          {/* 4. Center-Right Action Pill Container (Pill Group 2) */}
          <div className="hidden md:flex items-center px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono space-x-3.5 flex-shrink-0">
            <button
              onClick={() => setIsArenaOpen(true)}
              className="text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Side-by-Side Model Arena"
            >
              <span>⚔️</span>
              <span>Model Arena</span>
            </button>
            <span className="text-white/20">|</span>
            <button
              onClick={() => setIsSubmitOpen(true)}
              className="text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Submit Weapon / Prompt Baru"
            >
              <span>➕ Submit</span>
              <span className="px-1.5 py-0.2 text-[9px] bg-orange-500/15 text-orange-400 border border-orange-500/25 rounded-full font-bold">New</span>
            </button>
          </div>

          {/* 5. Far Right Action Cluster */}
          <div className="flex items-center space-x-2">
            
            {/* Search Button for Mobile/Tablet */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="xl:hidden p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-400 hover:text-white transition-all cursor-pointer"
              title="Cari"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Notification Bell with Dropdown */}
            <div className="relative">
              <button 
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen)
                  if (unreadNotifications > 0) setUnreadNotifications(0)
                }}
                className="relative p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-400 hover:text-white transition-all cursor-pointer"
                title="Pusat Notifikasi Studio"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
                {unreadNotifications > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                )}
              </button>

              {/* Notification Dropdown Panel */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#0c0c0e]/95 backdrop-blur-2xl border border-white/[0.1] shadow-2xl z-50 p-3 space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.06] px-1">
                    <span className="font-bold text-white text-[11px] tracking-wider uppercase flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Radar Updates
                    </span>
                    <span className="text-[10px] text-zinc-500">{notificationsList.length} items</span>
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-1.5 pr-1">
                    {notificationsList.map((notif: any) => (
                      <Link 
                        key={notif.id}
                        href={notif.link || "/intel"}
                        onClick={() => setIsNotificationsOpen(false)}
                        className="block p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.04] transition-all space-y-1 group"
                      >
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-orange-400 font-bold group-hover:text-orange-300">{notif.type}</span>
                          <span className="text-zinc-500">{notif.time}</span>
                        </div>
                        <p className="text-zinc-300 text-xs font-sans line-clamp-2 leading-relaxed">
                          {notif.title}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-400 hover:text-white transition-all cursor-pointer"
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
          <div className="lg:hidden border-t border-white/[0.08] bg-[#000000]/95 backdrop-blur-2xl p-4 space-y-2.5 font-mono text-xs">
            <Link 
              href="/prompts" 
              onClick={() => setMobileMenuOpen(false)} 
              className={`block p-2.5 rounded-xl border transition-all ${activeRoute === 'prompts' ? 'bg-white text-black font-bold border-white' : 'bg-white/[0.03] text-zinc-300 border-white/[0.06]'}`}
            >
              ⚡ Prompt Lab
            </Link>

            <Link 
              href="/grants" 
              onClick={() => setMobileMenuOpen(false)} 
              className={`block p-2.5 rounded-xl border transition-all ${activeRoute === 'grants' ? 'bg-white text-black font-bold border-white' : 'bg-white/[0.03] text-emerald-400 border-white/[0.06]'}`}
            >
              🎁 Bansos AI Free Tier
            </Link>

            <Link 
              href="/tools" 
              onClick={() => setMobileMenuOpen(false)} 
              className={`block p-2.5 rounded-xl border transition-all ${activeRoute === 'tools' ? 'bg-white text-black font-bold border-white' : 'bg-white/[0.03] text-zinc-300 border-white/[0.06]'}`}
            >
              🛠️ Tools Radar
            </Link>

            <Link 
              href="/intel" 
              onClick={() => setMobileMenuOpen(false)} 
              className={`block p-2.5 rounded-xl border transition-all ${activeRoute === 'intel' ? 'bg-white text-black font-bold border-white' : 'bg-white/[0.03] text-zinc-300 border-white/[0.06]'}`}
            >
              🌐 Threads Intel
            </Link>

            <Link 
              href="/templates" 
              onClick={() => setMobileMenuOpen(false)} 
              className={`block p-2.5 rounded-xl border transition-all ${activeRoute === 'templates' ? 'bg-white text-black font-bold border-white' : 'bg-white/[0.03] text-zinc-300 border-white/[0.06]'}`}
            >
              ✨ Templates
            </Link>

            <div className="pt-2 border-t border-white/[0.08] flex items-center gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  setIsArenaOpen(true)
                }}
                className="flex-1 py-2 rounded-xl bg-white/[0.06] border border-white/[0.1] text-center text-zinc-200"
              >
                ⚔️ Arena
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  setIsSubmitOpen(true)
                }}
                className="flex-1 py-2 rounded-xl bg-orange-500/20 border border-orange-500/30 text-center text-orange-300 font-bold"
              >
                ➕ Submit
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Global Modals Mounted Consistently */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <ModelComparisonArenaModal isOpen={isArenaOpen} onClose={() => setIsArenaOpen(false)} />
      <CommunitySubmitModal isOpen={isSubmitOpen} onClose={() => setIsSubmitOpen(false)} />
    </>
  )
}
