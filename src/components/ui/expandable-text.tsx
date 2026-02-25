import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ExpandableTextProps {
    text: string;
    wordLimit?: number;
    className?: string;
}

const ExpandableText = ({ text, wordLimit = 50, className = "" }: ExpandableTextProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const { truncatedText, isTruncated } = useMemo(() => {
        const words = text.split(/\s+/);
        if (words.length <= wordLimit) {
            return { truncatedText: text, isTruncated: false };
        }
        return {
            truncatedText: words.slice(0, wordLimit).join(" "),
            isTruncated: true,
        };
    }, [text, wordLimit]);

    if (!isTruncated) {
        return <span className={className}>{text}</span>;
    }

    return (
        <span className={className}>
            <AnimatePresence mode="wait" initial={false}>
                {isExpanded ? (
                    <motion.span
                        key="full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {text}
                    </motion.span>
                ) : (
                    <motion.span
                        key="truncated"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {truncatedText}…
                    </motion.span>
                )}
            </AnimatePresence>
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="ml-1 text-muted-foreground hover:text-primary text-sm font-medium transition-colors duration-200 cursor-pointer"
            >
                {isExpanded ? "Show less" : "Read more"}
            </button>
        </span>
    );
};

export default ExpandableText;
