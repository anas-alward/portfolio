"use client";

import { motion } from "framer-motion";
export default function Preloader() {
  return (
    
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.8, ease: "easeInOut" },
            }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-background will-change-transform"
          >
            <div className="w-48 h-0.5 bg-primary/10 overflow-hidden relative">
              <motion.div
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  ease: "easeInOut",
                }}
                className="absolute top-0 bottom-0 w-full bg-primary"
              />
            </div>
          </motion.div>
  );
}
