import React, { createContext, useState, useEffect } from 'react';

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
    const [shoppingCart, setShoppingCart] = useState(
        localStorage?.getItem("shoppingCart") || []
        );


}