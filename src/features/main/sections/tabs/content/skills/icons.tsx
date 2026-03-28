import { ArrowUpRight } from "lucide-react"

const HoverArrowIcon = () => {
    return (
        <>
            <div
                className="
                            absolute top-3 right-3
        
                            opacity-0
                            translate-x-[-12px] translate-y-[12px] scale-75
        
                            group-hover:opacity-100
                            group-hover:translate-x-0 group-hover:translate-y-0
                            group-hover:scale-100
                            
                            transition-all duration-300 ease-out
                            "
            >
                <ArrowUpRight size={18} className="text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
            </div>

        </>
    )
}

export {
    HoverArrowIcon
}