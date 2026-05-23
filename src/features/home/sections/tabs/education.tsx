import EducationItem from "@/features/education/components/item";
import EducationSkeleton from "@/features/education/components/skeleton";
import { Education } from "@/types";
import { useSupabaseQuery } from "@/hooks/useSupabase";

const EducationTabContent = () => {
  const { data: education, isLoading } = useSupabaseQuery<Education>({
    key: ["educations"],
    table: "educations",
  });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        {[...Array(3)].map((_, i) => (
          <EducationSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="divide-y divide-neutral-200">
        {education?.map((item: Education) => (
          <EducationItem key={item.id} education={item} />
        ))}
      </div>
    </div>
  );
};

export default EducationTabContent;
