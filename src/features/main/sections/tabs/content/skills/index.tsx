import { useState } from "react";
import SkillItem from "./item";
import SkillSkeleton from "./skeleton";
import Pagination from "@/components/ui/pagination";
import { usePaginatedSkills } from "@/hooks/useSkills";



const SkillTabContent = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, pageSize} = usePaginatedSkills(page);
    const skills = data?.data;
    const totalPages = data?.totalPages || 0;
    
    if (isLoading) {
        return (
            <div className="flex flex-col divide-y divide-neutral-100">
                {[...Array(pageSize)].map((_, i) => (
                    <SkillSkeleton key={i} />
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-col divide-y divide-neutral-100">
                {skills?.map((skill, i) => (
                    <SkillItem key={i} skill={skill} />
                ))}
            </div>

            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(newPage) => {
                    setPage(newPage);
                    // Scroll to top of the skills list or section if needed
                }}
            />
        </div>
    );
};

export default SkillTabContent;
