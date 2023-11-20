import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const salesTable = () => {
  return <Table />;
};

const Table = () => {
  const [sales, setSales] = useState(null);

  useEffect(() => {
    // Fetch sales data from database
    const fetchSales = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/admin/sales/getSales", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          console.error("Failed to fetch sales: ", response.status);
        }
  
        const json = await response.json()
        // console.log(json)
  
        setSales(json)
      } catch (error) {
        console.error('Error fetching sales: ', error);
      }
    }
  
    fetchSales()
  }, []);
  

  return (
    <div className="w-full bg-white shadow-lg rounded-lg overflow-y-visible overflow-x-auto font-Nunito">
      <table className="w-full">
        <thead>
          <tr className="border-b-[1px] border-slate-200 text-slate-400 text-sm uppercase">
            <th className="text-start p-4">Sale Title</th>
            <th className="text-start p-4 font-medium">Start Date</th>
            <th className="text-start p-4 font-medium">End Date</th>
            <th className="text-start p-4 font-medium">Location</th>
            <th className="text-start p-4 font-medium">Sale Revenue</th>
            <th className="text-start p-4 font-medium">Status</th>
            <th className="text-start p-4 font-medium"></th>
          </tr>
        </thead>

        <tbody>
          {sales && sales.map((sale) => {
            return <TableRows key={sale._id} sale={sale} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

const TableRows = ({ sale }) => {
  return (
    <motion.tr
      layoutId={`row-${sale._id}`}
      className={`text-sm ${sale._id % 2 ? "bg-slate-100" : "bg-white"}`}
    >
      <td className="p-4 flex items-center gap-3 overflow-hidden">
        <div>
          <span className="block mb-1 font-medium">{sale.title}</span>
          <span className="block text-xs text-slate-500">
            {Math.ceil(Math.abs(new Date(sale.startDate) - new Date(sale.endDate))/ (1000 * 60 * 60 * 24))} days
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
        {new Date(sale.endDate).toLocaleDateString("en-US", {
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
              (new Date(sale.endDate) < new Date())
              ? "bg-green-200/60 text-green-800"
              : ((new Date(sale.endDate) >= new Date()) && (new Date(sale.startDate) <= new Date()))
              ? "bg-yellow-200/60 text-yellow-800"
              : "bg-slate-200 text-slate-800"
          }`}
        >
          {(() => {
          if (new Date(sale.endDate) < new Date()) { return (
            "Completed"
          )} else if ((new Date(sale.endDate) >= new Date()) && (new Date(sale.startDate) <= new Date())) { return (
            "Ongoing"
          )} else { return (
            "Planned"
          )}
          })()}
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
