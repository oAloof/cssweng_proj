import React, { useState, useEffect } from "react";
import styles from "../styles/CountdownTimer.module.css";

const CountdownTimer = ({ endDate, location }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const distance = endDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft({ days, hours, minutes });

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

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
          <img src="icons/Location.svg" />
          Exclusive to customers in {location}!
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
