import { useState } from "react";
import EducationItem from "./item";
import EducationSkeleton from "./skeleton";
import Pagination from "@/components/ui/pagination";
import { usePaginatedEducations } from "@/hooks/useEducations";

const EducationTabContent = () => {
    const [page, setPage] = useState(1);
    const pageSize = 5;

    const { data, isLoading } = usePaginatedEducations(page, pageSize);
    const education = data?.data;
    const totalCount = data?.count || 0;
    const totalPages = Math.ceil(totalCount / pageSize);

    if (isLoading) {
        return (
            <section className="w-full">
                <div className="flex flex-col divide-y divide-neutral-100">
                    {[...Array(3)].map((_, i) => (
                        <EducationSkeleton key={i} />
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="w-full">
            <div className="flex flex-col divide-y divide-neutral-100">
                {education?.map((edu) => (
                    <EducationItem key={edu.id} education={edu} />
                ))}
            </div>

            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </section>
    );
};

export default EducationTabContent;
