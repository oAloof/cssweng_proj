import { motion } from "framer-motion";
import { useState } from "react";
import Dropdown from "../../components/admin/dropdown";
const ordersTable = () => {
  return <Table />;
};

const Table = () => {
  const [orders, setorders] = useState(orderData);

  return (
    <div className="w-full bg-white shadow-lg rounded-lg overflow-x-scroll max-w-4xl mx-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-[1px] border-slate-200 text-slate-400 text-sm uppercase">
            <th className="text-start p-4 font-medium">Order Number</th>
            <th className="text-start p-4 font-medium">Total</th>
            <th className="text-start p-4 font-medium">Status</th>
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
  const total = order.maxRank + order.id;
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelection = (text) => {
    console.log(`${text} selected`);
    setSelectedValue(text);
  };

  return (
    <motion.tr
      layoutId={`row-${order.id}`}
      className={`text-sm ${order.id % 2 ? "bg-slate-100" : "bg-white"}`}
    >
      <td className="p-4 flex items-center gap-3 overflow-hidden">
        <div>
          <span className="block mb-1 font-medium">{`Order #${order.id}`}</span>
          <span className="block text-xs text-slate-500">{order.name}</span>
        </div>
      </td>

      <td className="p-4 font-medium">₱{total.toLocaleString()}</td>

      <td className="p-4">
        <Dropdown
          options={[
            {
              text: "Option 1",
              onClick: () => handleSelection("Option 1"),
            },
            {
              text: "Option 2",
              onClick: () => handleSelection("Option 2"),
            },
            {
              text: "Option 3",
              onClick: () => handleSelection("Option 3"),
            },
          ]}
          className={`${
            selectedValue === "Option 1"
              ? "bg-green-200 text-green-800"
              : selectedValue === "Option 2"
              ? "bg-yellow-200 text-yellow-800"
              : selectedValue === "Option 3"
              ? "bg-red-200 text-red-800"
              : "bg-slate-200 text-slate-800"
          }`}
        />
      </td>
    </motion.tr>
  );
};

export default ordersTable;

const orderData = [
  {
    id: 1,
    name: "Andrea Thompson",
    contact: "andythompson@example.com",
    photoURL: "/imgs/head-shots/1.jpg",
    maxRank: 112,
    status: "online",
  },
  {
    id: 2,
    name: "Thomas Smith",
    contact: "tsmith@example.com",
    photoURL: "/imgs/head-shots/5.jpg",
    maxRank: 41,
    status: "online",
  },
  {
    id: 3,
    name: "John Anderson",
    contact: "john.a@example.com",
    photoURL: "/imgs/head-shots/2.jpg",
    maxRank: 9,
    status: "offline",
  },

  {
    id: 4,
    name: "Craig Peterson",
    contact: "craigpeterson@example.com",
    photoURL: "/imgs/head-shots/6.jpg",
    maxRank: 1,
    status: "online",
  },
  {
    id: 5,
    name: "Jen Horowitz",
    contact: "j.horowitz@example.com",
    photoURL: "/imgs/head-shots/3.jpg",
    maxRank: 9999,
    status: "pending",
  },
];
