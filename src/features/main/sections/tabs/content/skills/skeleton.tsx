import { Skeleton } from "@/components/ui/skeleton";

const SkillSkeleton = () => {
    return (
        <div className="flex items-center justify-between w-full py-4 px-4 rounded-xl">
            {/* Left Section */}
            <div className="flex items-center gap-4 min-w-0">
                {/* Logo Skeleton */}
                <Skeleton className="w-12 h-12 rounded-lg shrink-0" />

                {/* Title + Tags Skeleton */}
                <div className="flex flex-col min-w-0 space-y-2">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-32" />
                    </div>
                    <div className="flex gap-2">
                        <Skeleton className="h-3 w-12" />
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-3 w-14" />
                    </div>
                </div>
            </div>

            {/* Right Stats Skeleton */}
            <div className="flex items-center gap-4 shrink-0">
                <Skeleton className="h-5 w-10" />
                <Skeleton className="h-4 w-8" />
            </div>
        </div>
    );
};

export default SkillSkeleton;
