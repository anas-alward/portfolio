import type { Certificate } from "@/types";
import { getStorageUrl } from "@/lib/storage";
import { CertificateTypeLabel } from "./label";
import { ExternalLink } from "lucide-react";

const CertificateItem = ({ certificate }: { certificate: Certificate }) => {
  return (
    <div
      key={certificate.id}
      className="relative group py-4 flex items-center justify-between gap-4 sm:gap-6 flex-nowrap transition  rounded-lg px-3 -mx-3"
    >
      {/* Left Section: breadcrumb attached outside + Icon & Title in same row */}
      <div className="flex-1 min-w-0">
        <div className="text-xs text-secondary-foreground flex items-center gap-2 min-w-0 ml-14 -mb-1">
          <span className="whitespace-nowrap">
            {certificate.date ? new Date(certificate.date).getFullYear() : ""}
          </span>
          <span className="text-neutral-300" aria-hidden="true">
            /
          </span>
          <span className="">{certificate.issuer}</span>
          <span className="text-neutral-300" aria-hidden="true">
            /
          </span>
          <span className="shrink-0">
            <CertificateTypeLabel type={certificate.type} />
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-neutral-100 rounded-lg">
            <img
              src={getStorageUrl(certificate.issuer_icon)}
              alt={certificate.issuer}
              className="w-6 h-6 object-contain"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg md:text-xl font-bold text-primary leading-tight whitespace-normal wrap-break-word">
              {certificate.name}
            </h3>
          </div>
        </div>
      </div>

      {/* Right Section: Action (never wrap) */}
      <div className="flex items-center gap-4 shrink-0 pl-14 sm:pl-0">
        {certificate.url && (
          <a
            href={certificate.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-neutral-700 p-2 rounded-full transition-colors shrink-0"
            aria-label={`Open certificate ${certificate.name} in new tab`}
          >
            <ExternalLink className="h-4 w-4" size={16} aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  );
};

export default CertificateItem;
