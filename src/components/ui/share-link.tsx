import { useState } from 'react'
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

    const copy = () => {
        navigator.clipboard.writeText(window.location.href)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
    }

    return (
        <Tooltip content={isCopied ? copiedTooltipText : tooltipText}>
            {children({ isCopied, copy })}
        </Tooltip>
    )
}
