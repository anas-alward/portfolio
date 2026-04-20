import EducationItem from "@/features/education/components/item";
import EducationSkeleton from "@/features/education/components/skeleton";
import { usePaginatedEducations } from "@/features/education/hooks";
import { Education } from "@/types";

const EducationTabContent = () => {
    const { data, isLoading } = usePaginatedEducations();
    const education = data?.data;

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
