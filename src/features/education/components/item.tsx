import type { Education } from "@/types";
import Image from "@/components/ui/image";

const EducationItem = ({ education }: { education: Education }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 group hover:bg-neutral-50 rounded-lg transition-colors px-3 -mx-3 gap-4 sm:gap-0">
      <div className="flex items-start gap-4">
        {/* Logo/Icon Placeholder */}
        <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-white border border-neutral-100 rounded-lg shadow-sm">
          {education.icon ? (
            <Image
              src={education.icon}
              alt={education.institution}
              className="w-8 h-8 object-contain"
            />
          ) : (
            <span className="text-lg font-bold text-primary">
              {education.institution.charAt(0)}
            </span>
          )}
        </div>

        <div className="space-y-1">
          <h3 className="font-semibold text-primary leading-none">
            {education.institution}
          </h3>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-secondary-foreground">
              {education.degree}
            </p>
            {education.grade && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-background/50 text-muted-foreground">
                {education.grade}
              </span>
            )}
          </div>
          {education.description && (
            <p className="text-xs text-muted-foreground max-w-md pt-1">
              {education.description}
            </p>
          )}
        </div>
      </div>

      <div className="text-sm font-medium text-secondary-foreground sm:text-right pl-16 sm:pl-0">
        <div>{education.period}</div>
      </div>
    </div>
  );
};

export default EducationItem;
