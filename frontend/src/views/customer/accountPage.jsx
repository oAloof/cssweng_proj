import React, { useState, useEffect, useCallback, useContext } from "react";
import NavBar from "../../components/NavBar.jsx";
import Menu from "../../components/Menu.jsx";
import { AnimatePresence, motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import InputField from "../../components/InputField.jsx";
import { useForm, FormProvider } from "react-hook-form";
import {
  username_validation,
  email_validation,
  password_validation,
  confirmPassword_validation,
  firstname_validation,
  lastname_validation,
  contactNumber_validation,
  zip_validation,
  streetAddress_validation,
  city_validation,
} from "../../utils/inputValidations.jsx";
import Check from "../../components/Check.jsx";
import Button from "../../components/customer/Button.jsx";
import Dropdown from "../../components/CitySelect.jsx";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader.jsx";

import { AuthenticationContext } from "../../contexts/AuthenticationContext.jsx";

const AccountPage = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const methods = useForm({
    mode: "onSubmit",
  });

  const getUserInformation = async () => {
    if (!isAuthenticated) return;

    setIsLoadingUser(true);
    try {
      const response = await fetch("http://localhost:4000/api/auth/user", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("User not found");
      }
      const responseData = await response.json();
      setUser(responseData.user);

      methods.reset({
        username: responseData.user.username,
        firstname: responseData.user.firstName,
        lastname: responseData.user.lastName,
        email: responseData.user.email,
        contactNumber: responseData.user.contactNumber,
        streetAddress: responseData.user.streetAddress,
        city: responseData.user.city,
        zip: responseData.user.zip,
      });
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
    setIsLoadingUser(false);
  };

  useEffect(() => {
    getUserInformation();
  }, [isAuthenticated]);

  if (isLoadingUser) {
    return <Loader />;
  }

  return (
    <div className="h-screen bg-slate-200">
      <div>
        <div className="mt-[7vh]">
          <Menu />
          <section className="overflow-auto ">
            <FormProvider {...methods}>
              <AccountSection methods={methods} user={user}/>
            </FormProvider>
          </section>
        </div>
        <NavBar />
      </div>
    </div>
  );
};

export default AccountPage;

const AccountSection = ({ methods, user }) => {
  const [selected, setSelected] = useState(TABS[0]);

  return (
    <section className="overflow-hidden bg-slate-200 px-4 py-12 text-slate-800 min-h-screen pb-[20vh]">
      <Heading methods={methods} />
      <Tabs selected={selected} setSelected={setSelected} />
      <Headers selected={selected} methods={methods} user ={user}/>
    </section>
  );
};

const Heading = () => {
  return (
    <>
      <div className="relative z-10 flex flex-col items-center justify-center">
        <span className="mb-8 text-5xl font-bold">Account</span>
      </div>
      <span className="absolute -top-[350px] left-[50%] z-0 h-[500px] w-[600px] -translate-x-[50%] rounded-full bg-gradient-to-r from-violet-200/50 to-indigo-200/50 blur-3xl" />
    </>
  );
};

const Tabs = ({ selected, setSelected }) => {
  return (
    <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
      {TABS.map((tab) => (
        <button
          onClick={() => setSelected(tab)}
          className={`relative overflow-hidden whitespace-nowrap rounded-md  px-3 py-1.5 text-sm font-medium transition-colors duration-500 ${
            selected === tab
              ? "border-violet-500 text-slate-50 border-[1px]"
              : "border-slate-300 border-[1px] bg-transparent text-indigo-700"
          }`}
          key={tab}
        >
          <span className="relative z-10">{tab}</span>
          <AnimatePresence>
            {selected === tab && (
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "100%" }}
                transition={{
                  duration: 0.5,
                  ease: "backIn",
                }}
                className="absolute inset-0 z-0 bg-gradient-to-r from-violet-600 to-indigo-600"
              />
            )}
          </AnimatePresence>
        </button>
      ))}
    </div>
  );
};

const Headers = ({ selected, methods, user }) => {
  return (
    <div className="mx-auto mt-12 max-w-3xl">
      <AnimatePresence mode="wait">
        {selected === "Edit Account Details" && (
          <EditAccountDetailsTab methods={methods} />
        )}
        {selected === "View Orders" && <ViewOrdersTab user = {user}/>}
      </AnimatePresence>
    </div>
  );
};

