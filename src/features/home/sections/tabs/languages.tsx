import { useState } from "react";
import LanguageItem from "@/features/languages/components/item";
import LanguageSkeleton from "@/features/languages/components/skeleton";
import Pagination from "@/components/ui/pagination";
import { usePaginatedLanguages } from "@/features/languages/hooks";

const LanguagesTabContent = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, pageSize } = usePaginatedLanguages(page);
    const languages = data?.data;
    const totalPages = data?.totalPages || 0;

    if (isLoading) {
        return (
            <section className="w-full">
                <div className="flex flex-col">
                    {[...Array(pageSize)].map((_, i) => (
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

            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </section>
    );
};

export default LanguagesTabContent;
