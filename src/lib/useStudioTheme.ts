'use client'

import { useEffect, useState } from 'react'

export function useStudioTheme() {
  const [darkMode, setDarkMode] = useState<boolean>(true)

  useEffect(() => {
    // Check initial state from class or localStorage
    const savedTheme = localStorage.getItem('nexus_theme')
    if (savedTheme === 'light') {
      setDarkMode(false)
      document.documentElement.classList.remove('dark')
    } else {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'nexus_theme') {
        const isDark = e.newValue !== 'light'
        setDarkMode(isDark)
        if (isDark) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const toggleTheme = () => {
    const nextDark = !darkMode
    setDarkMode(nextDark)
    if (nextDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('nexus_theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('nexus_theme', 'light')
    }
  }

  return { darkMode, toggleTheme }
}
