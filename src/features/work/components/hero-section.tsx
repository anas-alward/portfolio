import { motion } from 'framer-motion'
import { ArrowUpRight, CalendarDays, Building2 } from 'lucide-react'
import { Work } from '@/types/work'
import {DateLabel} from '@/features/work/components/label'

interface WorkHeroSectionProps {
    work: Work
}

export function WorkHeroSection({ work }: WorkHeroSectionProps) {
    const company = work.company || work.companies;

    return (
        <div className="flex flex-col gap-6">
            {/* Header info */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex flex-col gap-6"
            >
                <div className="flex flex-col gap-3" >
            

                    <h1 className="text-3xl tablet:text-4xl font-bold text-foreground tracking-tight leading-tight">
                        {work.position}
                    </h1>

                    <div className="ms-1 flex flex-col items-start gap-2 text-muted-foreground">
                        <div className='flex items-center gap-2'>
                            <Building2 size={18} />
                            <span className='text-sm '>{ work.company?.name}</span>
                            </div>
                        <div className='flex items-center gap-2'>
                            <CalendarDays size={18} />
                            <DateLabel start={work.start} end={work.end} />
                        </div>
                    </div>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                    {work.description}
                </p>

                {company?.link && (
                    <div className='flex justify-end'>

                    <a
                        href={company.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-all hover:gap-3 w-fit shadow-lg shadow-primary/20"
                        >
                        Visit Company
                        <ArrowUpRight size={18} />
                    </a>
                        </div>
                )}
            </motion.div>
        </div>
    )
}
