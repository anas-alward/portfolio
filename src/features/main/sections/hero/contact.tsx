import { motion } from "framer-motion"
import { useSocials } from "@/hooks/useSocials"
import { getStorageUrl } from "@/lib/storage"
import Tooltip from "@/components/ui/tooltip"
import { Skeleton } from "@/components/ui/skeleton"


const ContactBlock = () => {
    const { data, isLoading } = useSocials({ is_active: "eq.true", order: "order.asc" })
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
            className="flex gap-[15px]">
            {isLoading ? (
                <>
                    <Skeleton className="w-6 h-6 rounded-md" />
                    <Skeleton className="w-6 h-6 rounded-md" />
                    <Skeleton className="w-6 h-6 rounded-md" />
                </>
            ) : (
                data?.map((social) => (
                    <Tooltip key={social.id} content={social.name} position="bottom">
                        <a href={social.url} target="_blank" rel="noopener noreferrer">
                            <img src={getStorageUrl(social.icon)} alt={social.name} className="w-6 h-6" />
                        </a>
                    </Tooltip>
                ))
            )}
        </motion.div>
    )
}

export default ContactBlock;