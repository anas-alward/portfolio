import { useSocials } from "@/hooks/useSocials"
import { getStorageUrl } from "@/lib/storage"
import { motion } from "framer-motion"

const Footer = () => {
    const { data: socials } = useSocials({ is_active: "eq.true", order: "order.asc" })
    const year = new Date().getFullYear()

    return (
        <motion.footer
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4 } }
            }}
            className="w-full mt-20 pb-10 flex flex-col items-center gap-8 border-t border-border/5 pt-10"
        >
            {/* Social Links */}
            <div className="flex gap-6">
                {socials?.map((social) => (
                    <a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-opacity hover:opacity-100 opacity-40"
                    >
                        <img
                            src={getStorageUrl(social.icon)}
                            alt={social.name}
                            className="w-5 h-5"
                        />
                    </a>
                ))}
            </div>

            {/* Credits and Copyright */}
            <div className="flex flex-col items-center gap-2 text-[13px] text-muted-foreground/50 font-medium">
                <p>© {year} Developed by <span className="text-foreground/60">Anas Alward</span></p>
                <p className="max-w-[300px] text-center leading-relaxed">
                    Design inspired by <a className='underline hover:text-foreground/60 transition-colors' href="https://basics.framer.media/" target="_blank" rel="noopener noreferrer">Basics</a> template by <a className='underline hover:text-foreground/60 transition-colors' href="https://www.framer.com/@samar/" target="_blank" rel="noopener noreferrer">Samar Jamil</a>
                </p>
            </div>
        </motion.footer>
    )
}

export default Footer
