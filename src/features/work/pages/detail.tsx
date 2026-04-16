import { useState } from 'react'
import { getRouteApi } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Work } from '@/types/work'
import { WorkHeaderActions } from '@/features/work/components/header-actions'
import { WorkHeroSection } from '@/features/work/components/hero-section'
import { WorkProjectsSection } from '@/features/work/components/projects-section'

interface WorkDetailPageProps {
    work: Work
}

const route = getRouteApi('/work/$workId')

export function WorkDetailPage({ work }: WorkDetailPageProps) {
    const { tab } = route.useSearch()
    const [copied, setCopied] = useState(false)

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="w-[90%] tablet:max-w-[800px] py-12 tablet:py-20 flex flex-col gap-10"
            >
                <WorkHeaderActions
                    tab={tab}
                    onCopyLink={handleCopyLink}
                    isCopied={copied}
                />

                <WorkHeroSection work={work} />

                {work.projects && work.projects.length > 0 && (
                    <WorkProjectsSection projects={work.projects} />
                )}
            </motion.div>
        </div>
    )
}