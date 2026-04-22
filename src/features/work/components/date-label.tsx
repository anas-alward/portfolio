

const DateLabel = ({ start, end }: { start: string, end?: string | null }) => {
    const formatDate = (dateString: string | null | undefined) => {
        if (!dateString) return "Present";
        const d = new Date(dateString);
        if (isNaN(d.getTime())) return dateString; // Fallback for non-standard dates
        const year = d.getFullYear();
        const month = d.toLocaleString('en-US', { month: 'long' });
        return `${month} ${year}`;
    };

    return (
        <span className="text-xs font-medium text-muted-foreground">
            {formatDate(start)} — {formatDate(end)}
        </span>
    );
}

export default DateLabel;
