import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface DialogProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    title?: string
}

const FOCUSABLE_SELECTOR = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
].join(", ")

export function Dialog({ isOpen, onClose, children, title }: DialogProps) {
    const dialogRef = React.useRef<HTMLDivElement>(null)
    const closeButtonRef = React.useRef<HTMLButtonElement>(null)
    const titleId = React.useId()

    // Keep Escape handling separate from focus management: `onClose` is
    // commonly an inline callback and re-running the focus effect on every
    // parent render would pull focus back to the close button.
    React.useEffect(() => {
        if (!isOpen) return
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        window.addEventListener("keydown", handleEscape)
        return () => window.removeEventListener("keydown", handleEscape)
    }, [isOpen, onClose])

    React.useEffect(() => {
        if (!isOpen) return

        const previouslyFocused = document.activeElement as HTMLElement | null
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"
        closeButtonRef.current?.focus()

        const keepFocusInside = (e: KeyboardEvent) => {
            if (e.key !== "Tab") return
            const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
            if (!focusable || focusable.length === 0) return

            const first = focusable[0]
            const last = focusable[focusable.length - 1]
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault()
                last.focus()
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault()
                first.focus()
            }
        }
        document.addEventListener("keydown", keepFocusInside)

        return () => {
            document.removeEventListener("keydown", keepFocusInside)
            document.body.style.overflow = previousOverflow
            previouslyFocused?.focus()
        }
    }, [isOpen])

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
                    />

                    {/* Content */}
                    <motion.div
                        ref={dialogRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={title ? titleId : undefined}
                        aria-label={title ? undefined : "Dialog"}
                        initial={{ scale: 0.95, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 10 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
                            <h2 id={titleId} className="text-lg font-semibold text-foreground">
                                {title}
                            </h2>
                            <button
                                type="button"
                                ref={closeButtonRef}
                                onClick={onClose}
                                aria-label="Close dialog"
                                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 max-h-[70vh] overflow-y-auto">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
