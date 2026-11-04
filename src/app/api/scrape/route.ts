import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'
export const revalidate = 60

export async function GET() {
  const dataPath = path.join(process.cwd(), 'data', 'scraped_threads.json')
  let cachedData: any[] = []

  try {
    const fileContents = await fs.readFile(dataPath, 'utf8')
    cachedData = JSON.parse(fileContents)
  } catch (_) {}

  // 1. Fetch Real Hugging Face Daily Papers (Frontier Research Published Today)
  let livePapers: any[] = []
  try {
    const hfRes = await fetch('https://huggingface.co/api/daily_papers', {
      headers: { 'User-Agent': 'OXID-Hub-Client' },
      next: { revalidate: 300 }
    })
    if (hfRes.ok) {
      const papers = await hfRes.json()
      livePapers = papers.slice(0, 10).map((p: any) => {
        const item = p.paper || {}
        const authors = item.authors ? item.authors.map((a: any) => a.name).slice(0, 2).join(', ') : 'Frontier AI Researcher'
        return {
          id: `hf_${item.id}`.replace(/\./g, '_'),
          author_handle: `arxiv:${item.id}`,
          author_name: authors,
          author_avatar: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg',
          content: item.summary ? (item.summary.length > 220 ? item.summary.substring(0, 220) + '...' : item.summary) : item.title,
          category: 'Frontier AI Papers',
          image_url: '/screenshots/real/cloudflare_workers_ai.png',
          prompt: `Research Abstract: ${item.title} — Published on arXiv (${item.id}). Analyze methodology, benchmark implications, and autonomous reasoning performance.`,
          model_used: 'Hugging Face Daily Papers',
          aspect_ratio: '16:9',
          post_url: `https://huggingface.co/papers/${item.id}`,
          post_date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('id-ID') : 'Hari ini',
          scraped_at: new Date().toISOString(),
          is_real_live_data: true,
          cortex_insight: `Riset AI frontier terbaru terindeks hari ini di Hugging Face Papers (${item.upvotes || 0} upvotes).`,
          aira_action: 'Kaji arsitektur model dan terapkan insight ke prompt engineering.'
        }
      })
    }
  } catch (err) {
    console.warn('Warning fetching Hugging Face papers:', err)
  }

  // 2. Fetch Real HackerNews AI & Engineering Drops with Dynamic Categorization
  let liveHNAgents: any[] = []
  try {
    const hnRes = await fetch('https://hn.algolia.com/api/v1/search_by_date?tags=story&query=LLM+OR+AI+OR+Agent&hitsPerPage=8', {
      headers: { 'User-Agent': 'OXID-Hub-Client' },
      next: { revalidate: 300 }
    })
    if (hnRes.ok) {
      const hnData = await hnRes.json()
      liveHNAgents = (hnData.hits || []).map((h: any) => {
        const titleLower = (h.title || '').toLowerCase()
        
        // Intelligent dynamic category classification
        let category = 'Autonomous AI & Coding'
        let imageUrl = '/screenshots/real/v0_dev.png'
        
        if (titleLower.includes('design') || titleLower.includes('ui') || titleLower.includes('css') || titleLower.includes('svg')) {
          category = 'AI Design & Motion Skills'
          imageUrl = '/screenshots/real/shadcn_ui.png'
        } else if (titleLower.includes('free') || titleLower.includes('grant') || titleLower.includes('quota') || titleLower.includes('pricing') || titleLower.includes('credit')) {
          category = 'Bansos AI & Cloud Quotas'
          imageUrl = '/screenshots/real/google_ai_studio.png'
        } else if (titleLower.includes('paper') || titleLower.includes('arxiv') || titleLower.includes('benchmark') || titleLower.includes('eval')) {
          category = 'Frontier AI Papers'
          imageUrl = '/screenshots/real/cloudflare_workers_ai.png'
        } else if (titleLower.includes('flux') || titleLower.includes('midjourney') || titleLower.includes('art') || titleLower.includes('prompt')) {
          category = 'AI Generative Art & Prompts'
          imageUrl = '/screenshots/real/emil_animations.png'
        }

        return {
          id: `hn_${h.objectID}`,
          author_handle: h.author || 'hackernews',
          author_name: `${h.author} (HN Community)`,
          author_avatar: 'https://news.ycombinator.com/favicon.ico',
          content: h.story_text ? (h.story_text.replace(/<[^>]+>/g, '').substring(0, 200) + '...') : h.title,
          category,
          image_url: imageUrl,
          prompt: `HN Discussion: ${h.title} (${h.points || 1} points, ${h.num_comments || 0} comments). Direct Link: ${h.url || `https://news.ycombinator.com/item?id=${h.objectID}`}`,
          model_used: 'HackerNews Community',
          aspect_ratio: '16:9',
          post_url: h.url || `https://news.ycombinator.com/item?id=${h.objectID}`,
          post_date: h.created_at ? new Date(h.created_at).toLocaleDateString('id-ID') : 'Hari ini',
          scraped_at: new Date().toISOString(),
          is_real_live_data: true,
          cortex_insight: `Diskusi & peluncuran agen/tool AI terbaru dari komunitas HackerNews (${h.points || 1} points).`,
          aira_action: 'Evaluasi adopsi alat dan arsitektur yang dibahas.'
        }
      })
    }
  } catch (err) {
    console.warn('Warning fetching HackerNews drops:', err)
  }

  // Balanced Multi-Category Blend:
  // Interleave live updates with cached community posts so all categories are represented
  const combined: any[] = []
  const maxLen = Math.max(cachedData.length, livePapers.length, liveHNAgents.length)
  
  for (let i = 0; i < maxLen; i++) {
    if (i < livePapers.length) combined.push(livePapers[i])
    if (i < cachedData.length) combined.push(cachedData[i])
    if (i < liveHNAgents.length) combined.push(liveHNAgents[i])
  }

  // Deduplicate by ID
  const seen = new Set()
  const uniqueItems = combined.filter(item => {
    if (!item.id || seen.has(item.id)) return false
    seen.add(item.id)
    return true
  })

  return NextResponse.json({
    success: true,
    engine: 'Multi-Category Ingestion Radar (HF + HN + Threads)',
    total: uniqueItems.length,
    live_papers_count: livePapers.length,
    live_hn_count: liveHNAgents.length,
    cached_count: cachedData.length,
    data: uniqueItems
  })
}

export async function POST() {
  return GET()
}
