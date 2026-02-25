import { useState } from "react";
import AchievementItem from "./item";
import AchievementSkeleton from "./skeleton";
import Pagination from "@/components/ui/pagination";
import { usePaginatedAchievements } from "@/hooks/useAchievements";

const AchievementsTabContent = () => {
    const [page, setPage] = useState(1);
    const pageSize = 5;

    const { data, isLoading } = usePaginatedAchievements(page, pageSize);
    const achievements = data?.data;
    const totalCount = data?.count || 0;
    const totalPages = Math.ceil(totalCount / pageSize);

    if (isLoading) {
        return (
            <section className="w-full">
                <div className="flex flex-col divide-y divide-neutral-100">
                    {[...Array(3)].map((_, i) => (
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
