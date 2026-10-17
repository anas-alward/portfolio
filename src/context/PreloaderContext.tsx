import React, { useState } from 'react';
import { PreloaderContext } from '@/hooks/usePreloader';

export const PreloaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [hasLoaded, setHasLoaded] = useState(false);

    return (
        <PreloaderContext.Provider value={{ hasLoaded, setHasLoaded }}>
            {children}
        </PreloaderContext.Provider>
    );
};
