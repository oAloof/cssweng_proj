import React, { useState, useCallback } from "react";
import TopNav from "../../components/Menu.jsx";
import Navbar from "../../components/NavBar.jsx";
import Progress from "../../components/InvoiceProgress.jsx";
import { useNavigate } from "react-router-dom";
import ExpandableSection from "../../components/customer/ExpandableSection.jsx";
import Button from "../../components/customer/Button.jsx";
import InputField from "../../components/InputField.jsx";

import { useForm, FormProvider } from "react-hook-form";
import { referenceNumber_validation } from "../../utils/inputValidations.jsx";

const CartItem = ({ item }) => {
  return (
    <div className="flex flex-grow items-center justify-between border-b border-gray-200 py-3">
      <div className="flex items-center w-full flex-grow">
        <img
          className="h-full w-32 object-contain mr-4"
          src={item.image}
          alt={item.name}
        />
        <div className="flex flex-col flex-grow">
          <div className="flex justify-between w-full">
            <div className="flex flex-col">
              <p className="text-xl font-semibold font-Proxima m-0">
                {item.name}
              </p>
              <p className="text-s text-indigo-400 font-Proxima mb-4 ">
                {item.brand}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-start">
            <p className="text-lg text-gray-600 font-Nunito font-bold m-0">
              Qty: {item.quantity}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-end">
        <div className="flex flex-col justify-center items-end h-20">
          <p className="font-Nunito font-bold m-0 text-2xl">₱{item.price}</p>
        </div>
      </div>
    </div>
  );
};
const Billing = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Product 1",
      brand: "Union",
      quantity: 2,
      price: 15.99,
      image: "/Product Photo Placeholder.png",
    },
    {
      id: 2,
      name: "Product 2",
      brand: "Union",
      quantity: 1,
      price: 9.99,
      image: "/Product Photo Placeholder.png",
    },
    {
      id: 3,
      name: "Product 2",
      brand: "Union",
      quantity: 1,
      price: 9.99,
      image: "/Product Photo Placeholder.png",
    },
    {
      id: 4,
      name: "Product 2",
      brand: "Union",
      quantity: 1,
      price: 9.99,
      image: "/Product Photo Placeholder.png",
    },
    {
      id: 5,
      name: "Product 2",
      brand: "Union",
      quantity: 1,
      price: 9.99,
      image: "/Product Photo Placeholder.png",
    },
    {
      id: 6,
      name: "Product 3",
      brand: "Union",
      quantity: 2,
      price: 19.99,
      image: "/Product Photo Placeholder.png",
    },
    {
      id: 7,
      name: "Product 4",
      brand: "Union",
      quantity: 1,
      price: 14.99,
      image: "/Product Photo Placeholder.png",
    },
    {
      id: 8,
      name: "Product 5",
      brand: "Union",
      quantity: 3,
      price: 24.99,
      image: "/Product Photo Placeholder.png",
    },
    {
      id: 9,
      name: "Product 6",
      brand: "Union",
      quantity: 1,
      price: 9.99,
      image: "/Product Photo Placeholder.png",
    },
    {
      id: 10,
      name: "Product 7",
      brand: "Union",
      quantity: 2,
      price: 19.99,
      image: "/Product Photo Placeholder.png",
    },
    {
      id: 11,
      name: "Product 8",
      brand: "Union",
      quantity: 1,
      price: 14.99,
      image: "/Product Photo Placeholder.png",
    },
  ]);

  const cartCount = cartItems.length;

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const [isOrderSummaryOpen, setOrderSummaryOpen] = useState(true);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isInformationOpen, setInformationOpen] = useState(true);

  const subtotal = totalPrice.toFixed(2);
  const totalSaved = "10.00";
  const shippingFee = "5.00";

  const navigate = useNavigate();

  const onUpdateClick = () => {
    navigate("/cart");
  };

  const total = (
    parseFloat(subtotal) +
    parseFloat(totalSaved) +
    parseFloat(shippingFee)
  ).toFixed(2);

  const OnProceedClick = useCallback(() => {
    navigate("/billing");
  }, [navigate]);

  const methods = useForm({ mode: "onSubmit" });

  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const images = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => prevImages.concat(images));
  };

  const userInfo = [
    { label: "Name", value: "Juju Juwia" },
    { label: "Contact Number", value: "09199999999" },
    { label: "Address", value: "no doxxing plz, Paradis Island, Marley" },
    { label: "Email", value: "juwiatheGOAT@gmail.com" },
  ];

  const currentStatus = "Pending Confirmation";

  return (
    <div className="flex flex-col min-h-screen pt-[9vh] bg-slate-200 pb-[15vh] gap-4">
      <div className="md:justify-center flex flex-col md:flex-row gap-4 px-[2vw]">
        <TopNav />
        <div className="md:w-1/4 w-full gap-4 flex flex-col">
          <div className="p-4 rounded-xl border-[1px] bg-white border-slate-300 shadow-xl">
            <h2 className="font-Proxima font-bold text-3xl mb-2 ">Invoice</h2>
            <h2 className="font-Nunito font-bold text-xl mb-3 text-indigo-500">
              Thank you, {userInfo.find((item) => item.label === "Name").value}!
            </h2>
            <Progress currentStatus={currentStatus} />
          </div>
        </div>
        <div className="md:w-1/4 w-full flex flex-col gap-4">
          <ExpandableSection
            title="Order Summary"
            subtitle={`₱ ${total}`}
            isOpen={isOrderSummaryOpen}
            onToggle={() => setOrderSummaryOpen(!isOrderSummaryOpen)}
          >
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
              Total: ₱{total}
            </p>
          </ExpandableSection>
          <div>
            <ExpandableSection
              title="Your Information"
              isOpen={isInformationOpen}
              onToggle={() => setInformationOpen(!isInformationOpen)}
            >
              <UserInfo info={userInfo} />
            </ExpandableSection>
          </div>
          <ExpandableSection
            title="Your Cart"
            isOpen={isCartOpen}
            subtitle={`${cartCount} items`}
            onToggle={() => setCartOpen(!isCartOpen)}
          >
            <div className="bg-white ">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
              <div className="flex justify-center mt-8">
                <Button onClick={onUpdateClick} text="UPDATE CART" />
              </div>
            </div>
          </ExpandableSection>
        </div>
      </div>

      <Navbar />
    </div>
  );
};

const UserInfo = ({ info }) => {
  const navigate = useNavigate();
  const OnInfoClick = () => {
    navigate("/confirm-order");
  };
  return (
    <div>
      {info.map((item, index) => (
        <div
          key={index}
          className="flex flex-col flex-grow items-start justify-between border-b border-gray-200 py-2"
        >
          <p className="font-Nunito font-semibold mt-0 mb-0 text-slate-400">
            {item.label}
          </p>
          <h2 className="text-xl font-semibold">{item.value}</h2>
        </div>
      ))}
    </div>
  );
};

export default Billing;
