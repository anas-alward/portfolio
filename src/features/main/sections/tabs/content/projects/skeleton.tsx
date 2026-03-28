import { Skeleton } from "@/components/ui/skeleton"; // Adjust import path as needed

const ProjectItemSkeleton = () => {
    return (
        <div className="group flex flex-col sm:flex-row gap-4 sm:gap-6 py-5 px-4 rounded-xl transition-colors bg-card hover:bg-muted/60 border bg-border">

            {/* Image Skeleton */}
            <div className="shrink-0">
                <Skeleton className="w-full h-32 sm:w-48 sm:h-32 rounded-lg" />
            </div>

            {/* Content Skeleton */}
            <div className="flex-1 flex flex-col min-h-[6rem]">

                {/* Title Skeleton */}
                <Skeleton className="h-5 w-3/4" />

                {/* Description Skeleton - 2 lines */}
                <div className="mt-2 mb-4 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>

                {/* Bottom Section Skeleton */}
                <div className="mt-auto flex flex-wrap items-center justify-between gap-y-3">

                    {/* Left Side */}
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Project Type Label */}
                        <Skeleton className="h-6 w-16 rounded-full" />

                        {/* Company Info */}
                        <div className="flex items-center gap-1.5">
                            <Skeleton className="w-1 h-1 rounded-full" />
                            <Skeleton className="h-3 w-32" />
                        </div>
                    </div>

                    {/* Right Side - Link */}
                    <div className="flex items-center gap-1.5">
                        <Skeleton className="h-3 w-12" />
                        <Skeleton className="w-3 h-3" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectItemSkeleton;