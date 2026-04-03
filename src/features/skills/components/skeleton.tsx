import { Skeleton } from "@/components/ui/skeleton"; // Adjust import path as needed

const SkillItemSkeleton = () => {
    return (
        <div
            className="
            relative
            h-[130px]
            w-[calc(50%-0.5rem)]  
            tablet:w-[calc(33.333%-0.67rem)] 
            bg-card border border-border
            rounded-2xl
            overflow-hidden
            "
        >
            {/* Inner content container */}
            <div
                className="
                h-full 
                w-full
                rounded-2xl 
                p-4 
                flex flex-col tablet:flex-row
                justify-center
                items-center
                gap-2
                tablet:gap-5
                "
            >
                {/* Icon Skeleton - Fixed dimensions */}
                
                    <Skeleton className="w-10 h-10 rounded-xl" />
                
                {/* Text Skeleton - Fixed dimensions */}
                <div className="text-center">
                    <Skeleton className="h-5 w-20" />
                </div>
            </div>
        </div>
    );
};

export default SkillItemSkeleton;