import { Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Link2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ShareLink } from "@/components/ui/share-link";

interface ProjectHeaderActionsProps {
  tab?: string;
}

export function ProjectHeaderActions({ tab }: ProjectHeaderActionsProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Link
        to="/"
        search={{ tab }}
        className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-secondary text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-300 group active:scale-95"
      >
        <ArrowLeft
          size={18}
          className="group-hover:-translate-x-0.5 transition-transform"
        />
      </Link>

      <ShareLink>
        {({ isCopied, copy }) => (
          <button
            onClick={copy}
            className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-secondary text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-300 group active:scale-95"
          >
            <AnimatePresence mode="wait">
              {isCopied ? (
                <motion.div
                  key="check"
                  initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="text-green-500"
                >
                  <Check size={18} />
                </motion.div>
              ) : (
                <motion.div
                  key="link"
                  initial={{ opacity: 0, scale: 0.5, rotate: 45 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: -45 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Link2 size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        )}
      </ShareLink>
    </div>
  );
}
