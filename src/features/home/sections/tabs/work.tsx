import { useState } from "react";
import WorkItem from "@/features/work/components/item";
import WorkSkeleton from "@/features/work/components/skeleton";
import Pagination from "@/components/ui/pagination";
import { useQuery } from "@tanstack/react-query";
import { listWork } from "@/features/work/api";
import { useSettings } from '@/features/settings/hooks'
import { SETTINGS_TYPE, SECTION } from "@/types";


const WorkTabContent = () => {
    const [page, setPage] = useState(1);
    const { data: settings } = useSettings({ type: SETTINGS_TYPE.PAGINATION, section: SECTION.WORK });

    const pageSize = (settings?.PAGE_SIZE as number) || 3;
    const { data, isPending } = useQuery({
        queryKey: ['work', page],
        queryFn: async () => await listWork(page, pageSize),
    })
    const work = data?.data;
    const totalPages = data?.totalPages || 0;
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
            <ol className="relative border-l border-border ml-4 space-y-12">
                {work?.map((item) => (
                    <WorkItem key={item.id} item={item} />
                ))}
            </ol>

            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </div>
    );
};

export default WorkTabContent;
