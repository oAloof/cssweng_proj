import React, { createContext, useState, useEffect } from 'react';

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
    const [shoppingCart, setShoppingCart] = useState(
        localStorage?.getItem("shoppingCart") || []
        );
    const [isLoadingCart, setIsLoadingCart] = useState(true);


    const contextValue = {
        shoppingCart,
        setShoppingCart,
        isLoadingCart,
        setIsLoadingCart,
    };
    
    return (
        <ShoppingCartContext.Provider value={contextValue}>
            {children}
        </ShoppingCartContext.Provider>
    )
}