import { useEffect, useState } from 'react'
import Tooltip from '@/components/ui/tooltip'

interface ShareLinkProps {
    children: (props: { isCopied: boolean; copy: () => void }) => React.ReactNode
    tooltipText?: string
    copiedTooltipText?: string
}

export function ShareLink({
    children,
    tooltipText = "Copy Link",
    copiedTooltipText = "Link Copied!"
}: ShareLinkProps) {
    const [isCopied, setIsCopied] = useState(false)

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href)
            setIsCopied(true)
        } catch (err) {
            // Includes both denied permissions and browsers without the
            // Clipboard API (e.g. insecure contexts) — don't claim success.
            console.error('Failed to copy link:', err)
        }
    }

    // Reset the copied state after 2 seconds, cleaning up on unmount
    useEffect(() => {
        if (!isCopied) return
        const timeout = setTimeout(() => setIsCopied(false), 2000)
        return () => clearTimeout(timeout)
    }, [isCopied])

    return (
        <Tooltip content={isCopied ? copiedTooltipText : tooltipText}>
            {children({ isCopied, copy })}
            {/* The tooltip is visual only; announce the result to screen readers. */}
            <span role="status" className="sr-only">
                {isCopied ? copiedTooltipText : ""}
            </span>
        </Tooltip>
    )
}
