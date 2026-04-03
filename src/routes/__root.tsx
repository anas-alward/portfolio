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
import { PreloaderProvider } from '@/context/PreloaderContext'
import appCss from '@/index.css?url'
import { fetchSiteMetadata } from '@/features/home/api'
import NotFoundPage from '@/features/home/pages/404'
import { getStorageUrl } from '@/lib/storage'

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
        const x_handler = getMeta('x_handler', '@alward_dev')
        const site_name = getMeta('site_name', 'Anas Portfolio')
        const description = getMeta('description', 'Portfolio of Anas Alward – Backend Dev')
        const image = getStorageUrl(`${getMeta('image', '/preview.png')}`)
        const url = getMeta('url', import.meta.env.VITE_BASE_URL || 'https://alward.dev')

        return {
            meta: [
                { charSet: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },

                { title },
                { name: 'description', content: description },


                { property: 'og:title', content: title },
                { property: 'og:description', content: description },
                { property: 'og:image', content: image },
                { property: 'og:url', content: url },
                { property: 'og:site_name', content: site_name },
                { property: 'og:type', content: 'website' },

                // Twitter Card - Dynamic
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:title', content: title },
                { name: 'twitter:description', content: description },
                { name: 'twitter:image', content: image },
                { name: 'twitter:site', content: x_handler },
                { name: 'twitter:creator', content: x_handler },
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
    notFoundComponent: NotFoundPage,
})

function RootComponent() {
    return (
        <RootDocument>
            <QueryClientProvider client={queryClient}>
                <PreloaderProvider>
                    <ThemeProvider>
                        <Outlet />
                        <ReactQueryDevtools initialIsOpen={false} />
                    </ThemeProvider>
                </PreloaderProvider>
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

