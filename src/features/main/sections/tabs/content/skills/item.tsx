import type { Skill } from "@/types/skills";
import { AwardIcon } from "lucide-react";
import { getStorageUrl } from "@/lib/storage";



const SkillItem = ({ skill }: { skill: Skill }) => {
    return (
        <div className="flex items-center justify-between w-full py-4 px-4 rounded-xl hover:bg-neutral-50 transition-colors">

            {/* Left Section */}
            <div className="flex items-center gap-4 min-w-0">
                {/* Logo */}
                <div className="w-12 h-12 flex items-center justify-center bg-neutral-50 rounded-lg border border-neutral-100 shrink-0">
                    <img
                        src={getStorageUrl(skill.icon)}
                        alt={skill.name}
                        className="w-7 h-7 object-contain"
                    />
                </div>

                {/* Title + Tags */}
                <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                        <h3 className="text-base font-semibold text-primary truncate">
                            {skill.name}
                        </h3>
                        {skill.isMaster && (
                            <AwardIcon className="w-4 h-4 text-yellow-500 shrink-0" />
                        )}
                    </div>

                    {/* Subtle Tags */}
                    <div className="flex flex-wrap gap-x-2 text-sm text-secondary-foreground leading-none mt-1">
                        {skill.tags.split(',').slice(0, 4).map((tag, index) => (
                            <span key={tag}>
                                {tag.trim()}
                                {index !== skill.tags.split(',').length - 1 && " · "}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Stats */}
            <div className="flex items-center gap-4 text-base text-secondary-foreground shrink-0">
                <span className="font-semibold ">{skill.level}%</span>
                <span className="">•</span>
                <span>{skill.years}y</span>
            </div>

        </div>
    );
};

export default SkillItem;