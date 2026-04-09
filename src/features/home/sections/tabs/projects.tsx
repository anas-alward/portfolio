import { useState } from "react";
import ProjectItem from "@/features/projects/components/item";
import ProjectSkeleton from "@/features/projects/components/skeleton";
import Pagination from "@/components/ui/pagination";
import { usePaginatedProjects } from '@/features/projects/hooks'
import { getRouteApi } from "@tanstack/react-router";

const route = getRouteApi('/')

const ProjectTabContent = () => {
    const { tab } = route.useSearch()
    const [page, setPage] = useState(1);
    const { data, isLoading, pageSize } = usePaginatedProjects(page);
    const projects = data?.data;
    const totalPages = data?.totalPages || 0;

    if (isLoading) {
        return (
            <section className="w-full">
                <div className="flex flex-col gap-2 ">
                    {[...Array(pageSize)].map((_, i) => (
                        <ProjectSkeleton key={i} />
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="w-full">
            <div className="max-h-[70vh] overflow-y-auto px-4 -mx-4 no-scrollbar scroll-smooth">
                <div className="flex flex-col gap-2 py-4">
                    {projects?.map((project, i) => (
                        <ProjectItem key={i} project={project} tab={tab} />
                    ))}
                </div>
            </div>

            <div className="mt-8">
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />
            </div>
        </section>
    );
}

export default ProjectTabContent;
