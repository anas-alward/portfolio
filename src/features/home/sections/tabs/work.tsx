import WorkItem from "@/features/work/components/item";
import WorkSkeleton from "@/features/work/components/skeleton";
import { useQuery } from "@tanstack/react-query";
import { listWork } from "@/features/work/api";


const WorkTabContent = () => {
    const { data, isPending } = useQuery({
        queryKey: ['work'],
        queryFn: async () => await listWork(),
    })
    const work = data?.data;

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
        </div>
    );
};

export default WorkTabContent;
