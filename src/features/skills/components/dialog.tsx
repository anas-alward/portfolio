import { Dialog } from "@/components/ui/dialog"
import { Skill } from "@/types"
import { getStorageUrl } from "@/lib/storage"
import { Award, Calendar, BarChart2, Tag } from "lucide-react"

interface SkillItemDialogProps {
    skill: Skill;
    isOpen: boolean;
    onClose: () => void;
}

const SkillItemDialog = ({ skill, isOpen, onClose }: SkillItemDialogProps) => {
    const tags = skill.tags ? skill.tags.split(",").map(tag => tag.trim()) : [];
    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            title="Skill Details"
        >
            <div className="flex flex-col gap-8">
                {/* Header: Icon + Name */}
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center border border-border shrink-0">
                        <img
                            src={getStorageUrl(skill.icon)}
                            alt={skill.name}
                            className="w-12 h-12 object-contain"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="text-2xl font-bold text-foreground">
                            {skill.name}
                        </h3>
                        {skill.is_master && (
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded-full w-fit">
                                <Award size={14} />
                                Master
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Experience */}
                    <div className="flex flex-col gap-2 p-4 rounded-xl bg-muted/30 border border-border">
                        <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
                            <Calendar size={16} />
                            Experience
                        </div>
                        <div className="text-lg font-semibold text-foreground">
                            {skill.years} {skill.years === 1 ? 'Year' : 'Years'}
                        </div>
                    </div>

                    {/* Level */}
                    <div className="flex flex-col gap-2 p-4 rounded-xl bg-muted/30 border border-border">
                        <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
                            <BarChart2 size={16} />
                            Proficiency
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="text-lg font-semibold text-foreground">
                                {skill.level}%
                            </div>
                            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary transition-all duration-1000 ease-out"
                                    style={{ width: `${skill.level}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tags */}
                {tags.length > 0 && (
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
                            <Tag size={16} />
                            Related Technologies
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 bg-muted border border-border rounded-lg text-sm text-foreground font-medium"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Dialog>
    )
}

export default SkillItemDialog