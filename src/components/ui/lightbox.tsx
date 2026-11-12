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

export function Lightbox({ isOpen, onClose, src, alt }: LightboxProps) {
    const closeButtonRef = React.useRef<HTMLButtonElement>(null)
    const previouslyFocused = React.useRef<HTMLElement | null>(null)

    React.useEffect(() => {
        if (!isOpen) return
        previouslyFocused.current = document.activeElement as HTMLElement | null
        closeButtonRef.current?.focus()
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            previouslyFocused.current?.focus()
        }
    }, [isOpen, onClose])

    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
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
