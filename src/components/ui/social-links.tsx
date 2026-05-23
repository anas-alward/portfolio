import { useState, useRef, useEffect } from "react";
import type { CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSupabaseQuery } from "@/hooks/useSupabase";
import { getStorageUrl } from "@/lib/storage";
import Tooltip from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { Contact } from "@/types";

interface SocialLinksProps {
  iconSize?: number;
  gap?: string;
  showTooltip?: boolean;
  animated?: boolean;
  className?: string;
  itemClassName?: string;
}

const SocialLinks = ({
  iconSize = 6,
  gap = "gap-[15px]",
  showTooltip = false,
  animated = false,
  className = "",
  itemClassName = "",
}: SocialLinksProps) => {
  const { data: socials, isLoading } = useSupabaseQuery<Contact>({
    key: ['socials'],
    table: 'socials',
    params: {
      is_active: "eq.true",
      order: "order.asc",
    },
  });
  const [activeId, setActiveId] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setActiveId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopy = (e: React.MouseEvent, text: string, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveId(null);
  };
  const variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  const content = (
    <div
      ref={containerRef}
      className={`flex flex-wrap items-center ${gap} ${className}`}
    >
      {isLoading ? (
        <>
          <Skeleton className={`w-10 h-10 rounded-full`} />
          <Skeleton className={`w-10 h-10 rounded-full`} />
          <Skeleton className={`w-10 h-10 rounded-full`} />
        </>
      ) : (
        socials?.map((social) => {
          const reference = social.copy_reference || social.name;
          const isExpanded = activeId === social.id;
          const iconSizeRem = `${iconSize * 0.25}rem`;
          const iconStyle = {
            width: iconSizeRem,
            height: iconSizeRem,
            "--icon-src": `url("${getStorageUrl(social.icon)}")`,
          } as CSSProperties;

          const iconOnly = (
            <motion.div
              onClick={() => setActiveId(social.id)}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary hover:bg-secondary/20 border border-border/20 transition-all duration-300 cursor-pointer ${itemClassName}`}
            >
              <div
                aria-label={social.name}
                role="img"
                className="icon icon-custom hover:text-foreground transition-colors"
                style={iconStyle}
              />
            </motion.div>
          );

          return (
            <div
              key={social.id}
              className="relative flex items-center justify-center pt-2 pr-2"
            >
              {/* Base Icon - Stays in layout */}
              <div
                className={
                  isExpanded
                    ? "opacity-0 scale-90 pointer-events-none"
                    : "opacity-100 scale-100"
                }
              >
                {showTooltip ? (
                  <Tooltip content={social.name} position="bottom">
                    {iconOnly}
                  </Tooltip>
                ) : (
                  iconOnly
                )}
              </div>

              {/* Hover/Active Overlay - Absolute */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: "0%", y: "0%" }}
                    animate={{ opacity: 1, scale: 1, x: "0%", y: "0%" }}
                    exit={{ opacity: 0, scale: 0.8, x: "0%", y: "0%" }}
                    transition={{ type: "spring", stiffness: 180, damping: 25 }}
                    className="absolute -top-1 -left-1 z-50 flex items-center bg-popover/90 backdrop-blur-md border border-border/70 rounded-full p-1.5 shadow-xl ring-1 ring-ring/20 min-w-max pointer-events-auto gap-1"
                  >
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-accent text-muted-foreground hover:text-primary transition-all group"
                      title="Open link"
                    >
                      <div
                        aria-hidden="true"
                        className="icon icon-external-link icon-sm group-hover:scale-110 transition-transform"
                      />
                    </a>

                    <div className="w-px h-3 bg-border mx-0.5 shrink-0" />

                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => handleCopy(e, reference, social.id)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-accent text-muted-foreground hover:text-primary transition-colors shrink-0"
                      title="Copy reference"
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={copiedId === social.id ? "checked" : "copy"}
                          initial={{ opacity: 0, rotate: -45 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          exit={{ opacity: 0, rotate: 45 }}
                          transition={{ duration: 0.15 }}
                          className="flex items-center justify-center"
                        >
                          <div
                            aria-hidden="true"
                            className={`icon ${copiedId === social.id ? "icon-check" : "icon-copy"} icon-xs`}
                          />
                        </motion.div>
                      </AnimatePresence>
                    </motion.button>

                    <div className="w-px h-3 bg-border mx-0.5 shrink-0" />

                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleClose}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors shrink-0"
                      title="Close"
                    >
                      <div
                        aria-hidden="true"
                        className="icon icon-close icon-xs"
                      />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })
      )}
    </div>
  );

  if (animated) {
    return (
      <motion.div initial="hidden" animate="visible" variants={variants}>
        {content}
      </motion.div>
    );
  }

  return content;
};

export default SocialLinks;
