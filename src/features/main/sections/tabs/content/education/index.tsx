import { useState } from "react";
import EducationItem from "./item";
import EducationSkeleton from "./skeleton";
import Pagination from "@/components/ui/pagination";
import { usePaginatedEducations } from "@/hooks/useEducations";

const EducationTabContent = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, pageSize } = usePaginatedEducations(page);
    const education = data?.data;
    const totalPages = data?.totalPages || 0;

    if (isLoading) {
        return (
            <section className="w-full">
                <div className="flex flex-col divide-y divide-neutral-100">
                    {[...Array(pageSize)].map((_, i) => (
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
