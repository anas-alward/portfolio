import { useState } from "react";
import type { Skill } from "@/types/skills";
import { AwardIcon, ChevronDown } from "lucide-react";
import { getStorageUrl } from "@/lib/storage";

const SkillItem = ({ skill }: { skill: Skill }) => {
    const [showAll, setShowAll] = useState(false);
    const tags = skill.tags.split(",").map((t) => t.trim()).filter(Boolean);
    const visibleTags = tags.slice(0, 2);
    const remaining = tags.length - 2;

    return (
        <div className="group flex items-center justify-between py-3 border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50 transition-colors -mx-4 px-4">
            <div className="flex items-center gap-3 min-w-0 flex-1">
                {/* Icon */}
                <div className="self-start w-8 h-8 rounded-md bg-neutral-50 flex items-center justify-center shrink-0">
                    <img src={getStorageUrl(skill.icon)} alt={skill.name} className="w-5 h-5 object-contain" />
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium text-neutral-900 truncate">{skill.name}</h3>
                        {skill.is_master && (
                            <AwardIcon className="w-3.5 h-3.5 text-yellow-500 shrink-0 opacity-80" />
                        )}
                    </div>

                    {/* Horizontal Tags Row - Hidden when expanded */}
                    {!showAll && remaining > 0 && (
                        <div className="flex items-center gap-2 mt-0.5">
                            <div className="flex items-center text-xs text-neutral-500 truncate">
                                {visibleTags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="after:content-['·'] after:mx-2 after:text-neutral-300 last:after:content-none"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <button
                                onClick={() => setShowAll(true)}
                                className="flex items-center text-xs font-medium text-primary shrink-0 transition-colors"
                            >
                                <ChevronDown className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    )}

                    {/* No tags overflow - just show all inline */}
                    {!showAll && remaining <= 0 && (
                        <div className="flex items-center text-xs text-neutral-500 mt-0.5">
                            {tags.map((tag, i) => (
                                <span
                                    key={i}
                                    className="after:content-['·'] after:mx-2 after:text-neutral-300 last:after:content-none"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Accordion Dropdown - All tags vertical */}
                    {showAll && (
                        <div className="mt-2 pt-2 border-t border-neutral-100">
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs text-neutral-600 bg-neutral-100 px-2 py-1 rounded-md"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <button
                                onClick={() => setShowAll(false)}
                                className="mt-2 flex items-center text-xs text-neutral-400 hover:text-neutral-600 transition-colors"
                            >
                                <ChevronDown className="w-3.5 h-3.5 rotate-180" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="text-xs font-mono text-neutral-400 shrink-0">
                {skill.level}% <span className="mx-1.5">/</span> {skill.years}y
            </div>
        </div>
    );
};

export default SkillItem;