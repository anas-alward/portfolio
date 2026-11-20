import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import Image from "./image"

interface LightboxProps {
    isOpen: boolean
    onClose: () => void
    src: string
    alt?: string
}

const FOCUSABLE_SELECTOR = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
].join(", ")

export function Lightbox({ isOpen, onClose, src, alt }: LightboxProps) {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const closeButtonRef = React.useRef<HTMLButtonElement>(null)
    const previouslyFocused = React.useRef<HTMLElement | null>(null)
    const onCloseRef = React.useRef(onClose)

    // Keep Escape handling separate from focus management: `onClose` is often
    // an inline callback, so re-running the focus effect on every parent
    // render would pull focus back to the close button and forget where to
    // restore it afterwards.
    React.useEffect(() => {
        onCloseRef.current = onClose
    }, [onClose])

    React.useEffect(() => {
        if (!isOpen) return
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onCloseRef.current()
        }
        window.addEventListener("keydown", handleEscape)
        return () => window.removeEventListener("keydown", handleEscape)
    }, [isOpen])

    React.useEffect(() => {
        if (!isOpen) return

        previouslyFocused.current = document.activeElement as HTMLElement | null
        closeButtonRef.current?.focus()

        const keepFocusInside = (e: KeyboardEvent) => {
            if (e.key !== "Tab" || !containerRef.current) return
            const focusable = containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
            if (focusable.length === 0) return

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

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"

        return () => {
            document.removeEventListener("keydown", keepFocusInside)
            document.body.style.overflow = previousOverflow
            previouslyFocused.current?.focus()
        }
    }, [isOpen])

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={containerRef}
                    role="dialog"
                    aria-modal="true"
                    aria-label={alt || "Image viewer"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-zoom-out"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            ref={closeButtonRef}
                            onClick={onClose}
                            aria-label="Close image viewer"
                            className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors p-2"
                        >
                            <X className="w-8 h-8" />
                        </button>
                        <Image
                            src={src}
                            alt={alt || "Full screen image"}
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
