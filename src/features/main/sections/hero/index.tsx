import HeroPhoto from "./photo"
import WordFadeIn from "@/components/animation/wordFadeIn"
import ContactBlock from "./contact"
import { useProfile } from "@/hooks/useProfile"
import { Skeleton } from "@/components/ui/skeleton"

const HeroSection = () => {
    const { data: profile, isLoading } = useProfile({ order: undefined })

    return (
        <div>
            <div className="flex flex-col gap-[30px]">
                <HeroPhoto profile={profile} isLoading={isLoading} />
                <div className='flex flex-col gap-[30px]'>
                    <div>
                        {
                            isLoading ? (
                                <div className="flex flex-col gap-2">
                                    <Skeleton className="h-8 w-48" />
                                    <Skeleton className="h-6 w-64" />
                                </div>
                            ) : (
                                <>
                                    <WordFadeIn key="title-loaded" className="text-[22px] pc:text-[25px] font-normal">
                                        {profile?.primary_title || ""}
                                    </WordFadeIn>
                                    <WordFadeIn key="description-loaded" className="text-[17px] pc:text-[20px] text-secondary-foreground mt-2 font-normal">
                                        {profile?.secondary_title || ""}
                                    </WordFadeIn>
                                </>
                            )
                        }
                    </div>

                    <ContactBlock />
                </div>
            </div>
        </div>
    )
}


export default HeroSection;