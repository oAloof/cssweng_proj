import { useState, useEffect } from "react";
import Countdown from "../../components/CountdownTimer.jsx";
import NavBar from "../../components/NavBar.jsx";
import Menu from "../../components/Menu.jsx";
import Section from "../../components/customer/Section.jsx";

const ProductsPage = () => {
  const [saleData, setSaleData] = useState(null);
  const [ProductsListed, setProductsListed] = useState(false);

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
    <div className="bg-slate-100 min-h-screen min">
      <Menu />

      {ProductsListed ? (
        <div className="mt-[7vh] pb-[15vh]">
          <Countdown saleData={saleData} />
          <section className="overflow-auto ">
            <Section category="Big Discounts!" />
            <Section category="Big Discounts!" />
            <Section category="Big Discounts!" />
            <Section category="Big Discounts!" />
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
    <div className="flex min-w-screen min-h-screen  bg-slate-400 gap-4">
      <div className="mt-[7vh] pb-[15vh] flex flex-col items-center justify-start">
        <div className="w-full">
          <Countdown saleData={saleData} />
        </div>
        <div className="justify-center items-center w-3/4 ">
          <div className="object-contain text-center font-Nunito text-[#5c698c]  ">
            {/* <h1 className="mb-4 font-bold">No sales at the moment!</h1> */}
            <img src="/NoProducts.png" className="opacity-90 px-60" />
            <h3 className="mt-4 font-bold">
              We're busy curating the best deals for you.
            </h3>
            <p>Check back soon for exciting offers and future bodega sales!</p>
          </div>
        </div>
      </div>
    </div>
  );
};
