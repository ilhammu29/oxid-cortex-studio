'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function TemplatesPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [zoomImage, setZoomImage] = useState<string | null>(null)

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
      created_by: "Aira & Minham Studio (Karya Sendiri)",
      badge: "KARYA SENDIRI #02",
      date: "November 2026",
      screenshotImage: "/screenshots/template_dashboard.png",
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
      category: "Frontend Web Showcase",
      created_by: "Aira & Minham Studio (Karya Sendiri)",
      badge: "KARYA SENDIRI #01",
      date: "November 2026",
      screenshotImage: "/screenshots/template_duke.png",
      description: "Template web showcase modern yang mengadopsi hierarki visual Duke-NFT: Header simetris 3-bagian, Stacked Angled Cards di hero dengan circular floating badge, 2 baris collection pills dengan avatar bulat, Featured carousel dengan progress bar 01-04, serta leaderboard 2 kolom.",
      specs: [
        "Palet Warna: Hitam Doff (#0a0a0c) & Cyber Flame Orange (#ff5722)",
        "CSS Transform: 3D Angled Rotation (rotate-[6deg] & rotate-[-4deg])",
        "Framework: Next.js 14 App Router, Tailwind CSS, TypeScript",
        "Responsivitas: Mobile-first 100% responsif"
      ],
      prompt: `Bertindaklah sebagai Senior Frontend Architect & UI/UX Designer kelas dunia.
Tugasmu: Buat landing page modern dengan layout persis seperti Duke-NFT Marketplace, tetapi sesuaikan kontennya untuk studio pengembang AI.
Spesifikasi Visual & Layout:
1. Tema Warna: Hitam Doff (#0a0a0c), Cardbox surface (#121216), hairline border (#26262e), aksen Cyber Flame Orange (#ff5722), teks putih bersih.
2. Header 3-Sisi: Navigasi teks kiri, logo bulat oranye di tengah, kontrol pencarian/tema di kanan.
3. Hero Section (Split 2 Kolom):
   - Kolom Kiri: Garis lengkung dekoratif (squiggly line), Headline tegas, Subtitle, 2 tombol pill (Explore & Create), dan 3 kolom statistik.
   - Kolom Kanan: 2 kartu tumpuk miring 3D (kartu belakang rotate-[6deg], kartu depan rotate-[-4deg]), lencana kompas melingkar di sudut atas, dan ornamen bintang sparkle 4 sudut (✦).
4. Partner Strip: Baris logo teknologi horizontal monokrom.
5. Collections Section: 2 baris tombol pill dengan circular thumbnail avatar di dalamnya dan tombol sentral 'All Collections >'.
6. Featured Carousel: 4 kartu render horizontal dengan progress tracker slider '01 — 04' dan tombol panah melingkar '<' dan '>'.
7. Top Sellers Leaderboard: Peringkat 1 sampai 10 dalam format 2 kolom dengan filter waktu (1D, 7D, 30D).
8. Discover Section: Kategori filter tab di bagian bawah.
Gunakan Next.js 14 App Router, Tailwind CSS, dan pastikan seluruh fungsi 1-klik copy prompt berjalan lancar tanpa error.`
    }
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#f4f4f5] font-sans antialiased selection:bg-orange-500 selection:text-white flex">
      
      {/* 1. LEFT ICON RAIL */}
      <aside className="w-16 sm:w-20 bg-[#0e0e12] border-r border-[#26262e] flex flex-col items-center justify-between py-6 flex-shrink-0 sticky top-0 h-screen z-40">
        <div className="space-y-8 flex flex-col items-center">
          <Link href="/" className="w-10 h-10 rounded-2xl p-1 bg-[#121216] border border-orange-500/40 flex items-center justify-center shadow-lg shadow-orange-500/20 hover:scale-105 transition-transform" title="OXID Labs Home">
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
            <Link href="/intel" className="p-3 rounded-2xl text-zinc-400 hover:text-white hover:bg-[#16161c] transition-all" title="Threads Intel Live">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
            </Link>
            <Link href="/templates" className="p-3 rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/30 transition-all" title="Karya Templates Kita (Active)">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>
            </Link>
          </nav>
        </div>

        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center font-bold text-xs text-white border-2 border-[#26262e]">
          M
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* 2. TOP BAR */}
        <header className="h-20 border-b border-[#26262e] bg-[#0a0a0c]/90 backdrop-blur-md px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
            <span className="font-bold text-white uppercase tracking-wider">
              KARYA TEMPLATES STUDIO &amp; MASTER PROMPT ARCHIVE
            </span>
          </div>

          <Link 
            href="/prompts"
            className="px-5 py-2 rounded-full bg-[#16161c] hover:bg-orange-500 hover:text-white text-orange-400 border border-[#26262e] font-bold transition-all shadow-md"
          >
            Buka 4-Pane Dashboard →
          </Link>
        </header>

        {/* 3. MAIN CENTER AREA + RIGHT SIDEBAR */}
        <div className="flex-1 flex flex-col xl:flex-row min-w-0">
          
          <main className="flex-1 p-6 sm:p-8 space-y-10 min-w-0 overflow-y-auto">
            
            <div className="space-y-2">
              <h1 className="font-serif text-3xl sm:text-4xl font-black text-white">
                Koleksi Template Web &amp; Prompt Generator (Aset Mandiri)
              </h1>
              <p className="text-sm text-zinc-400 max-w-2xl font-sans">
                Dokumentasi hasil karya desain web kita sendiri lengkap dengan gambar screenshot hasil render nyata dan prompt master pembentuknya.
              </p>
            </div>

            {/* Templates List */}
            <div className="space-y-10">
              {templatesList.map(tpl => (
                <div 
                  key={tpl.id}
                  className="bg-[#121216] border border-[#26262e] hover:border-orange-500/50 transition-all rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#26262e] pb-5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase bg-orange-500/20 text-orange-400 border border-orange-500/40 px-2.5 py-0.5 rounded">
                          {tpl.badge}
                        </span>
                        <span className="text-xs text-zinc-500 font-mono">• {tpl.category}</span>
                      </div>
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                        {tpl.title}
                      </h2>
                      <p className="text-xs text-zinc-400 font-mono mt-0.5">Dibuat oleh: {tpl.created_by} ({tpl.date})</p>
                    </div>

                    <button
                      onClick={() => handleCopy(tpl.id, tpl.prompt)}
                      className="px-6 py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-mono text-xs font-bold transition-all shadow-md shadow-orange-500/25 flex items-center gap-2 cursor-pointer self-start lg:self-auto"
                    >
                      <span>{copiedId === tpl.id ? '✓' : '⚡'}</span>
                      <span>{copiedId === tpl.id ? 'Prompt Copied!' : 'Copy Prompt Template'}</span>
                    </button>
                  </div>

                  {/* REAL SCREENSHOT RENDER OF THE TEMPLATE (CLICK TO ZOOM) */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase text-orange-400 font-bold block">
                      Pratinjau Screenshot Hasil Render Nyata (Klik untuk Memperbesar):
                    </span>
                    <div 
                      className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-black border border-[#26262e] cursor-pointer group shadow-xl"
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

                  <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                    {tpl.description}
                  </p>

                  {/* Specs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-[#0a0a0c] rounded-2xl border border-[#26262e] text-xs font-mono text-zinc-400">
                    {tpl.specs.map(spec => (
                      <div key={spec} className="flex items-center gap-2">
                        <span className="text-orange-500 font-bold">✦</span>
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>

                  {/* Prompt Master Box */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                      <span className="uppercase text-orange-500 font-bold">Prompt Master Pembentuk Template:</span>
                      <span>Gunakan di Claude / v0 / Hermes</span>
                    </div>
                    <div className="p-4 bg-[#0a0a0c] border border-[#26262e] rounded-2xl font-mono text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto">
                      {tpl.prompt}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </main>

          {/* 4. RIGHT SIDEBAR */}
          <aside className="w-full xl:w-80 bg-[#0e0e12] border-t xl:border-t-0 xl:border-l border-[#26262e] p-6 space-y-8 flex-shrink-0 font-mono text-xs">
            <div className="bg-[#121218] border border-[#26262e] rounded-3xl p-6 space-y-3 shadow-xl">
              <span className="text-orange-500 font-bold uppercase block">Studio Asset Registry</span>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Setiap kali Minham meminta replikasi desain berkelas, hasil akhir yang lolos uji otomatis diabadikan sebagai template resmi studio di repositori ini.
              </p>
              <div className="pt-2 border-t border-[#26262e] flex items-center justify-between text-[10px]">
                <span className="text-zinc-500">Total Templates:</span>
                <span className="text-white font-bold">2 Templates Active</span>
              </div>
            </div>
          </aside>

        </div>

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

    </div>
  )
}
