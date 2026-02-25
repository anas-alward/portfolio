
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
    content: React.ReactNode;
    children: React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    className?: string;
    delay?: number;
}

const Tooltip = ({ content, children, position = 'top', className = '', delay = 0.2 }: TooltipProps) => {
    const [isVisible, setIsVisible] = useState(false);

    const positionClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    };

    const initialVariants = {
        top: { opacity: 0, y: 5, scale: 0.95 },
        bottom: { opacity: 0, y: -5, scale: 0.95 },
        left: { opacity: 0, x: 5, scale: 0.95 },
        right: { opacity: 0, x: -5, scale: 0.95 },
    };

    return (
        <div
            className="relative inline-flex"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={initialVariants[position]}
                        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                        exit={initialVariants[position]}
                        transition={{ duration: 0.15, delay: isVisible ? delay : 0 }} // Using the delay prop when showing
                        className={`absolute z-50 px-2.5 py-1.5 text-xs font-medium text-white bg-neutral-900/90 backdrop-blur-sm rounded-lg whitespace-nowrap shadow-lg pointer-events-none border border-white/10 ${positionClasses[position]} ${className}`}
                    >
                        {content}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Tooltip;
