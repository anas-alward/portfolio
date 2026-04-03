import { useState } from "react";
import AchievementItem from "@/features/achievements/components/item";
import AchievementSkeleton from "@/features/achievements/components/skeleton";
import Pagination from "@/components/ui/pagination";
import { usePaginatedAchievements } from "@/hooks/useAchievements";

const AchievementsTabContent = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, pageSize } = usePaginatedAchievements(page);
    const achievements = data?.data;
    const totalPages = data?.totalPages || 0;

    if (isLoading) {
        return (
            <section className="w-full">
                <div className="flex flex-col divide-y divide-neutral-100">
                    {[...Array(pageSize)].map((_, i) => (
                        <AchievementSkeleton key={i} />
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="w-full">
            <div className="flex flex-col divide-y divide-neutral-100">
                {achievements?.map((item) => (
                    <AchievementItem key={item.id} achievement={item} />
                ))}
            </div>

            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </section>
    );
};

export default AchievementsTabContent;
