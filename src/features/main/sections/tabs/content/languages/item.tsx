
import type { Language } from "@/types";

const LanguageItem = ({ language }: { language: Language }) => {
    return (
        <div className="flex items-center justify-between py-3 group hover:bg-neutral-50 rounded-lg transition-colors px-2 -mx-2">
            <div className="flex items-center gap-4">
                {/* Flag/Icon Placeholder */}
                <div className="w-10 h-10 flex items-center justify-center bg-neutral-100 rounded-lg text-lg">
                    {/* You can replace this with an actual <img> tag if you have flag assets */}
                    {language.name.slice(0, 2).toUpperCase()}
                </div>

                <div className="flex flex-col gap-0.5">
                    <h3 className="text-sm font-semibold text-neutral-900">
                        {language.name}
                    </h3>
                    <p className="text-xs text-neutral-500">
                        {language.description}
                    </p>
                </div>
            </div>

            <div className="text-sm font-medium text-neutral-900">
                {language.proficiency}
            </div>
        </div>
    );
};

export default LanguageItem;
