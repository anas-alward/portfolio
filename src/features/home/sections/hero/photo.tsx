import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
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

    const initials = profile?.name
        ? profile.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
        : "AN";

    return (
        <>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
                }}
                className="relative w-[60px] h-[60px] border-[2px] border-white rounded-xl shadow cursor-zoom-in group overflow-hidden bg-muted"
                onClick={() => portraitImage && setIsLightboxOpen(true)}
            >
                <AnimatePresence mode="wait">
                    {(!isImageLoaded || isLoading) && (
                        <motion.div
                            key="placeholder"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 z-10 w-full h-full rounded-[inherit] bg-primary/10 flex items-center justify-center overflow-hidden"
                        >
                            <motion.div
                                animate={{
                                    opacity: [0.3, 0.6, 0.3],
                                    scale: [1, 1.05, 1]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl uppercase tracking-tighter"
                            >
                                {initials}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {portraitImage && (
                    <motion.img
                        key="profile-image"
                        src={portraitImage}
                        alt="persona portrait"
                        initial={{ opacity: 0, filter: "blur(4px)" }}
                        animate={{
                            opacity: isImageLoaded ? 1 : 0,
                            filter: isImageLoaded ? "blur(0px)" : "blur(4px)"
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="block w-full h-full rounded-[inherit] object-center object-cover"
                        onLoad={() => setIsImageLoaded(true)}
                        decoding="async"
                    />
                )}
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
