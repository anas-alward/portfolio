import { Link } from '@tanstack/react-router'
import { ArrowLeft, Copy, Check } from 'lucide-react'
import Tooltip from '@/components/ui/tooltip'

interface ProjectHeaderActionsProps {
    tab?: string
    onCopyLink: () => void
    isCopied: boolean
}

export function ProjectHeaderActions({ tab, onCopyLink, isCopied }: ProjectHeaderActionsProps) {
    return (
        <div className="flex items-center justify-between gap-4">
            <Link
                to="/"
                search={{ tab }}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit group"
            >
                <ArrowLeft
                    size={16}
                    className="group-hover:-translate-x-1 transition-transform"
                />
            </Link>

            <Tooltip content={isCopied ? "Link Copied!" : "Copy Link"}>
                <button
                    onClick={onCopyLink}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors text-sm font-medium"
                >
                    {isCopied ? (
                        <>
                            <Check size={16} className="text-green-500" />
                            Copied!
                        </>
                    ) : (
                        <>
                            <Copy size={16} />
                            Copy Link
                        </>
                    )}
                </button>
            </Tooltip>
        </div>
    )
}
