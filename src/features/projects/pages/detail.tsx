import { useState, useCallback } from 'react'
import { Link, getRouteApi } from '@tanstack/react-router'
import { getStorageUrl } from '@/lib/storage'
import { ProjectTypeLabel } from '@/features/projects/components/labels'
import { ArrowLeft, ArrowUpRight, Copy, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import SkillItem from '@/features/skills/components/item'
import SkillDialog from '@/features/skills/components/dialog'
import { Project } from '@/types/projects'
import { Skill } from '@/types/skills'
import Tooltip from '@/components/ui/tooltip'
import { Lightbox } from '@/components/ui/lightbox'

interface ProjectDetailPageProps {
    project: Project
}

const route = getRouteApi('/projects/$projectId')

export function ProjectDetailPage({ project }: ProjectDetailPageProps) {
    const { tab } = route.useSearch()
    const [copied, setCopied] = useState(false)
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState("")

    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
    const [isSkillDialogOpen, setIsSkillDialogOpen] = useState(false);

    const projectImage = project.image ? getStorageUrl(`projects/${project.slug}/main.png`) : null
    const additionalImages = (project.images || []).map((image: string) => getStorageUrl(`projects/${project.slug}/${image}`))

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const openLightbox = (image: string) => {
        setSelectedImage(image)
        setIsLightboxOpen(true)
    }

    const handleSkillClick = useCallback((skill: Skill) => {
        setSelectedSkill(skill);
        setIsSkillDialogOpen(true);
    }, []);

    return (
        <div className="w-full min-h-screen flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="w-[90%] tablet:max-w-[800px] py-12 tablet:py-20 flex flex-col gap-10"
            >
                {/* Header Actions */}
                <div className="flex items-center justify-between gap-4">
                    <Link
                        to="/"
                        search={{ tab }}
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit group"
                    >
                        <ArrowLeft
                            size={16}
                            className="group-hover:-translate-x-1 transition-transform"
                        />
                        Back to portfolio
                    </Link>

                    <Tooltip content={copied ? "Link Copied!" : "Copy Link"}>
                        <button
                            onClick={handleCopyLink}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors text-sm font-medium"
                        >
                            {copied ? (
                                <>
                                    <Check size={16} className="text-green-500" />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <Copy size={16} />
                                    Copy Link
                                </>
                            )}
                        </button>
                    </Tooltip>
                </div>

                {/* Hero section */}
                <div className="flex flex-col gap-6">
                    {/* Hero image */}
                    {projectImage && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="w-full aspect-video rounded-2xl overflow-hidden border border-border bg-muted group relative cursor-zoom-in"
                            onClick={() => openLightbox(projectImage)}
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

                {/* Skills section */}
                {project.skills && project.skills.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col gap-6"
                    >
                        <div className="flex flex-col gap-1">
                            <h2 className="text-xl font-bold text-foreground">Technologies Used</h2>
                            <div className="h-1 w-12 bg-primary rounded-full" />
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {project.skills.map((skill: Skill) => (
                                <SkillItem
                                    key={skill.name}
                                    skill={skill}
                                    onClick={handleSkillClick}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Image gallery */}
                {additionalImages.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col gap-6"
                    >
                        <div className="flex flex-col gap-1">
                            <h2 className="text-xl font-bold text-foreground">Project Gallery</h2>
                            <div className="h-1 w-12 bg-primary rounded-full" />
                        </div>
                        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
                            {additionalImages.map((image: string, index: number) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -5 }}
                                    className="aspect-video rounded-xl overflow-hidden border border-border bg-muted group relative cursor-zoom-in"
                                    onClick={() => openLightbox(image)}
                                >
                                    <img
                                        src={image}
                                        alt={`${project.name} gallery image ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </motion.div>

            <Lightbox
                isOpen={isLightboxOpen}
                onClose={() => setIsLightboxOpen(false)}
                src={selectedImage}
                alt={project.name}
            />

            <SkillDialog
                skill={selectedSkill}
                isOpen={isSkillDialogOpen}
                onClose={() => setIsSkillDialogOpen(false)}
            />
        </div>
    )
}
