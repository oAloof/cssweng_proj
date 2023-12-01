import { motion } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import EditSale from "../admin/EditSale";
import { AnimatePresence } from "framer-motion";
import { SalesContext } from "../../contexts/SalesContext";

const salesTable = () => {
  return <Table />;
};

const Table = () => {
  const [selectedSale, setSelectedSale] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { sales, isLoading } = useContext(SalesContext);

  const handleEditClick = (sale) => {
    setSelectedSale(sale);
    setIsEditModalOpen(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="w-full bg-white shadow-lg rounded-lg overflow-y-visible overflow-x-auto">
        <table className="w-full">
          <thead>

            <tr className="border-b-[1px] border-slate-200 text-slate-400 text-sm uppercase font-bold">
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
            {sales &&
              sales.map((sale) => {
                return (
                  <TableRows
                    key={sale._id}
                    sale={sale}
                    onEditClick={handleEditClick}
                    setIsEditModalOpen={setIsEditModalOpen}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
      <AnimatePresence>
        {isEditModalOpen && (
          <EditSale
            title="Edit Sale"
            isOpen={isEditModalOpen}
            setIsOpen={setIsEditModalOpen}
            sale={selectedSale}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const TableRows = ({ sale, onEditClick }) => {
  const { setIsLoading, setSaleChanged } = useContext(SalesContext);

  const deleteSale = async (sale) => {
    try {
      const response = await fetch("http://localhost:4000/api/admin/sales/" + sale._id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          }
        });
      if (!response.ok) {
        console.error("Failed to delete product: ", response.status);
        return;
      }
      const responseData = await response.json();
      setIsLoading(true);
      setSaleChanged(true); // trigger useEffect in ProductsContext to fetch products again
      console.log(responseData);
    } catch (error) {
      console.error("Fetch error: ", error);
      return;
    }
  };

  const handleDeleteClick = (product) => {
    deleteSale(sale);
  }

  return (
    <motion.tr
      layoutId={`row-${sale._id}`}
      className={`text-sm ${sale._id % 2 ? "bg-slate-100" : "bg-white"}`}
    >
      <td className="p-4 flex items-center gap-3 overflow-hidden">
        <div>
          <span className="block mb-1 font-medium">{sale.title}</span>
          <span className="block text-xs text-slate-500">
            {Math.ceil(
              Math.abs(new Date(sale.startDate) - new Date(sale.endDate)) /
                (1000 * 60 * 60 * 24)
            )}{" "}
            days
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
            new Date(sale.endDate) < new Date()
              ? "bg-green-200/60 text-green-800"
              : new Date(sale.endDate) >= new Date() &&
                new Date(sale.startDate) <= new Date()
              ? "bg-yellow-200/60 text-yellow-800"
              : "bg-slate-200 text-slate-800"
          }`}
        >
          {(() => {
            if (new Date(sale.endDate) < new Date()) {
              return "Completed";
            } else if (
              new Date(sale.endDate) >= new Date() &&
              new Date(sale.startDate) <= new Date()
            ) {
              return "Ongoing";
            } else {
              return "Planned";
            }
          })()}
        </span>
      </td>

      <td className="p-4 font-medium">
        <FontAwesomeIcon
          icon={faEdit}
          className="text-black hover:text-indigo-500 cursor-pointer mr-2 text-lg"
          onClick={() => onEditClick(sale)}
        />
        <FontAwesomeIcon
          icon={faTrashAlt}
          className="text-black hover:text-indigo-500 cursor-pointer text-lg"
          onClick={() => handleDeleteClick(sale)}
        />
      </td>
    </motion.tr>
  );
};

export default salesTable;
