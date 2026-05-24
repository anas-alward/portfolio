import HeroPhoto from "./photo";
import ContactCTA from "./cta";
import WordFadeIn from "@/components/animation/wordFadeIn";
import FormattedText from "@/components/ui/formatted-text";
import { Skeleton } from "@/components/ui/skeleton";
import { IsAvailableLabel, CurrentlyAtLabel } from "./labels";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useSupabaseQuery, useSupabaseSingleQuery } from "@/hooks/useSupabase";
import { Profile, Contact } from "@/types";
import { useSettingsStore } from "@/store/settings";
import SocialLinks from "@/components/ui/social-links";

const HeroSection = () => {
  const profileResult = useSupabaseSingleQuery<Profile | null>({
    key: ["profile"],
    table: "profile",
    params: { order: undefined },
  });
  const { data: profile, isLoading: profileLoading } = profileResult;

  const socialsResult = useSupabaseQuery<Contact>({
    key: ["socials"],
    table: "socials",
    params: { is_active: "eq.true", order: "order.asc" },
  });
  const { data: socials, isLoading: socialsLoading } = socialsResult;

  const { getSettings } = useSettingsStore();
  const themeToggleSetting = getSettings("THEME_TOGGLE");
  const isThemeToggleEnabled = themeToggleSetting?.value === "true";
  const isLoading = profileLoading || socialsLoading;

  // Find email or default to first social link for fallback
  const emailSocial = socials?.find((s) =>
    s.name.toLowerCase().includes("email"),
  );
  const linkedinSocial = socials?.find((s) =>
    s.name.toLowerCase().includes("linkedin"),
  );
  const primaryContact = emailSocial || linkedinSocial || socials?.[0];

  const ctaLink = profile?.cta_link || primaryContact?.url || "";

  return (
    <div className="relative">
      <div className="absolute right-0 top-0">
        {isThemeToggleEnabled && <ThemeToggle />}
      </div>
      <div className="flex flex-col gap-8.75">
        {/* Name + Photo grouped as one item */}
        <div className="flex items-center gap-3">
          <HeroPhoto profile={profile} isLoading={isLoading} />
          <div className="flex flex-col">
            <span className="text-primary text-[20px] pc:text-[25px] font-medium tracking-tight">
              {profile?.name || ""}
            </span>
            <div className="flex items-center gap-2">
              {profile?.is_available ? (
                <IsAvailableLabel />
              ) : (
                profile?.at && <CurrentlyAtLabel company={profile.at} />
              )}
              <span className="text-secondary-foreground/20 select-none">
                •
              </span>
              <ContactCTA href={ctaLink} />
            </div>
          </div>
        </div>

        {/* Primary & Secondary titles */}
        <div className="flex flex-col gap-7.5">
          <div>
            {isLoading ? (
              <div className="flex flex-col gap-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-6 w-64" />
              </div>
            ) : (
              <>
                <WordFadeIn
                  key="title-loaded"
                  className="text-[22px] pc:text-[25px] font-bold"
                >
                  {profile?.primary_title || ""}
                </WordFadeIn>

                <FormattedText
                  animated
                  className="text-[17px] pc:text-[20px] text-muted-foreground mt-2 font-medium"
                >
                  {profile?.secondary_title || ""}
                </FormattedText>
              </>
            )}
          </div>
          <SocialLinks iconSize={4} gap="gap-2" showTooltip animated />{" "}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
