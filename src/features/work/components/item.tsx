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
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mt-2">
                    <h3 className="text-[17px] pc:text-lg font-bold text-foreground leading-tight">
                        {item.position}
                    </h3>

                    {(item.company?.name || item.companies?.name) && (
                        <div className="flex items-center gap-2">
                            <span className="text-muted-foreground/30 font-light select-none">/</span>
                            {(item.company?.link || item.companies?.link) ? (
                                <a
                                    href={item.company?.link || item.companies?.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[14px] font-semibold text-primary/70 hover:text-primary transition-colors"
                                >
                                    {item.company?.name || item.companies?.name}
                                </a>
                            ) : (
                                <span className="text-[14px] font-semibold text-secondary-foreground/80">
                                    {item.company?.name || item.companies?.name}
                                </span>
                            )}
                        </div>
                    )}
                </div>

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
                        className="group/link inline-flex items-center gap-1.5 w-fit text-[14px] font-bold text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                        <div className="relative py-1">
                            <span>Learn more</span>
                            <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-primary origin-left scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300" />
                        </div>
                        <ArrowUpRight
                            size={15}
                            className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                        />
                    </Link>
                </div>
            </div>
        </li>
    );
}

export default WorkItem;

