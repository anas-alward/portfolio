import LanguageItem from "@/features/languages/components/item";
import LanguageSkeleton from "@/features/languages/components/skeleton";
import { usePaginatedLanguages } from "@/features/languages/hooks";

const LanguagesTabContent = () => {
    const { data, isLoading } = usePaginatedLanguages();
    const languages = data?.data;

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
                {languages?.map((item, i) => (
                    <LanguageItem key={i} language={item} />
                ))}
            </div>
        </section>
    );
};

export default LanguagesTabContent;
