import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/CitySelect.module.css";
import { findInputError, isFormInvalid } from "../utils";
import { useFormContext, Controller } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { MdError } from "react-icons/md";

const Cities = [
  { label: "Manila", value: "Manila" },
  { label: "Laguna", value: "Laguna" },
  { label: "Quezon City", value: "Quezon City" },
];

const Dropdown = ({ control, name, validation, defaultValue }) => {
  const {
    formState: { errors },
  } = useFormContext();

  const inputErrors = findInputError(errors, name);
  const isInvalid = isFormInvalid(inputErrors);

   // Function to find the corresponding option object for the default value
   const findOptionForDefaultValue = (defaultValue) => {
    return Cities.find((city) => city.value === defaultValue);
  };

  return (
    <div className={styles.container}>
      <div className={styles.labelAndError}>
        <h6>City</h6>
        <AnimatePresence mode="wait" initial={false}>
          {isInvalid && (
            <InputError
              message={inputErrors.error.message}
              key={inputErrors.error.message}
            />
          )}
        </AnimatePresence>
      </div>
      <Controller
        control={control}
        name={name}
        rules={validation}
        render={({ field }) => (
          <Select
            {...field}
            options={Cities}
            onChange={(val) => field.onChange(val)}
            classNamePrefix="react-select"
            placeholder="Choose a City"
            styles={{ container: (base) => ({ ...base, flex: 1 }) }}
            value={findOptionForDefaultValue(defaultValue)}
          />
        )}
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

export default Dropdown;
