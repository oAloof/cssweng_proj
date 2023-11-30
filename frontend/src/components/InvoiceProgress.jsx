import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const Progress = ({ currentStatus }) => {
  const statusMapping = {
    'Payment Verification': 'Pending Confirmation',
    'To Ship': 'Processing Your Order',
    'Shipped': 'Shipped Out',
    'Completed': 'Delivered'
  };

  // Map the currentStatus using the statusMapping object
  const mappedStatus = statusMapping[currentStatus] || currentStatus;

  const orderStatus = [
    "Pending Confirmation",
    "Processing Your Order",
    "Shipped Out",
    "Delivered",
  ];

  const labels = [
    "Confirming your payment.",
    "Packing your order.",
    "Your order is on its way!",
    "Delivered on",
  ];

  const numSteps = orderStatus.length;
  const stepsComplete = orderStatus.indexOf(mappedStatus) + 1;

  return (
    <div className="pl-6 flex justify-start rounded-md w-full ">
      <Steps
        numSteps={numSteps}
        stepsComplete={stepsComplete}
        orderStatus={orderStatus}
        labels={labels}
      />
    </div>
  );
};

const Steps = ({ numSteps, stepsComplete, orderStatus, labels }) => {
  const stepArray = Array.from(Array(numSteps).keys());

  return (
    <div className="flex flex-col items-start text-xl">
      {stepArray.map((num) => {
        const stepNum = num + 1;
        const isActive = stepNum <= stepsComplete;
        return (
          <React.Fragment key={stepNum}>
            <div className="flex items-center">
              <Step num={stepNum} isActive={isActive} />
              <div className="ml-7 w-full text-left">
                <div className="font-semibold font-Nunito text-xl">
                  {orderStatus[num]}
                </div>
                <div className="text-base font-Nunito">{labels[num]}</div>
              </div>
            </div>
            {stepNum !== stepArray.length && (
              <div className="h-20 w-1 left-7 bg-gray-300 relative overflow-hidden">
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
        className={`w-14 h-14 flex items-center justify-center shrink-0 border-3 rounded-full font-bold text-lg relative z-10 transition-colors duration-300 ${
          isActive
            ? "border-indigo-600 bg-indigo-600 text-white"
            : "border-gray-300 text-gray-300"
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
        <div className="absolute z-0 -inset-2 bg-indigo-100 rounded-full animate-pulse" />
      )}
    </div>
  );
};
export default Progress;
