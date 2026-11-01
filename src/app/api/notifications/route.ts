import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), 'data')
    const threadsPath = path.join(dataDir, 'scraped_threads.json')
    const cronPath = path.join(dataDir, 'cron_last_run.json')
    const githubPath = path.join(dataDir, 'github_skills.json')

    let threads = []
    let cronMeta = null
    let githubRepos = []

    try {
      const threadsRaw = await fs.readFile(threadsPath, 'utf8')
      threads = JSON.parse(threadsRaw)
    } catch (_) {}

    try {
      const cronRaw = await fs.readFile(cronPath, 'utf8')
      cronMeta = JSON.parse(cronRaw)
    } catch (_) {}

    try {
      const ghRaw = await fs.readFile(githubPath, 'utf8')
      githubRepos = JSON.parse(ghRaw)
    } catch (_) {}

    const notifications = []

    // 1. Cron Ingestion status notification
    if (cronMeta) {
      notifications.push({
        id: "cron_status_sync",
        title: `Siklus Scraper: ${cronMeta.status === 'online' ? 'Online' : 'Standby'} — ${cronMeta.total_sources_scraped || 8} Sumber`,
        type: "Cron Scraper",
        time: cronMeta.last_sync || "Baru saja",
        unread: false,
        link: "/intel"
      })
    }

    // 2. Real Scraped Threads notifications
    threads.forEach((t: any, idx: number) => {
      notifications.push({
        id: `th_notif_${t.id || idx}`,
        title: `${t.author_name || t.author_handle}: ${t.content ? t.content.slice(0, 60) + '...' : 'Wawasan baru terverifikasi'}`,
        type: "Threads Intel",
        time: t.scraped_at || t.post_date || "Tersinkron",
        unread: idx === 0,
        link: "/intel"
      })
    })

    // 3. GitHub Radar notifications
    if (githubRepos.length > 0) {
      const topRepo = githubRepos[0]
      notifications.push({
        id: `gh_notif_${topRepo.id}`,
        title: `Radar GitHub: ${topRepo.full_name || topRepo.name} (${topRepo.stars} stars)`,
        type: "GitHub Radar",
        time: topRepo.updated_at || "Aktif",
        unread: false,
        link: "/tools"
      })
    }

    // Fallback if empty
    if (notifications.length === 0) {
      notifications.push({
        id: "sys_ready",
        title: "Sistem Intelijen Cortex Siaga — Menunggu siklus ingestion berikutnya",
        type: "System",
        time: "Sekarang",
        unread: false,
        link: "/intel"
      })
    }

    return NextResponse.json({
      success: true,
      last_sync: cronMeta?.last_sync || null,
      next_sync: cronMeta?.next_sync || null,
      total: notifications.length,
      notifications
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to generate dynamic notifications'
    }, { status: 500 })
  }
}
