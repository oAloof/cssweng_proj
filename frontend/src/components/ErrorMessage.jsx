import { motion } from 'framer-motion';
import styles from '../styles/ErrorMessage.module.css';

const ErrorMessage = ({ message, onClose }) => {
    return (
        <motion.div
            className={styles.errorMessage}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
        >
            {message}
            <button onClick={onClose} className={styles.closeButton}>X</button>
        </motion.div>
    )
}

export default ErrorMessage;