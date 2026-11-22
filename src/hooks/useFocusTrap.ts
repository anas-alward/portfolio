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
 * `initialFocusRef` (falling back to the container itself), and locks body
 * scroll. Tab/Shift+Tab cycle within `containerRef`, even if focus somehow
 * lands outside it. On close everything is restored, including focus to the
 * element that was focused beforehand.
 */
export function useFocusTrap(
    isOpen: boolean,
    containerRef: RefObject<HTMLElement | null>,
    initialFocusRef?: RefObject<HTMLElement | null>
) {
    const previouslyFocused = useRef<HTMLElement | null>(null)

    useEffect(() => {
        if (!isOpen) return

        const container = containerRef.current
        previouslyFocused.current = document.activeElement as HTMLElement | null

        let addedTabIndex = false
        const initialTarget = initialFocusRef?.current
        if (initialTarget && container?.contains(initialTarget)) {
            initialTarget.focus()
        } else if (container) {
            // The preferred target may not be rendered yet; focus the dialog
            // itself rather than leaving focus on the trigger behind it.
            if (!container.hasAttribute("tabindex")) {
                container.setAttribute("tabindex", "-1")
                addedTabIndex = true
            }
            container.focus({ preventScroll: true })
        }

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"

        const keepFocusInside = (e: KeyboardEvent) => {
            if (e.key !== "Tab" || !containerRef.current) return
            const focusable = Array.from(
                containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
            ).filter((element) => element.getClientRects().length > 0)
            if (focusable.length === 0) return

            const first = focusable[0]
            const last = focusable[focusable.length - 1]
            const active = document.activeElement

            if (!containerRef.current.contains(active)) {
                e.preventDefault()
                ;(e.shiftKey ? last : first).focus()
            } else if (e.shiftKey && active === first) {
                e.preventDefault()
                last.focus()
            } else if (!e.shiftKey && active === last) {
                e.preventDefault()
                first.focus()
            }
        }
        document.addEventListener("keydown", keepFocusInside)

        return () => {
            document.removeEventListener("keydown", keepFocusInside)
            document.body.style.overflow = previousOverflow
            if (addedTabIndex) container?.removeAttribute("tabindex")
            previouslyFocused.current?.focus()
        }
    }, [isOpen, containerRef, initialFocusRef])
}
