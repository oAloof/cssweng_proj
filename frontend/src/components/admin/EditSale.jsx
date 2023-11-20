import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import InputField from "./InputField.jsx";
import { saleName_validation } from "../../utils/inputValidations.jsx";
import { useForm, FormProvider } from "react-hook-form";
import MultiSelect from "./multiSelect.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditSale = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="place-content-center">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity"
      >
        {title}
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={title} />
    </div>
  );
};

const Modal = ({ isOpen, setIsOpen, title }) => {
  const methods = useForm({ mode: "onSubmit" });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const onSubmit = (data) => {
    console.log(data);
    //methods.reset();
  };

  const location = [
    { value: "manila", label: "Manila" },
    { value: "laguna", label: "Laguna" },
    { value: "quezon city", label: "Quezon City" },
    { value: "ortigas", label: "Ortigas" },
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

                  <MultiSelect
                    name={"Location"}
                    selectOptions={location}
                    isUserInputAllowed={true}
                  />
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="start-date"
                      className="text-white font-medium"
                    >
                      Start Date
                    </label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      dateFormat="MMMM d, yyyy"
                      className="px-3 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 borders-gray-500 focus:ring-indigo-600 font-Nunito w-full text-slate-600"
                      id="start-date"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="end-date"
                      className="text-white font-medium"
                    >
                      End Date
                    </label>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      dateFormat="MMMM d, yyyy"
                      className="px-3 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 borders-gray-500 focus:ring-indigo-600 font-Nunito text-slate-600 w-full"
                      id="end-date"
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

export default EditSale;
