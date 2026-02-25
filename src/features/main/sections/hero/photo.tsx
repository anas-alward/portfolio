import { useState } from "react"
import { motion } from "framer-motion"
import { getStorageUrl } from "@/lib/storage"
import { Lightbox } from "@/components/ui/lightbox"
import type { Profile } from "@/types/profile"

interface HeroPhotoProps {
    profile?: Profile | null
    isLoading: boolean
}

const HeroPhoto = ({ profile, isLoading }: HeroPhotoProps) => {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)
    const [isImageLoaded, setIsImageLoaded] = useState(false)

    const portraitImage = profile?.image
        ? getStorageUrl(profile.image)
        : '';

    return (
        <>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                className="relative rounded-[inherit] w-[60px] h-[60px] border-[2px] border-white rounded-xl shadow cursor-zoom-in group"
                onClick={() => portraitImage && setIsLightboxOpen(true)}
            >
                {isLoading || !portraitImage ? (
                    <div className="absolute inset-0 w-full h-full rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl uppercase">
                        AN
                    </div>
                ) :
                    (
                        <img
                            decoding="async"
                            width="1024"
                            height="1024"
                            src={portraitImage}
                            alt="persona portrait"
                            className={`block w-full h-full rounded-[inherit] object-center object-cover rounded-xl transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                            onLoad={() => setIsImageLoaded(true)}
                        />
                    )
                }
            </motion.div>

            <Lightbox
                isOpen={isLightboxOpen}
                onClose={() => setIsLightboxOpen(false)}
                src={portraitImage}
                alt={profile?.primary_title || "Profile picture"}
            />
        </>
    )
}

export default HeroPhoto
