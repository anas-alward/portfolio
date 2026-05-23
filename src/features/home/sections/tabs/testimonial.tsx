import TestimonialItem from "@/features/testimonial/components/item";
import TestimonialSkeleton from "@/features/testimonial/components/skeleton";
import { useSupabaseQuery } from "@/hooks/useSupabase";
import { Testimonial } from "@/types";

const TestimonialTabContent = () => {
    const { data: testimonials, isLoading } = useSupabaseQuery<Testimonial>({
        key: ['testimonials'],
        table: 'testimonials',
    });

    if (isLoading) {
        return (
            <div className="divide-y-2">
                {[...Array(3)].map((_, i) => (
                    <TestimonialSkeleton key={i} />
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            <div className="divide-y-2">
                {testimonials?.map((testimonial, i) => (
                    <TestimonialItem key={testimonial.id || i} testimonial={testimonial} />
                ))}
            </div>
        </div>
    );
};

export default TestimonialTabContent;
