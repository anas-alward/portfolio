import { motion } from 'framer-motion'
import { Project } from '@/types/projects'
import ProjectItem from '@/features/projects/components/item'

interface WorkProjectsSectionProps {
    projects: Project[]
}

export function WorkProjectsSection({ projects }: WorkProjectsSectionProps) {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-foreground tracking-tight">Main Projects</h2>
                <div className="h-px flex-1 bg-border/50" />
            </div>

            <div className="flex flex-col gap-4">
                {projects.map((project, idx) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * idx }}
                    >
                        <ProjectItem project={project} />
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
