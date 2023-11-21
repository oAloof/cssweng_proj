import React, { createContext, useState, useEffect } from 'react';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [productChanged, setProductChanged] = useState(false);

    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/admin/products/getProducts", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            });
            if (!response.ok) {
            console.error("Failed to fetch products: ", response.status);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching products: ', error);
        }
    }

    useEffect(() => {
        const loadData = async () => {
            try {
                const fetchedProducts = await fetchProducts();
                setProducts(fetchedProducts.products);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching products: ', error);
            }
        };
        loadData();
    }, [productChanged]);

    const contextValue = {
        products,
        setProducts,
        isLoading,
        setIsLoading,
        productChanged,
        setProductChanged,
    }

    return (
        <ProductsContext.Provider value={contextValue}>
            {children}
        </ProductsContext.Provider>
    )
}