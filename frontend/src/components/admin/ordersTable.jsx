import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Dropdown from "../../components/admin/dropdown";
import ViewOrder from "../../components/admin/viewOrder";
const ordersTable = () => {
  return <Table />;
};

const Table = () => {
  const [orders, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrderData();

        setOrderData(data);
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
        "http://localhost:4000/api/admin/orders/getOrders"
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
    <div className="w-full bg-white shadow-lg rounded-lg overflow-y-visible mx-auto overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-[1px] border-slate-200 text-slate-400 text-sm uppercase">
            <th className="text-start p-4 font-medium">Order Number</th>
            <th className="text-start p-4 font-medium">Total</th>
            <th className="text-start p-4 font-medium">Location</th>
            <th className="text-start p-4 font-medium">Order Date</th>
            <th className="text-start p-4 font-medium">Order Status</th>
            <th className="text-center py-4 px-0 font-medium"></th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => {
            return <TableRows key={order.id} order={order} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

const TableRows = ({ order }) => {
  const [selectedValue, setSelectedValue] = useState(order.status);
  const [user, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleSelection = (text) => {
    console.log(`${text} selected`);
    setSelectedValue(text);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserData();

        setUserData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  const getUserData = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/admin/orders/user/" + order.customer
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

  const dropdownOptions = [
    {
      text: "To Process",
      onClick: () => handleSelection("To Process"),
      className: "bg-blue-200 text-blue-800",
    },
    {
      text: "Payment Confirmed",
      onClick: () => handleSelection("Payment Confirmed"),
      className: "bg-blue-200 text-blue-800",
    },
    {
      text: "Shipped Out",
      onClick: () => handleSelection("Shipped Out"),
      className: "bg-blue-200 text-blue-800",
    },
    {
      text: "Completed",
      onClick: () => handleSelection("Completed"),
      className: "bg-blue-200 text-blue-800",
    },
  ];

  function test(words) {
    var n = words.split(" ");
    return n[n.length - 1];
  }

  return (
    <motion.tr
      layoutId={`row-${order._id}`}
      className={`text-sm ${order._id % 2 ? "bg-slate-100" : "bg-white"}`}
    >
      <td className="p-4 flex items-center gap-3 overflow-hidden">
        <div>
          <span className="block mb-1 font-medium">{`Order #${order.orderNumber}`}</span>
          <span className="block text-xs text-slate-500">
            {user.firstName} {user.lastName}
          </span>
        </div>
      </td>

      <td className="p-4 font-medium">₱{order.totalCost.toLocaleString()}</td>

      <td className="p-4 font-medium">{test(order.deliveryAddress)}</td>

      <td className="p-4 font-medium">
        {new Date(order.createdAt).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </td>

      <td className="p-4">
        <Dropdown
          options={dropdownOptions}
          placeholder="Status"
          initialValue={{ text: selectedValue }}
        />
      </td>
      <td className="p-4">
        <ViewOrder order={order} />
      </td>
    </motion.tr>
  );
};

export default ordersTable;
