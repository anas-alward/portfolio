"use client"

import { motion, AnimatePresence } from "framer-motion"

interface PreloaderProps {
    isLoading: boolean
    onExitComplete?: () => void
}

export default function Preloader({ isLoading, onExitComplete }: PreloaderProps) {
    const letters = ["A", "N", "A", "S"]

    return (
        <AnimatePresence onExitComplete={onExitComplete}>
            {isLoading && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{
                        y: "-100%",
                        opacity: 0,
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                    }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-background will-change-transform"
                >
                    <div className="flex flex-col items-center ">
                        <div className="overflow-hidden flex gap-[0.1em] p-2">
                            {letters.map((letter, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    exit={{
                                        y: "-100%",
                                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                                    }}
                                    transition={{
                                        duration: 1,
                                        delay: index * 0.1,
                                        ease: [0.76, 0, 0.24, 1]
                                    }}
                                    className="text-6xl tablet:text-8xl font-black tracking-tighter text-primary block"
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
