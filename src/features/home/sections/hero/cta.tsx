import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface ContactCTAProps {
    href: string
}

const ContactCTA = ({ href }: ContactCTAProps) => {
    if (!href) return null

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center"
        >
            <a
                href={href}
                target={href.startsWith('mailto:') ? "_self" : "_blank"}
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
