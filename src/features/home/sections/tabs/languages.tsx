import LanguageItem from "@/features/languages/components/item";
import LanguageSkeleton from "@/features/languages/components/skeleton";
import { useSupabaseQuery } from "@/hooks/useSupabase";
import { Language } from "@/types";

const LanguagesTabContent = () => {
    const { data: languages, isLoading } = useSupabaseQuery<Language>({
        key: ['languages'],
        table: 'languages',
    });

    if (isLoading) {
        return (
            <section className="w-full">
                <div className="flex flex-col">
                    {[...Array(3)].map((_, i) => (
                        <LanguageSkeleton key={i} />
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="w-full">
            <div className="flex flex-col">
                {languages?.map((item) => (
                    <LanguageItem key={item.id} language={item} />
                ))}
            </div>
        </section>
    );
};

export default LanguagesTabContent;
