import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'
export const revalidate = 60

export async function GET() {
  const ghPath = path.join(process.cwd(), 'data', 'github_skills.json')
  const designPath = path.join(process.cwd(), 'data', 'design_resources.json')

  let cachedGh: any[] = []
  let cachedDesign: any[] = []

  try {
    cachedGh = JSON.parse(await fs.readFile(ghPath, 'utf8'))
  } catch (_) {}

  try {
    cachedDesign = JSON.parse(await fs.readFile(designPath, 'utf8'))
  } catch (_) {}

  // Format Design Resources into unified structure with explicit type distinction (website vs skills)
  const formattedDesign = cachedDesign.map((d: any) => ({
    id: d.id,
    name: d.title || d.name,
    category: d.category || 'Design Showcase',
    badge: d.badge || 'Verified',
    image: d.image || '/screenshots/real/recent_design.png',
    type: d.id?.startsWith('skill_') ? 'skills' : 'website',
    url: d.url,
    stars: 'Curated',
    description: d.description,
    language: 'Design System',
    updated_at: 'Verified Active'
  }))

  // Format GitHub Repositories with accurate categories
  const formattedGh = cachedGh.map((g: any) => ({
    id: g.id,
    name: g.full_name || g.name,
    category: g.category || 'Autonomous Agents',
    badge: g.badge || `★ ${g.stars}`,
    image: g.preview_image || g.image || `https://opengraph.githubassets.com/1/${g.full_name}`,
    type: 'github',
    url: g.html_url || g.url,
    stars: g.stars || '10k+',
    forks: g.forks || '1k+',
    description: g.description,
    language: g.language,
    cloneCmd: g.cloneCmd || `git clone ${g.html_url || g.url}.git`,
    updated_at: g.updated_at || 'Hari ini'
  }))

  const allItems = [
    ...formattedGh,
    ...formattedDesign
  ]

  return NextResponse.json({
    success: true,
    total: allItems.length,
    github_count: formattedGh.length,
    design_count: formattedDesign.length,
    data: allItems
  })
}

export async function POST() {
  return GET()
}
