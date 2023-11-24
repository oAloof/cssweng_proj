import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthenticationContext } from './AuthenticationContext';

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
    const [shoppingCart, setShoppingCart] = useState([])
    const [cartItemChanged, setCartItemChanged] = useState(false);
    const [isLoadingCart, setIsLoadingCart] = useState(true);
    // CONTEXT DATA
    const { isAuthenticated } = useContext(AuthenticationContext);
    
    useEffect(() => {
        // Initialize shopping cart
        if (isAuthenticated) {
            // Fetch shopping cart data from backend
            fetchCartData();
            setIsLoadingCart(false);
        }
    }), [isAuthenticated]

    const fetchCartData = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/cart", 
            {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                console.log("Cart not found.")
                return
            }
            const responseData = await response.json();
            console.log(responseData);
            setShoppingCart(responseData.cart);
            // console.log(`Fetching cart data: ${shoppingCart}`); // ! Remove this
            return
        } catch (error) {
            console.error('Error fetching cart data: ', error);
            return
        }
    }

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