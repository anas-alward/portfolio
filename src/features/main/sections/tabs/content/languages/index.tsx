import { useState } from "react";
import LanguageItem from "./item";
import LanguageSkeleton from "./skeleton";
import Pagination from "@/components/ui/pagination";
import { usePaginatedLanguages } from "@/hooks/useLanguages";

const LanguagesTabContent = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, pageSize } = usePaginatedLanguages(page);
    const languages = data?.data;
    const totalPages = data?.totalPages || 0

    if (isLoading) {
        return (
            <section className="w-full">
                <div className="flex flex-col divide-y divide-neutral-100">
                    {[...Array(pageSize)].map((_, i) => (
                        <LanguageSkeleton key={i} />
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="w-full">
            <div className="flex flex-col divide-y divide-neutral-100">
                {languages?.map((lang) => (
                    <LanguageItem key={lang.id} language={lang} />
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
