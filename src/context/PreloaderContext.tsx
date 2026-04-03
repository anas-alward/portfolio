import React, { createContext, useContext, useState } from 'react';

interface PreloaderContextType {
    hasLoaded: boolean;
    setHasLoaded: (value: boolean) => void;
}

const PreloaderContext = createContext<PreloaderContextType | undefined>(undefined);

export const PreloaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [hasLoaded, setHasLoaded] = useState(false);

    return (
        <PreloaderContext.Provider value={{ hasLoaded, setHasLoaded }}>
            {children}
        </PreloaderContext.Provider>
    );
};

export const usePreloader = () => {
    const context = useContext(PreloaderContext);
    if (context === undefined) {
        throw new Error('usePreloader must be used within a PreloaderProvider');
    }
    return context;
};
