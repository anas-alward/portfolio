
import { getStorageUrl } from "@/lib/storage"


type CompanyLabelProps = {
    company: string
    icon?: string
    link?: string
}

export const CompanyLabel = ({ company, icon, link }: CompanyLabelProps) => {
    return (

        <div className="flex items-center gap-2 py-0.5">
        {icon && (
                <div className="w-5 h-5 flex-shrink-0 rounded-md overflow-hidden border border-neutral-100 bg-white">
                    <img
                        src={getStorageUrl(icon)}
                        alt={company}
                        className="w-full h-full object-contain p-0.5"
                    />
                </div>
            )}
            <p className="text-xs font-medium ">
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors underline underline-offset-1"
                >
                    {company}
                </a>
            </p>
        </div>
    )
}


type DateLabelProps = {
    start: string
    end?: string
}
export const DateLabel = ({ start, end }: DateLabelProps) => {
    const getRange = (start: string, end: string | undefined) => {

        const startDate = new Date(start);
        const startYear = startDate.getFullYear();
        const startMonth = startDate.toLocaleDateString('default', { month: 'short' });

        const before = `${startMonth},  ${startYear}`;

        if (!end) {
            return `${before} - Present`;
        }

        const endDate = new Date(end);
        const endYear = endDate.getFullYear();
        const endMonth = endDate.toLocaleDateString('default', { month: 'short' });
        const after = `${endMonth}, ${endYear}`;

        return `${before}  -  ${after}`;
    }

    return (
        <div className="text-xs font-medium text-secondary-foreground sm:text-right whitespace-nowrap pt-1">
            {getRange(start, end)}
        </div>
    )
}