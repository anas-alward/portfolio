import { Skeleton } from "@/components/ui/skeleton";

const CertificateSkeleton = () => {
    return (
        <div className="group py-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
                {/* Icon Skeleton */}
                <Skeleton className="w-10 h-10 rounded-lg" />

                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        {/* Title Skeleton */}
                        <Skeleton className="h-5 w-40" />
                        {/* Badge Skeleton */}
                        <Skeleton className="h-4 w-16 rounded-full" />
                    </div>

                    {/* Issuer & Date Skeleton */}
                    <Skeleton className="h-4 w-48" />
                </div>
            </div>

            {/* View Link Skeleton */}
            <Skeleton className="h-4 w-8" />
        </div>
    );
};

export default CertificateSkeleton;
