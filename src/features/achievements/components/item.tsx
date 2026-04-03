
import type { Achievement } from "@/types";
import { Award } from "lucide-react";
import { getStorageUrl } from "@/lib/storage";

const AchievementItem = ({ achievement }: { achievement: Achievement }) => {
    const formatDate = (stringDate: string) => {
        const date = new Date(stringDate)

        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 group hover:bg-neutral-50 rounded-lg transition-colors px-3 -mx-3 gap-4 sm:gap-0">
            <div className="flex items-start gap-4">
                {/* Icon Placeholder */}
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-yellow-50 text-yellow-600 rounded-lg">
                    {achievement.image ? (
                        <img src={getStorageUrl(achievement.image)} alt={achievement.name} className="w-6 h-6 object-contain" />
                    ) : (
                        <Award size={24} />
                    )}
                </div>

                <div className="space-y-1">
                    <h3 className="font-semibold text-primary leading-none">
                        {achievement.name}
                    </h3>
                    <p className="text-sm font-medium text-secondary-foreground">
                        {achievement.issuer}
                    </p>
                    <p className="text-xs text-muted-foreground max-w-md pt-1">
                        {achievement.description}
                    </p>
                </div>
            </div>

            <div className="text-sm font-medium text-secondary-foreground sm:text-right pl-16 sm:pl-0">
                {formatDate(achievement.date)}
            </div>
        </div>
    );
};

export default AchievementItem;
