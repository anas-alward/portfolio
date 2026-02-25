import { motion } from "framer-motion"

const WordFadeIn = ({ children, className, delay = 0 }: { children: string, className?: string, delay?: number }) => {
    // Split by any whitespace (including newlines and multiple spaces) and filter out empty strings
    const words = children.split(/\s+/).filter(word => word.length > 0);

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.5,
                        staggerChildren: 0.05, // Slightly faster stagger for longer texts
                        delayChildren: delay
                    }
                }
            }}
            className={`${className} flex flex-wrap`} // Add flex-wrap to ensure words wrap correctly
        >
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    variants={{
                        hidden: { opacity: 0, x: -10 },
                        visible: { opacity: 1, x: 0 }
                    }}
                    className="inline-block mr-[0.25em]" // Removed whitespace-nowrap to be safer
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    )
}

export default WordFadeIn
