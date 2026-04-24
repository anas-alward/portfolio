import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useSocials } from "@/features/home/hooks"

const ContactCTA = () => {
    const { data: socials, isLoading } = useSocials({ is_active: "eq.true", order: "order.asc" })

    // Find email or default to first social link
    const emailSocial = socials?.find(s => s.name.toLowerCase().includes('email'))
    const linkedinSocial = socials?.find(s => s.name.toLowerCase().includes('linkedin'))
    const primaryContact = emailSocial || linkedinSocial || socials?.[0]

    if (isLoading || !primaryContact) return null

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center"
        >
            <a
                href={primaryContact.url}
                target={primaryContact.name.toLowerCase().includes('email') ? "_self" : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 text-[13px] pc:text-[14px] font-bold text-primary/80 hover:text-primary transition-all duration-300"
            >
                <span className="flex items-center gap-1">
                    Get in touch
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
            </a>
        </motion.div>
    )
}

export default ContactCTA
