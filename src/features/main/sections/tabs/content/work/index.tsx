import { useState } from "react";
import WorkItem from "./item";
import WorkSkeleton from "./skeleton";
import Pagination from "@/components/ui/pagination";
import { usePaginatedWork } from "@/hooks/useWork";

const WorkTabContent = () => {
    const [page, setPage] = useState(1);
    const pageSize = 5;

    const { data, isLoading } = usePaginatedWork(page, pageSize);
    const work = data?.data;
    const totalCount = data?.count || 0;
    const totalPages = Math.ceil(totalCount / pageSize);

    if (isLoading) {
        return (
            <div className="relative border-l border-neutral-700 ml-4 space-y-10">
                {[...Array(3)].map((_, i) => (
                    <WorkSkeleton key={i} />
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            <div className="relative border-l border-neutral-700 ml-4 space-y-10">
                {work?.map((item) => (
                    <WorkItem key={item.id} item={item} />
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

export default WorkTabContent;
