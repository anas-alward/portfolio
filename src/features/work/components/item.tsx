import type { Work } from "@/types/work";
import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import DateLabel from "./date-label";

const WorkItem = ({ item }: { item: Work }) => {
    return (
        <li key={item.id} className="ms-4 mt-1.5">
            <div className="flex items-center gap-2">
                <div className="absolute w-3 h-3 bg-muted rounded-full -left-[6.5px] border border-background"></div>
                <DateLabel start={item.start} end={item.end} />
            </div>

            <div className="flex flex-col gap-1">



                <h3 className="text-lg font-semibold text-foreground mt-2 mb-1">
                    {item.position}
                </h3>

                {item.title && (
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-2">
                        {item.title}
                    </p>
                )}

                <p className="mb-4 text-sm font-normal text-muted-foreground leading-relaxed max-w-2xl">
                    {item.description}
                </p>
                <div className="flex justify-end items-center">

                    <Link
                        to="/work/$workId"
                        params={{ workId: item.id }}
                        className="inline-flex items-center gap-2 w-fit px-4 py-2 text-sm font-medium text-foreground bg-secondary border border-border rounded-lg hover:bg-muted transition-colors group/link"
                    >
                        Learn more
                        <ArrowUpRight size={16} className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </Link>
                </div>
            </div>
        </li>
    );
}

export default WorkItem;

