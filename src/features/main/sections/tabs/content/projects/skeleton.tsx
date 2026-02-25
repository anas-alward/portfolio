import { Skeleton } from "@/components/ui/skeleton";

const ProjectSkeleton = () => {
    return (
        <div className="group flex flex-col sm:flex-row gap-4 sm:gap-6 py-5 px-3 -mx-3 rounded-xl relative">
            {/* Thumbnail Skeleton */}
            <Skeleton className="w-full sm:w-36 h-48 sm:h-24 shrink-0 rounded-lg" />

            {/* Content Skeleton */}
            <div className="flex-1 flex flex-col min-h-[6rem]">
                {/* Top Row: Title & Type Skeleton */}
                <div className="flex justify-between items-start gap-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-6 w-16 rounded-md" />
                </div>

                {/* Middle: Description Skeleton */}
                <div className="space-y-2 mt-3 mb-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                </div>

                {/* Bottom Row: Company & Action Skeleton */}
                <div className="mt-auto flex items-end justify-between">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-8 w-20 rounded-full" />
                </div>
            </div>
        </div>
    );
};

export default ProjectSkeleton;
