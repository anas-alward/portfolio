import { motion } from 'framer-motion'

interface ProjectGalleryProps {
    images: string[]
    projectName: string
    onImageClick: (image: string) => void
}

export function ProjectGallery({ images, projectName, onImageClick }: ProjectGalleryProps) {
    if (images.length === 0) return null

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
        >
            <div className="flex flex-col gap-1">
                <h2 className="text-xl font-bold text-foreground">Project Gallery</h2>
                <div className="h-1 w-12 bg-primary rounded-full" />
            </div>
            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
                {images.map((image: string, index: number) => (
                    <motion.div
                        key={index}
                        whileHover={{ y: -5 }}
                        className="aspect-video rounded-xl overflow-hidden border border-border bg-muted group relative cursor-zoom-in"
                        onClick={() => onImageClick(image)}
                    >
                        <img
                            src={image}
                            alt={`${projectName} gallery image ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}
