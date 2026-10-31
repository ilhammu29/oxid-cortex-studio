import React from 'react'
import { Flame, Search } from 'lucide-react'

export function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      {/* Top Ticker & Date */}
      <div className="border-b border-zinc-100 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between text-xs text-zinc-600 font-medium">
          <div className="flex items-center space-x-3">
            <span className="flex items-center text-red-600 font-bold uppercase tracking-wider text-[11px]">
              <Flame className="w-3.5 h-3.5 mr-1" /> Sorotan
            </span>
            <span className="hidden sm:inline text-zinc-400">|</span>
            <span className="truncate max-w-xs sm:max-w-md">KTT Energi Terbarukan ASEAN Sepakati Kerangka Net Zero 2050</span>
          </div>
          <div className="hidden sm:flex items-center space-x-4 text-zinc-500">
            <span>Sabtu, 31 Oktober 2026</span>
            <span>•</span>
            <span className="hover:text-zinc-900 cursor-pointer">E-Paper</span>
            <span className="hover:text-zinc-900 cursor-pointer">Langganan</span>
          </div>
        </div>
      </div>

      {/* Main Masthead Branding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between border-b border-zinc-200">
        <div className="hidden md:block w-48 text-left text-xs text-zinc-500">
          <p className="font-semibold text-zinc-800">EDISI NUSANTARA</p>
          <p>Terbit di Seluruh Indonesia</p>
        </div>

        <div className="text-center">
          <h1 className="font-serif text-4xl sm:text-6xl font-black tracking-tight text-zinc-900 uppercase">
            Harian Nusantara
          </h1>
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 mt-2 font-medium">
            Jurnalisme Independen, Tajam, dan Terpercaya
          </p>
        </div>

        <div className="hidden md:flex w-48 items-center justify-end">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari berita..."
              className="pl-8 pr-3 py-1.5 text-xs bg-zinc-100 border border-zinc-200 rounded-none focus:outline-none focus:border-zinc-500"
            />
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-2.5" />
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-center space-x-6 sm:space-x-8 text-xs sm:text-sm font-semibold tracking-wider uppercase text-zinc-700 overflow-x-auto">
        <a href="#politik" className="hover:text-red-600 transition-colors py-2 border-b-2 border-transparent hover:border-red-600">Politik</a>
        <a href="#ekonomi" className="hover:text-red-600 transition-colors py-2 border-b-2 border-transparent hover:border-red-600">Ekonomi</a>
        <a href="#dunia" className="hover:text-red-600 transition-colors py-2 border-b-2 border-transparent hover:border-red-600">Internasional</a>
        <a href="#teknologi" className="hover:text-red-600 transition-colors py-2 border-b-2 border-transparent hover:border-red-600">Teknologi</a>
        <a href="#opini" className="hover:text-red-600 transition-colors py-2 border-b-2 border-transparent hover:border-red-600">Opini</a>
        <a href="#investigasi" className="hover:text-red-600 transition-colors py-2 border-b-2 border-transparent hover:border-red-600">Investigasi</a>
      </nav>
    </header>
  )
}
