import type { CertificateType } from "@/types";


const typeStyles: Record<CertificateType, string> = {
    Course: "bg-neutral-100 text-neutral-600",
    Specialization: "bg-blue-50 text-blue-600",
    Professional: "bg-emerald-50 text-emerald-600",
    Program: "bg-purple-50 text-purple-600",
};



type CertificateTypeLabelProps = {
    type: CertificateType
}


export const CertificateTypeLabel = ({ type }: CertificateTypeLabelProps) => {
    return (
        <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeStyles[type]}`}
        >
            {type}
        </span>
    )
}


type DateLabelProps = {
    date: string
}

export const DateLabel = ({ date: dateString }: DateLabelProps) => {
    const formatDate = (ds: string) => {
        const d = new Date(ds);
        return d.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }

    return (
        <div className="text-xs font-medium text-secondary-foreground sm:text-right whitespace-nowrap pt-1">
            {formatDate(dateString)}
        </div>
    )
}
