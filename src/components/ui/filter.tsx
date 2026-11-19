import { ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

interface FilterProps {
    items: string[];
    activeItem: string;
    onChange: (item: string) => void;
    label?: string;
}

const MENU_ITEM_SELECTOR = '[role="menuitemradio"]';

const Filter = ({ items, activeItem, onChange, label = "Filter" }: FilterProps) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const menuId = useId();

    const getMenuItems = () =>
        Array.from(menuRef.current?.querySelectorAll<HTMLButtonElement>(MENU_ITEM_SELECTOR) ?? []);

    const focusMenuItem = (index: number) => {
        const menuItems = getMenuItems();
        if (menuItems.length === 0) return;
        menuItems[(index + menuItems.length) % menuItems.length].focus();
    };

    const closeAndRestoreFocus = () => {
        setOpen(false);
        triggerRef.current?.focus();
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && open) closeAndRestoreFocus();
        };
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open]);

    // Move focus into the menu when it opens, starting on the active option.
    useEffect(() => {
        if (!open) return;
        const menuItems = getMenuItems();
        const activeIndex = menuItems.findIndex(
            (item) => item.getAttribute("aria-checked") === "true"
        );
        (menuItems[activeIndex >= 0 ? activeIndex : 0] ?? triggerRef.current)?.focus();
    }, [open]);

    const handleMenuKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const menuItems = getMenuItems();
        const currentIndex = menuItems.indexOf(document.activeElement as HTMLButtonElement);

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                focusMenuItem(currentIndex + 1);
                break;
            case "ArrowUp":
                e.preventDefault();
                focusMenuItem(currentIndex - 1);
                break;
            case "Home":
                e.preventDefault();
                focusMenuItem(0);
                break;
            case "End":
                e.preventDefault();
                focusMenuItem(menuItems.length - 1);
                break;
            case "Tab":
                setOpen(false);
                break;
        }
    };

    return (
        <div ref={dropdownRef} className="relative inline-block text-left">
            <button
                ref={triggerRef}
                type="button"
                onClick={() => setOpen(!open)}
                onKeyDown={(e) => {
                    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                        e.preventDefault();
                        setOpen(true);
                    }
                }}
                aria-expanded={open}
                aria-haspopup="menu"
                aria-controls={open ? menuId : undefined}
                aria-label={`Filter by ${label}`}
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
                <div
                    ref={menuRef}
                    id={menuId}
                    role="menu"
                    aria-label={label}
                    onKeyDown={handleMenuKeyDown}
                    className="absolute right-0 mt-1 w-40 origin-top-right rounded-lg bg-white border border-neutral-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-30 py-1"
                >
                    {items.map((item) => (
                        <button
                            key={item}
                            type="button"
                            role="menuitemradio"
                            tabIndex={-1}
                            aria-checked={activeItem === item}
                            onClick={() => {
                                onChange(item);
                                closeAndRestoreFocus();
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
