import React, { useState, useContext } from "react";
import AdminNavbar from "../../components/admin/adminNavbar.jsx";
import ProductsTable from "../../components/admin/productsTable.jsx";
import AddProduct from "../../components/admin/addProduct.jsx";
import MultiSelect from "../../components/admin/multiSelect.jsx";
import SearchBar from "../../components/SearchBar.jsx";
import Loader from "../../components/Loader.jsx";

// CONTEXTS
import { ProductsProvider } from "../../contexts/ProductsContext.jsx";
import { AuthenticationContext } from "../../contexts/AuthenticationContext.jsx";

function AdminProductPage() {
  const [showCategories, setShowCategories] = useState(true);
  const [showBrands, setShowBrands] = useState(true);
  const categories = ["Category 1", "Category 2", "Category 3"];
  const brands = ["Brand 1", "Brand 2", "Brand 3"];
  const { isAuthenticated, isAdmin, isLoadingAuth } = useContext(
    AuthenticationContext
  );

  const FilterItems = ({ title, items, showItems, setShowItems }) => {
    return (
      <div>
        <div
          className="flex justify-between"
          onClick={() => setShowItems(!showItems)}
          style={{ cursor: "pointer" }}
        >
          <h5 className="text-gray-700 font-medium mb-4 cursor-pointer">
            {title}
          </h5>
          <span className="ml-2">
            {showItems ? (
              <i className="fas fa-chevron-up"></i>
            ) : (
              <i className="fas fa-chevron-down"></i>
            )}
          </span>
        </div>
        {showItems && (
          <div className="mb-5">
            {items.map((item) => (
              <div key={item} className="flex items-center mb-3">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-gray-600"
                  id={item}
                  name={item}
                  style={{ cursor: "pointer" }}
                />
                <label htmlFor={item} className="ml-2 text-gray-700">
                  {item}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const status = [
    { value: "listed", label: "Listed" },
    { value: "unlisted", label: "Unlisted" },
  ];

  if (isLoadingAuth) {
    return <Loader />;
  }

  if (!isAuthenticated || !isAdmin) {
    return <div>404 Page Not Found</div>;
  }

  return (
    <ProductsProvider>
      <div className="flex h-screen bg-gray-200">
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminNavbar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            <div className="container mx-auto px-6 py-8">
              <h3 className="text-gray-700 text-3xl font-medium">Products</h3>
              <div className="flex justify-end mb-3 space-x-4">
                <div className="self-stretch flex-1 justify-between">
                  <div className="relative h-auto">
                    <SearchBar />
                  </div>
                </div>
                <div className="w-1/3">
                  <MultiSelect
                    name="Status"
                    selectOptions={status}
                    isUserInputAllowed={false}
                  />
                </div>
                <AddProduct title="Add a Product" />
              </div>
              <div className="flex">
                <div className="w-1/4">
                  <div className="bg-white rounded-lg shadow-md px-4 pt-4 pb-1 space-y-6 flex-col">
                    <div className="flex place-items-center justify-start space-x-2 mb-3">
                      <i className="fas fa-filter text-gray-400 mr-2"></i>
                      <h4 className="text-gray-700 font-medium mb-0">
                        Filters
                      </h4>
                    </div>
                    <FilterItems
                      title="Categories"
                      items={categories}
                      showItems={showCategories}
                      setShowItems={setShowCategories}
                    />
                    <hr className="my-2" />
                    <FilterItems
                      title="Brands"
                      items={brands}
                      showItems={showBrands}
                      setShowItems={setShowBrands}
                    />
                  </div>
                </div>
                <div className="w-3/4 pl-4">
                  <ProductsTable />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProductsProvider>
  );
}

export default AdminProductPage;
