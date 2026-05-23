import CertificateItem from "@/features/certificates/components/item";
import CertificateSkeleton from "@/features/certificates/components/skeleton";
import { useSupabaseQuery } from "@/hooks/useSupabase";
import { Certificate } from "@/types";


const CertificatesTabContent = () => {
    const { data: certificates, isLoading } = useSupabaseQuery<Certificate>({
        key: ['certificates'],
        table: 'certificates',
    });

    if (isLoading) {
        return (
            <section className="w-full space-y-6">
                <div className="divide-y ">
                    {[...Array(3)].map((_, i) => (
                        <CertificateSkeleton key={i} />
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="w-full space-y-6">
            <div className="flex flex-col">
                <div className="divide-y">
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
            </div>
        </section>
    );
};

export default CertificatesTabContent;
