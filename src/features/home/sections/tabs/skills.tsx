import { useState, useCallback } from "react";
import { SkillItem, SkillSkeleton, SkillDialog } from "@/features/skills/components";
import { usePaginatedSkills } from "@/features/skills/hooks";
import { Skill } from "@/types";


const SkillTabContent = () => {
    const { data, isLoading } = usePaginatedSkills();
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const skills = data?.data;

    const handleSkillClick = useCallback((skill: Skill) => {
        setSelectedSkill(skill);
        setIsDialogOpen(true);
    }, []);

    return (
        <div className="flex flex-col gap-6">

            {/* Grid */}
            <div className="flex flex-wrap gap-4">

                {isLoading
                    ? [...Array(5)].map((_, i) => (
                        <SkillSkeleton key={i} />
                    ))
                    : skills?.map((skill, i) => (
                        <SkillItem
                            key={i}
                            skill={skill}
                            onClick={handleSkillClick}
                        />
                    ))
                }

            </div>

            <SkillDialog
                skill={selectedSkill}
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
            />
        </div>
    );
};

export default SkillTabContent;
