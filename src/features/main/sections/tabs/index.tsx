import { useRef, useState, useEffect } from "react";
import Tabs from "@/components/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import ProjectTabContent from "./content/projects";
import TestimonailTabContent from "./content/testimonial";
import SkillTabContent from "./content/skills";
import WorkTabContent from "./content/work";
import CertificatesTabContent from "./content/certificates"
import LanguagesTabContent from "./content/languages";
import EducationTabContent from "./content/education";
import AchievementsTabContent from "./content/achievements";



const TabsSection = () => {
    const tabs = ["Work", "Projects", "Skills", "Certificates", "Testimonials", "Education", "Achievements", "Languages"];

    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeftArrow(scrollLeft > 10);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        const scrollEl = scrollRef.current;
        if (scrollEl) {
            checkScroll();
            window.addEventListener('resize', checkScroll);
            return () => window.removeEventListener('resize', checkScroll);
        }
    }, []);

    return (
        <Tabs defaultValue="Work">

            <div className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 -mt-4 mb-8">
                <div className="relative group/tabs">
                    {/* Scroll Indicators for Mobile */}
                    <AnimatePresence>
                        {showLeftArrow && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="absolute -left-4 top-0 bottom-0 w-12 bg-gradient-to-r from-background via-background/80 to-transparent z-20 flex items-center justify-start pl-1 pointer-events-none"
                            >
                                <ChevronLeft className="w-4 h-4 text-muted-foreground animate-pulse" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {showRightArrow && (
                            <motion.div
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="absolute -right-4 top-0 bottom-0 w-12 bg-gradient-to-l from-background via-background/80 to-transparent z-20 flex items-center justify-end pr-1 pointer-events-none"
                            >
                                <ChevronRight className="w-4 h-4 text-muted-foreground animate-pulse" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div
                        ref={scrollRef}
                        onScroll={checkScroll}
                        className="flex flex-nowrap gap-3 overflow-x-auto no-scrollbar scroll-smooth pb-1 -mx-4 px-4 sm:mx-0 sm:px-0"
                    >
                        {tabs.map((tab) => (
                            <Tabs.Trigger key={tab} value={tab} className="shrink-0">
                                <div
                                    className={`px-4 py-1.5 rounded-full text-[13px] font-normal transition-all duration-300 whitespace-nowrap
                                                group-data-[state=active]:bg-accent 
                                                group-data-[state=active]:text-accent-foreground
                                                group-data-[state=inactive]:bg-transparent 
                                                group-data-[state=inactive]:text-foreground/60
                                                group-data-[state=inactive]:hover:bg-accent 
                                                group-data-[state=inactive]:hover:text-accent-foreground`}
                                >
                                    {tab}
                                </div>
                            </Tabs.Trigger>
                        ))}
                    </div>
                </div>
            </div>

            <Tabs.Content value="Projects">
                <ProjectTabContent />
            </Tabs.Content>
            <Tabs.Content value="Testimonials">
                <TestimonailTabContent />
            </Tabs.Content>
            <Tabs.Content value="Skills">
                <SkillTabContent />
            </Tabs.Content>
            <Tabs.Content value="Work">
                <WorkTabContent />
            </Tabs.Content>
            <Tabs.Content value="Education">
                <EducationTabContent />
            </Tabs.Content>
            <Tabs.Content value="Certificates">
                <CertificatesTabContent />
            </Tabs.Content>
            <Tabs.Content value="Achievements">
                <AchievementsTabContent />
            </Tabs.Content>
            <Tabs.Content value="Languages">
                <LanguagesTabContent />
            </Tabs.Content>
        </Tabs>
    );
}

export default TabsSection;