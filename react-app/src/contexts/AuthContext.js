import React, { createContext, useState } from 'react';

// Create the context
export const AuthContext = createContext({
    isLoggedIn: false,
    user: null,
    logIn: () => {},
    logOut: () => {},
});

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const logIn = (user) => {
        localStorage.setItem("user", JSON.stringify(user));
        setIsLoggedIn(true);
        setUser(user);
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