import { motion, Variants } from "framer-motion"
import { useSocials } from "@/hooks/useSocials"
import { getStorageUrl } from "@/lib/storage"
import Tooltip from "@/components/ui/tooltip"
import { Skeleton } from "@/components/ui/skeleton"

interface SocialLinksProps {
    iconSize?: number
    gap?: string
    showTooltip?: boolean
    animated?: boolean
    className?: string
    itemClassName?: string
}

const SocialLinks = ({
    iconSize = 6,
    gap = "gap-[15px]",
    showTooltip = false,
    animated = false,
    className = "",
    itemClassName = ""
}: SocialLinksProps) => {
    const { data, isLoading } = useSocials({ is_active: "eq.true", order: "order.asc" })

    const variants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    }

    const content = (
        <div className={`flex ${gap} ${className}`}>
            {isLoading ? (
                <>
                    <Skeleton className={`w-${iconSize} h-${iconSize} rounded-md ${itemClassName}`} />
                    <Skeleton className={`w-${iconSize} h-${iconSize} rounded-md ${itemClassName}`} />
                    <Skeleton className={`w-${iconSize} h-${iconSize} rounded-md ${itemClassName}`} />
                </>
            ) : (
                data?.map((social) => {
                    const link = (
                        <a
                            key={social.id}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={itemClassName}
                        >
                            <img
                                src={getStorageUrl(social.icon)}
                                alt={social.name}
                                className={`w-${iconSize} h-${iconSize}`}
                            />
                        </a>
                    )

                    if (showTooltip) {
                        return (
                            <Tooltip key={social.id} content={social.name} position="bottom">
                                {link}
                            </Tooltip>
                        )
                    }

                    return link
                })
            )}
        </div>
    )

    if (animated) {
        return (
            <motion.div initial="hidden" animate="visible" variants={variants}>
                {content}
            </motion.div>
        )
    }

    return content
}

export default SocialLinks;
