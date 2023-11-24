import React, { createContext, useState, useEffect } from 'react';

export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);

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
                throw new Error("User not found.")
            }
            const responseData = await response.json();
            if (!responseData.isAuthenticated) {
                setIsAuthenticated(responseData.isAuthenticated);
                setIsAdmin(false);
            }
            setIsAuthenticated(responseData.isAuthenticated);
            if (responseData.userType === "Admin") {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
            setIsLoadingAuth(false);
            console.log(`Fetching auth data: isAuthenticated ${isAuthenticated} isAdmin ${isAdmin}`); // ! Remove this
            return
        } catch (error) {
            console.error('Error fetching auth data: ', error);
            setIsLoadingAuth(false);
            return
        }
    }
    
    const login = async (data) => {
        try {
            const response = await fetch("http://localhost:4000/api/login", 
            {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            }
            setIsAuthenticated(true);
            if (responseData.userType === "Admin") {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
            return
        } catch (error) {
            throw new Error(error);
        }
    }

    useEffect(() => {
        fetchAuthData();
    }, [isAuthenticated]);

    const contextValue = {
        isAuthenticated,
        setIsAuthenticated,
        isAdmin,
        setIsAdmin,
        isLoadingAuth,
        login
    }

    return (
        <AuthenticationContext.Provider value={contextValue}>
            {children}
        </AuthenticationContext.Provider>
    )
}