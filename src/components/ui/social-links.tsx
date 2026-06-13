import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { useSupabaseQuery } from "@/hooks/useSupabase";
import { getStorageUrl } from "@/lib/storage";
import Tooltip from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { Contact } from "@/types";

interface SocialLinksProps {
  iconSize?: number;
  gap?: string;
  showTooltip?: boolean;
  animated?: boolean;
  className?: string;
  itemClassName?: string;
}

const SocialLinks = ({
  iconSize = 6,
  gap = "gap-[15px]",
  showTooltip = false,
  animated = false,
  className = "",
  itemClassName = "",
}: SocialLinksProps) => {
  const { data: socials, isLoading } = useSupabaseQuery<Contact>({
    key: ['socials'],
    table: 'socials',
    params: {
      is_active: "eq.true",
      order: "order.asc",
    },
  });

  const variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  const content = (
    <div className={`flex flex-wrap items-center ${gap} ${className}`}>
      {isLoading ? (
        <>
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="w-10 h-10 rounded-full" />
        </>
      ) : (
        socials?.map((social) => {
          const iconSizeRem = `${iconSize * 0.25}rem`;
          const iconStyle = {
            width: iconSizeRem,
            height: iconSizeRem,
            "--icon-src": `url("${getStorageUrl(social.icon)}")`,
          } as CSSProperties;

          const icon = (
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary hover:bg-secondary/20 border border-border/20 transition-all duration-300 cursor-pointer ${itemClassName}`}
            >
              <div
                aria-label={social.name}
                role="img"
                className="icon icon-custom hover:text-foreground transition-colors"
                style={iconStyle}
              />
            </a>
          );

          return (
            <div key={social.id}>
              {showTooltip ? (
                <Tooltip content={social.name} position="bottom">
                  {icon}
                </Tooltip>
              ) : (
                icon
              )}
            </div>
          );
        })
      )}
    </div>
  );

  if (animated) {
    return (
      <motion.div initial="hidden" animate="visible" variants={variants}>
        {content}
      </motion.div>
    );
  }

  return content;
};

export default SocialLinks;
