import React, { createContext, useState } from 'react';

export const DarkModeContext = createContext(null);

export function DarkModeProvider(props) {
    const [isDarkMode, setIsDarkMode] = useState(true);

    return (
        <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
            {props.children}
        </DarkModeContext.Provider>
    );
}
