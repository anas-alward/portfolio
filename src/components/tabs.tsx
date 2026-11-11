import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useCallback,
    useMemo,
} from "react";

type TabsContextType = {
    value: string;
    setValue: (val: string) => void;
};

const TabsContext = createContext<TabsContextType | null>(null);

function useTabsContext() {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error("Tabs components must be used inside <Tabs>");
    }
    return context;
}

type TabsProps = {
    children: ReactNode;
    defaultValue?: string;
    value?: string; // controlled mode
    onValueChange?: (val: string) => void;
};

function Tabs({
    children,
    defaultValue = "",
    value: controlledValue,
    onValueChange,
}: TabsProps) {
    const [uncontrolledValue, setUncontrolledValue] = useState<string>(
        defaultValue
    );

    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue! : uncontrolledValue;

    const setValue = useCallback(
        (val: string) => {
            if (!isControlled) {
                setUncontrolledValue(val);
            }
            onValueChange?.(val);
        },
        [isControlled, onValueChange]
    );

    const contextValue = useMemo(
        () => ({
            value: currentValue,
            setValue,
        }),
        [currentValue, setValue]
    );

    return (
        <TabsContext.Provider value={contextValue}>
            {children}
        </TabsContext.Provider>
    );
}

function TabsList({ children, className = "" }: { children: ReactNode, className?: string }) {
    return <div role="tablist" className={className}>{children}</div>;
}

type TabsTriggerProps = {
    value: string;
    children: ReactNode;
    className?: string;
};

function TabsTrigger({ value, children, className = "" }: TabsTriggerProps) {
    const { value: activeValue, setValue } = useTabsContext();

    const isActive = activeValue === value;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        const isArrow = e.key === "ArrowLeft" || e.key === "ArrowRight";
        const isHomeEnd = e.key === "Home" || e.key === "End";
        if (!isArrow && !isHomeEnd) return;

        const container = e.currentTarget.parentElement;
        if (!container) return;
        const tabs = Array.from(
            container.querySelectorAll<HTMLButtonElement>('[role="tab"]')
        );
        if (tabs.length === 0) return;

        e.preventDefault();
        const currentIndex = tabs.indexOf(e.currentTarget);
        let nextIndex: number;
        if (e.key === "Home") {
            nextIndex = 0;
        } else if (e.key === "End") {
            nextIndex = tabs.length - 1;
        } else {
            nextIndex =
                e.key === "ArrowRight"
                    ? (currentIndex + 1) % tabs.length
                    : (currentIndex - 1 + tabs.length) % tabs.length;
        }
        const nextTab = tabs[nextIndex];
        nextTab?.focus();
        if (nextTab?.dataset.value) setValue(nextTab.dataset.value);
    };

    return (
        <button
            role="tab"
            type="button"
            data-state={isActive ? "active" : "inactive"}
            data-value={value}
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            className={`group ${className}`}
            onClick={() => setValue(value)}
            onKeyDown={handleKeyDown}
        >
            {children}
        </button>
    );
}

type TabsContentProps = {
    value: string;
    children: ReactNode;
};

function TabsContent({ value, children }: TabsContentProps) {
    const { value: activeValue } = useTabsContext();

    if (activeValue !== value) return null;

    return <div role="tabpanel">{children}</div>;
}

Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;

export default Tabs;
