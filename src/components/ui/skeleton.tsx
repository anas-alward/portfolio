function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={`animate-pulse rounded-md bg-neutral-200 ${className || ""}`}
            {...props}
        />
    );
}

export { Skeleton };
