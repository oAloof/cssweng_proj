import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const Progress = ({ currentStatus }) => {
  const orderStatus = [
    "Pending Confirmation",
    "Processing Your Order",
    "Shipped Out",
    "Delivered",
    "Paid",
  ];
  const numSteps = orderStatus.length;
  const stepsComplete = orderStatus.indexOf(currentStatus) + 1;

  return (
    <div className="p-0 flex justify-start rounded-md w-2/3 max-w-2/3 ">
      <Steps
        numSteps={numSteps}
        stepsComplete={stepsComplete}
        orderStatus={orderStatus}
      />
    </div>
  );
};

const Steps = ({ numSteps, stepsComplete, orderStatus }) => {
  const stepArray = Array.from(Array(numSteps).keys());

  return (
    <div className="flex flex-col items-start gap-3">
      {stepArray.map((num) => {
        const stepNum = num + 1;
        const isActive = stepNum <= stepsComplete;
        return (
          <React.Fragment key={stepNum}>
            <div className="flex items-center">
              <Step num={stepNum} isActive={isActive} />
              <div className="ml-4 w-full text-left">
                <div className="font-semibold font-Nunito text-lg">
                  {orderStatus[num]}
                </div>
                <div className="text-base">{"hi"}</div>
              </div>
            </div>
            {stepNum !== stepArray.length && (
              <div className="h-10 w-1 left-5 bg-gray-400 relative overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 w-full h-full bg-indigo-600"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: isActive ? 1 : 0 }}
                  transition={{ ease: "easeIn", duration: 0.3 }}
                  style={{ transformOrigin: "top" }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const Step = ({ num, isActive }) => {
  return (
    <div className="relative">
      <div
        className={`w-10 h-10 flex items-center justify-center shrink-0 border-2 rounded-full font-semibold text-sm relative z-10 transition-colors duration-300 ${
          isActive
            ? "border-indigo-600 bg-indigo-600 text-white"
            : "border-gray-400 text-gray-400"
        }`}
      >
        <AnimatePresence mode="wait">
          {isActive ? (
            <motion.svg
              key="icon-marker-check"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              height="1.6em"
              width="1.6em"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.125 }}
            >
              <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"></path>
            </motion.svg>
          ) : (
            <motion.span
              key="icon-marker-num"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.125 }}
            >
              {num}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      {isActive && (
        <div className="absolute z-0 -inset-1.5 bg-indigo-100 rounded-full animate-pulse" />
      )}
    </div>
  );
};

export default Progress;
