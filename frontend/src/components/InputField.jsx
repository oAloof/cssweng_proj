import styles from "../styles/inputField.module.css";

const InputField = ({ placeholder, id, category, onChange, value }) => {

  return (
    <input
      className={styles.default}
      id={id}
      placeholder={placeholder}
      type={category}
      onChange={onChange}
      value={value}
    />
  );
};

export default InputField;
