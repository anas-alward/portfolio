import { createFileRoute, Link } from '@tanstack/react-router'
import { useProject } from '@/hooks/useProjects'
import { getStorageUrl } from '@/lib/storage'
import { ProjectTypeLabel } from '@/features/main/sections/tabs/content/projects/labels'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'

export const Route = createFileRoute('/projects/$projectId')({
    component: ProjectDetailPage,
})

function ProjectDetailPage() {
    const { projectId } = Route.useParams()
    const { data: project, isLoading } = useProject(Number(projectId))

    if (isLoading) {
        return <ProjectDetailSkeleton />
    }

    if (!project) {
        return <ProjectNotFound />
    }

    const projectImage = project.image ? getStorageUrl(project.image) : null

    return (
        <div className="w-full min-h-screen flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="w-[90%] tablet:max-w-[700px] py-12 tablet:py-20 flex flex-col gap-8"
            >
                {/* Back button */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit group"
                >
                    <ArrowLeft
                        size={16}
                        className="group-hover:-translate-x-1 transition-transform"
                    />
                    Back to portfolio
                </Link>

                {/* Hero image */}
                {projectImage && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="w-full aspect-video rounded-xl overflow-hidden border border-border bg-muted"
                    >
                        <img
                            src={projectImage}
                            alt={project.name}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                )}

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="flex flex-col gap-6"
                >
                    {/* Title + labels */}
                    <div className="flex flex-col gap-3">
                        <h1 className="text-2xl tablet:text-3xl font-bold text-foreground leading-tight">
                            {project.name}
                        </h1>

                        <div className="flex flex-wrap items-center gap-3">
                            <ProjectTypeLabel type={project.type} />
                            {project.company && (
                                <span className="text-sm text-muted-foreground">
                                    Developed at{' '}
                                    <span className="text-foreground font-medium">
                                        {project.company}
                                    </span>
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-base text-muted-foreground leading-relaxed">
                        {project.description}
                    </p>

                    {/* External link */}
                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity w-fit"
                        >
                            Visit Project
                            <ArrowUpRight size={15} />
                        </a>
                    )}
                </motion.div>
            </motion.div>
        </div>
    )
}

function ProjectDetailSkeleton() {
    return (
        <div className="w-full min-h-screen flex flex-col items-center">
            <div className="w-[90%] tablet:max-w-[700px] py-12 tablet:py-20 flex flex-col gap-8">
                {/* Back button skeleton */}
                <div className="animate-pulse rounded-md bg-muted h-5 w-32" />

                {/* Image skeleton */}
                <div className="animate-pulse rounded-xl bg-muted w-full aspect-video" />

                {/* Content skeleton */}
                <div className="flex flex-col gap-4">
                    <div className="animate-pulse rounded-md bg-muted h-8 w-3/4" />
                    <div className="flex gap-3">
                        <div className="animate-pulse rounded-md bg-muted h-6 w-20" />
                        <div className="animate-pulse rounded-md bg-muted h-6 w-40" />
                    </div>
                    <div className="space-y-2 mt-2">
                        <div className="animate-pulse rounded-md bg-muted h-4 w-full" />
                        <div className="animate-pulse rounded-md bg-muted h-4 w-11/12" />
                        <div className="animate-pulse rounded-md bg-muted h-4 w-4/5" />
                        <div className="animate-pulse rounded-md bg-muted h-4 w-3/4" />
                    </div>
                </div>
            </div>
        </div>
    )
}

function ProjectNotFound() {
    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4">
            <h1 className="text-xl font-bold text-foreground">Project not found</h1>
            <p className="text-sm text-muted-foreground">
                The project you're looking for doesn't exist.
            </p>
            <Link
                to="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
            >
                <ArrowLeft size={15} />
                Back to portfolio
            </Link>
        </div>
    )
}
