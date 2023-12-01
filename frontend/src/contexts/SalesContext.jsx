import React, { createContext, useState, useEffect } from 'react';

export const SalesContext = createContext();

export const SalesProvider = ({ children }) => {
    const [sales, setSales] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [saleChanged, setSaleChanged] = useState(false);

    const fetchSales = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/admin/sales/getSales", {
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

    const loadData = async () => {
        try {
            const fetchedSales = await fetchSales();
            setSales(fetchedSales);
        } catch (error) {
            console.error('Error fetching products: ', error);
        } finally {
            setIsLoading(false);
            setSaleChanged(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [saleChanged]);

    const contextValue = {
        sales,
        setSales,
        isLoading,
        setIsLoading,
        saleChanged,
        setSaleChanged,
    }

    return (
        <SalesContext.Provider value={contextValue}>
            {children}
        </SalesContext.Provider>
    )
}