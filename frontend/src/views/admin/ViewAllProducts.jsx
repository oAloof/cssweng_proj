import AddEditAProduct from "../../components/admin/AddEditAProduct.jsx";
import styles from "../../styles/admin/ViewAllProducts.module.css";

const ViewAllProducts = () => {
  // Example products data
  const products = [
    // Add your product details here
    // { name: 'Product Name', imageSrc: '/ugair9000-111@2x.png', categories: ['Category 1', 'Category 2'], quantity: 1534, price: 99 },
    // ...add more products as needed
  ];

  const renderProductInformation = (product) => (
    <div className={styles.productInformation}>
      <div className={styles.frameGroup}>
        <div className={styles.ugair90001Wrapper}>
          <img
            className={styles.ugair90001Icon}
            alt=""
            src={product.imageSrc}
          />
        </div>
        <div className={styles.frameContainer}>
          <div className={styles.frameDiv}>
            <div className={styles.productNameParent}>
              <div className={styles.adminHomePage}>{product.name}</div>
              <div className={styles.hitachi}>Hitachi</div>
            </div>
            <div className={styles.iconsParent}>
              <img
                className={styles.icons2}
                alt=""
                src="/icons1.svg"
                onClick={() => {
                  /* handle edit product */
                }}
              />
              <img
                className={styles.icons3}
                alt=""
                src="/icons2.svg"
                onClick={() => {
                  /* handle delete product */
                }}
              />
            </div>
          </div>
          <div className={styles.frameParent1}>
            <div className={styles.productCategory1ProductCaParent}>
              <div className={styles.categories}>
                {product.categories.join(", ")}
              </div>
              <div className={styles.categories}>
                Available Quantity: {product.quantity}
              </div>
            </div>
            <div className={styles.wrapper}>
              <b className={styles.categories}>${product.price}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.viewAllProducts}>
      <div className={styles.navbar}>{/* Navbar code here */}</div>
      <div className={styles.pageContent}>
        <b className={styles.allProducts}>All Products hello hello</b>
        <div className={styles.filtersParent}>{/* Filters code here */}</div>
        <div className={styles.rightSide}>
          <div className={styles.addProductsButtonParent}>
            {/* Add products button and other elements */}
          </div>
          <div className={styles.search}>
            {/* Search bar and other elements */}
          </div>
          <div className={styles.frameParent}>
            {products.map((product) => renderProductInformation(product))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllProducts;
