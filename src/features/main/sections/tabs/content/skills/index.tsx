import { useState } from "react";
import SkillItem from "./item";
import SkillItemSkeleton from "./skeleton";
import Pagination from "@/components/ui/pagination";
import { usePaginatedSkills } from "@/hooks/useSkills";


const SkillTabContent = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, pageSize } = usePaginatedSkills(page);

    const skills = data?.data;
    const totalPages = data?.totalPages || 0;

    return (
        <div className="flex flex-col gap-6">

            {/* Grid */}
            <div className="flex flex-wrap gap-4">

                {isLoading
                    ? [...Array(pageSize)].map((_, i) => (
                        <SkillItemSkeleton key={i} />
                    ))
                    : skills?.map((skill, i) => (
                        <SkillItem key={i} skill={skill} />
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
        </div>
    );
};

export default SkillTabContent;
