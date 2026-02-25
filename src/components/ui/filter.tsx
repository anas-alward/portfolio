
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface FilterProps {
    items: string[];
    activeItem: string;
    onChange: (item: string) => void;
    label?: string;
}

const Filter = ({ items, activeItem, onChange, label = "Filter" }: FilterProps) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative inline-block text-left">
            <button
                onClick={() => setOpen(!open)}
                className="group flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
            >
                <span>
                    {activeItem === "all" ? label : activeItem}
                </span>
                <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && (
                <div className="absolute right-0 mt-1 w-40 origin-top-right rounded-lg bg-white border border-neutral-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-30 py-1">
                    {items.map((item) => (
                        <button
                            key={item}
                            onClick={() => {
                                onChange(item);
                                setOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-xs transition-colors ${activeItem === item
                                ? "bg-neutral-50 font-medium text-neutral-900"
                                : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
                                }`}
                        >
                            {item === "all" ? "All" : item}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Filter;
