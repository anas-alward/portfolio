import { motion } from 'framer-motion'
import { ProjectTypeLabel } from '@/features/projects/components/labels'
import { ArrowUpRight } from 'lucide-react'
import { Project } from '@/types/projects'

interface ProjectHeroSectionProps {
    project: Project
    projectImage: string | null
    onImageClick: (image: string) => void
}

export function ProjectHeroSection({ project, projectImage, onImageClick }: ProjectHeroSectionProps) {
    return (
        <div className="flex flex-col gap-6">
            {/* Hero image */}
            {projectImage && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="w-full aspect-video rounded-2xl overflow-hidden border border-border bg-muted group relative cursor-zoom-in"
                    onClick={() => onImageClick(projectImage)}
                >
                    <img
                        src={projectImage}
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </motion.div>
            )}

            {/* Header info */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex flex-col gap-4"
            >
                <div className="flex flex-col gap-3" >
                    <h1 className="text-3xl tablet:text-4xl font-bold text-foreground tracking-tight leading-tight">
                        {project.name}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4">
                        <ProjectTypeLabel type={project.type} />
                        {project.company && (
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border/50 text-sm text-muted-foreground">
                                <span>Developed at</span>
                                <span className="text-foreground font-semibold">
                                    {project.company}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed max-w-[90%]">
                    {project.description}
                </p>

                {project.link && (
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-all hover:gap-3 w-fit shadow-lg shadow-primary/20"
                    >
                        Visit Project
                        <ArrowUpRight size={18} />
                    </a>
                )}
            </motion.div>
        </div>
    )
}
