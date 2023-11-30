import React, { useState, useEffect, useContext } from "react";
import TopNav from "../../components/Menu.jsx";
import Navbar from "../../components/NavBar.jsx";
import Progress from "../../components/InvoiceProgress.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import ExpandableSection from "../../components/customer/ExpandableSection.jsx";
import Button from "../../components/customer/Button.jsx";
import Logo from "../../components/Logo.jsx";
import Loader from "../../components/Loader.jsx";

// CONTEXTS
import { AuthenticationContext } from "../../contexts/AuthenticationContext.jsx";

const CartItem = ({ item }) => {
  useEffect(() => {
    console.log(item);
  })
  return (
    <div className="flex flex-grow items-center justify-between border-b border-gray-200 py-3">
      <div className="flex items-center w-full flex-grow">
        <img
          className="h-full w-14 object-contain mr-4"
          src={`https://drive.google.com/uc?export=view&id=${item.product.images[0]}`}
          alt={item.name}
        />
        <div className="flex flex-col flex-grow">
          <div className="flex justify-between w-full">
            <div className="flex flex-col">
              <p className="text-xl font-semibold font-Proxima m-0">
                {item.product.name}
              </p>
              <p className="text-s text-indigo-400 font-Proxima mb-2 ">
                {item.product.brand}
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <p className="text-lg text-gray-600 font-Nunito font-bold m-0">
              Qty: {item.quantity}
            </p>
            <div className="flex flex-col justify-center items-end ">
              <p className="font-Nunito font-bold m-0 text-xl">₱{item.product.discountedPrice}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const Billing = () => {
  const [cartItems, setCartItems] = useState([]); // ! Remove this
  const [isLoadingOrder, setIsLoadingOrder] = useState(true);
  const [orderDetails, setOrderDetails] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const { isAuthenticated } = useContext(AuthenticationContext);
  const locationObject = useLocation();
  const orderNumber = locationObject.state?.orderNumber;
  const subtotal = locationObject.state?.subtotal;
  const totalSaved = locationObject.state?.totalSaved;

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  // get order details from backend
  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/orders/${orderNumber}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        console.log("Order not found.");
        return;
      }
      const responseData = await response.json();
      console.log(responseData.order);
      const formattedOrderData = {
        number: responseData.order.orderNumber,
        date: new Date(responseData.order.createdAt).toLocaleDateString(), // format the creation date
        total: responseData.order.totalCost.toFixed(2), // format the total cost
        status: responseData.order.status // status of the order
      }
      const formattedUserInfo = [    
        { label: "Name", value: responseData.order.personReceiving },
        { label: "Contact Number", value: responseData.order.personRecievingNum },
        { label: "Address", value: responseData.order.deliveryAddress },
        { label: "Email", value: responseData.order.personRecievingEmail },
      ]
      setOrderDetails(formattedOrderData);
      setUserInfo(formattedUserInfo)
      setCartItems(responseData.order.order)  
      setIsLoadingOrder(false);
      return;
    } catch (error) {
      console.error("Error fetching order details: ", error);
      return;
    }
  };

  useEffect(() => {
    if (isAuthenticated && isLoadingOrder) {
      fetchOrderDetails();
    }
  }, [isAuthenticated, isLoadingOrder]);

  const cartCount = cartItems.length;

  const [isOrderSummaryOpen, setOrderSummaryOpen] = useState(true);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isInformationOpen, setInformationOpen] = useState(true);

  const shippingFee = "5.00";

  if (isLoadingOrder) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col min-h-screen pt-[9vh] bg-slate-200 pb-[15vh] gap-4">
      <div className="md:justify-center flex flex-col md:flex-row gap-4 px-[2vw]">
        <TopNav />
        <div className="md:w-1/3 w-full gap-4 flex flex-col">
          <div className="px-4 pt-4 pb-10 rounded-xl border-[1px] bg-white border-slate-300 shadow-xl flex flex-col gap-2">
            <div className="flex flex-row justify-between items-center mb-6">
              <Logo name="invoice" />
              <p className="font-Nunito font-bold text-2xl mb-0 text-slate-400">
                ORDER {orderDetails.number}
              </p>
            </div>
            <h2 className="font-Proxima font-bold text-3xl m-0 ">
              Thank you, {userInfo.find((item) => item.label === "Name").value}!
            </h2>

            <p className="font-Nunito text-[18px] mt-0 mb-5 text-slate-500">
              Your order will be on its way soon! Please visit this page
              regularly to receive the latest updates regarding the status of
              your order.
            </p>
            <Progress currentStatus={orderDetails.status} />
            <div className="mt-10 w-3/4 md:w-1/3 self-center">
              <Button text="CONTINUE SHOPPING" onClick={() => navigate("/")} />
            </div>
          </div>
        </div>
        <div className="md:w-2/5 w-full flex flex-col gap-4">
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
            title="Invoice"
            subtitle={`₱ ${orderDetails.total}`}
            isOpen={isOrderSummaryOpen}
            onToggle={() => setOrderSummaryOpen(!isOrderSummaryOpen)}
          >
            <div className="bg-white ">
              {cartItems.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>
            <div className="flex flex-col justify-end items-end pt-4">
              <p className="text-lg font-semibold text-gray-400">
                Subtotal: ₱{subtotal}
              </p>
              <p className="text-lg font-semibold text-gray-400">
                Total Saved: ₱{totalSaved}
              </p>
              <p className="text-lg font-semibold text-gray-400 mb-4">
                Shipping Fee: ₱{shippingFee}
              </p>
              <p className="text-3xl font-bold font-Proxima text-indigo-400 m-0">
                Total: ₱{orderDetails.total}
              </p>
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
