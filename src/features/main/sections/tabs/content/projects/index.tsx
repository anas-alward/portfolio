import { useState } from "react";
import ProjectItem from "./item";
import ProjectSkeleton from "./skeleton";
import Pagination from "@/components/ui/pagination";
import { usePaginatedProjects } from '@/hooks/useProjects'

const ProjectTabContent = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, pageSize } = usePaginatedProjects(page);
    const projects = data?.data;
    const totalPages = data?.totalPages || 0;

    if (isLoading) {
        return (
            <section className="w-full">
                <div className="flex flex-col divide-y divide-neutral-100">
                    {[...Array(pageSize)].map((_, i) => (
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

