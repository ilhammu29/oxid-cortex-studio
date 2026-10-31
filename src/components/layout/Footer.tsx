import React from 'react'

export function Footer() {
  return (
    <footer className="border-t-2 border-zinc-900 bg-zinc-900 text-zinc-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-zinc-800">
          <div className="md:col-span-2 space-y-4">
            <h2 className="font-serif text-3xl font-black text-white tracking-tight uppercase">
              Harian Nusantara
            </h2>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Didirikan dengan integritas independen untuk menyuarakan fakta, menyajikan analisis mendalam, dan menjunjung tinggi standar jurnalistik terverifikasi.
            </p>
            <div className="pt-2 text-[11px] text-zinc-500">
              Dewan Pers Terverifikasi No. 894/DP/X/2026
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Kategori Berita</h3>
            <ul className="text-xs space-y-2 text-zinc-400">
              <li><a href="#politik" className="hover:text-white">Politik & Hukum</a></li>
              <li><a href="#ekonomi" className="hover:text-white">Ekonomi & Bisnis</a></li>
              <li><a href="#teknologi" className="hover:text-white">Sains & Teknologi</a></li>
              <li><a href="#dunia" className="hover:text-white">Kabar Dunia</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Redaksi & Legal</h3>
            <ul className="text-xs space-y-2 text-zinc-400">
              <li><a href="#redaksi" className="hover:text-white">Susunan Redaksi</a></li>
              <li><a href="#pedoman" className="hover:text-white">Pedoman Siber</a></li>
              <li><a href="#karier" className="hover:text-white">Karier Jurnalis</a></li>
              <li><a href="#kontak" className="hover:text-white">Pengaduan Publik</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500">
          <p>&copy; 2026 PT Nusantara Media Utama. Hak Cipta Dilindungi Undang-Undang.</p>
          <p className="mt-2 sm:mt-0 font-mono text-[10px]">
            Next.js App Router • Tailwind CSS • Supabase • Cloudflare Pages
          </p>
        </div>
      </div>
    </footer>
  )
}
