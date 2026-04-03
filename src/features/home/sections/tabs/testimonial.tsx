import { useState } from "react";
import TestimonialItem from "@/features/testimonial/components/item";
import TestimonialSkeleton from "@/features/testimonial/components/skeleton";
import Pagination from "@/components/ui/pagination";
import { usePaginatedTestimonials } from "@/hooks/useTestimonial";

const TestimonialTabContent = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, pageSize } = usePaginatedTestimonials(page);
    const testimonials = data?.data;
    const totalPages = data?.totalPages || 0;

    if (isLoading) {
        return (
            <div className="space-y-2">
                {[...Array(pageSize)].map((_, i) => (
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

            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </div>
    );
};

export default TestimonialTabContent;
