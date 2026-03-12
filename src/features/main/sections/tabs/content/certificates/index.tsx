import { useState } from "react";
import CertificateItem from "./item";
import CertificateSkeleton from "./skeleton";
import Pagination from "@/components/ui/pagination";
import { usePaginatedCertificates } from "@/hooks/useCertificates";


const CertificatesTabContent = () => {
    const [page, setPage] = useState(1);

    const { data, isLoading, pageSize } = usePaginatedCertificates(page);
    const certificates = data?.data;
    const totalPages = data?.totalPages || 0

    if (isLoading) {
        return (
            <section className="w-full space-y-6">
                <div className="divide-y divide-neutral-200">
                    {[...Array(pageSize)].map((_, i) => (
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