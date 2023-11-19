import { useState, useEffect } from "react";
import Countdown from "../../components/CountdownTimer.jsx";
import NavBar from "../../components/NavBar.jsx";
import Menu from "../../components/Menu.jsx";
import Section from "../../components/customer/Section.jsx";

const ProductsPage = () => {
  const [saleData, setSaleData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSaleData();
        setSaleData(data.sale);
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
    <div>
      <div className="mt-[7vh] pb-[15vh]">
        <Menu />
        <section className="overflow-auto ">
          <Countdown saleData={saleData} />
          <Section category="Big Discounts!" />
          <Section category="Big Discounts!" />
          <Section category="Big Discounts!" />
          <Section category="Big Discounts!" />
        </section>
      </div>
      <NavBar />
    </div>
  );
};

export default ProductsPage;
