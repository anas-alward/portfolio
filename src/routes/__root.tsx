/// <reference types="vite/client" />

import type { ReactNode } from 'react'
import {
    Outlet,
    createRootRoute,
    HeadContent,
    Scripts,
} from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from '@/context/ThemeContext'
import appCss from '@/index.css?url'
import { fetchSiteMetadata } from '@/api/metadata'

// Type for metadata items returned by your API
type MetaItem = { key: string; value: string }

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: 1,
        },
    },
})

export const Route = createRootRoute({
    loader: async () => {
        try {
            const metadata = await fetchSiteMetadata()
            console.log('Fetched metadata:', metadata)
            return { metadata }
        } catch (error) {
            console.error('Failed to fetch site metadata:', error)
            return { metadata: [] }
        }
    },
    head: ({ loaderData }) => {
        const rawMeta = loaderData?.metadata
        const metaList: MetaItem[] = Array.isArray(rawMeta) ? rawMeta : []

        // Helper to get value by key with fallback
        const getMeta = (key: string, fallback: string) => {
            const item = metaList.find((m) => m?.key === key)
            return item?.value || fallback
        }

        const title = getMeta('title', 'Anas Alward | Portfolio')
        const description = getMeta('description', 'Portfolio of Anas Alward – Backend Dev')
        const image = getMeta('image', '/preview.png')
        const url = getMeta('url', import.meta.env.VITE_BASE_URL || 'https://alward.dev')

        return {
            meta: [
                { charSet: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },

                { title },
                { name: 'description', content: description },


                { property: 'og:type', content: 'website' },
                { property: 'og:title', content: title },
                { property: 'og:description', content: description },
                { property: 'og:image', content: image },
                { property: 'og:url', content: url },
                { property: 'og:site_name', content: 'Anas Portfolio' },

                // Twitter Card - Dynamic
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:title', content: title },
                { name: 'twitter:description', content: description },
                { name: 'twitter:image', content: image },
            ],
            links: [
                { rel: 'canonical', href: url },
                { rel: 'stylesheet', href: appCss },
                { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
                { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
                { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-chrome-192x192.png' },
                { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/android-chrome-512x512.png' },
                { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
                { rel: 'manifest', href: '/site.webmanifest' },
            ],
        }
    },

    component: RootComponent,
    notFoundComponent: NotFound,
})

function RootComponent() {
    // ✅ If you need metadata inside the React tree (not <head>), use your hook here:
    // const { data: metadata, isLoading } = useMetadata()

    return (
        <RootDocument>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <Outlet />
                    <ReactQueryDevtools initialIsOpen={false} />
                </ThemeProvider>
            </QueryClientProvider>
        </RootDocument>
    )
}

function RootDocument({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <head>
                <HeadContent />
            </head>
            <body>
                {children}
                <Scripts />
            </body>
        </html>
    )
}

function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 text-center">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>
            <a
                href="/"
                className="px-6 py-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
            >
                Go Back Home
            </a>
        </div>
    )
}