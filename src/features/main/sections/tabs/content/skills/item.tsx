import { useState } from "react";
import type { Skill } from "@/types/skills";
import { getStorageUrl } from "@/lib/storage";
import SkillItemDialog from "./dialog"
import { HoverArrowIcon } from "./icons";

const SkillItem = ({ skill }: { skill: Skill }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div
                onClick={() => setIsOpen(true)}
                className="
                group
                relative
                h-[130px]
                w-[calc(50%-0.5rem)]  
                tablet:w-[calc(33.333%-0.67rem)] 
                bg-card border border-border 
                rounded-2xl
                hover:border-[#c4c4c4] 
                hover:scale-[1.02]
                transition-all duration-300
                cursor-pointer
            "
            >
                <HoverArrowIcon />

                <div
                    className="
                    h-full 
                    rounded-2xl 
                    p-4 
                    flex flex-col tablet:flex-row
                    justify-center
                    items-center

                    tablet:gap-3
                "
                >
                    {/* Icon */}
                    <div className="w-14 h-14 flex items-center justify-center">
                        <img
                            src={getStorageUrl(skill.icon)}
                            alt={skill.name}
                            className="w-8 h-8 object-contain"
                        />
                    </div>

                    {/* Text */}
                    <div className="text-center">
                        <h3 className="text-foreground truncate font-medium">
                            {skill.name}
                        </h3>
                    </div>
                </div>
            </div>

            <SkillItemDialog skill={skill} isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
};

export default SkillItem;