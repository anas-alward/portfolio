


const DateLabel = ({ date }: { date: string }) => {
    const d = new Date(date)
    const year = d.getFullYear();
    const month = d.toLocaleString('en-US', { month: 'long' });

    if (!date) {
        return (
            <span className="text-xs font-medium text-muted-foreground">Present</span>
        );
    }

    return (
        <span className="text-xs font-medium text-muted-foreground">{month} {year}</span>
    );
}

export default DateLabel;
