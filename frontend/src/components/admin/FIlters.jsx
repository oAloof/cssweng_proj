import styles from "./Filters.module.css";

const Filter = () => {
  return (
    <div className={styles.dropdown}>
      <div className={styles.filterTitle}>
        <div className={styles.filterCategory}>Aircons</div>
        <div className={styles.dropdownArrowContainer}>
          <img
            className={styles.dropdownArrowIcon}
            alt=""
            src="/dropdown-arrow5.svg"
          />
        </div>
      </div>

      <img
        className={styles.dropdownArrowIcon1}
        alt=""
        src="/dropdown-arrow6.svg"
      />

      <div className={styles.filterItems}>
        <div className={styles.filterItem}>
          <div className={styles.checkboxstate3} />
          <div className={styles.filterText}>Filter Text</div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
