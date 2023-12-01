import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast, faBullhorn } from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

import { AnimatePresence, motion } from "framer-motion"

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const CountdownTimer = ({ saleData }) => {
  const onSocialsClick = (url) => {
    window.open(url, "_blank");
  };

  const intervalRef = useRef(null);

  const [remaining, setRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    intervalRef.current = setInterval(handleCountdown, 1000);

    return () => clearInterval(intervalRef.current || undefined);
  }, []);

  const handleCountdown = () => {
    var end
    if (new Date(saleData.sale.startDate) > new Date()){
      end = new Date(saleData.sale.startDate);
    } else {
      end = new Date(saleData.sale.endDate);
    }

    const now = new Date();

    const distance = +end - +now;

    const days = Math.floor(distance / DAY);
    const hours = Math.floor((distance % DAY) / HOUR);
    const minutes = Math.floor((distance % HOUR) / MINUTE);

    setRemaining({
      days,
      hours,
      minutes,
    });
  };

  //const [timeLeft, setTimeLeft] = useState(initializeTimeLeft());
  // const [OngoingSale, setOngoingSale] = useState(
  //   saleData && saleData.endDate ? true : false
  // ); // ! i want every1 to know i spent 2 hours debugging and it was bc of this line FUCCC

  if (!saleData) {
    return (
      <div className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 shadow-xl cursor-default relative rounded-xl m-4">
        <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
          <FontAwesomeIcon
            icon={faBullhorn}
            className="text-indigo-600 rotate-12 "
          />
        </div>
        <h3 className="text-3xl font-bold text-center mb-2">
          No current or future sales!
        </h3>
        <p className="text-center mb-6">
          Don't miss the next deals! Follow our socials to stay up to date and
          be notified about future sales!
        </p>
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => {
              onSocialsClick("https://www.facebook.com/bxappliances/");
            }}
            className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-1/2 py-2 rounded"
          >
            <FontAwesomeIcon icon={faFacebook} className="mr-2" />
            Facebook Page
          </button>
        </div>
      </div>
    );
  }

  // IF FUTURE SALE NOT STARTED
  if (new Date(saleData.sale.startDate) > new Date()) {
    return (
      <div className="p-4 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl m-4">
      <h1 className="text-3xl font-bold text-center text-white font-Proxima mb-0">
        {saleData.sale.title}
      </h1>
      <h6 className="text-xl font-semibold text-center text-white font-Nunito ">
        BEGINS IN
      </h6>
      <div className="w-full max-w-5xl mx-auto flex items-center bg-white">
        <CountdownItem num={remaining.days} text="DAYS" />
        <CountdownItem num={remaining.hours} text="HOURS" />
        <CountdownItem num={remaining.minutes} text="MINUTES" />
      </div>
      <div className="w-auto max-w-5xl mx-auto flex items-center justify-center space-x-3 mt-3 mb-0">
        <FontAwesomeIcon
          icon={faTruckFast}
          style={{ color: "#ffffff", height: "20px" }}
        />
        <h6 className="text-xl font-semibold text-white font-Nunito mr-0 ml-4 my-0">
          Exclusive to customers in {saleData.sale.location}!
        </h6>
      </div>
    </div>
    )
  }

  return (
    <div className="p-4 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl m-4">
      <h1 className="text-3xl font-bold text-center text-white font-Proxima mb-0">
        {saleData.sale.title}
      </h1>
      <h6 className="text-xl font-semibold text-center text-white font-Nunito ">
        ENDS IN
      </h6>
      <div className="w-full max-w-5xl mx-auto flex items-center bg-white">
        <CountdownItem num={remaining.days} text="DAYS" />
        <CountdownItem num={remaining.hours} text="HOURS" />
        <CountdownItem num={remaining.minutes} text="MINUTES" />
      </div>
      <div className="w-auto max-w-5xl mx-auto flex items-center justify-center space-x-3 mt-3 mb-0">
        <FontAwesomeIcon
          icon={faTruckFast}
          style={{ color: "#ffffff", height: "20px" }}
        />
        <h6 className="text-xl font-semibold text-white font-Nunito mr-0 ml-4 my-0">
          Exclusive to customers in {saleData.sale.location}!
        </h6>
      </div>
    </div>
  );
};

const CountdownItem = ({ num, text }) => {
  return (
    <div className="font-Proxima font-bold w-1/3 h-24 md:h-36 flex flex-col gap-1 md:gap-2 items-center justify-center border-r-[1px] border-slate-200">
      <div className="w-full text-center relative overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={num}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ ease: "backIn", duration: 0.75 }}
            className="block text-2xl md:text-4xl lg:text-6xl xl:text-7xl text-black font-medium"
          >
            {num}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-sm md:text-sm lg:text-base font-light text-slate-500">
        {text}
      </span>
    </div>
  );
};

export default CountdownTimer;
