import { useState } from "react";
import LanguageItem from "./item";
import LanguageSkeleton from "./skeleton";
import Pagination from "@/components/ui/pagination";
import { usePaginatedLanguages } from "@/hooks/useLanguages";

const LanguagesTabContent = () => {
    const [page, setPage] = useState(1);
    const pageSize = 5;

    const { data, isLoading } = usePaginatedLanguages(page, pageSize);
    const languages = data?.data;
    const totalCount = data?.count || 0;
    const totalPages = Math.ceil(totalCount / pageSize);

    if (isLoading) {
        return (
            <section className="w-full">
                <div className="flex flex-col divide-y divide-neutral-100">
                    {[...Array(3)].map((_, i) => (
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
