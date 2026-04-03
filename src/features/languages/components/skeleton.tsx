import { Skeleton } from "@/components/ui/skeleton";

const LanguageSkeleton = () => {
    return (
        <div className="flex items-center justify-between py-3 px-2 -mx-2">
            <div className="flex items-center gap-4">
                {/* Icon Skeleton */}
                <Skeleton className="w-10 h-10 rounded-lg shrink-0" />

                <div className="flex flex-col gap-1.5">
                    {/* Name Skeleton */}
                    <Skeleton className="h-4 w-24" />
                    {/* Description Skeleton */}
                    <Skeleton className="h-3 w-32" />
                </div>
            </div>

            {/* Proficiency Skeleton */}
            <Skeleton className="h-4 w-20" />
        </div>
    );
};

export default LanguageSkeleton;
