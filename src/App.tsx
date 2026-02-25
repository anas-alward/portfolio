import { useEffect } from 'react'
import MainPage from './features/main/page'
import Preloader from './components/ui/preloader'
import { useProfile } from './hooks/useProfile'
import { getStorageUrl } from './lib/storage'

function App() {
  const { data: profile, isLoading } = useProfile({ order: undefined })

  useEffect(() => {
    if (!profile) return

    const title = profile.primary_title || 'Anas Portfolio'
    const description = `${title} — ${profile.secondary_title || 'Personal Portfolio'}`
    const imageUrl = profile.image ? getStorageUrl(profile.image) : ''
    const currentUrl = window.location.href

    // Helper to set or create a meta tag
    const setMeta = (attr: 'property' | 'name', key: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    // Update page title
    document.title = title

    // Primary meta
    setMeta('name', 'description', description)

    // Open Graph
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', currentUrl)
    if (imageUrl) setMeta('property', 'og:image', imageUrl)

    // Twitter Card
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:url', currentUrl)
    if (imageUrl) setMeta('name', 'twitter:image', imageUrl)

    // Dynamic favicon from profile image
    if (profile.image) {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.src = imageUrl
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const size = 64 // Favicon size
        canvas.width = size
        canvas.height = size
        const ctx = canvas.getContext('2d')

        if (ctx) {
          // Create circular clipping path
          ctx.beginPath()
          ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
          ctx.closePath()
          ctx.clip()

          // Draw image
          ctx.drawImage(img, 0, 0, size, size)

          // Update favicon
          const roundedUrl = canvas.toDataURL('image/png')
          let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']")

          if (!link) {
            link = document.createElement('link')
            link.rel = 'icon'
            document.getElementsByTagName('head')[0].appendChild(link)
          }

          link.href = roundedUrl
          link.type = 'image/png'
        }
      }
    }
  }, [profile])

  return (
    <>
      <Preloader isLoading={isLoading} />
      <MainPage />
    </>
  )
}

export default App
