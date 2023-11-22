import React, { useState, useContext } from "react";
import AdminNavbar from "../../components/admin/adminNavbar.jsx";
import SalesTable from "../../components/admin/salesTable.jsx";
import AddSale from "../../components/admin/addSale.jsx";
import MultiSelect from "../../components/admin/multiSelect.jsx";
import { FiSearch } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// CONTEXTS
import { SalesProvider } from "../../contexts/SalesContext.jsx";
import { AuthenticationContext } from "../../contexts/AuthenticationContext.jsx";

function AdminSalesPage() {
  const { isAuthenticated, isAdmin, isLoadingAuth } = useContext(AuthenticationContext);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const status = [
    { value: "upcoming", label: "Upcoming" },
    { value: "ongoing", label: "Ongoing" },
    { value: "competed", label: "Completed" },
  ];

  if (isLoadingAuth) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || !isAdmin) {
    return <div>404 Page Not Found</div>;
  }

  return (
    <SalesProvider>
      <div className="flex h-screen bg-gray-200">
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminNavbar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            <div className="container mx-auto px-6 py-8">
              <h3 className="text-gray-700 text-3xl font-medium">Sales</h3>
              <div className="flex justify-end mb-3 space-x-4">
                <div className="self-stretch flex-1 justify-between">
                  <input
                    type="text"
                    placeholder="Search"
                    className="px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 borders-gray-500 focus:ring-indigo-600 font-Nunito w-2/3"
                  />
                  <FiSearch className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500" />
                </div>

                <AddSale title="Add a Sale" />
              </div>
              <div className="flex">
                <div className="w-1/4">
                  <div className="bg-white rounded-lg shadow-md p-4 space-y-6 flex-col">
                    <div className="flex place-items-center justify-start space-x-2 mb-3">
                      <i className="fas fa-calendar-alt text-gray-400 mr-2"></i>
                      <h4 className="text-gray-700 font-medium mb-0">
                        Date Range
                      </h4>
                    </div>
                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-col space-y-1">
                        <label
                          htmlFor="start-date"
                          className="text-gray-700 font-medium"
                        >
                          Start Date
                        </label>
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          dateFormat="MMMM d, yyyy"
                          className="px-3 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 borders-gray-500 focus:ring-indigo-600 font-Nunito w-full"
                          id="start-date"
                        />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <label
                          htmlFor="end-date"
                          className="text-gray-700 font-medium"
                        >
                          End Date
                        </label>
                        <DatePicker
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                          dateFormat="MMMM d, yyyy"
                          className="px-3 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 borders-gray-500 focus:ring-indigo-600 font-Nunito w-full"
                          id="end-date"
                        />
                      </div>
                      <div>
                        <MultiSelect
                          name="Status"
                          selectOptions={status}
                          isUserInputAllowed={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-3/4 pl-4">
                  <SalesTable />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SalesProvider>
  );
}

export default AdminSalesPage;
