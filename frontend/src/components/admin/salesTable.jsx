import { motion } from "framer-motion";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const salesTable = () => {
  return <Table />;
};

const Table = () => {
  const [sales, setSales] = useState(saleData);

  return (
    <div className="w-full bg-white shadow-lg rounded-lg overflow-y-visible overflow-x-auto font-Nunito">
      <table className="w-full">
        <thead>
          <tr className="border-b-[1px] border-slate-200 text-slate-400 text-sm uppercase">
            <th className="text-start p-4">Sale</th>
            <th className="text-start p-4 font-medium">Start Date</th>
            <th className="text-start p-4 font-medium">End Date</th>
            <th className="text-start p-4 font-medium">Location</th>
            <th className="text-start p-4 font-medium">Sale Revenue</th>
            <th className="text-start p-4 font-medium">Status</th>
            <th className="text-start p-4 font-medium"></th>
          </tr>
        </thead>

        <tbody>
          {sales.map((sale) => {
            return <TableRows key={sale.id} sale={sale} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

const TableRows = ({ sale }) => {
  return (
    <motion.tr
      layoutId={`row-${sale.id}`}
      className={`text-sm ${sale.id % 2 ? "bg-slate-100" : "bg-white"}`}
    >
      <td className="p-4 flex items-center gap-3 overflow-hidden">
        <div>
          <span className="block mb-1 font-medium">{`Sale #${sale.id}`}</span>
          <span className="block text-xs text-slate-500">
            {sale.duration} days
          </span>
        </div>
      </td>

      <td className="p-4 font-medium">
        {new Date(sale.startDate).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </td>

      <td className="p-4 font-medium">
        {new Date(
          new Date(sale.startDate).getTime() +
            sale.duration * 24 * 60 * 60 * 1000
        ).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </td>

      <td className="p-4 font-medium">{sale.location}</td>

      <td className="p-4 font-medium">{`₱${sale.revenue}`}</td>

      <td className="p-4">
        <span
          className={`px-2 py-1 text-xs font-medium rounded ${
            sale.status === "Completed"
              ? "bg-green-200/60 text-green-800"
              : sale.status === "Ongoing"
              ? "bg-yellow-200/60 text-yellow-800"
              : "bg-slate-200 text-slate-800"
          }`}
        >
          {sale.status}
        </span>
      </td>

      <td className="p-4 font-medium">
        <FontAwesomeIcon
          icon={faEdit}
          className="text-black hover:text-indigo-500 cursor-pointer mr-2 text-lg"
        />
        <FontAwesomeIcon
          icon={faTrashAlt}
          className="text-black hover:text-indigo-500 cursor-pointer text-lg"
        />
      </td>
    </motion.tr>
  );
};

const saleData = [
  {
    id: 1,
    duration: 5,
    startDate: "2022-01-01",
    status: "Upcoming",
    location: "Manila",
    endDate: "2022-01-01",
    revenue: 1000,
  },
  {
    id: 2,
    duration: 3,
    startDate: "2022-01-02",
    status: "Ongoing",
    location: "Cebu",
    endDate: "2022-01-02",
    revenue: 500,
  },
  {
    id: 3,
    duration: 2,
    startDate: "2022-01-03",
    status: "Completed",
    location: "Davao",
    endDate: "2022-01-03",
    revenue: 2000,
  },
  {
    id: 4,
    duration: 1,
    startDate: "2022-01-04",
    status: "Upcoming",
    location: "Manila",
    endDate: "2022-01-04",
    revenue: 1500,
  },
  {
    id: 5,
    duration: 1,
    startDate: "2022-01-05",
    status: "Ongoing",
    location: "Gensan",
    endDate: "2022-01-05",
    revenue: 800,
  },

  {
    id: 6,
    duration: 1,
    startDate: "2022-01-05",
    status: "Completed",
    location: "Laguna",
    endDate: "2022-01-05",
    revenue: 3000,
  },

  {
    id: 7,
    duration: 1,
    startDate: "2022-01-05",
    status: "Upcoming",
    location: "Manila",
    endDate: "2022-01-05",
    revenue: 1200,
  },
];

export default salesTable;
