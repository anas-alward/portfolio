import AchievementItem from "@/features/achievements/components/item";
import AchievementSkeleton from "@/features/achievements/components/skeleton";
import { usePaginatedAchievements } from "@/features/achievements/hooks";

const AchievementsTabContent = () => {
    const { data, isLoading } = usePaginatedAchievements();
    const achievements = data?.data;

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
        </section>
    );
};

export default AchievementsTabContent;
