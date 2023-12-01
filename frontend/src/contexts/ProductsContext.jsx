import React, { createContext, useState, useEffect } from "react";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [productChanged, setProductChanged] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
  });

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/admin/products/getProducts",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        console.error("Failed to fetch products: ", response.status);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  const updateFilters = (filterType, selectedItems) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: selectedItems,
    }));
  };

  const filteredProducts = products.filter(
    (product) =>
      (filters.categories.length === 0 ||
        filters.categories.includes(product.category)) &&
      (filters.brands.length === 0 || filters.brands.includes(product.brand))
  );

  const loadData = async () => {
    try {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts.products);
    } catch (error) {
      console.error("Error fetching products: ", error);
    } finally {
      setIsLoading(false);
      setProductChanged(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [productChanged]);

  const contextValue = {
    products,
    setProducts,
    isLoading,
    setIsLoading,
    productChanged,
    setProductChanged,
    filteredProducts,
    setFilters,
  };

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};
