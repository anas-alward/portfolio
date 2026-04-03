import { useState } from "react";
import WorkItem from "@/features/work/components/item";
import WorkSkeleton from "@/features/work/components/skeleton";
import Pagination from "@/components/ui/pagination";
import { useQuery } from "@tanstack/react-query";
import { listWork } from "@/features/work/api";

const WorkTabContent = () => {
    const [page, setPage] = useState(1);
    const { data, isPending } = useQuery({
        queryKey: ['work', page],
        queryFn: () => listWork(page, 10),
    })
    const work = data?.data;
    const totalPages = data?.count || 0;

    if (isPending) {
        return (
            <div className="relative border-l border-neutral-700 ml-4 space-y-10">
                {[...Array(2)].map((_, i) => (
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
