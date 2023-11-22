import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

const ProductModal = ({ isOpen, setIsOpen, product }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/category/${encodeURIComponent(category)}`);
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

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
            className="bg-gradient-to-br from-violet-50 to-indigo-50/90 text-white rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-y-auto overflow-x-hidden"
          >
            <div className="relative z-10">
              <div className="w-full flex justify-center bg-white rounded-lg p-0 mb-4 h-1/3">
                <img
                  src={`https://drive.google.com/uc?export=view&id=${product.images[0]}`}
                  // src="/Product Photo Placeholder.png"
                  alt="Product Image"
                  className=" w-auto h-1/3 object-contain"
                />
              </div>

              <div className="flex flex-col justify-start text-left text-slate-700 gap-2 pb-3 px-4">
                <div>
                  <h4 className="m-0 text-lg text-indigo-700">
                    {capitalizeFirstLetter(product.brand)}
                  </h4>
                  <h3 className="text-3xl font-bold m-0">{product.name}</h3>
                </div>
                <div className="font-Nunito">
                  <div className="flex flex-row justify-start items-center gap-2">
                    <h2 className="m-0 font-bold">₱{product.originalPrice}</h2>
                    <div className="bg-rose-400 rounded-lg font-Nunito text-white font-bold text-sm px-2 py-1">
                      {product.discountPercentage}% OFF!
                    </div>
                  </div>
                  <p className="mb-4 text-sm text-slate-500">
                    from ₱{product.discountedPrice}
                  </p>
                  <p className="m-0 whitespace-normal text-sm text-slate-500">
                    {product.description}
                  </p>
                </div>
                <div className="flex flex-row flex-wrap justify-end items-center gap-2 mt-3 ">
                  {product.category.map((category, index) => (
                    <motion.button
                      className="bg-indigo-200 rounded-lg font-Nunito text-indigo-500 text-xs px-2 py-1"
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 p-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-transparent hover:bg-white/10 transition-colors text-indigo-400 font-semibold w-full py-2 rounded"
                >
                  Close
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded flex flex-row align-middle justify-center gap-2 items-center"
                >
                  <FiShoppingCart className="m-0" />
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
