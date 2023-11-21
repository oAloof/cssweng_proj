import { useState, useEffect } from "react";
import Countdown from "../../components/CountdownTimer.jsx";
import NavBar from "../../components/NavBar.jsx";
import Menu from "../../components/Menu.jsx";
import Section from "../../components/customer/Section.jsx";
import SearchBar from "../../components/customer/customerSearch.jsx";

const ProductsPage = () => {
  const [saleData, setSaleData] = useState(null);
  const [ProductsListed, setProductsListed] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSaleData();
        setSaleData(data.sale);
        setProductsListed(data.sale.some((product) => product.listed)); // TODO: CHECK IF ANY PRODUCTS ARE LISTED
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
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

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col">
      <Menu />
      <div className="flex-grow mt-[7vh] pb-[15vh]">
        {ProductsListed ? (
          <>
            <Countdown saleData={saleData} />
            <section className="overflow-auto">
              <SearchBar />
              <Section title="Big Discounts!" category="Energy Efficient" />
              <Section title="Big Discounts!" category="Energy Efficient" />
              <Section title="Big Discounts!" category="Energy Efficient" />
              <Section title="Big Discounts!" category="Energy Efficient" />
            </section>
          </>
        ) : (
          <NoProductsView saleData={saleData} />
        )}
      </div>
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
