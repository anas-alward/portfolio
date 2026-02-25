import { Skeleton } from "@/components/ui/skeleton";

const AchievementSkeleton = () => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 px-3 -mx-3 gap-4 sm:gap-0">
            <div className="flex items-start gap-4">
                {/* Icon Skeleton */}
                <Skeleton className="w-12 h-12 rounded-lg shrink-0" />

                <div className="space-y-2">
                    {/* Name Skeleton */}
                    <Skeleton className="h-5 w-48" />
                    {/* Issuer Skeleton */}
                    <Skeleton className="h-4 w-32" />
                    {/* Description Skeleton */}
                    <div className="space-y-1 pt-1">
                        <Skeleton className="h-3 w-64 sm:w-80" />
                        <Skeleton className="h-3 w-48 sm:w-60" />
                    </div>
                </div>
            </div>

            {/* Date Skeleton */}
            <Skeleton className="h-4 w-20 sm:self-center" />
        </div>
    );
};

export default AchievementSkeleton;
