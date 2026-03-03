import HeroPhoto from "./photo"
import WordFadeIn from "@/components/animation/wordFadeIn"
import FormattedText from "@/components/ui/formatted-text"
import ContactBlock from "./contact"
import { useProfile } from "@/hooks/useProfile"
import { Skeleton } from "@/components/ui/skeleton"
import { IsAvailableLabel, CurrentlyAtLabel } from "./labels"
import DotsOverlay from "./DotsOverlay"

const HeroSection = () => {
    const { data: profile, isLoading } = useProfile({ order: undefined })

    return (
        <div className="relative">
            <DotsOverlay count={300} size={0.001}/>
            <div className="flex flex-col gap-[35px]">
                {/* Name + Photo grouped as one item */}
                <div className="flex items-center gap-3">
                    <HeroPhoto profile={profile} isLoading={isLoading} />
                    <div className="flex flex-col">
                        <span className="text-[20px] pc:text-[25px] font-medium tracking-tight">
                            {profile?.name || ""}
                        </span>
                        {
                            profile?.is_available ? (<IsAvailableLabel />) : profile?.at && <CurrentlyAtLabel company={profile.at} />
                        }
                    </div>
                </div>

                {/* Primary & Secondary titles */}
                <div className="flex flex-col gap-[30px]">
                    <div>
                        {
                            isLoading ? (
                                <div className="flex flex-col gap-2">
                                    <Skeleton className="h-8 w-48" />
                                    <Skeleton className="h-6 w-64" />
                                </div>
                            ) : (
                                <>
                                    <WordFadeIn key="title-loaded" className="text-[22px] pc:text-[25px] font-bold">
                                        {profile?.primary_title || ""}
                                    </WordFadeIn>

                                    <FormattedText animated className="text-[17px] pc:text-[20px] text-secondary-foreground mt-2 font-medium">
                                        {profile?.secondary_title || ""}
                                    </FormattedText>
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