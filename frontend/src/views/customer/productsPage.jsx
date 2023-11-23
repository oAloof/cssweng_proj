import { useState, useEffect } from "react";
import Countdown from "../../components/CountdownTimer.jsx";
import NavBar from "../../components/NavBar.jsx";
import Menu from "../../components/Menu.jsx";
import Section from "../../components/customer/Section.jsx";
import SearchBar from "../../components/customer/customerSearch.jsx";

const ProductsPage = () => {
  const [saleData, setSaleData] = useState(null);
  const [mostSold, setMostSold] = useState(false);
  const [ProductCategories, setProductCategories] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSale = async () => {
      try {
        const data = await getSaleData();

        setSaleData(data);
        setIsLoading(false);

      } catch (error) {
        console.log(error);
      }
    };

    const fetchMostSold = async () => {
      try {
        const data = await getMostSold();
  
        setMostSold(data)
        setIsLoading(false);
        
      } catch (error) {
        console.error('Error fetching sales: ', error);
      }
    }

    const fetchProductCategories = async () => {
      try {
        const data = await getProductCategories();
  
        setProductCategories(data)
        setIsLoading(false);
        
      } catch (error) {
        console.error('Error fetching sales: ', error);
      }
    }
    
    fetchSale();
    fetchMostSold();
    fetchProductCategories();
  }, []);

  const getSaleData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/sales/ongoing");
      if (!response.ok) {
        console.log("Error fetching data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getMostSold = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/mostSold");
  
        if (!response.ok) {
          console.error("Failed to fetch products: ", response.status);
        }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getProductCategories = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/categories");
  
        if (!response.ok) {
          console.error("Failed to fetch product Categories: ", response.status);
        }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col">
      <Menu />

      {mostSold ? (
        <div className="mt-[7vh] pb-[15vh]">
          <section className="overflow-auto ">
          <SearchBar />
            {ProductCategories && ProductCategories.map((productCategory) => {
              return <Section title= {capitalizeFirstLetter(productCategory)} category= {productCategory} products = {mostSold}/>
            })}
          </section>
        </div>
      ) : (
        <NoProductsView saleData={saleData} />
      )}
      
      <NavBar />
    </div>
  );
};

export default ProductsPage;

const NoProductsView = ({ saleData }) => {
  return (
    <div className="flex min-w-screen min-h-screen flex-col items-center justify-start bg-slate-400">
      <div className="w-full mt-[7vh]">
        <Countdown saleData={saleData} />
      </div>
      <div className="flex flex-col items-center justify-center p-4 font-Nunito mt-8">
        {" "}
        {/* Adjust this margin-top (mt-8) as needed */}
        <img
          src="/NoProducts.png"
          alt="No products available"
          className="opacity-90 max-w-xs md:max-w-md"
        />
        <h3 className="mt-4 font-bold text-[#5c698c]">
          We're busy curating the best deals for you.
        </h3>
        <p className="text-[#5c698c]">
          Check back soon for exciting offers and future bodega sales!
        </p>
      </div>
    </div>
  );
};
