'use client'

import { useEffect, useState } from 'react'

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('oxid_bookmarks')
      if (saved) {
        setBookmarks(JSON.parse(saved))
      }
    } catch (_) {}
  }, [])

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => {
      const next = prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
      try {
        localStorage.setItem('oxid_bookmarks', JSON.stringify(next))
      } catch (_) {}
      return next
    })
  }

  const isBookmarked = (id: string) => bookmarks.includes(id)

  return { bookmarks, toggleBookmark, isBookmarked }
}
