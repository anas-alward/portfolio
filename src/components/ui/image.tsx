
import { getStorageUrl } from "@/lib/storage"



const Image = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
    
    return (
        <img
            src={getStorageUrl(src)}
            alt={alt}
            className={className || "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"}
        />
    )
}

export default Image