import React, { createContext, useState, useEffect } from 'react';

export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);

    const contextValue = {
        isAuthenticated,
        setIsAuthenticated,
        isAdmin,
        setIsAdmin,
        isLoadingAuth,
    }

    const fetchAuthData = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/auth/status", 
            {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("User not found. ", response.status)
            }
            const responseData = await response.json();
            if (!responseData.isAuthenticated) {
                setIsAuthenticated(responseData.isAuthenticated);
                setIsAdmin(false);
            }
            setIsAuthenticated(responseData.isAuthenticated);
            if (responseData.userType === "Admin") {
                setIsAdmin(responseData.isAdmin);
            } else {
                setIsAdmin(false);
            }
            setIsLoadingAuth(false);
            return
        } catch (error) {
            console.error('Error fetching auth data: ', error);
            setIsLoadingAuth(false);
            return
        }
    }

    useEffect(() => {
        fetchAuthData();
    }, []);

    return (
        <AuthenticationContext.Provider value={contextValue}>
            {children}
        </AuthenticationContext.Provider>
    )
}