import { useState } from "react";
import TestimonialItem from "./item";
import TestimonialSkeleton from "./skeleton";
import Pagination from "@/components/ui/pagination";
import { usePaginatedTestimonials } from "@/hooks/useTestimonial";

const TestimonialTabContent = () => {
    const [page, setPage] = useState(1);
    const pageSize = 3;

    const { data, isLoading } = usePaginatedTestimonials(page, pageSize, { order: "order.asc" });
    const testimonials = data?.data;
    const totalCount = data?.count || 0;
    const totalPages = Math.ceil(totalCount / pageSize);

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

            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </div>
    );
};

export default TestimonialTabContent;