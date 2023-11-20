import { motion } from "framer-motion";
import { useState, useEffect, React } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import EditProduct from "./EditProduct";
import { AnimatePresence } from "framer-motion";

const ProductsTable = () => {
  return <Table />;
};

const Table = () => {
  const [products, setProducts] = useState(productData);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
    console.log(isEditModalOpen);
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/admin/products/getProducts", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch products: ", response.status);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching products: ', error);
    }
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts.products);
        setIsLoading(false);
        console.log(fetchedProducts.products);
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
    };
    // loadData();
  }, []);

  return (
    <div>
      <div className="w-full bg-white shadow-lg rounded-lg overflow-y-visible mx-auto overflow-x-auto">
        <table className="w-full ">
          <thead>
            <tr className="border-b-[1px] border-slate-200 text-slate-400 text-sm uppercase">
              <th className="text-start p-4 font-medium">Product</th>
              <th className="text-start p-4 font-medium">Available Qty</th>
              <th className="text-start p-4 font-medium">Sales</th>
              <th className="text-start p-4 font-medium">Original Price</th>
              <th className="text-start p-4 font-medium">Discounted Price</th>
              <th className="text-start p-4 font-medium"></th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => {
              return (
                <TableRows
                  key={product.id}
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
  return (
    <motion.tr
      layoutId={`row-${product.id}`}
      className={`text-sm ${product.id % 2 ? "bg-slate-100" : "bg-white "}`}
    >
      <td className="p-4 flex items-center gap-3 overflow-hidden">
        <img
          // src={`https://drive.google.com/uc?export=view&id=${product.images[0]}`}
          src="/Product Photo Placeholder.png"
          alt="Product Image"
          className="w-10 h-10 rounded-full bg-slate-300 object-cover object-top shrink-0"
        />
        <div>
          <span className="block mb-1 font-medium">{product.name}</span>
          <span className="block text-xs text-slate-500">{product.brand}</span>
        </div>
      </td>

      <td className="p-4 font-medium">{product.quantity}</td>

      <td className="p-4 font-medium">{product.sales}</td>

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
        />
      </td>
    </motion.tr>
  );
};

const productData = [
  {
    id: 1,
    name: "Product 1",
    brand: "Brand 1",
    photo: "/Product Photo Placeholder.png",
    quantity: 10,
    sales: 5,
    originalPrice: 100,
    discountedPrice: 80,
    status: "In Stock",
  },
  {
    id: 2,
    name: "Product 2",
    brand: "Brand 2",
    photo: "/Product Photo Placeholder.png",
    quantity: 20,
    sales: 10,
    originalPrice: 200,
    discountedPrice: 150,
    status: "In Stock",
  },
  {
    id: 3,
    name: "Product 3",
    brand: "Brand 3",
    photo: "/Product Photo Placeholder.png",
    quantity: 5,
    sales: 2,
    originalPrice: 50,
    discountedPrice: 40,
    status: "Out of Stock",
  },
  {
    id: 4,
    name: "Product 4",
    brand: "Brand 4",
    photo: "/Product Photo Placeholder.png",
    quantity: 0,
    sales: 0,
    originalPrice: 300,
    discountedPrice: 250,
    status: "Out of Stock",
  },
];

export default ProductsTable;
