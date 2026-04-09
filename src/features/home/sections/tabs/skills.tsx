import { useState, useCallback } from "react";
import { SkillItem, SkillSkeleton, SkillDialog } from "@/features/skills/components";
import Pagination from "@/components/ui/pagination";
import { usePaginatedSkills } from "@/features/skills/hooks";
import { Skill } from "@/types";


const SkillTabContent = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, pageSize } = usePaginatedSkills(page);
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const skills = data?.data;
    const totalPages = data?.totalPages || 0;

    const handleSkillClick = useCallback((skill: Skill) => {
        setSelectedSkill(skill);
        setIsDialogOpen(true);
    }, []);

    return (
        <div className="flex flex-col gap-6">

            {/* Grid */}
            <div className="flex flex-wrap gap-4">

                {isLoading
                    ? [...Array(pageSize)].map((_, i) => (
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

            {/* Pagination */}
            <div className="flex justify-center">
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={(newPage) => {
                        setPage(newPage);

                        // Optional: scroll back to top smoothly
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                        });
                    }}
                />
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
