import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle, FiEye } from "react-icons/fi";
import { useState } from "react";

const ViewOrder = ({order}) => {
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
              <div className="text-sm text-slate-600">Order Number: {order.orderNumber}</div>
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

export default ViewOrder;
