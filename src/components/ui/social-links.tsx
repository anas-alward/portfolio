import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
    }


    const springTransition = { type: "spring", stiffness: 180, damping: 25 } as const
    const exitTransition = { type: "spring", stiffness: 150, damping: 28 } as const

    const variants = {
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
                    <Skeleton className={`w-10 h-10 rounded-full`} />
                    <Skeleton className={`w-10 h-10 rounded-full`} />
                    <Skeleton className={`w-10 h-10 rounded-full`} />
                </>
            ) : (
                data?.map((social) => {
                    const reference = social.copy_reference || social.name
                    const isExpanded = activeId === social.id

                    const iconOnly = (
                        <motion.div
                            onClick={() => setActiveId(social.id)}
                            className={`p-2.5 rounded-full bg-secondary/10 hover:bg-secondary/20 border border-border/20 transition-all duration-300 cursor-pointer ${itemClassName}`}
                        >
                            <img
                                src={getStorageUrl(social.icon)}
                                alt={social.name}
                                className={`opacity-60 hover:opacity-100 transition-opacity w-${iconSize} h-${iconSize}`}
                            />
                        </motion.div>
                    )

                    return (
                        <div
                            key={social.id}
                            className="relative flex items-center justify-center pt-2 pr-2"
                        >
                            {/* Base Icon - Stays in layout */}
                            <div className={isExpanded ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}>
                                {showTooltip ? (
                                    <Tooltip content={social.name} position="bottom">
                                        {iconOnly}
                                    </Tooltip>
                                ) : iconOnly}
                            </div>

                            {/* Hover/Active Overlay - Absolute */}
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8, x: '0%', y: '0%' }}
                                        animate={{ opacity: 1, scale: 1, x: '0%', y: '0%' }}
                                        exit={{ opacity: 0, scale: 0.8, x: '0%', y: '0%' }}
                                        transition={isExpanded ? springTransition : exitTransition}
                                        className="absolute -top-1 -left-1 z-50 flex items-center bg-background/80 backdrop-blur-md border border-primary/20 rounded-full p-1.5 shadow-xl ring-1 ring-primary/5 min-w-max pointer-events-auto gap-1"
                                    >
                                        <a
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-full hover:bg-primary/10 text-muted-foreground/60 hover:text-primary transition-all group"
                                            title="Open link"
                                        >
                                            <ArrowUpRight size={15} className="group-hover:scale-110 transition-transform" />
                                        </a>

                                        <div className="w-[1px] h-3 bg-border/40 mx-0.5 shrink-0" />

                                        <motion.button
                                            whileHover={{ scale: 1.15, color: "var(--primary)" }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={(e) => handleCopy(e, reference, social.id)}
                                            className="p-1.5 rounded-full hover:bg-primary/10 text-muted-foreground/60 hover:text-primary transition-all shrink-0"
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
                                                    {copiedId === social.id ? <Check size={14} /> : <Copy size={13} />}
                                                </motion.div>
                                            </AnimatePresence>
                                        </motion.button>

                                        <div className="w-[1px] h-3 bg-border/40 mx-0.5 shrink-0" />

                                        <motion.button
                                            whileHover={{ scale: 1.15, color: "#ef4444" }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={handleClose}
                                            className="p-1.5 rounded-full hover:bg-red-500/10 text-muted-foreground/60 hover:text-red-500 transition-all shrink-0"
                                            title="Close"
                                        >
                                            <X size={14} />
                                        </motion.button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )
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
