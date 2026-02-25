import QuotationIcon from "@/assets/icons/quotation.svg";
import type { Testimonial } from "@/types/testimonials";
import { getStorageUrl } from "@/lib/storage";
import ExpandableText from "@/components/ui/expandable-text";

const TestimonialItem = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="w-full py-6 border-b border-neutral-200">
      {/* Quote */}
      <div className="flex gap-3">
        <img
          src={QuotationIcon}
          alt=""
          className="w-5 h-5 mt-1 opacity-40"
        />

        <p className="text-base text-primary leading-relaxed">
          <ExpandableText text={testimonial.text} wordLimit={50} />
        </p>
      </div>

      {/* Author */}
      <div className="mt-4 flex items-center gap-3">
        <img
          src={testimonial.image ? getStorageUrl(testimonial.image) : "https://framerusercontent.com/images/vNTpC54tAMX1qyqFOcFM30s4.png?scale-down-to=512"}
          alt={testimonial.person}
          className="w-8 h-8 rounded-full object-cover"
        />

        <div className="text-base flex flex-col">
          <span className="font-semibold text-primary leading-tight">
            {testimonial.person}
          </span>
          <div className="text-secondary-foreground text-[12px] leading-tight flex items-center gap-1">
            <span>{testimonial.role}</span>
            <span className="text-secondary-foreground">•</span>
            <span className="font-medium text-muted-foreground">{testimonial.at}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialItem;
