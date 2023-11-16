import styles from "../../styles/admin/AddEditASale.module.css";

const AddEditASale = () => {
  return (
    <div className={styles.addeditASale}>
      <div className={styles.newSaleeditSaleParent}>
        <b className={styles.newSaleeditSale}>New Sale/Edit Sale</b>
        <div className={styles.icons}>
          <button className={styles.x} id="ExitBtn">
            <img className={styles.icon} alt="" src="/icon.svg" />
          </button>
        </div>
      </div>
      <div className={styles.inputFields}>
        <div className={styles.productNameField}>
          <div className={styles.emailField}>
            <input
              className={styles.emailAddress}
              name="SaleName"
              placeholder="Sale Name"
              type="text"
            />
          </div>
        </div>
        <div className={styles.pricePerUnit}>
          <div className={styles.emailField1}>
            <input
              className={styles.emailAddress}
              name="DateInput"
              placeholder="Date Input"
              type="text"
            />
          </div>
        </div>
        <div className={styles.location}>
          <div className={styles.dropdown}>
            <div className={styles.option}>
              <div className={styles.manila}>Manila</div>
            </div>
            <div className={styles.option1}>
              <div className={styles.manila}>Manila</div>
            </div>
            <div className={styles.option1}>
              <div className={styles.manila}>Manila</div>
            </div>
          </div>
          <div className={styles.city}>
            <div className={styles.location1}>Location</div>
            <button className={styles.dropdownArrow} id="DropDownBtn">
              <img
                className={styles.dropdownArrowChild}
                alt=""
                src="/vector-631.svg"
              />
            </button>
          </div>
        </div>
        <button className={styles.addProduct} id="ConfirmBtn">
          <div className={styles.addProduct1}>CONFIRM</div>
        </button>
      </div>
    </div>
  );
};

export default AddEditASale;
