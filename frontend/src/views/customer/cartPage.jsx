import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TopNav from "../../components/Menu";
import { FiTrash2 } from "react-icons/fi";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/NavBar.jsx";
import Progress from "../../components/Progress.jsx";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader.jsx";

// CONTEXTS 
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext.jsx";

const CartItem = ({ item, onDelete, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    onQuantityChange(item.id, newQuantity);
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
  };

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  return (
    <div className="flex flex-grow items-center justify-between border-b border-gray-200 py-3">
      <div className="flex items-center w-full flex-grow">
        <img
          className="h-full w-32 object-contain mr-4"
          src={`https://drive.google.com/uc?export=view&id=${item.image}`}
          alt={item.name}
        />
        <div className="flex flex-col flex-grow">
          <div className="flex justify-between w-full">
            <div className="flex flex-col">
              <p className="text-lg font-semibold font-Proxima m-0">
                {item.name}
              </p>
              <p className="text-sm text-indigo-400 font-Proxima mb-4 ">
                {item.brand}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-start">
            <p className="text-xs text-gray-600 m-0 font-Nunito font-bold">
              Qty:
            </p>
            <div className="flex ml-1">
              <button
                className="text-xs text-gray-600 border-none px-1 py-0.5"
                onClick={handleDecrement}
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <input
                type="number"
                className="text-center bg-white font-Nunito p-2 w-10 text-xs text-gray-600 border border-gray-300 rounded px-1 py-0.5"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                min={1}
              />

              <button
                className="text-xs text-gray-600 border-none px-1 py-0.5"
                onClick={handleIncrement}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-end">
        <div className="flex flex-col justify-between items-end h-20">
          <p className="font-Nunito font-bold m-0 text-1xl">
            ₱{(item.discountedPrice * quantity).toFixed(2)}
          </p>

          <button
            className="text-red-500 hover:text-red-700 text-2xl"
            onClick={() => onDelete(item.id)}
          >
            <FiTrash2 className="stroke-red-500 hover:scale-110 hover:stroke-rose-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

const CartPage = () => {
  const { shoppingCart, isLoadingCart, removeFromCart } = useContext(ShoppingCartContext);
  const { isAuthenticated } = useContext(AuthenticationContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  const totalPrice = shoppingCart.reduce(
    (acc, item) => acc + item.originalPrice * item.quantity,
    0
  );

  const totalDiscountedPrice = shoppingCart.reduce(
    (acc, item) => acc + item.discountedPrice * item.quantity,
    0
  );

  const subtotal = totalPrice.toFixed(2);
  const totalSaved = (totalPrice - totalDiscountedPrice).toFixed(2);
  const shippingFee = "5.00"; // ! To change

  // TODO: implement item deletion
  const handleDeleteItem = (itemId) => {
    removeFromCart(itemId);
  };

  // TODO: implement item qty. change
  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setButtonState({
      text: "UPDATE CART",
      color: "bg-gray-300 text-gray-600",
      secondaryColor: "bg-gray-200 hover:text-gray-600",
    });
    setCartItems(updatedCartItems);
  };

  const [buttonState, setButtonState] = useState({
    text: "CHECK OUT",
    color: "bg-indigo-500 text-indigo-100",
    secondaryColor: "bg-indigo-300 hover:text-white",
  });

  

  const handleButtonClick = () => {
    if (buttonState.text === "CHECK OUT") {
      navigate("/confirm-order");
    } else {
      setTimeout(() => {
        setButtonState({
          text: "CHECK OUT",
          color: "bg-indigo-500 text-indigo-100",
          secondaryColor: "bg-indigo-300 hover:text-white",
        });
      }, 2000);
    }
  };

  if (isLoadingCart) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col pt-[9vh] bg-slate-200 pb-[15vh] gap-4">
      <Progress stepsComplete="1" />
      <div className="flex flex-col md:flex-row gap-4 px-[2vw]">
        <TopNav />
        <div className="p-4 rounded-xl border-[1px] bg-white border-slate-300 md:w-3/4 shadow-xl">
          <h2 className="font-Proxima font-bold text-3xl mb-3">Your Cart</h2>
          <div className="bg-white ">
            {shoppingCart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onDelete={handleDeleteItem}
                onQuantityChange={handleQuantityChange}
              />
            ))}
          </div>
        </div>

        <div className="md:w-1/4">
          <div className="rounded-xl border-[1px] border-slate-300 p-4 bg-white shadow-xl flex-wrap">
            <div className="w-full justify-start  font-Nunito text-left">
              <h2 className="font-Proxima font-bold text-3xl mb-3">
                Order Summary
              </h2>
              <p className="text-lg font-semibold text-gray-400">
                Subtotal: ₱{subtotal}
              </p>
              <p className="text-lg font-semibold text-gray-400">
                Total Saved: ₱{totalSaved}
              </p>
              <p className="text-lg font-semibold text-gray-400">
                Shipping Fee: ₱{shippingFee}
              </p>
              <p className="text-3xl font-bold font-Proxima text-indigo-400">
                Total: ₱
                {(
                  parseFloat(subtotal) -
                  parseFloat(totalSaved) +
                  parseFloat(shippingFee)
                ).toFixed(2)}
              </p>
              <div className="flex justify-center mt-8">
                <Button
                  text={buttonState.text}
                  color={buttonState.color}
                  secondaryColor={buttonState.secondaryColor}
                  onClick={handleButtonClick}
                />
              </div>
            </div>
          </div>
        </div>
        <Navbar />
      </div>
    </div>
  );
};

export default CartPage;

const Button = ({ text, color, secondaryColor, onClick }) => {
  /* TODO: LOGIC FOR UPDATING QUANTITIES */

  return (
    <button
      className={`
                  relative z-0 flex items-center  justify-center gap-2 overflow-hidden rounded-lg border-[1px] px-4 py-2 font-semibold
                  uppercase ${color} transition-all duration-500 w-full
                  
                  before:absolute before:inset-0
                  before:-z-10 before:translate-x-[150%]
                  before:translate-y-[150%] before:scale-[2.5]
                  before:rounded-[100%] before:${secondaryColor}
                  before:transition-transform before:duration-1000
                  before:content-[""]
          
                  hover:scale-105 
                  hover:before:translate-x-[0%]
                  hover:before:translate-y-[0%]
                  active:scale-95`}
      onClick={onClick}
    >
      <span>{text}</span>
    </button>
  );
};
