
import type { Language } from "@/types";

const LanguageItem = ({ language }: { language: Language }) => {
    return (
        <div className="flex items-center justify-between py-3 rounded-lg px-2 -mx-2">
            <div className="flex items-center gap-4">
                {/* Flag/Icon Placeholder */}
                <div className="w-10 h-10 flex items-center justify-center bg-muted text-muted-foreground rounded-lg text-lg">
                    {/* You can replace this with an actual <img> tag if you have flag assets */}
                    {language.name.slice(0, 2).toUpperCase()}
                </div>

                <div className="flex flex-col gap-0.5">
                    <h3 className="text-sm  font-semibold">
                        {language.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                        {language.description}
                    </p>
                </div>
            </div>

            <div className="text-sm font-medium text-muted-foreground">
                {language.proficiency}
            </div>
        </div>
    );
};

export default LanguageItem;
