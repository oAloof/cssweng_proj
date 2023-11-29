import { motion } from "framer-motion";
import { useState, useEffect, useContext, React } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import EditProduct from "./EditProduct";
import { AnimatePresence } from "framer-motion";
import { ProductsContext } from "../../contexts/ProductsContext";
import Loader from "../Loader";

const ProductsTable = () => {
  return <Table />;
};

const Table = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { filteredProducts, isLoading } = useContext(ProductsContext);
  console.log("Filtered products:", filteredProducts);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (filteredProducts.length === 0) {
    return <div>No products found.</div>;
  }

  return (
    <div>
      <div className="w-full bg-white shadow-lg rounded-lg overflow-y-visible mx-auto overflow-x-auto">
        <table className="w-full ">
          <thead>
            <tr className="border-b-[1px] border-slate-200 text-slate-400 text-sm uppercase">
              <th className="text-start p-4 font-medium">Product</th>
              <th className="text-start p-4 font-medium">Available Qty</th>
              <th className="text-start p-4 font-medium">Sold Qty</th>
              <th className="text-start p-4 font-medium">Original Price</th>
              <th className="text-start p-4 font-medium">Discounted Price</th>
              <th className="text-start p-4 font-medium"></th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => {
              return (
                <TableRows
                  key={product._id}
                  product={product}
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
          <EditProduct
            title="Edit Product"
            isOpen={isEditModalOpen}
            setIsOpen={setIsEditModalOpen}
            product={selectedProduct}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const TableRows = ({ product, onEditClick }) => {
  const { setIsLoading, setProductChanged } = useContext(ProductsContext);

  const deleteProduct = async (product) => {
    try {
      const dataToSend = {
        id: product._id,
      };
      const response = await fetch(
        "http://localhost:4000/api/admin/products/delete",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );
      if (!response.ok) {
        console.error("Failed to delete product: ", response.status);
        return;
      }
      const responseData = await response.json();
      setIsLoading(true);
      setProductChanged(true); // trigger useEffect in ProductsContext to fetch products again
      console.log(responseData);
    } catch (error) {
      console.error("Fetch error: ", error);
      return;
    }
  };

  const handleDeleteClick = (product) => {
    deleteProduct(product);
  };

  return (
    <motion.tr
      layoutId={`row-${product.id}`}
      className={`text-sm ${product.id % 2 ? "bg-slate-100" : "bg-white "}`}
    >
      <td className="p-4 flex items-center gap-3 overflow-hidden">
        <img
          src={`https://drive.google.com/uc?export=view&id=${product.images[0]}`}
          // src="/Product Photo Placeholder.png"
          alt="Product Image"
          className="w-10 h-10 rounded-full bg-slate-300 object-cover object-top shrink-0"
        />
        <div>
          <span className="block mb-1 font-medium">{product.name}</span>
          <span className="block text-xs text-slate-500">{product.brand}</span>
        </div>
      </td>

      <td className="p-4 font-medium">{product.availableQuantity}</td>

      <td className="p-4 font-medium">{product.quantitySold}</td>

      <td className="p-4 font-medium">
        ₱{product.originalPrice.toLocaleString()}
      </td>

      <td className="p-4 font-medium">
        ₱{product.discountedPrice.toLocaleString()}
      </td>

      <td className="p-4 font-medium">
        <FontAwesomeIcon
          icon={faEdit}
          className="text-black hover:text-indigo-500 cursor-pointer mr-2 text-lg"
          onClick={() => onEditClick(product)}
        />
        <FontAwesomeIcon
          icon={faTrashAlt}
          className="text-black hover:text-indigo-500 cursor-pointer text-lg"
          onClick={() => handleDeleteClick(product)}
        />
      </td>
    </motion.tr>
  );
};

export default ProductsTable;
