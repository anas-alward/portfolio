import type { Variants } from "framer-motion"

/** Motion variants for a single word in a word-by-word fade-in. */
export const wordVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
}

/**
 * Motion variants for the container of a word-by-word fade-in.
 * @param delay Delay (in seconds) before the animation starts.
 */
export const wordContainerVariants = (delay = 0): Variants => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            staggerChildren: 0.05,
            delayChildren: delay,
        },
    },
})
