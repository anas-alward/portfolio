import { Link } from '@tanstack/react-router'
import { ArrowLeft, Copy, Check } from 'lucide-react'
import { ShareLink } from '@/components/ui/share-link'

interface ProjectHeaderActionsProps {
    tab?: string
}

export function ProjectHeaderActions({ tab }: ProjectHeaderActionsProps) {
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

            <ShareLink>
                {({ isCopied, copy }) => (
                    <button
                        onClick={copy}
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
                )}
            </ShareLink>
        </div>
    )
}
