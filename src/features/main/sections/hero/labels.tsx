


export const IsAvailableLabel = () => {
    return (
        <span className="flex items-center gap-1.5 text-[13px] pc:text-[14px] text-secondary-foreground">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Available for work
        </span>
    )
}

export const CurrentlyAtLabel = ({ company }: { company: string }) => {
    return (
        <span className="flex items-center gap-1.5 text-[13px] pc:text-[14px] text-secondary-foreground">
            <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Currently at {company}
        </span>
    )
}