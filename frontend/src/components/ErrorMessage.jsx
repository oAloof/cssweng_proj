import { AnimatePresence, motion } from "framer-motion";
import styles from "../styles/ErrorMessage.module.css";
import { MdError } from "react-icons/md";

const ErrorMessage = ({ message, onClose }) => {
  return (
    <motion.p
      className="inline-flex items-center w-auto px-2 relative ml-auto font-semibold text-xs text-rose-700 bg-[rgb(255,201,201)] rounded-md box-border mb-[0.2rem] mt-1"
      {...framer_error}
    >
      <button onClick={onClose}>
        <MdError />
      </button>
      {message}
    </motion.p>
  );
};

export default ErrorMessage;

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
};
