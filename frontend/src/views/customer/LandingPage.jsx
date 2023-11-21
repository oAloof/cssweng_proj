import { useState, useEffect } from "react";
import Countdown from "../../components/CountdownTimer.jsx";
import NavBar from "../../components/NavBar.jsx";
import Menu from "../../components/Menu.jsx";
import Section from "../../components/customer/Section.jsx";
import ErrorMessage from "../../components/ErrorMessage.jsx";

const LandingPage = () => {
  const [saleData, setSaleData] = useState(null);
  const [products, setProducts] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSaleData();
        setSaleData(data);
        setIsLoading(false);
        setProductsListed(data.sale.some((product) => product.listed)); // TODO: CHECK IF ANY PRODUCTS ARE LISTED
      } catch (error) {
        console.log(error);
      }
    };

    const fetchProducts = async () => {
      try {
        const data = await getProductData();
  
        setProducts(data)
        setIsLoading(false);
        
      } catch (error) {
        console.error('Error fetching sales: ', error);
      }
    }
    
    fetchData();
    fetchProducts();
    
    let timer;
    if (errorMessage) {
      timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [errorMessage]);

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

  const getProductData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/products", {
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
      console.error("Error fetching data:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-slate-100 min-h-screen min">
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}

      <Menu setErrorMessage={setErrorMessage} />

      {products ? (
        <div className="mt-[7vh] pb-[15vh]">
          <Countdown saleData={saleData} />
          <section className="overflow-auto ">
            <Section title="Big Discounts!" category="Energy Efficient" products = {products}/>
            <Section title="Big Discounts!" category="Energy Efficient" products = {products}/>
            <Section title="Big Discounts!" category="Energy Efficient" products = {products}/>
            <Section title="Big Discounts!" category="Energy Efficient" products = {products}/>
          </section>
        </div>
      ) : (
        <NoProductsView saleData={saleData} />
      )}

      <NavBar />
    </div>
  );
};

const NoProductsView = ({ saleData }) => {
  return (
    <div className="flex min-w-screen h-screen items-center justify-center bg-slate-400">
      <div className="w-full absolute top-0 mt-[7vh]">
        <Countdown saleData={saleData} />
      </div>
      <div className="flex flex-col items-center justify-center p-4 font-Nunito">
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

export default LandingPage;
