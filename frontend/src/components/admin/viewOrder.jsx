import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle, FiEye } from "react-icons/fi";
import { useState, useEffect} from "react";

const ViewOrder = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="">
      <button onClick={() => setIsOpen(true)}>
        <FiEye />
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} order={order} />
    </div>
  );
};

const Modal = ({ isOpen, setIsOpen, order }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-white to-slate-200 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="text-sm flex flex-col gap-0 text-slate-600 font-Nunito">
                <h2 className="font-Proxima uppercase">
                  Order #{order.orderNumber}
                </h2>
                <p>Status: {order.status}</p>
                <p>Total Cost: ₱{order.totalCost}</p>
                <p>Full Name: {order.personReceiving}</p>
                <p>Phone Number: {order.personRecievingNum}</p>
                <p>Email: {order.personRecievingEmail}</p>
                <p>Delivery Address: {order.deliveryAddress}</p>
                <div className="flex flex-col gap-0 mt-10">
                  <p className="font-Nunito font-bold text-lg">Order Items</p>
                  {order.order.map((item) => (
                    <CartItem key={item.product._id} item={item} />
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-transparent hover:bg-indigo-200/10 transition-colors text-slate-600 font-semibold w-full py-2 rounded"
                >
                  Back
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CartItem = ({ item }) => {
  const id = item.product;
  const [product, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductData();

        setProductData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, []);

  const getProductData = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/admin/products/" + id
      );
      if (!response.ok) {
        console.log("Error fetching data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-grow items-center justify-between border-b border-gray-200 py-3">
      <div className="flex items-center w-full flex-grow">
        <div className="flex flex-col flex-grow">
          <div className="flex justify-between w-full">
            <div className="flex flex-col">
              <p className="text-sm font-semibold font-Proxima m-0">
                {product.name}
              </p>
              <p className="text-s text-indigo-400 font-Proxima mb-4">
                {product.brand}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-start">
            <p className="text-sm text-gray-600 font-Nunito font-bold m-0">
              Qty: {item.quantity}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-end">
        <div className="flex flex-col justify-center items-end h-20">
          <p className="font-Nunito font-bold m-0 text-sm">
            ₱{product.discountedPrice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
