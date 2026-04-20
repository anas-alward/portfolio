import TestimonialItem from "@/features/testimonial/components/item";
import TestimonialSkeleton from "@/features/testimonial/components/skeleton";
import { usePaginatedTestimonials } from "@/features/testimonial/hooks";

const TestimonialTabContent = () => {
    const { data, isLoading } = usePaginatedTestimonials();
    const testimonials = data?.data;

    if (isLoading) {
        return (
            <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                    <TestimonialSkeleton key={i} />
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            <div className="space-y-2">
                {testimonials?.map((testimonial, i) => (
                    <TestimonialItem key={testimonial.id || i} testimonial={testimonial} />
                ))}
            </div>
        </div>
    );
};

export default TestimonialTabContent;
