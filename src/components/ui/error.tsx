import { Link } from "@tanstack/react-router";
import { useRouter } from "@tanstack/react-router";
import { RotateCcw } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import type { ErrorComponentProps } from "@tanstack/react-router";

/**
 * Branded fallback shown when a route's loader or component throws.
 * Wired as the router-wide `defaultErrorComponent` in `src/router.tsx`.
 */
export default function ErrorPage({ error }: ErrorComponentProps) {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4 p-4 text-center">
      <h1 className="text-6xl font-bold text-foreground">Oops!</h1>
      <p className="text-xl text-muted-foreground max-w-md">
        Something went wrong while loading this page.
      </p>
      {import.meta.env.DEV && (
        <pre className="max-w-xl overflow-auto text-xs text-muted-foreground bg-secondary rounded-lg p-3 text-left">
          {error instanceof Error ? error.message : String(error)}
        </pre>
      )}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.invalidate()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <RotateCcw size={15} />
          Try again
        </button>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-muted-foreground hover:text-foreground hover:bg-accent text-sm font-semibold transition-all"
        >
          <ArrowLeft size={15} />
          Back to portfolio
        </Link>
      </div>
    </div>
  );
}
