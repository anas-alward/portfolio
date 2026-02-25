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

    return (
        <button
            role="tab"
            data-state={isActive ? "active" : "inactive"}
            aria-selected={isActive}
            className={`group ${className}`}
            onClick={() => setValue(value)}
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
