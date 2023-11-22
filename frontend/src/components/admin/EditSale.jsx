import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import InputField from "./InputField.jsx";
import { saleName_validation } from "../../utils/inputValidations.jsx";
import { useForm, FormProvider, Controller } from "react-hook-form";
import MultiSelect from "./multiSelect.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Modal = ({ isOpen, setIsOpen, title, sale }) => {
  const methods = useForm({ mode: "onSubmit", 
    defaultValues: {
      saleName: sale.title,
      location: sale.location,
      startDate: sale.startDate,
      endDate: sale.endDate,
      revenue: sale.Revenue,
    }, 
  });

  const past = (date) => new Date() < date;
  console.log(sale.startDate)
  const [startDate, setStartDate] = useState(new Date(sale.startDate));
  const [endDate, setEndDate] = useState(new Date(sale.endDate));
  
  const onSubmit = (data) => {
    console.log(data);
    editSale(data);
    setIsOpen(false);
  };

  const editSale = async (data) => {
    const formData = new FormData();
    // Append existing form data
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await fetch("http://localhost:4000/api/admin/sales/" + sale._id, {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        console.error("Failed to edit Sales: ", response.status);
        return;
      }
      const responseData = await response.json();
      // console.log(responseData);
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const location = [
    { value: "Manila", label: "Manila" },
    { value: "Laguna", label: "Laguna" },
    { value: "Quezon city", label: "Quezon City" },
    { value: "Ortigas", label: "Ortigas" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-10 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-visible"
          >
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-left mb-2">{title}</h3>
              <FormProvider {...methods}>
                <form
                  onSubmit={methods.handleSubmit(onSubmit)}
                  noValidate
                  className="flex flex-col gap-4"
                >
                  <InputField {...saleName_validation} />

                  <Controller
                    name="location"
                    control={methods.control}
                    render={( {field} ) => (
                      <MultiSelect
                        field={field}
                        name={"location"}
                        selectOptions={location}
                        isUserInputAllowed={true}
                      />
                    )}
                  />

                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="start-date"
                      className="text-white font-medium"
                    >
                      Start Date
                    </label>
                    <Controller
                      name="startDate"
                      control={methods.control}
                      render={( {field} ) => (
                        <DatePicker
                          field={field}
                          name={"startDate"}
                          filterDate={past}
                          onChange={(date) => {setStartDate(date) 
                            field.onChange(date)}}
                          placeholderText='Select date'
                          selected={startDate}
                          dateFormat="MMMM d, yyyy"
                          className="px-3 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 borders-gray-500 focus:ring-indigo-600 font-Nunito w-full text-slate-600"
                          id="start-date"
                        />
                      )}
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="end-date"
                      className="text-white font-medium"
                    >
                      End Date
                    </label>
                    <Controller
                      name="endDate"
                      control={methods.control}
                      render={( {field} ) => (
                        <DatePicker
                          field={field}
                          name={"endDate"}
                          filterDate={past}
                          onChange={(date) => {setEndDate(date)
                            field.onChange(date)}}
                          placeholderText='Select date'
                          selected={endDate}
                          dateFormat="MMMM d, yyyy"
                          className="px-3 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 borders-gray-500 focus:ring-indigo-600 font-Nunito w-full text-slate-600"
                          id="end-date"
                        />
                      )}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </FormProvider>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
