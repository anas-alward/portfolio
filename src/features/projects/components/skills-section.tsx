import { motion } from 'framer-motion'
import SkillItem from '@/features/skills/components/item'
import { Skill } from '@/types/skills'

interface ProjectSkillsSectionProps {
    skills: Skill[]
    onSkillClick: (skill: Skill) => void
}

export function ProjectSkillsSection({ skills, onSkillClick }: ProjectSkillsSectionProps) {
    if (!skills || skills.length === 0) return null

    return (
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
                {skills.map((skill: Skill) => (
                    <SkillItem
                        key={skill.name}
                        skill={skill}
                        onClick={onSkillClick}
                    />
                ))}
            </div>
        </motion.div>
    )
}
