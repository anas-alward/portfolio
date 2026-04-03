import { Skeleton } from "@/components/ui/skeleton";

const EducationSkeleton = () => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 px-3 -mx-3 gap-4 sm:gap-0">
            <div className="flex items-start gap-4">
                {/* Logo Skeleton */}
                <Skeleton className="w-12 h-12 rounded-lg shrink-0" />

                <div className="space-y-2">
                    {/* Institution Skeleton */}
                    <Skeleton className="h-5 w-48" />
                    {/* Degree Skeleton */}
                    <Skeleton className="h-4 w-32" />
                    {/* Description Skeleton */}
                    <div className="pt-1">
                        <Skeleton className="h-3 w-64 sm:w-80" />
                    </div>
                </div>
            </div>

            {/* Period Skeleton */}
            <Skeleton className="h-4 w-24 sm:self-center" />
        </div>
    );
};

export default EducationSkeleton;
