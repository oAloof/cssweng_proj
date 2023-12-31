import { useState, useEffect, useContext } from "react";
import Countdown from "../../components/CountdownTimer.jsx";
import NavBar from "../../components/NavBar.jsx";
import Menu from "../../components/Menu.jsx";
import Section from "../../components/customer/Section.jsx";
import SearchBar from "../../components/customer/customerSearch.jsx";
import Loader from "../../components/Loader.jsx";

import ErrorMessage from "../../components/ErrorMessage.jsx";
import { AuthenticationContext } from "../../contexts/AuthenticationContext.jsx";

const LandingPage = () => {
  const [saleData, setSaleData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [mostDiscounted, setMostDiscounted] = useState(false);
  const [mostSold, setMostSold] = useState(false);
  const [newestProducts, setNewestProducts] = useState(false);
  const { isAuthenticated, isAdmin } = useContext(AuthenticationContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSaleData();
        return data;
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    const fetchMostDiscounted = async () => {
      try {
        const data = await getMostDiscounted();
        return data;
      } catch (error) {
        console.error("Error fetching sales: ", error);
      }
    };

    const fetchMostSold = async () => {
      try {
        const data = await getMostSold();
        return data;
      } catch (error) {
        console.error("Error fetching sales: ", error);
      }
    };

    const fetchNewestProducts = async () => {
      try {
        const data = await getNewestProducts();
        return data;
      } catch (error) {
        console.error("Error fetching sales: ", error);
      }
    };

    Promise.all([
      fetchData(),
      fetchMostDiscounted(),
      fetchMostSold(),
      fetchNewestProducts(),
    ])
      .then(([saleData, mostDiscounted, mostSold, newestProducts]) => {
        setSaleData(saleData);
        setMostDiscounted(mostDiscounted);
        setMostSold(mostSold);
        setNewestProducts(newestProducts);
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle errors here if any of the requests failed
        setErrorMessage("An error occurred while fetching data");
        console.error("Error during fetch:", error);
      });

    let timer;
    if (errorMessage) {
      timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [errorMessage, isLoading]);

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
      const response = await fetch("http://localhost:4000/api/mostSoldHomepage");

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
    return <Loader />;
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
            <SearchBar />
            <Section
              title="Big Discounts!"
              category="mostDiscounted"
              products={mostDiscounted}
              isLoading={isLoading}
            />
            <Section
              title="Top Sales!"
              category="mostSold"
              products={mostSold}
              isLoading={isLoading}
            />
            <Section
              title="Newest Products!"
              category="newestProducts"
              products={newestProducts}
              isLoading={isLoading}
            />
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
export default LandingPage;
