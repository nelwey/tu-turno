import { useEffect } from 'react'

import { CLEANERS } from '#/lib/schedule'

export default function VideoCacheWarmup() {
  useEffect(() => {
    const links: HTMLLinkElement[] = []

    for (const cleaner of CLEANERS) {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'video'
      link.href = cleaner.videoSrc
      document.head.appendChild(link)
      links.push(link)

      fetch(cleaner.videoSrc, { cache: 'force-cache' }).catch(() => {})
    }

    return () => {
      for (const link of links) {
        link.remove()
      }
    }
  }, [])

  return null
}
