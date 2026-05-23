import AchievementItem from "@/features/achievements/components/item";
import AchievementSkeleton from "@/features/achievements/components/skeleton";
import { useSupabaseQuery } from "@/hooks/useSupabase";
import { Achievement } from "@/types";

const AchievementsTabContent = () => {
    const { data: achievements, isLoading } = useSupabaseQuery<Achievement>({
        key: ['achievements'],
        table: 'achievements',
    });

    if (isLoading) {
        return (
            <section className="w-full">
                <div className="flex flex-col divide-y">
                    {[...Array(3)].map((_, i) => (
                        <AchievementSkeleton key={i} />
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="w-full">
            <div className="flex flex-col divide-y">
                {achievements?.map((item) => (
                    <AchievementItem key={item.id} achievement={item} />
                ))}
            </div>
        </section>
    );
};

export default AchievementsTabContent;
