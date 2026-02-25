import { Skeleton } from "@/components/ui/skeleton";

const TestimonialSkeleton = () => {
    return (
        <div className="w-full py-6 border-b border-neutral-200">
            {/* Quote Skeleton */}
            <div className="flex gap-3">
                <Skeleton className="w-5 h-5 mt-1 shrink-0" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>
            </div>

            {/* Author Skeleton */}
            <div className="mt-4 flex items-center gap-3">
                <Skeleton className="w-8 h-8 rounded-full" />
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-3 w-32" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialSkeleton;
