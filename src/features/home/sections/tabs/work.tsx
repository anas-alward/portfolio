import WorkItem from "@/features/work/components/item";
import WorkSkeleton from "@/features/work/components/skeleton";
import { useSupabaseQuery } from "@/hooks/useSupabase";
import { Work } from "@/types/work";


const WorkTabContent = () => {
    const { data, isPending } = useSupabaseQuery<Work>({
        key: ['work'],
        table: 'work',
        params: {
            select: '*,companies(*)',
            order: 'order.asc'
        }
    });
    
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
                {data?.map((item) => (
                    <WorkItem key={item.id} item={item} />
                ))}
            </ol>
        </div>
    );
};

export default WorkTabContent;
