import { useState, useEffect } from "react";

import Countdown from "../../components/CountdownTimer.jsx";
import NavBar from "../../components/NavBar.jsx";
import Menu from "../../components/Menu.jsx";
import styles from "../../styles/customer/customerPage.module.css";
import Section from "../../components/customer/Section.jsx";

const LandingPage = () => {
  const [saleData, setSaleData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSaleData();
        setSaleData(data.sale);
      }catch (error) {
        console.log(error)
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
      console.error('Error fetching data:', error);
    }
  }


  return (
    <div className={styles.page}>
      <section className={styles.pageContent}>
        <Countdown saleData={saleData} />
        <Section category="Big Discounts!" />
        <Section category="Selling Out Fast" />
        <Section category="Test" />
        <Section category="Test" />
        <Section category="Test" />
      </section>
      <NavBar />
      <Menu />
    </div>
  );
};

export default LandingPage;
