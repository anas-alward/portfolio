import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import MainPage from '@/features/home/pages'
import Preloader from '@/components/ui/preloader'
import { useSupabaseSingleQuery } from '@/hooks/useSupabase'
import { usePreloader } from '@/context/PreloaderContext'
import { useSettingsStore } from '@/store/settings'
import type { Profile } from '@/types'

import { z } from 'zod'

const homeSearchSchema = z.object({
    tab: z.string().optional(),
})

export const Route = createFileRoute('/')({
    
    validateSearch: (search) => homeSearchSchema.parse(search),
    component: Home,
})

function Home() {
    const { isLoading: isLoading } = useSupabaseSingleQuery<Profile>({
        key: ['profile'],
        table: 'profile',
        params: { order: undefined }
    })
    const { hasLoaded, setHasLoaded } = usePreloader()
    const [isReady, setIsReady] = useState(false)
    const [minLoaderFinished, setMinLoaderFinished] = useState(false)
    const initializeSettings = useSettingsStore(state => state.initialize)

    useEffect(() => {
        if (hasLoaded) return;

        const timer = setTimeout(() => {
            setMinLoaderFinished(true)
        }, 2000)
        return () => clearTimeout(timer)
    }, [hasLoaded])

    // Initialize settings when the component mounts
    useEffect(() => {
        initializeSettings()
    }, [initializeSettings])

    const showLoader = !hasLoaded && (isLoading || !minLoaderFinished)

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
