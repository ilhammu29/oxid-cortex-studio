'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useStudioTheme } from '@/lib/useStudioTheme'
import { useBookmarks } from '@/lib/useBookmarks'

export default function TemplatesPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [zoomImage, setZoomImage] = useState<string | null>(null)
  const [sandboxPreview, setSandboxPreview] = useState<{ url: string; title: string } | null>(null)
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const { darkMode, toggleTheme } = useStudioTheme()
  const { toggleBookmark, isBookmarked } = useBookmarks()

  const handleCopy = (id: string, text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
    }
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2500)
  }

  const templatesList = [
    {
      id: "tpl_pro_dashboard_4pane",
      title: "High-Productivity Pro 4-Pane Studio Dashboard Layout",
      category: "Pro SaaS & AI Dashboard",
      created_by: "OXID Cortex Studio",
      badge: "KARYA SENDIRI #02",
      date: "November 2026",
      screenshotImage: "/screenshots/template_dashboard.png",
      previewUrl: "/prompts",
      description: "Template arsitektur dashboard profesional 4-pane yang mengadopsi struktur referensi NFT.Market Pro: Left Icon Rail vertikal (w-20), Top Action Bar dengan capsule search, Main Center Area dengan Featured Split Card + 3-Column Item Grid, serta Right Finance & Savings Sidebar dengan kurva sparkline chart.",
      specs: [
        "Arsitektur: 4-Pane Responsive Grid (Left Rail, Top Bar, Center Main, Right Sidebar)",
        "Palet Warna: Hitam Doff (#0a0a0c), Deep Obsidian (#121216), Cyber Orange (#ff5722), Neon Emerald (#10b981)",
        "Fitur Utama: Countdown Timer, Double Action Buttons (Inspect & Copy), Sparkline Savings Chart",
        "Framework: Next.js 14 App Router, Tailwind CSS, TypeScript"
      ],
      prompt: `Bertindaklah sebagai Lead Software Architect & UI/UX Engineer kelas dunia.
Tugasmu: Bangun arsitektur dashboard web pro modern 4-pane dengan standar produksi tinggi.
Struktur & Hierarki Layout:
1. Left Navigation Rail (w-16 sm:w-20 fixed/sticky):
   - Logo atas dengan badge rounded-2xl
   - Menu ikon vertikal dengan active indicator pill melengkung
   - Avatar profil di bagian paling bawah
2. Top Bar (h-20 sticky):
   - Deretan filter pills di sisi kiri
   - Search bar berbentuk kapsul di tengah
   - Tombol aksi utama (Sync Radar / Connect) dan theme toggle di sisi kanan
3. Main Center Content Area:
   - Featured Hero Card (Container besar terbelah 2 kolom):
     * Sisi Kiri (Visual Preview): Gambar render mockup, badge avatar insinyur aktif (+28), timer hitung mundur kuota (Quota Refresh in 14H : 17M), dan bottom overlay benefit gratis dengan tombol aksi copy.
     * Sisi Kanan (Metadata): Segment tabs (Details, Parameters, Changelog), timestamp verifikasi, judul besar H1, naskah teknis, dan profil kreator di footer.
   - All Items Section (3-Column Item Grid):
     * Header section dengan counter total items dan sorting dropdown
     * Kartu item 3 kolom dengan menu tiga titik, counter hati, visual thumbnail, benefit price, dan 2 tombol aksi bawah (Inspect & Copy)
4. Right Sidebar (w-80):
   - Widget 'Studio Savings / Quota' dengan kurva sparkline SVG grafik hijau neon, kalkulator penghematan biaya ($28k+ Saved), dan tombol refresh.
   - Featured Creators mini cards
   - Live Activity stream feed
Gunakan Next.js 14 App Router dan Tailwind CSS dengan tema Hitam Doff (#0a0a0c) dan aksen Cyber Flame Orange (#ff5722).`
    },
    {
      id: "tpl_duke_nft",
      title: "Duke-Style Ultra-Modern NFT Showcase Layout",
      category: "Web3 & AI Art Portal",
      created_by: "OXID Cortex Studio",
      badge: "KARYA SENDIRI #01",
      date: "November 2026",
      screenshotImage: "/screenshots/template_home.png",
      previewUrl: "/",
      description: "Template replikasi visual berkelas dunia yang mengadopsi struktur estetika NFT.Market Duke 100%: 3-Column Header Simetris, Hero Section dengan kartu miring 3D bergaya layered cards, Carousel 4-Drop Koleksi Visual, Live Activity Stream interaktif, dan Featured Artists Showcase.",
      specs: [
        "Desain: 7 Zona Eksplorasi Visual (Hero 3D, Drops Carousel, Live Activity, Top Artists)",
        "Interaksi: Real-time Live Scraper trigger button, carousel next/prev state, dan spotlight search Ctrl+K",
        "Aset Grafis: 4 SVG Vektor Kustom (Copilot, Fintech, Editorial, Hardware)",
        "Styling: Glassmorphism header, badge verified, and custom scrollbars"
      ],
      prompt: `Bertindaklah sebagai Lead Front-End Engineer & UI/UX Designer kelas atas.
Tugasmu: Replikasi penuh tata letak dan estetika Duke NFT Marketplace ke dalam aplikasi portal web berita/intelijen AI modern.
Spesifikasi Detail Antarmuka:
1. Header Simetris 3-Kolom (Sticky Glassmorphism):
   - Kiri: 5 Menu navigasi utama
   - Tengah: Brand logo OXID Labs melingkar putih + teks uppercase
   - Kanan: Tombol spotlight search (Ctrl+K), Notification Bell dengan popover floating, sakelar tema, dan tombol aksi oranye
2. Hero Section 2-Kolom:
   - Sisi Kiri: Headline font serif berbobot tebal, deskripsi tajam, CTA ganda, dan stat counter 3 kolom (250+ Drops, 12.8k Quotas, 99.8% Speed)
   - Sisi Kanan: Kartu bertumpuk 3D (Layered Angled Cards) dengan kartu belakang terotasi 6 derajat
3. Featured Drops Showcase:
   - Carousel interaktif 4 kartu dengan tombol panah melingkar bergaris tipis 1px
4. Live Activity Stream:
   - Feed data scraper terbaru dengan avatar kreator asli (@karpathy, @swyx, @shuding_, @sama)
5. Bento Grid AI Design Vault:
   - Bento box interaktif dengan OpenGraph capture asli dan tombol salin prompt`
    }
  ]

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
            <Link href="/intel" className="p-3 rounded-2xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-[#16161c] transition-all" title="Threads Intel Live">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
            </Link>
            <Link href="/templates" className="p-3 rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/30 transition-all" title="Karya Templates Kita (Active)">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>
            </Link>
          </nav>
        </div>

        <div className="w-10 h-10 rounded-2xl bg-white p-1 border border-zinc-200 flex items-center justify-center shadow-lg shadow-orange-500/20" title="OXID Security Verified">
          <img src="/images/oxid-logo.png" alt="OXID" className="w-full h-full object-contain" />
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* 2. TOP BAR (MOBILE RESPONSIVE COMPACT WITH THEME TOGGLE) */}
        <header className="border-b border-zinc-200 dark:border-[#26262e] bg-white/95 dark:bg-[#0a0a0c]/95 backdrop-blur-md p-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 font-mono text-xs transition-colors">
          <div className="flex items-center gap-2">
            <Link href="/" className="sm:hidden w-7 h-7 rounded-full bg-white p-1 flex items-center justify-center mr-1 border border-zinc-200">
              <img src="/images/oxid-logo.png" alt="OXID" className="w-full h-full object-contain" />
            </Link>
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
            <span className="font-bold text-zinc-900 dark:text-white uppercase text-[11px] sm:text-xs tracking-wider truncate">
              KARYA TEMPLATES STUDIO
            </span>
          </div>

          <div className="flex items-center gap-2">
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
              href="/prompts"
              className="px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full bg-[#16161c] hover:bg-orange-500 hover:text-white text-orange-400 border border-zinc-300 dark:border-[#26262e] font-bold transition-all shadow-md text-xs whitespace-nowrap"
            >
              Prompt Lab →
            </Link>
          </div>
        </header>

        {/* 3. MAIN CENTER AREA + RIGHT SIDEBAR */}
        <div className="flex-1 flex flex-col xl:flex-row min-w-0">
          
          <main className="flex-1 p-4 sm:p-8 pb-28 sm:pb-8 space-y-8 min-w-0 overflow-y-auto">
            
            <div className="space-y-2">
              <h1 className="font-serif text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white">
                Koleksi Template Web &amp; Prompt Generator (Aset Mandiri)
              </h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl font-sans">
                Dokumentasi hasil karya desain web kita sendiri lengkap dengan gambar screenshot hasil render nyata, prompt master pembentuknya, dan sandbox preview interaktif.
              </p>
            </div>

            {/* Templates List */}
            <div className="space-y-10">
              {templatesList.map(tpl => (
                <div 
                  key={tpl.id}
                  className="bg-zinc-50 dark:bg-[#121216] border border-zinc-200 dark:border-[#26262e] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm dark:shadow-xl transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-[#26262e] pb-4 font-mono text-xs transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/30 px-3 py-1 rounded-full">
                          {tpl.badge}
                        </span>
                        <span className="text-zinc-500">{tpl.category}</span>
                        {/* Bookmark Button */}
                        <button
                          onClick={() => toggleBookmark(tpl.id)}
                          className={`p-1 rounded-full border transition-all cursor-pointer text-xs ${isBookmarked(tpl.id) ? 'bg-orange-500 text-white border-orange-500 shadow-xs' : 'bg-zinc-200/60 dark:bg-black/60 text-zinc-500 border-zinc-300 dark:border-[#26262e]'}`}
                          title={isBookmarked(tpl.id) ? 'Hapus Bookmark' : 'Simpan ke Personal Vault'}
                        >
                          ⭐
                        </button>
                      </div>
                      <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white pt-1">{tpl.title}</h2>
                      <p className="text-[11px] text-zinc-500">Karya resmi: <strong>{tpl.created_by}</strong> • {tpl.date}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Live Sandbox Interactive Preview Button */}
                      <button 
                        onClick={() => setSandboxPreview({ url: tpl.previewUrl, title: tpl.title })}
                        className="px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-mono text-xs font-bold transition-all shadow-md shadow-emerald-500/25 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                        title="Jalankan Live Sandbox Interaktif dengan Switcher Layar"
                      >
                        <span>▶</span>
                        <span>Live Sandbox</span>
                      </button>

                      <button 
                        onClick={() => handleCopy(tpl.id, tpl.prompt)}
                        className="px-5 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-mono text-xs font-bold transition-all shadow-md shadow-orange-500/25 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                      >
                        <span>{copiedId === tpl.id ? "✓ Prompt Tersalin" : "Salin Prompt Template"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Screenshot Container with Click to Zoom */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-zinc-500 uppercase block font-bold">Screenshot Hasil Render Nyata:</span>
                    <div 
                      className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-black border border-zinc-200 dark:border-[#26262e] cursor-pointer group shadow-md dark:shadow-xl transition-colors"
                      onClick={() => setZoomImage(tpl.screenshotImage)}
                    >
                      <img 
                        src={tpl.screenshotImage} 
                        alt={tpl.title} 
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-4">
                        <span className="text-xs font-mono text-zinc-300 bg-black/60 px-3 py-1 rounded-full border border-white/20">
                          🔍 Klik untuk Zoom Layar Penuh
                        </span>
                        <span className="text-xs font-mono text-orange-400 font-bold">
                          100% Verified Production
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">
                    {tpl.description}
                  </p>

                  {/* Specs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-zinc-100 dark:bg-[#0a0a0c] rounded-2xl border border-zinc-200 dark:border-[#26262e] text-xs font-mono text-zinc-600 dark:text-zinc-400 transition-colors">
                    {tpl.specs.map(spec => (
                      <div key={spec} className="flex items-center gap-2">
                        <span className="text-orange-500 font-bold">✦</span>
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>

                  {/* Prompt Master Box */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                      <span className="uppercase text-orange-500 font-bold">Prompt Master Pembentuk Template:</span>
                      <span>Gunakan di Claude / v0 / Cursor</span>
                    </div>
                    <div className="p-4 bg-zinc-100 dark:bg-[#0a0a0c] border border-zinc-200 dark:border-[#26262e] rounded-2xl font-mono text-xs text-zinc-800 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto transition-colors">
                      {tpl.prompt}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </main>

          {/* 4. RIGHT SIDEBAR */}
          <aside className="w-full xl:w-80 bg-zinc-50 dark:bg-[#0e0e12] border-t xl:border-t-0 xl:border-l border-zinc-200 dark:border-[#26262e] p-6 space-y-8 flex-shrink-0 font-mono text-xs transition-colors">
            <div className="bg-white dark:bg-[#121218] border border-zinc-200 dark:border-[#26262e] rounded-3xl p-6 space-y-3 shadow-sm dark:shadow-xl transition-colors">
              <span className="text-orange-500 font-bold uppercase block">Studio Asset Registry</span>
              <p className="text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed">
                Setiap template dirancang berkelas, hasil akhir yang lolos uji otomatis diabadikan sebagai template resmi studio di repositori ini.
              </p>
              <div className="pt-2 border-t border-zinc-200 dark:border-[#26262e] flex items-center justify-between text-[10px]">
                <span className="text-zinc-500">Total Templates:</span>
                <span className="text-zinc-900 dark:text-white font-bold">{templatesList.length} Templates Active</span>
              </div>
            </div>
          </aside>

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
        <Link href="/templates" className="p-2 text-orange-500 flex flex-col items-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>
          <span className="text-[9px] font-mono font-bold mt-0.5">Templates</span>
        </Link>
      </div>

      {/* Lightbox Zoom Modal */}
      {zoomImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setZoomImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl border border-orange-500/40 shadow-2xl">
            <button 
              onClick={() => setZoomImage(null)}
              className="absolute top-4 right-4 bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold hover:bg-orange-600 transition-all cursor-pointer shadow-lg"
            >
              ✕
            </button>
            <img src={zoomImage} alt="Template Screenshot" className="w-full h-auto max-h-[85vh] object-contain" />
          </div>
        </div>
      )}

      {/* Live Sandbox Interactive Modal */}
      {sandboxPreview && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col p-2 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-700 rounded-3xl overflow-hidden flex-1 flex flex-col shadow-2xl max-w-7xl mx-auto w-full">
            {/* Sandbox Toolbar */}
            <div className="h-14 border-b border-zinc-800 bg-zinc-950 px-4 sm:px-6 flex items-center justify-between font-mono text-xs text-white">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-bold truncate max-w-[160px] sm:max-w-none">Live Interactive Sandbox: {sandboxPreview.title}</span>
              </div>

              {/* Viewport Width Switcher */}
              <div className="flex items-center gap-1.5 bg-zinc-800/80 p-1 rounded-full border border-zinc-700">
                <button
                  onClick={() => setViewportMode('desktop')}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${viewportMode === 'desktop' ? 'bg-orange-500 text-white' : 'text-zinc-400 hover:text-white'}`}
                >
                  🖥️ Desktop (100%)
                </button>
                <button
                  onClick={() => setViewportMode('tablet')}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${viewportMode === 'tablet' ? 'bg-orange-500 text-white' : 'text-zinc-400 hover:text-white'}`}
                >
                  📱 Tablet (768px)
                </button>
                <button
                  onClick={() => setViewportMode('mobile')}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${viewportMode === 'mobile' ? 'bg-orange-500 text-white' : 'text-zinc-400 hover:text-white'}`}
                >
                  📱 Mobile (375px)
                </button>
              </div>

              {/* Close Button */}
              <button 
                onClick={() => setSandboxPreview(null)}
                className="px-3 py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition-all cursor-pointer"
              >
                ✕ Tutup Sandbox
              </button>
            </div>

            {/* Iframe Viewport Container */}
            <div className="flex-1 bg-zinc-950 flex items-center justify-center p-2 sm:p-4 overflow-hidden">
              <div 
                className="h-full bg-black rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl transition-all duration-300 flex flex-col"
                style={{
                  width: viewportMode === 'desktop' ? '100%' : viewportMode === 'tablet' ? '768px' : '375px'
                }}
              >
                <iframe 
                  src={sandboxPreview.url} 
                  title="Template Live Interactive Preview"
                  className="w-full h-full border-0 bg-black"
                />
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
