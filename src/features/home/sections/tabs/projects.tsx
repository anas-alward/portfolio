import ProjectItem from "@/features/projects/components/item";
import ProjectSkeleton from "@/features/projects/components/skeleton";
import { usePaginatedProjects } from '@/features/projects/hooks'
import { getRouteApi } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const route = getRouteApi('/')

const ProjectTabContent = () => {
    const { tab } = route.useSearch()
    const { data, isLoading } = usePaginatedProjects();
    const projects = data?.data;
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScroll, setCanScroll] = useState(false);

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
            // Show indicator if there is more than 50px below
            setCanScroll(scrollHeight > clientHeight && scrollTop + clientHeight < scrollHeight - 20);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, [projects]);

    if (isLoading) {
        return (
            <section className="w-full">
                <div className="flex flex-col gap-2 ">
                    {[...Array(3)].map((_, i) => (
                        <ProjectSkeleton key={i} />
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="w-full relative">
            <div
                ref={scrollContainerRef}
                onScroll={checkScroll}
                className="max-h-[70vh] overflow-y-auto px-4 -mx-4 no-scrollbar scroll-smooth"
            >
                <div className="flex flex-col gap-2 py-4">
                    {projects?.map((project, i) => (
                        <ProjectItem key={i} project={project} tab={tab} />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {canScroll && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
                    >
                        <motion.div
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-full p-1.5 shadow-lg text-primary/60"
                        >
                            <ChevronDown size={14} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

export default ProjectTabContent;
