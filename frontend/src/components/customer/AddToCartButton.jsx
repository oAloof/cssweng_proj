import styles from "../../styles/customer/AddToCartButton.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle, FiX } from "react-icons/fi";
import { useEffect, useState } from "react";

const AddToCartButton = () => {
  const [notification, setNotification] = useState(null);

  const removeNotif = () => {
    setNotification(null);
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={() => {
          setNotification(generateNotif());
          console.log("added to cart");
        }}
        className="text-sm text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all font-medium px-3 py-2 rounded-md"
      >
        <i className="fas fa-shopping-cart"></i>
      </button>
      <AnimatePresence>
        {notification && (
          <Notification
            removeNotif={removeNotif}
            key={notification.id}
            {...notification}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const NOTIFICATION_TTL = 5000;

const Notification = ({ text, id, removeNotif }) => {
  useEffect(() => {
    const timeoutRef = setTimeout(() => {
      removeNotif();
    }, NOTIFICATION_TTL);

    return () => clearTimeout(timeoutRef);
  }, []);

  return (
    <motion.div
      layout
      initial={{ y: 15, scale: 0.9, opacity: 0 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
      exit={{ y: -25, scale: 0.9, opacity: 0 }}
      transition={{ type: "spring" }}
      className="px-2 py-3 w-80 flex flex-wrap items-start rounded-lg gap-2 text-xs font-medium shadow-lg text-white bg-indigo-600 fixed z-50 bottom-[95px] right-2 max-w-xs whitespace-normal"
    >
      <FiAlertCircle className="text-3xl absolute -top-4 -left-4 p-2 rounded-full bg-white text-indigo-600 shadow" />
      <span>{text}</span>
      <button onClick={() => removeNotif(id)} className="ml-auto mt-0.5">
        <FiX />
      </button>
    </motion.div>
  );
};

export default AddToCartButton;

const generateNotif = (productName) => {
  const data = {
    text: `You have just added ${productName} to your cart!`,
  };

  return data;
};
