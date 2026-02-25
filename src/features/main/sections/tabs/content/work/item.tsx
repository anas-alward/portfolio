import type { Work } from "@/types/work";
import { CompanyLabel, DateLabel } from "./label";


const WorkItem = ({ item }: { item: Work }) => {
    
    return (
        <div key={item.id} className="relative pl-8">
            {/* Dot */}
            <span className="absolute -left-[9px] top-1.5 w-4 h-4 bg-white rounded-full border-4 border-neutral-900 z-10" />

            <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 items-start sm:items-baseline">
                <div className="space-y-1 flex-1">
                    <CompanyLabel company={item.company} icon={item.icon} url={item.url} />

                    <h3 className="text-lg font-semibold text-primary leading-none pb-1">{item.position}</h3>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                    </p>
                </div>

                <DateLabel start={item.start} end={item.end} />
            </div>
        </div>
    );
}

export default WorkItem;

