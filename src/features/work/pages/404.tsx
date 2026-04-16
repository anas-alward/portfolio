import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

export function WorkNotFoundPage() {
    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4">
            <h1 className="text-xl font-bold text-foreground">Work item not found</h1>
            <p className="text-sm text-muted-foreground">
                The work item you're looking for doesn't exist.
            </p>
            <Link
                to="/"
                search={{ tab: 'Work' }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
            >
                <ArrowLeft size={15} />
                Back to portfolio
            </Link>
        </div>
    )
}