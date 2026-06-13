import { lazy, Suspense, useRef, useState, useEffect } from "react";
import Tabs from "@/components/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getRouteApi } from "@tanstack/react-router";
import { useSettings } from "@/store/settings";

const ProjectTabContent = lazy(() => import("./projects"));
const TestimonialTabContent = lazy(() => import("./testimonial"));
const SkillTabContent = lazy(() => import("./skills"));
const WorkTabContent = lazy(() => import("./work"));
const CertificatesTabContent = lazy(() => import("./certificates"));
const LanguagesTabContent = lazy(() => import("./languages"));
const EducationTabContent = lazy(() => import("./education"));
const AchievementsTabContent = lazy(() => import("./achievements"));
const route = getRouteApi("/");

const TabsSection = () => {
  const tabs = [
    "work",
    "projects",
    "skills",
    "certificates",
    "testimonials",
    "education",
    "achievements",
    "languages",
  ];
  const { tab } = route.useSearch();
  const navigate = route.useNavigate();
  const visibleTabsSetting = useSettings("VISIBLE_TABS");
  const visibleTabs =
    visibleTabsSetting?.value
      .split(",")
      .map((tab) => tab.trim())
      .filter(Boolean) || tabs;
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
      window.addEventListener("resize", checkScroll);
      return () => window.removeEventListener("resize", checkScroll);
    }
  }, []);

  const handleTabChange = (value: string) => {
    navigate({
      search: (prev) => ({ ...prev, tab: value }),
      replace: true,
      resetScroll: false,
    });
  };

  return (
    <Tabs value={tab || "work"} onValueChange={handleTabChange}>
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 py-4 -mt-4 mb-8">
        <div className="relative group/tabs">
          {/* Scroll Indicators for Mobile */}
          <AnimatePresence>
            {showLeftArrow && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="absolute -left-4 top-0 bottom-0 w-12 bg-linear-to-r from-background via-background/80 to-transparent z-20 flex items-center justify-start pl-1 pointer-events-none"
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
                className="absolute -right-4 top-0 bottom-0 w-12 bg-linear-to-l from-background via-background/80 to-transparent z-20 flex items-center justify-end pr-1 pointer-events-none"
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
            {visibleTabs.map((tab) => (
              <Tabs.Trigger key={tab} value={tab} className="shrink-0">
                <div
                  className={`px-4 py-1.5 rounded-full text-[13px] font-normal transition-all duration-300 whitespace-nowrap
                                                group-data-[state=active]:bg-primary 
                                                group-data-[state=active]:text-primary-foreground
                                                group-data-[state=inactive]:bg-transparent 
                                                group-data-[state=inactive]:text-foreground/60
                                                group-data-[state=inactive]:hover:bg-accent 
                                                group-data-[state=inactive]:hover:text-accent-foreground`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </div>
              </Tabs.Trigger>
            ))}
          </div>
        </div>
      </div>

      <Tabs.Content value="projects">
        <Suspense fallback={null}>
          <ProjectTabContent />
        </Suspense>
      </Tabs.Content>
      <Tabs.Content value="testimonials">
        <Suspense fallback={null}>
          <TestimonialTabContent />
        </Suspense>
      </Tabs.Content>
      <Tabs.Content value="skills">
        <Suspense fallback={null}>
          <SkillTabContent />
        </Suspense>
      </Tabs.Content>
      <Tabs.Content value="work">
        <Suspense fallback={null}>
          <WorkTabContent />
        </Suspense>
      </Tabs.Content>
      <Tabs.Content value="education">
        <Suspense fallback={null}>
          <EducationTabContent />
        </Suspense>
      </Tabs.Content>
      <Tabs.Content value="certificates">
        <Suspense fallback={null}>
          <CertificatesTabContent />
        </Suspense>
      </Tabs.Content>
      <Tabs.Content value="achievements">
        <Suspense fallback={null}>
          <AchievementsTabContent />
        </Suspense>
      </Tabs.Content>
      <Tabs.Content value="languages">
        <Suspense fallback={null}>
          <LanguagesTabContent />
        </Suspense>
      </Tabs.Content>
    </Tabs>
  );
};

export default TabsSection;
