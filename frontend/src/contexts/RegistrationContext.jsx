import React, { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';

export const RegistrationContext = createContext();

export const RegistrationProvider = ( {children} ) => {
    const [registrationData, setRegistrationData] = useState({});
    const [isPageOneComplete, setIsPageOneComplete] = useState(false);

    return (
        <RegistrationContext.Provider value={{registrationData, setRegistrationData, isPageOneComplete, setIsPageOneComplete}}>
            {children}
            <Outlet />
        </RegistrationContext.Provider>
    )
}