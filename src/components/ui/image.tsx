import { getStorageUrl } from "@/lib/storage"

interface ImageProps {
    src: string
    alt: string
    className?: string
    /** Lazy by default; use "eager" for above-the-fold/LCP images. */
    loading?: "lazy" | "eager"
    fetchPriority?: "high" | "low" | "auto"
}

const Image = ({ src, alt, className, loading = "lazy", fetchPriority }: ImageProps) => {
    return (
        <img
            src={getStorageUrl(src)}
            alt={alt}
            loading={loading}
            decoding="async"
            fetchPriority={fetchPriority}
            className={className || "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"}
        />
    )
}

export default Image
