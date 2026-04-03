import { Skeleton } from "@/components/ui/skeleton";

const WorkSkeleton = () => {
    return (
        <div className="relative pl-8">
            <span className="absolute -left-[9px] top-2 w-4 h-4 bg-neutral-200 rounded-full border-4 border-white animate-pulse" />

            <div className="space-y-2">
                {/* Position */}
                <Skeleton className="h-5 w-48" />

                {/* Company • Date */}
                <Skeleton className="h-4 w-64" />

                {/* Description */}
                <div className="space-y-2 mt-2">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-11/12" />
                    <Skeleton className="h-3 w-4/5" />
                </div>
            </div>
        </div>
    );
};

export default WorkSkeleton;
