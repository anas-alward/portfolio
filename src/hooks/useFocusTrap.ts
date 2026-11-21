import { useEffect, useRef, type RefObject } from "react"

const FOCUSABLE_SELECTOR = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
].join(", ")

/**
 * Keeps keyboard focus inside a modal container while it is open.
 *
 * On open it remembers the currently focused element, moves focus to
 * `initialFocusRef` (falling back to leaving focus where it is), and locks
 * body scroll. Tab/Shift+Tab cycle within `containerRef`. On close everything
 * is restored, including focus to the element that was focused beforehand.
 */
export function useFocusTrap(
    isOpen: boolean,
    containerRef: RefObject<HTMLElement | null>,
    initialFocusRef?: RefObject<HTMLElement | null>
) {
    const previouslyFocused = useRef<HTMLElement | null>(null)

    useEffect(() => {
        if (!isOpen) return

        previouslyFocused.current = document.activeElement as HTMLElement | null
        initialFocusRef?.current?.focus()

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"

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

        return () => {
            document.removeEventListener("keydown", keepFocusInside)
            document.body.style.overflow = previousOverflow
            previouslyFocused.current?.focus()
        }
    }, [isOpen, containerRef, initialFocusRef])
}
