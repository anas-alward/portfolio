import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import MainPage from '@/features/home/pages'
import Preloader from '@/components/ui/preloader'
import { useProfile } from '@/hooks/useProfile'
import { useSettings } from '@/hooks/useSettings'
import { usePreloader } from '@/context/PreloaderContext'

import { z } from 'zod'

const homeSearchSchema = z.object({
    tab: z.string().optional(),
})

export const Route = createFileRoute('/')({
    validateSearch: (search) => homeSearchSchema.parse(search),
    component: Home,
})

function Home() {
    const { isLoading } = useProfile({ order: undefined })
    const { isLoading: settingsLoading } = useSettings()
    const { hasLoaded, setHasLoaded } = usePreloader()
    const [isReady, setIsReady] = useState(false)
    const [minLoaderFinished, setMinLoaderFinished] = useState(false)

    useEffect(() => {
        if (hasLoaded) return;

        const timer = setTimeout(() => {
            setMinLoaderFinished(true)
        }, 2000)
        return () => clearTimeout(timer)
    }, [hasLoaded])

    const showLoader = !hasLoaded && (isLoading || settingsLoading || !minLoaderFinished)

    return (
        <>
            {!hasLoaded && (
                <Preloader
                    isLoading={showLoader}
                    onExitComplete={() => {
                        setIsReady(true)
                        setHasLoaded(true)
                    }}
                />
            )}
            <MainPage isReady={hasLoaded || isReady} />
        </>
    )
}
