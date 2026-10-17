import { createContext, useContext } from 'react';

export interface PreloaderContextType {
    hasLoaded: boolean;
    setHasLoaded: (value: boolean) => void;
}

export const PreloaderContext = createContext<PreloaderContextType | undefined>(undefined);

export const usePreloader = () => {
    const context = useContext(PreloaderContext);
    if (context === undefined) {
        throw new Error('usePreloader must be used within a PreloaderProvider');
    }
    return context;
};
