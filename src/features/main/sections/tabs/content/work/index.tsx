import { useState } from "react";
import WorkItem from "./item";
import WorkSkeleton from "./skeleton";
import Pagination from "@/components/ui/pagination";
import { usePaginatedWork } from "@/hooks/useWork";

const WorkTabContent = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, pageSize } = usePaginatedWork(page);
    const work = data?.data;
    const totalPages = data?.totalPages || 0;

    if (isLoading) {
        return (
            <div className="relative border-l border-neutral-700 ml-4 space-y-10">
                {[...Array(pageSize)].map((_, i) => (
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
