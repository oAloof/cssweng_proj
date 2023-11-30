import React, { useState, useEffect, useCallback, useContext } from "react";
import TopNav from "../../components/Menu";
import Navbar from "../../components/NavBar.jsx";
import Progress from "../../components/Progress.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import ExpandableSection from "../../components/customer/ExpandableSection.jsx";
import Button from "../../components/customer/Button.jsx";
import InputField from "../../components/InputField.jsx";
import Loader from "../../components/Loader.jsx";

import { useForm, FormProvider } from "react-hook-form";
import { referenceNumber_validation } from "../../utils/inputValidations.jsx";

// CONTEXTS
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext.jsx";

const CartItem = ({ item }) => {
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
          <p className="font-Nunito font-bold m-0 text-2xl">
            ₱{item.discountedPrice}
          </p>
        </div>
      </div>
    </div>
  );
};
const Billing = () => {
  const { shoppingCart, isLoadingCart } = useContext(ShoppingCartContext);
  const { isAuthenticated } = useContext(AuthenticationContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  const locationObject = useLocation();
  const userData = locationObject.state?.data;

  const location = "Manila";

  const cartCount = shoppingCart.length;

  const [isOrderSummaryOpen, setOrderSummaryOpen] = useState(true);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isInformationOpen, setInformationOpen] = useState(true);

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

  const onUpdateClick = () => {
    navigate("/cart");
  };

  const total = (
    parseFloat(subtotal) -
    parseFloat(totalSaved) +
    parseFloat(shippingFee)
  ).toFixed(2);

  const methods = useForm({ mode: "onSubmit" });

  const [images, setImages] = useState([]);
  const [fileObjects, setFileObjects] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const images = files.map((file) => URL.createObjectURL(file));
    setFileObjects((prevFiles) => prevFiles.concat(files));
    setImages((prevImages) => prevImages.concat(images));
  };

  const userInfo = [
    { label: "Name", value: userData.firstName + " " + userData.lastName },
    { label: "Contact Number", value: userData.contactNumber },
    { label: "Address", value: userData.streetAddress + ", " + userData.city },
    { label: "Email", value: userData.email },
  ];

  const onSubmit = useCallback(
    async (data) => {
      // Send data to backend
      try {
        const formData = new FormData();
        formData.append("referenceNumber", data.referenceNumber);
        formData.append("images", fileObjects[0]);
        formData.append("email", userData.email);
        formData.append("firstName", userData.firstName);
        formData.append("lastName", userData.lastName);
        formData.append("contactNumber", userData.contactNumber);
        formData.append("streetAddress", userData.streetAddress);
        formData.append("city", userData.city);
        formData.append("order", JSON.stringify(shoppingCart));
        formData.append("totalCost", total);

        const response = await fetch(
          "http://localhost:4000/api/orders/checkout",
          {
            method: "POST",
            credentials: "include",
            body: formData,
          }
        );
        
        const responseData = await response.json();
        if (!response.ok) {
          console.log(responseData.message);
          return;
        }
  
        // navigate to invoice, pass order id
        navigate("/invoice", { state: { orderNumber: responseData.orderNumber } });
      } catch (error) {
        console.error("Error confirming order: ", error);
        return;
      }
    },
    [navigate]
  );

  return (
    <div className="flex flex-col  pt-[9vh] bg-slate-200 pb-[15vh] gap-4">
      <Progress stepsComplete="3" />
      <div className="md:justify-center flex flex-col md:flex-row gap-4 px-[2vw]">
        <TopNav />
        <div className="md:w-1/4 w-full gap-4 flex flex-col">
          <div className="md:order-first order-2">
            <ExpandableSection
              title="Your Information"
              isOpen={isInformationOpen}
              onToggle={() => setInformationOpen(!isInformationOpen)}
            >
              <UserInfo info={userInfo} />
            </ExpandableSection>
          </div>

          <FormProvider {...methods}>
            <form
              className="p-4 rounded-xl border-[1px] bg-white border-slate-300  shadow-xl"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <h2 className="font-Proxima font-bold text-3xl mb-3 ">Billing</h2>
              <div className="bg-white">
                <div className="flex flex-col w-full gap-4">
                  <InputField {...referenceNumber_validation} />

                  <div className="max-w-1/3 w-full flex flex-row gap-4 jus">
                    <div className="relative">
                      <input
                        type="file"
                        id="images"
                        name="images"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 h-full w-full opacity-0 cursor-pointer z-10"
                        required
                      />
                      <label
                        htmlFor="images"
                        className="bg-indigo-200/40 hover:bg-indigo-200 text-indigo-600 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:scale-110 cursor-pointer transition-all duration-400"
                        style={{ position: "relative", zIndex: 20 }}
                      >
                        <i className="fas fa-upload"></i>
                        <span>UPLOAD GCASH PAYMENT RECEIPT</span>
                      </label>
                    </div>
                    <div className="flex flex-row gap-4 overflow-x-auto">
                      {images.map((image, index) => (
                        <div key={image} className="relative">
                          <img
                            src={image}
                            alt="uploaded photo"
                            className="w-10 h-10 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => {
                              const newImages = [...images];
                              newImages.splice(index, 1);
                              setImages(newImages);
                            }}
                            className="absolute top-0 right-0 text-white rounded-full w-6 h-6 flex text-center items-center justify-center bg-rose-500"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    text={"CONFIRM PAYMENT"}
                    // onClick={OnProceedClick}
                    type={"submit"}
                  />
                </div>
              </div>
            </form>
          </FormProvider>
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

          <ExpandableSection
            title="Your Cart"
            isOpen={isCartOpen}
            subtitle={`${cartCount} items`}
            onToggle={() => setCartOpen(!isCartOpen)}
          >
            <div className="bg-white ">
              {shoppingCart.map((item) => (
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

      <div className="flex justify-center mt-8">
        <Button onClick={OnInfoClick} text="EDIT INFORMATION" />
      </div>
    </div>
  );
};

export default Billing;
