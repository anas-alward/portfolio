import { motion } from "framer-motion"
import { wordVariants, wordContainerVariants } from "./variants"

const WordFadeIn = ({ children, className, delay = 0 }: { children: string, className?: string, delay?: number }) => {
    // Split by any whitespace (including newlines and multiple spaces) and filter out empty strings
    const words = children.split(/\s+/).filter(word => word.length > 0);

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={wordContainerVariants(delay)}
            className={`${className} flex flex-wrap`} // Add flex-wrap to ensure words wrap correctly
        >
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    variants={wordVariants}
                    className="inline-block mr-[0.25em]" // Removed whitespace-nowrap to be safer
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    )
}

export default WordFadeIn
