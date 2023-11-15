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
    <div className={styles.container}>
      <div className={styles.labelAndError}>
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
        className={styles.default}
        placeholder={placeholder}
        {...register(name, validation)}
      />
    </div>
  );
};

const InputError = ({ message }) => {
  return (
    <motion.p className={styles.errorMessage} {...framer_error}>
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
