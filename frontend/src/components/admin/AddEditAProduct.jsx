import styles from "../../styles/admin/AddEditAProduct.module.css";

const AddEditAProduct = ({ onClose }) => {
  return (
    <div className={styles.addeditAProduct}>
      <div className={styles.addeditAProductParent}>
        <b className={styles.addeditAProduct1}>Add/Edit a Product</b>
        <button className={styles.icons} id="ExitBtn">
          <img
            className={styles.xIcon}
            alt=""
            src="/iconclose-typedefault.svg"
          />
        </button>
      </div>
      <div className={styles.inputFields}>
        <div className={styles.productNameField}>
          <div className={styles.emailField}>
            <input
              className={styles.emailAddress}
              name="ProductName"
              placeholder="Product Name"
              type="text"
            />
          </div>
        </div>
        <div className={styles.productNameField}>
          <div className={styles.emailField}>
            <input
              className={styles.emailAddress}
              name="ProductDescription"
              placeholder="Product Description"
              type="text"
            />
          </div>
        </div>
        <div className={styles.productNameField}>
          <div className={styles.emailField}>
            <input
              className={styles.emailAddress}
              placeholder="Price Per Unit"
              type="number"
            />
          </div>
        </div>
        <div className={styles.productNameField}>
          <div className={styles.emailField}>
            <input
              className={styles.emailAddress}
              name="AvailableQty"
              placeholder="Available Quantity"
              type="text"
            />
          </div>
        </div>
        <div className={styles.category}>
          <div className={styles.dropdown}>
            <div className={styles.option}>
              <div className={styles.manila}>Manila</div>
            </div>
            <div className={styles.option}>
              <div className={styles.manila}>Manila</div>
            </div>
            <div className={styles.option}>
              <div className={styles.manila}>Manila</div>
            </div>
          </div>
          <div className={styles.city}>
            <div className={styles.productCategory}>Product Category</div>
            <button className={styles.dropdownArrow} id="DropdownArrowBtn">
              <img
                className={styles.dropdownArrowChild}
                alt=""
                src="/vector-631.svg"
              />
            </button>
          </div>
        </div>
        <div className={styles.brand}>
          <div className={styles.dropdown}>
            <div className={styles.option}>
              <div className={styles.manila}>Manila</div>
            </div>
            <div className={styles.option}>
              <div className={styles.manila}>Manila</div>
            </div>
            <div className={styles.option}>
              <div className={styles.manila}>Manila</div>
            </div>
          </div>
          <div className={styles.city}>
            <div className={styles.productCategory}>Brand</div>
            <button className={styles.dropdownArrow} id="DropArrowBtn">
              <img
                className={styles.dropdownArrowChild}
                alt=""
                src="/vector-631.svg"
              />
            </button>
          </div>
        </div>
        <div className={styles.listedParent}>
          <div className={styles.listed}>
            <div className={styles.filterItem}>
              <input
                className={styles.checkbox}
                id="ListProductoBox"
                type="checkbox"
              />
              <div className={styles.listProduct}>List Product?</div>
            </div>
          </div>
          <div className={styles.uploadPhoto}>
            <button className={styles.cartItem} id="UploadPhotoBtn">
              <div className={styles.iconsParent}>
                <img className={styles.icons1} alt="" src="/icons3.svg" />
                <b className={styles.uploadProductPhotos}>
                  Upload Product Photos
                </b>
              </div>
            </button>
          </div>
        </div>
      </div>
      <button className={styles.addProduct} id="ConfirmBtn">
        <b className={styles.addProduct1}>CONFIRM</b>
      </button>
    </div>
  );
};

export default AddEditAProduct;
