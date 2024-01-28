import React, { createContext, useState } from 'react';

// Create the context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const logIn = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
    };

    const logOut = () => {
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};