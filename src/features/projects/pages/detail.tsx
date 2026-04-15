import { useState, useCallback } from 'react'
import { getRouteApi } from '@tanstack/react-router'
import { getStorageUrl } from '@/lib/storage'
import { motion } from 'framer-motion'
import SkillDialog from '@/features/skills/components/dialog'
import { Project } from '@/types/projects'
import { Skill } from '@/types/skills'
import { Lightbox } from '@/components/ui/lightbox'
import { ProjectHeaderActions } from '@/features/projects/components/header-actions'
import { ProjectHeroSection } from '@/features/projects/components/hero-section'
import { ProjectSkillsSection } from '@/features/projects/components/skills-section'
import { ProjectGallery } from '@/features/projects/components/gallery'

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
    const additionalImages = (project.images || []).map((image: string) => `projects/${project.slug}/${image}`)

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
                <ProjectHeaderActions
                    tab={tab}
                    onCopyLink={handleCopyLink}
                    isCopied={copied}
                />

                <ProjectHeroSection
                    project={project}
                    projectImage={projectImage}
                    onImageClick={openLightbox}
                />

                <ProjectSkillsSection
                    skills={project.skills || []}
                    onSkillClick={handleSkillClick}
                />

                <ProjectGallery
                    images={additionalImages}
                    projectName={project.name}
                    onImageClick={openLightbox}
                />
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
