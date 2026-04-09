import { useState } from "react";
import EducationItem from "@/features/education/components/item";
import EducationSkeleton from "@/features/education/components/skeleton";
import Pagination from "@/components/ui/pagination";
import { usePaginatedEducations } from "@/features/education/hooks";
import { Education } from "@/types";

const EducationTabContent = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, pageSize } = usePaginatedEducations(page);
    const education = data?.data;
    const totalPages = data?.totalPages || 0;

    if (isLoading) {
        return (
            <div className="flex flex-col gap-2">
                {[...Array(pageSize)].map((_, i) => (
                    <EducationSkeleton key={i} />
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            <div className="divide-y divide-neutral-200">
                {education?.map((item: Education) => (
                    <EducationItem key={item.id} education={item} />
                ))}
            </div>

            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </div>
    );
};

export default EducationTabContent;
