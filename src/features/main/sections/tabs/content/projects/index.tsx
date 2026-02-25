import { useState } from "react";
import ProjectItem from "./item";
import ProjectSkeleton from "./skeleton";
import Pagination from "@/components/ui/pagination";
import { usePaginatedProjects } from '@/hooks/useProjects'

const ProjectTabContent = () => {
    const [page, setPage] = useState(1);
    const pageSize = 4;

    const { data, isLoading } = usePaginatedProjects(page, pageSize, { order: "order.asc" });
    const projects = data?.data;
    const totalCount = data?.count || 0;
    const totalPages = Math.ceil(totalCount / pageSize);

    if (isLoading) {
        return (
            <section className="w-full">
                <div className="flex flex-col divide-y divide-neutral-100">
                    {[...Array(4)].map((_, i) => (
                        <ProjectSkeleton key={i} />
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="w-full">
            <div className="flex flex-col divide-y divide-neutral-100">
                {projects?.map((project, i) => (
                    <ProjectItem key={i} project={project} />
                ))}
            </div>

            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </section>
    );
}

export default ProjectTabContent;

