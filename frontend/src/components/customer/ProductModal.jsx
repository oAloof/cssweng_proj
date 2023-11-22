import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { useState, useEffect } from "react";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FiPlus, FiMinus } from "react-icons/fi";
import ErrorMessage from "../ErrorMessage";

const ProductModal = ({ isOpen, setIsOpen, product }) => {
  const navigate = useNavigate();

  const methods = useForm({ mode: "onSubmit" });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    console.log(data);
    // Add any additional submission logic here !!!
    // Close the modal after successful form submission
    setIsOpen(false);
  };

  const handleCategoryClick = (category) => {
    navigate(`/category/${encodeURIComponent(category)}`);
  };


  const [quantity, setQuantity] = useState(0);

  const [errorMessage, setErrorMessage] = useState("");

  const handleQuantityChange = (newQuantity) => {
    // Check for validations
    if (newQuantity > product.availableQuantity) {
      setErrorMessage(`Quantity cannot exceed ${product.availableQuantity}.`);
    } else if (newQuantity <= 0) {
      setErrorMessage("Quantity must be at least 1.");
    } else {
      setErrorMessage(""); // Clear error message if the input is valid
      setQuantity(newQuantity);
      methods.setValue("quantity", newQuantity);
    }
  };

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    handleQuantityChange(newQuantity);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      handleQuantityChange(newQuantity);
    }

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

                <FormProvider {...methods}>
                  <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    noValidate
                    className="flex flex-col gap-4"
                  >
                    <div className="w-full flex flex-row items-end gap-2">
                      <button
                        type="button"
                        onClick={handleDecrement}
                        className="bg-indigo-200 rounded-lg font-Nunito text-indigo-500 text-xs px-2 py-1 w-16 h-12 flex justify-center items-center"
                      >
                        <FiMinus />
                      </button>
                      <div className="w-full">
                        <div className="flex flex-col">
                          <div className="flex flex-row items-end">
                            <label className="font-semibold font-nunito text-xs">
                              Quantity:
                            </label>
                            {errorMessage && (
                              <ErrorMessage
                                message={errorMessage}
                                onClose={() => setErrorMessage("")}
                              />
                            )}
                          </div>
                          <input
                            type="number"
                            className="border-2 border-violet-300 font-semibold font-nunito text-2xs rounded-lg box-border h-auto flex flex-row items-start justify-between px-2 py-2.5 place-self-stretch bg-white text-black w-full"
                            value={quantity}
                            {...register("quantity", {
                              required: true,
                              min: 1,
                              max: product.availableQuantity,
                            })}
                            onChange={(e) =>
                              handleQuantityChange(parseInt(e.target.value))
                            }
                            min={1}
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleIncrement}
                        className="bg-indigo-200 rounded-lg font-Nunito text-indigo-500 text-xs px-2 py-1 w-16 h-12 flex justify-center items-center"
                      >
                        <FiPlus />
                      </button>
                    </div>
                    <div className="flex gap-2 p-4">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="bg-transparent hover:bg-white/10 transition-colors text-indigo-400 font-semibold w-full py-2 rounded"
                      >
                        Close
                      </button>
                      <AddToCartBtn
                        type="submit"
                        isDisabled={!!errors.quantity || !!errorMessage}
                      />
                    </div>
                  </form>
                </FormProvider>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AddToCartBtn = ({ type, isDisabled }) => {
  const [isClicked, setIsClicked] = useState(false);

  {
    /* TODO: ADD THE ITEM TO THE USER'S CART */
  }
  const handleClick = (e) => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 2000);
    e.stopPropagation();
  };

  const clickedClass =
    isClicked && isDisabled === false
      ? `bg-indigo-300 
    before:absolute before:inset-0
    before:-z-10 before:translate-x-[0%]
    before:translate-y-[0%] before:scale-[2.5]
    before:rounded-[100%] before:bg-green-500
    before:transition-transform before:duration-4000
    before:content-[""] text-white`
      : `bg-indigo-500 border-indigo-300   text-indigo-100 
     transition-all duration-500 flex-grow w-full
     before:absolute before:inset-0
     before:-z-10 before:translate-x-[150%]
     before:translate-y-[150%] before:scale-[2.5]
     before:rounded-[100%] before:bg-indigo-300
     before:transition-transform before:duration-1000
     before:content-[""] hover:scale-105 hover:text-white
     hover:before:translate-x-[0%]
     hover:before:translate-y-[0%] active:scale-95`;

  const clickedText =
    isClicked && isDisabled === false ? "ADDED TO CART!" : "ADD TO CART";

  return (
    <button
      className={`
      font-semibold uppercase relative z-0 flex items-center justify-center gap-2 overflow-hidden rounded-lg border-[1px] px-4 py-2 flex-grow w-full
        ${clickedClass}
      `}
      onClick={handleClick}
      type={type}
      disabled={isDisabled}
    >
      <FontAwesomeIcon icon={faShoppingCart} />
      <span>{clickedText}</span>
    </button>
  );
  };
};

export default ProductModal;
