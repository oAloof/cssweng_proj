import React, { createContext, useState, useEffect } from 'react';

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
    const [shoppingCart, setShoppingCart] = useState(
        localStorage?.getItem("shoppingCart") || []
        );
    
    const contextValue = {
        shoppingCart,
        setShoppingCart,
    };
    
    return (
        <ShoppingCartContext.Provider value={contextValue}>
            {children}
        </ShoppingCartContext.Provider>
    )
}