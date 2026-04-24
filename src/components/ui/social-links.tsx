import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { useSocials } from "@/features/home/hooks"
import { getStorageUrl } from "@/lib/storage"
import Tooltip from "@/components/ui/tooltip"
import { Skeleton } from "@/components/ui/skeleton"
import { Copy, Check, ArrowUpRight, X } from "lucide-react"

interface SocialLinksProps {
    iconSize?: number
    gap?: string
    showTooltip?: boolean
    animated?: boolean
    className?: string
    itemClassName?: string
}


const SocialLinks = ({
    iconSize = 6,
    gap = "gap-[15px]",
    showTooltip = false,
    animated = false,
    className = "",
    itemClassName = ""
}: SocialLinksProps) => {
    const { data, isLoading } = useSocials({ is_active: "eq.true", order: "order.asc" })
    const [activeId, setActiveId] = useState<number | null>(null)
    const [hoveredId, setHoveredId] = useState<number | null>(null)
    const [copiedId, setCopiedId] = useState<number | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setActiveId(null)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleCopy = (e: React.MouseEvent, text: string, id: number) => {
        e.preventDefault()
        e.stopPropagation()
        navigator.clipboard.writeText(text)
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
    }

    const handleClose = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setActiveId(null)
        setHoveredId(null)
    }

    const handleLinkClick = (e: React.MouseEvent, id: number, isExpanded: boolean) => {
        if (!isExpanded) {
            e.preventDefault()
            setActiveId(id)
        }
    }

    const springTransition = { type: "spring", stiffness: 450, damping: 40 }

    const variants: Variants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
    }

    const content = (
        <div
            ref={containerRef}
            className={`flex flex-wrap items-center ${gap} ${className}`}
        >
            {isLoading ? (
                <>
                    <Skeleton className={`w-${iconSize} h-${iconSize} rounded-full`} />
                    <Skeleton className={`w-${iconSize} h-${iconSize} rounded-full`} />
                    <Skeleton className={`w-${iconSize} h-${iconSize} rounded-full`} />
                </>
            ) : (
                data?.map((social) => {
                    const reference = social.copy_reference || social.name
                    // Ensure exclusivity: if an item is 'active', only that one is expanded.
                    // If none is active, hovered item can expand.
                    const isExpanded = activeId === social.id || (activeId === null && hoveredId === social.id)

                    const linkContent = (
                        <motion.div
                            key={social.id}
                            layout
                            transition={springTransition}
                            onMouseEnter={() => activeId === null && setHoveredId(social.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            className={`group relative flex items-center bg-secondary/10 hover:bg-secondary/30 border border-border/20 rounded-full transition-shadow duration-300 overflow-hidden ${isExpanded ? 'px-3 py-1.5 ring-1 ring-primary/20 shadow-sm z-10' : 'p-2 z-0'} ${itemClassName}`}
                        >
                            <a
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => handleLinkClick(e, social.id, isExpanded)}
                                className="flex items-center gap-2"
                            >
                                <img
                                    src={getStorageUrl(social.icon)}
                                    alt={social.name}
                                    className={`opacity-60 group-hover:opacity-100 transition-opacity w-${iconSize} h-${iconSize}`}
                                />

                                <AnimatePresence initial={false}>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ width: 0, opacity: 0 }}
                                            animate={{ width: "auto", opacity: 1 }}
                                            exit={{ width: 0, opacity: 0 }}
                                            transition={springTransition}
                                            className="flex items-center gap-1.5 overflow-hidden"
                                        >
                                            <span className="whitespace-nowrap text-[13px] font-semibold text-secondary-foreground/80 group-hover:text-secondary-foreground transition-colors">
                                                {reference}
                                            </span>
                                            <ArrowUpRight size={12} className="text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </a>

                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: "auto" }}
                                        exit={{ opacity: 0, width: 0 }}
                                        transition={springTransition}
                                        className="flex items-center overflow-hidden"
                                    >
                                        <div className="w-[1px] h-3.5 bg-border/40 mx-2 shrink-0" />
                                        <div className="flex items-center gap-1">
                                            <motion.button
                                                initial={{ scale: 0.5, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0.5, opacity: 0 }}
                                                whileHover={{ scale: 1.15, color: "var(--primary)" }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={(e) => handleCopy(e, reference, social.id)}
                                                className="p-1 rounded-full hover:bg-background/50 text-muted-foreground/30 hover:text-primary transition-all shrink-0"
                                                title="Copy reference"
                                            >
                                                <AnimatePresence mode="wait">
                                                    <motion.div
                                                        key={copiedId === social.id ? "checked" : "copy"}
                                                        initial={{ opacity: 0, rotate: -45 }}
                                                        animate={{ opacity: 1, rotate: 0 }}
                                                        exit={{ opacity: 0, rotate: 45 }}
                                                        transition={{ duration: 0.15 }}
                                                    >
                                                        {copiedId === social.id ? <Check size={13} /> : <Copy size={13} />}
                                                    </motion.div>
                                                </AnimatePresence>
                                            </motion.button>

                                            <div className="w-[1px] h-3 bg-border/20 mx-0.5 shrink-0" />

                                            <motion.button
                                                initial={{ scale: 0.5, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0.5, opacity: 0 }}
                                                whileHover={{ scale: 1.15, color: "var(--primary)" }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={handleClose}
                                                className="p-1 rounded-full hover:bg-background/50 text-muted-foreground/30 hover:text-red-500 transition-all shrink-0"
                                                title="Close"
                                            >
                                                <X size={13} />
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )

                    if (showTooltip && !isExpanded) {
                        return (
                            <Tooltip key={social.id} content={social.name} position="bottom">
                                {linkContent}
                            </Tooltip>
                        )
                    }

                    return linkContent
                })
            )}
        </div>
    )

    if (animated) {
        return (
            <motion.div initial="hidden" animate="visible" variants={variants}>
                {content}
            </motion.div>
        )
    }

    return content
}

export default SocialLinks;
