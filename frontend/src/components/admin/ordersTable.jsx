import { motion } from "framer-motion";
import { useState } from "react";
import Dropdown from "../../components/admin/dropdown";
const ordersTable = () => {
  return <Table />;
};

const Table = () => {
  const [orders, setorders] = useState(orderData);

  return (
    <div className="w-full bg-white shadow-lg rounded-lg overflow-y-visible mx-auto overflow-x-auto font-Nunito">
      <table className="w-full">
        <thead>
          <tr className="border-b-[1px] border-slate-200 text-slate-400 text-sm uppercase">
            <th className="text-start p-4">Order Number</th>
            <th className="text-start p-4 font-medium">Total</th>
            <th className="text-start p-4 font-medium">Location</th>
            <th className="text-start p-4 font-medium">Order Date</th>
            <th className="text-start p-4 font-medium">Order Status</th>
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

  const handleSelection = (text) => {
    console.log(`${text} selected`);
    setSelectedValue(text);
  };

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

  return (
    <motion.tr
      layoutId={`row-${order.id}`}
      className={`text-sm ${order.id % 2 ? "bg-slate-100" : "bg-white"}`}
    >
      <td className="p-4 flex items-center gap-3 overflow-hidden">
        <div>
          <span className="block mb-1 font-medium">{`Order #${order.id}`}</span>
          <span className="block text-xs text-slate-500">{order.customer}</span>
        </div>
      </td>

      <td className="p-4 font-medium">₱{order.total.toLocaleString()}</td>

      <td className="p-4 font-medium">{order.location}</td>

      <td className="p-4 font-medium">
        {new Date(order.date).toLocaleDateString("en-US", {
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
    </motion.tr>
  );
};

const orderData = [
  {
    id: 1,
    customer: "Juwia",
    total: 112,
    status: "To Process",
    location: "Manila",
    date: "2022-01-01",
  },
  {
    id: 2,
    customer: "Kendrick",
    total: 41,
    status: "Payment Confirmed",
    location: "Cebu",
    date: "2022-01-02",
  },
  {
    id: 3,
    customer: "Jacy",
    total: 9,
    status: "Shipped Out",
    location: "Davao",
    date: "2022-01-03",
  },
  {
    id: 4,
    customer: "Tyrone",
    total: 1,
    status: "Completed",
    location: "Manila",
    date: "2022-01-04",
  },
  {
    id: 5,
    customer: "Sandy",
    total: 9999,
    status: "To Process",
    location: "Gensan",
    date: "2022-01-05",
  },

  {
    id: 6,
    customer: "Ryan",
    total: 345,
    status: "To Process",
    location: "Laguna",
    date: "2022-01-05",
  },

  {
    id: 7,
    customer: "Apa",
    total: 24352,
    status: "To Process",
    location: "Manila",
    date: "2022-01-05",
  },
];

export default ordersTable;
