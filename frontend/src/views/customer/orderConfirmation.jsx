import React, { useState, useEffect, useCallback, useContext } from "react";
import TopNav from "../../components/Menu";
import Navbar from "../../components/NavBar.jsx";
import Progress from "../../components/Progress.jsx";
import { useNavigate } from "react-router-dom";
import ExpandableSection from "../../components/customer/ExpandableSection.jsx";
import Button from "../../components/customer/Button.jsx";
import InputField from "../../components/InputField.jsx";
import Dropdown from "../../components/CitySelect.jsx";
import { motion } from "framer-motion";
import { MdError } from "react-icons/md";
import Loader from "../../components/Loader.jsx";

// CONTEXTS 
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext.jsx";

import { useForm, FormProvider } from "react-hook-form";
import {
  username_validation,
  email_validation,
  firstname_validation,
  lastname_validation,
  contactNumber_validation,
  zip_validation,
  streetAddress_validation,
  city_validation,
} from "../../utils/inputValidations.jsx";

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
          <p className="font-Nunito font-bold m-0 text-2xl">₱{item.discountedPrice}</p>
        </div>
      </div>
    </div>
  );
};
const OrderConfirmationPage = () => {
  const { shoppingCart, isLoadingCart } = useContext(ShoppingCartContext);
  const { isAuthenticated } = useContext(AuthenticationContext);
  const [user, setUser] = useState({});
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  const methods = useForm({ mode: "onSubmit",
    defaultValues: {
      username: user.username,
      firstname: user.firstName,
      lastname: user.lastName,
      email: user.email,
      contactNumber: user.contactNumber,
      streetAddress: user.streetAddress,
      city: user.city,
      zip: user.zip,
    }, 
  });

  useEffect(() => {
    getUserInformation();
  }, [isAuthenticated, isLoadingUser, methods.reset]);

  const getUserInformation = async () => {
    if (!isAuthenticated) return;
    
    try {
      const response = await fetch("http://localhost:4000/api/auth/user", 
      {
          method: "GET",
          credentials: "include",
          headers: {
              "Content-Type": "application/json",
          },
      });
      if (!response.ok) {
          console.log("User not found.")
          return
      }
      const responseData = await response.json();
      console.log(responseData.user);
      setUser(responseData.user);
       // Reset form with fetched user data
      methods.reset({
        username: responseData.user.username,
        firstName: responseData.user.firstName,
        lastName: responseData.user.lastName,
        email: responseData.user.email,
        contactNumber: responseData.user.contactNumber,
        streetAddress: responseData.user.streetAddress,
        city: responseData.user.city,
        zip: responseData.user.zip,
      });
      setIsLoadingUser(false);
      return
    } catch (error) {
      console.error('Error fetching user data: ', error);
    }
  }

  const location = "Manila";

  const cartCount = shoppingCart.length;

  const [isOrderSummaryOpen, setOrderSummaryOpen] = useState(true);
  const [isCartOpen, setCartOpen] = useState(false);

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

  const OnLoginClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const OnRegisterClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const OnProceedClick = useCallback(() => {
    navigate("/billing");
  }, [navigate]);

  // TODO: VALIDATE IF USER'S CITY MATCHES THE SALE'S SET CITY
  const [dropdownError, setdropdownError] = useState(false);

  if (isLoadingCart || isLoadingUser) {
    return <Loader />;
  } 

  return (
    <div className="flex flex-col pt-[9vh] min-h-screen bg-slate-200 pb-[15vh] gap-4">
      <Progress stepsComplete="2" />
      <div className="flex flex-col md:flex-row gap-4 px-[2vw]">
        <TopNav />
        <div className="md:w-2/3">
          <FormProvider {...methods}>
            <form className="p-4 rounded-xl border-[1px] bg-white border-slate-300  shadow-xl">
              <h2 className="font-Proxima font-bold text-3xl mb-3">
                Order Confirmation
              </h2>
              <div className="bg-white">
                {/* TODO: PRE-FILL THESE FIELDS WITH THE USER'S DATA, PREVENT CITY DROPDOWN*/}
                {isAuthenticated ? (
                  <div className="flex flex-col w-full gap-4">
                    <InputField {...username_validation} />
                    <div className="flex-row flex justify-stretch gap-4">
                      <div className="w-1/2">
                        <InputField {...firstname_validation} />
                      </div>
                      <div className="w-1/2">
                        <InputField {...lastname_validation} />
                      </div>
                    </div>
                    <InputField {...email_validation} />
                    <InputField {...contactNumber_validation} />
                    <InputField {...streetAddress_validation} />

                    <div className="flex-row flex justify-stretch gap-4 items-start">
                      <div className="w-1/2 ">
                        <Dropdown
                          name="city"
                          {...city_validation}
                          onClick={() => setdropdownError(true)}
                          defaultValue={user.city}
                        />
                        <div className="relative b-0 right-0 mt-2">
                          <DropdownError
                            error={dropdownError}
                            location={location}
                          />
                        </div>
                      </div>
                      <div className="w-1/2">
                        <InputField {...zip_validation} />
                      </div>
                    </div>

                    <Button
                      text={"PROCEED TO PAYMENT"}
                      onClick={OnProceedClick}
                      type={"submit"}
                    />
                  </div>
                ) : (
                  <div>
                    <p className="font-Nunito font-semibold text-lg">
                      Please log in or sign up to continue.
                    </p>
                    <div className="flex flex-row justify-between gap-2">
                      <Button text={"SIGN IN"} onClick={OnLoginClick} />
                      <Button category="register" onClick={OnRegisterClick} />
                    </div>
                  </div>
                )}
              </div>
            </form>
          </FormProvider>
        </div>
        <div className="md:w-1/3 flex flex-col gap-4">
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
        <Navbar />
      </div>
    </div>
  );
};

const DropdownError = ({ error, location }) => {
  if (error == true) {
    return (
      <motion.p
        className="inline-flex items-center w-auto px-2 relative ml-auto font-semibold text-xxs text-rose-700 bg-[rgb(255,201,201)] rounded-md box-border mb-[0.2rem] gap-3"
        {...framer_error}
      >
        <MdError />
        This sale is only for customers in {location}.
      </motion.p>
    );
  }
};

const framer_error = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.2 },
};

export default OrderConfirmationPage;
