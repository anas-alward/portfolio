import { useState } from "react";
import CertificateItem from "./item";
import CertificateSkeleton from "./skeleton";
import Pagination from "@/components/ui/pagination";
import { usePaginatedCertificates } from "@/hooks/useCertificates";

const CertificatesTabContent = () => {
    const [page, setPage] = useState(1);
    const pageSize = 6;

    const { data, isLoading } = usePaginatedCertificates(page, pageSize);
    const certificates = data?.data;
    const totalCount = data?.count || 0;
    const totalPages = Math.ceil(totalCount / pageSize);

    if (isLoading) {
        return (
            <section className="w-full space-y-6">
                <div className="divide-y divide-neutral-200">
                    {[...Array(5)].map((_, i) => (
                        <CertificateSkeleton key={i} />
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="w-full space-y-6">
            {/* Certificates List */}
            <div className="flex flex-col">
                <div className="divide-y divide-neutral-200">
                    {certificates?.map((cert) => (
                        <CertificateItem
                            key={cert.id}
                            certificate={cert}
                        />
                    ))}

                    {certificates?.length === 0 && (
                        <p className="text-sm text-neutral-500 py-4">
                            No certificates found.
                        </p>
                    )}
                </div>

                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />
            </div>
        </section>
    );
};

export default CertificatesTabContent;