const EditAccountDetailsTab = ({ methods }) => {
  //const methods = useForm({ mode: "onSubmit" });
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const [validateLength, setValidateLength] = useState(false);
  const [validateMixedCase, setValidateMixedCase] = useState(false);
  const [validateNumber, setValidateNumber] = useState(false);
  const [validatePasswordMatch, setValidatePasswordMatch] = useState(false);

  const updateUserAccountDetails = async (data) => {
    const formData = new FormData();

    // Append form data
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    try {
      const response = await fetch(
        "http://localhost:4000/api/auth/updateUserDetails",
        {
          method: "PATCH",
          credentials: "include",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to update user account details: ${response.status}`
        );
      }

      const responseData = await response.json();
      console.log("Account details updated:", responseData);
    } catch (error) {
      console.error("Error updating user account details:", error);
    }
  };

  const onSubmit = methods.handleSubmit((data) => {
    // Handle form submission
    console.log(data);
    // TODO: EDIT USER ACCOUNT DETAILS
  });

  const OnShippingDetailsClick = (data) => {
    // TODO: EDIT USER ACCOUNT DEETS
  };

  useEffect(() => {
    // Update password validations
    const isLengthValid = password.length >= 8 && password.length <= 36;
    const isMixedCaseValid = /[a-z]/.test(password) && /[A-Z]/.test(password);
    const isNumberValid = /[0-9]/.test(password);
    setValidateLength(isLengthValid);
    setValidateMixedCase(isMixedCaseValid);
    setValidateNumber(isNumberValid);
    const bothFieldsFilled =
      password.length > 0 && confirmedPassword.length > 0;
    setValidatePasswordMatch(
      bothFieldsFilled && password === confirmedPassword
    );
  }, [password, confirmedPassword]);

  const { watch } = methods;
  const currentCity = watch("city");

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Update state for each validation check
    setValidateLength(newPassword.length >= 8 && newPassword.length <= 36);
    setValidateMixedCase(
      /[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword)
    );
    setValidateNumber(/[0-9]/.test(newPassword));
  };

  const handleConfirmedPasswordChange = (e) => {
    const newConfirmedPassword = e.target.value;
    setConfirmedPassword(newConfirmedPassword);

    // Perform confirmed password validation check
    setValidatePasswordMatch(password && password === newConfirmedPassword);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "backIn" }}
      className="space-y-4"
    >
      <Header header={"Account Details"}>
        <FormProvider {...methods}>
          <form
            onSubmit={onSubmit}
            noValidate
            autoComplete="off"
            className="flex self-stretch flex-col items-start justify-start gap-4"
          >
            <div className="flex flex-col w-full gap-4">
              <InputField {...username_validation} />
              <div className="flex-row flex justify-stretch gap-4">
                <div className="w-1/2">
                  <InputField {...firstname_validation} name="firstname" />
                </div>
                <div className="w-1/2">
                  <InputField {...lastname_validation} name="lastname" />
                </div>
              </div>
              <InputField {...email_validation} />
              <InputField {...contactNumber_validation} />
              <InputField
                {...password_validation}
                value={password}
                onChange={handlePasswordChange}
              />
              <InputField
                {...confirmPassword_validation}
                value={confirmedPassword}
                onChange={handleConfirmedPasswordChange}
              />
              {/* Password Validation */}
              <div className="self-stretch flex flex-col items-start justify-start gap-2">
                <div className="relative font-Nunito font-bold mb-0">
                  Your password must:
                </div>
                <div className="self-stretch relative">
                  <div className="relative mt-0 left-0 w-[324px] flex flex-row items-center justify-start gap-2">
                    <Check isValid={validateLength}></Check>
                    <div className="relative leading-[150%] font-Nunito flex items-center w-auto flex-shrink-0">
                      Contain at least 8-36 characters
                    </div>
                  </div>
                  <div className="relative top-0 left-0 w-[324px] flex flex-row items-center justify-start gap-2">
                    <Check isValid={validateMixedCase}></Check>
                    <div className="relative leading-[150%] font-Nunito flex items-center w-auto flex-shrink-0">
                      Contain at least 1 mixed case letter
                    </div>
                  </div>
                  <div className="relative top-0 left-0 w-[324px] flex flex-row items-center justify-start gap-2">
                    <Check isValid={validateNumber}></Check>
                    <div className="relative leading-[150%] font-Nunito flex items-center w-auto flex-shrink-0">
                      Contain at least 1 number
                    </div>
                  </div>
                  <div className="relative top-0 left-0 w-[324px] flex flex-row items-center justify-start gap-2">
                    <Check isValid={validatePasswordMatch}></Check>
                    <div className="relative leading-[150%] font-Nunito flex items-center w-auto flex-shrink-0">
                      Match
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button
              text={"UPDATE DETAILS"}
              onClick={onSubmit}
              type={"submit"}
            />
          </form>
        </FormProvider>
      </Header>

      <Header header={"Shipping Details"}>
        <FormProvider {...methods}>
          <form className="overflow-y-visible">
            <div className="bg-white">
              <div className="flex flex-col w-full gap-4">
                <InputField {...streetAddress_validation} />

                <div className="flex-row flex justify-stretch gap-4 items-start">
                  <div className="w-1/2 ">
                    <Dropdown
                      name="city"
                      {...city_validation}
                      onClick={() => setdropdownError(true)}
                      defaultValue={currentCity}
                    />
                  </div>
                  <div className="w-1/2">
                    <InputField {...zip_validation} />
                  </div>
                </div>

                <Button
                  text={"UPDATE DETAILS"}
                  onClick={OnShippingDetailsClick}
                  type={"submit"}
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </Header>
    </motion.div>
  );
};

const ViewOrdersTab = ({user}) => {
  const [orderItems, setOrderItems] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrderData();

        setOrderItems(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  const getOrderData = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/orders/user/" + user._id
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "backIn" }}
      className="space-y-4"
    >
      <Header header={"Orders"}>
        <div className="bg-white ">
          {orderItems.map((item) => (
            <OrderItem key={item._id} item={item} />
          ))}
        </div>
      </Header>
    </motion.div>
  );
};

const Header = ({ header, children }) => {
  const [open, setOpen] = useState(true);

  return (
    <motion.div
      animate={open ? "open" : "closed"}
      className={`rounded-xl border-[1px] border-slate-300 px-4 transition-colors overflow-y-visible ${
        open ? "bg-white" : "bg-slate-100"
      }`}
    >
      <button
        onClick={() => setOpen((pv) => !pv)}
        className="flex w-full items-center justify-between gap-4 py-4"
      >
        <span
          className={`text-left text-lg font-medium transition-colors ${
            open ? "text-slate-800" : "text-slate-600"
          }`}
        >
          {header}
        </span>
        <motion.span
          variants={{
            open: {
              rotate: "45deg",
            },
            closed: {
              rotate: "0deg",
            },
          }}
        >
          <FiPlus
            className={`text-2xl transition-colors ${
              open ? "text-slate-800" : "text-slate-600"
            }`}
          />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: open ? "fit-content" : "0px",
          marginBottom: open ? "24px" : "0px",
        }}
        className="overflow-hidden text-slate-600"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const TABS = ["Edit Account Details", "View Orders"];

const OrderItem = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/order-${item.number}`);
  };

  var totalItems = 0 

  for (let i = 0; i < item.order.length; i++)
  {
    totalItems += item.order[i].quantity
  }

  const [firstProduct, setFirstProduct] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFirstProduct = async () => {
      try {
        const data = await getFirstProduct();

        setFirstProduct(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFirstProduct();
  }, []);

  const getFirstProduct = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/orders/product/" + item.order[0].product
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
    <div
      className="flex flex-grow items-center justify-between border-b border-gray-200 py-3"
      onClick={handleClick}
    >
      <div className="flex items-center w-full flex-grow">
        <img
          className="h-full w-32 object-contain mr-4"
          src={`https://drive.google.com/uc?export=view&id=${firstProduct.images[0]}`}
          alt={item.name}
        />
        <div className="flex flex-col flex-grow">
          <div className="flex justify-between w-full">
            <div className="flex flex-col">
              <p className="text-lg font-semibold font-Proxima m-0">
                Order #{item.orderNumber}
              </p>
              <p className="text-sm text-indigo-400 font-Proxima mb-4 ">
                {item.status}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-600 m-0 font-Nunito font-bold">
              {totalItems} item/s
            </p>
            <p className="font-Nunito font-bold m-0 text-lg align-bottom">
              Total: ₱{item.totalCost}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
