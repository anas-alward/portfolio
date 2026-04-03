import type { Certificate } from "@/types"
import { getStorageUrl } from "@/lib/storage";
import { CertificateTypeLabel, DateLabel } from "./label";

const CertificateItem = ({ certificate }: { certificate: Certificate }) => {
    return (
        <div
            key={certificate.id}
            className="group py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 transition hover:bg-neutral-50 rounded-lg px-3 -mx-3"
        >
            {/* Left Section: Icon & Info */}
            <div className="flex items-start gap-4 flex-1">
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-neutral-100 rounded-lg">
                    <img
                        src={getStorageUrl(certificate.issuer_icon)}
                        alt={certificate.issuer}
                        className="w-6 h-6 object-contain"
                    />
                </div>

                <div className="space-y-1">
                    <h3 className="font-semibold text-primary leading-tight">
                        {certificate.name}
                    </h3>

                    <div className="flex items-center gap-2 text-sm text-secondary-foreground">
                        <span>{certificate.issuer}</span>
                        <span className="text-neutral-300">•</span>
                        <CertificateTypeLabel type={certificate.type} />
                    </div>
                </div>
            </div>

            {/* Right Section: Date & Action */}
            <div className="flex flex-row gap-4 sm:flex-col items-center sm:items-end justify-between sm:justify-start pl-14 sm:pl-0">
                <DateLabel date={certificate.date} />

                {certificate.url && (
                    <a
                        href={certificate.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-neutral-900 border border-neutral-200 px-3 py-1 rounded-full hover:bg-black hover:text-white hover:border-black transition-all"
                    >
                        View
                    </a>
                )}
            </div>
        </div>
    );
}

export default CertificateItem;