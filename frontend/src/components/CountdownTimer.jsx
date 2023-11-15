import React, { useState, useEffect } from "react";
import styles from "../styles/CountdownTimer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTruckFast } from "@fortawesome/free-solid-svg-icons";

const CountdownTimer = ({ saleData }) => {
  const initializeTimeLeft = () => {
    if (!saleData || !saleData.endDate) {
      return { days: 0, hours: 0, minutes: 0 };
    }
    const endDate = new Date(saleData.endDate).getTime();
    const now = new Date().getTime();
    const distance = endDate - now;

    if (distance < 0) {
      return { days: 0, hours: 0, minutes: 0 };
    } else {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      return { days, hours, minutes };
    }
  };

  const [timeLeft, setTimeLeft] = useState(initializeTimeLeft());
  const [OngoingSale, setOngoingSale] = useState(
    saleData && saleData.endDate ? true : false
  );

  useEffect(() => {
    if (!OngoingSale) {
      return;
    }

    const timer = setInterval(() => {
      const endDate = new Date(saleData.endDate).getTime();
      const now = new Date().getTime();
      const distance = endDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setOngoingSale(false);
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft({ days, hours, minutes });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [saleData]);

  if (!OngoingSale) {
    return (
      <div className={styles.countdown}>
        <div className={styles.container}>
          <div className={styles.header}>No Sales Yet!</div>
          <span>
            There is no ongoing sale at the moment. Follow us on our socials to
            be notified about future sales!
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.countdown}>
      <div className={styles.container}>
        <div className={styles.header}>{location} BODEGA SALE</div>
        <span className={styles.subheading}>ENDS IN</span>
        <div className={styles.timer}>
          <div className={styles.timeSection}>
            <span className={styles.time}>
              {String(timeLeft.days).padStart(2, "0")}
            </span>
            <span className={styles.label}>DAYS</span>
          </div>
          <div className={styles.timeSection}>
            <span className={styles.time}>
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className={styles.label}>HOURS</span>
          </div>
          <div className={styles.timeSection}>
            <span className={styles.time}>
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span className={styles.label}>MINS</span>
          </div>
        </div>
        <div className={styles.footer}>
          <FontAwesomeIcon icon={faTruckFast} style={{ color: "#ffffff" }} />
          Exclusive to customers in {location}!
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
