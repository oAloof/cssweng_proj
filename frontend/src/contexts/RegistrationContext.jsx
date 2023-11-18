import React, { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';

export const RegistrationContext = createContext();

export const RegistrationProvider = ( {children} ) => {
    const [registrationData1, setRegistrationData1] = useState({});
    const [registrationData2, setRegistrationData2] = useState({});
    const [isPageOneComplete, setIsPageOneComplete] = useState(false);

    return (
        <RegistrationContext.Provider value={{
            registrationData1, 
            setRegistrationData1,
            registrationData2, 
            setRegistrationData2, 
            isPageOneComplete, 
            setIsPageOneComplete
            }}>
            {children}
            <Outlet />
        </RegistrationContext.Provider>
    )
}