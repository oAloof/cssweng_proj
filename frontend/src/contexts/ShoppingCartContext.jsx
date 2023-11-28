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
        if (isAuthenticated && isLoadingCart) {
            // Fetch shopping cart data from backend
            fetchCartData();
            setIsLoadingCart(false);
            setCartItemChanged(false);
        }
    }), [isAuthenticated, cartItemChanged]

    useEffect(() => {
        console.log(shoppingCart);
    }, [shoppingCart])

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
            setShoppingCart(responseData.cart);
            // console.log(`Fetching cart data: ${shoppingCart}`); // ! Remove this
            return
        } catch (error) {
            console.error('Error fetching cart data: ', error);
            return
        }
    }

    const addToCart = async (productId, quantity) => {
        if (!isAuthenticated) {
            alert("Please login to add items to your cart.");
            return;
        }

        const dataToSend = { productId, quantity };

        try {
            const response = await fetch("http://localhost:4000/api/cart/update", 
            {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(dataToSend),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            }
            setCartItemChanged(true);
            setIsLoadingCart(true);
            console.log(`Message: ${responseData.message}`);
            return
        } catch (error) {
            console.error('Error adding item to cart: ', error);
            return
        }
    }

    const contextValue = {
        shoppingCart,
        setShoppingCart,
        cartItemChanged,
        setCartItemChanged,
        isLoadingCart,
        setIsLoadingCart,
        addToCart
    };
    
    return (
        <ShoppingCartContext.Provider value={contextValue}>
            {children}
        </ShoppingCartContext.Provider>
    )
}