import styles from "../styles/InputField.module.css";
import { findInputError, isFormInvalid } from "../utils";
import { useFormContext } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { MdError } from "react-icons/md";

const InputField = ({ label, placeholder, id, type, validation, name }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputErrors = findInputError(errors, name);
  const isInvalid = isFormInvalid(inputErrors);

  return (
    <div className="flex flex-col items-start justify-between">
      <div className="flex justify-between items-end pb-[0.1rem] w-full">
        <h6 htmlFor={id}>{label}</h6>
        <AnimatePresence mode="wait" initial={false}>
          {isInvalid && (
            <InputError
              message={inputErrors.error.message}
              key={inputErrors.error.message}
            />
          )}
        </AnimatePresence>
      </div>
      <input
        id={id}
        type={type}
        className="border border-gray-400 font-semibold font-nunito text-2xs bg-transparent rounded-lg box-border w-[321px] h-auto flex flex-row items-start justify-between px-2 py-2.5"
        placeholder={placeholder}
        {...register(name, validation)}
      />
    </div>
  );
};

const InputError = ({ message }) => {
  return (
    <motion.p
      className="inline-flex items-center w-auto px-2 relative ml-auto font-semibold text-xxs text-rose-700 bg-[rgb(255,201,201)] rounded-md box-border mb-[0.2rem]"
      {...framer_error}
    >
      <MdError />
      {message}
    </motion.p>
  );
};

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
};

export default InputField;
