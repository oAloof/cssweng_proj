import { useState, useCallback } from "react";
import Countdown from "../../components/CountdownTimer.jsx";
import NavBar from "../../components/NavBar.jsx";
import TopMenuBar from "../../components/TopBar.jsx";
import styles from "../../styles/customer/LandingPage.module.css";
import Section from "../../components/customer/Section.jsx";

const LandingPage = () => {
  const endDate = new Date("2024-01-01T00:00:00").getTime();

  return (
    <div className={styles.landingPage}>
      <section className={styles.pageContent}>
        <Countdown endDate={endDate} location="Manila" />
        <Section category="Big Discounts!" />
        <Section category="Selling Out Fast" />
        <Section category="Test" />
      </section>
      <NavBar />
      <TopMenuBar />
    </div>
  );
};

export default LandingPage;
