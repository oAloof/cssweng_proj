import { useState, useEffect, useContext } from "react";
import Countdown from "../../components/CountdownTimer.jsx";
import NavBar from "../../components/NavBar.jsx";
import Menu from "../../components/Menu.jsx";
import Section from "../../components/customer/Section.jsx";
import ErrorMessage from "../../components/ErrorMessage.jsx";
import { AuthenticationContext } from "../../contexts/AuthenticationContext.jsx";

const LandingPage = () => {
  const [saleData, setSaleData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [mostDiscounted, setMostDiscounted] = useState(false);
  const [mostSold, setMostSold] = useState(false);
  const [newestProducts, setNewestProducts] = useState(false);
  const {isAuthenticated, isAdmin} = useContext(AuthenticationContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSaleData();

        setSaleData(data);
        // setIsLoading(false);

      } catch (error) {
        console.log(error);
      }
    };

    const fetchMostDiscounted = async () => {
      try {
        const data = await getMostDiscounted();
  
        setMostDiscounted(data)
        // setIsLoading(false);
        
      } catch (error) {
        console.error('Error fetching sales: ', error);
      }
    }

    const fetchMostSold = async () => {
      try {
        const data = await getMostSold();
  
        setMostSold(data)
        // setIsLoading(false);
        
      } catch (error) {
        console.error('Error fetching sales: ', error);
      }
    }

    const fetchNewestProducts = async () => {
      try {
        const data = await getNewestProducts();
  
        setNewestProducts(data)
        setIsLoading(false);
        
      } catch (error) {
        console.error('Error fetching sales: ', error);
      }
    }
    
    fetchData();
    fetchMostDiscounted();
    fetchMostSold();
    fetchNewestProducts();

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

  const getMostDiscounted = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/mostDiscounted");
  
        if (!response.ok) {
          console.error("Failed to fetch products: ", response.status);
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

  const getNewestProducts = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/newest");
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

      {mostDiscounted ? (
        <div className="mt-[7vh] pb-[15vh]">
          <Countdown saleData={saleData} />
          <section className="overflow-auto ">
            <Section title="Big Discounts!" category="Highest Discounts" products = {mostDiscounted}/>
            <Section title="Top Sales!" category="Most Sold" products = {mostSold}/>
            <Section title="Newest Products!" category="Newest Products" products = {newestProducts}/>
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
