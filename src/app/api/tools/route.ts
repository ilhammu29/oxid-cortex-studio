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

  // 1. Fetch Real Live GitHub Trending AI Repositories
  let liveGh: any[] = []
  try {
    const ghRes = await fetch(
      'https://api.github.com/search/repositories?q=topic:artificial-intelligence+stars:>1000&sort=updated&order=desc&per_page=8',
      {
        headers: {
          'User-Agent': 'OXID-Cortex-Studio-Agent',
          'Accept': 'application/vnd.github.v3+json'
        },
        next: { revalidate: 300 }
      }
    )

    if (ghRes.ok) {
      const ghData = await ghRes.json()
      liveGh = (ghData.items || []).map((repo: any) => {
        const stCount = repo.stargazers_count || 0
        const starsFormatted = stCount >= 1000 ? `${(stCount / 1000).toFixed(1)}k` : `${stCount}`
        return {
          id: `gh_${repo.owner?.login}_${repo.name}`.toLowerCase(),
          name: repo.full_name,
          category: 'Frontier AI Repo',
          badge: `★ ${starsFormatted}`,
          image: `https://opengraph.githubassets.com/1/${repo.full_name}`,
          type: 'github',
          url: repo.html_url,
          stars: starsFormatted,
          description: repo.description || 'Frontier open-source AI project.',
          language: repo.language || 'Python',
          updated_at: new Date(repo.updated_at).toLocaleDateString('id-ID')
        }
      })
    }
  } catch (err) {
    console.warn('Warning fetching live GitHub repositories:', err)
  }

  // Format Design Resources into unified card structure
  const formattedDesign = cachedDesign.map((d: any) => ({
    id: d.id,
    name: d.name,
    category: d.category,
    badge: d.type === 'skill' ? '✦ Motion Craft' : 'Design Vault',
    image: d.previewImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    type: d.type === 'skill' ? 'skills' : 'design',
    url: d.url,
    stars: 'Verified',
    description: d.description,
    language: 'Design System',
    updated_at: 'Verified Active'
  }))

  // Fallback GitHub items if live fetch was rate-limited
  const fallbackGh = cachedGh.map((g: any) => ({
    id: g.id,
    name: g.full_name || g.name,
    category: 'Frontier AI Repo',
    badge: `★ ${g.stars}`,
    image: g.preview_image || `https://opengraph.githubassets.com/1/${g.full_name}`,
    type: 'github',
    url: g.html_url,
    stars: g.stars,
    description: g.description,
    language: g.language,
    updated_at: g.updated_at
  }))

  const finalGh = liveGh.length > 0 ? liveGh : fallbackGh

  const allItems = [
    ...finalGh,
    ...formattedDesign
  ]

  return NextResponse.json({
    success: true,
    total: allItems.length,
    live_github_count: liveGh.length,
    design_count: formattedDesign.length,
    data: allItems
  })
}
