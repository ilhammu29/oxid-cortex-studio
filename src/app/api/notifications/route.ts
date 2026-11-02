import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'
export const revalidate = 60

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), 'data')
    const threadsPath = path.join(dataDir, 'scraped_threads.json')
    const cronPath = path.join(dataDir, 'cron_last_run.json')

    let threads: any[] = []
    let cronMeta: any = null

    try {
      threads = JSON.parse(await fs.readFile(threadsPath, 'utf8'))
    } catch (_) {}

    try {
      cronMeta = JSON.parse(await fs.readFile(cronPath, 'utf8'))
    } catch (_) {}

    // Fetch live Hugging Face latest paper for notification
    let latestPaperTitle = null
    try {
      const hfRes = await fetch('https://huggingface.co/api/daily_papers', {
        headers: { 'User-Agent': 'OXID-Cortex' },
        next: { revalidate: 300 }
      })
      if (hfRes.ok) {
        const papers = await hfRes.json()
        if (papers && papers.length > 0) {
          latestPaperTitle = papers[0].paper?.title
        }
      }
    } catch (_) {}

    const notifications: any[] = []

    // 1. Live HF Paper notification
    if (latestPaperTitle) {
      notifications.push({
        id: "hf_live_paper_drop",
        title: `Hugging Face Paper: ${latestPaperTitle.slice(0, 55)}...`,
        type: "Frontier Paper",
        time: "Baru saja",
        unread: true,
        link: "/intel"
      })
    }

    // 2. Cron Ingestion status notification
    notifications.push({
      id: "cron_status_sync",
      title: `Radar Ingestion: ${cronMeta?.status === 'online' ? 'Online' : 'Aktif'} — Multi-Source Dynamic`,
      type: "Live Stream",
      time: cronMeta?.last_sync || "Aktif",
      unread: false,
      link: "/intel"
    })

    // 3. Real Scraped Threads & Community notifications
    threads.slice(0, 5).forEach((t: any, idx: number) => {
      notifications.push({
        id: `th_notif_${t.id || idx}`,
        title: `${t.author_name || t.author_handle}: ${t.content ? t.content.slice(0, 55) + '...' : 'Wawasan terverifikasi'}`,
        type: t.category || "Community Intel",
        time: t.post_date || "Hari ini",
        unread: false,
        link: "/intel"
      })
    })

    return NextResponse.json({
      success: true,
      last_sync: cronMeta?.last_sync || new Date().toISOString(),
      total: notifications.length,
      notifications
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to generate dynamic notifications' }, { status: 500 })
  }
}
