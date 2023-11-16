const ProductCard = ({
  productName,
  productBrand,
  productCategories,
  availableQuantity,
  productImageSrc,
}) => {
  return (
    <div className={styles.productCard}>
      <div className={styles.image}>
        <img src={productImageSrc} alt="" />
      </div>

      <div className={styles.info}>
        <div className={styles.name}>{productName}</div>

        <div className={styles.brand}>{productBrand}</div>

        <div className={styles.categories}>{productCategories.join(", ")}</div>

        <div className={styles.quantity}>
          Available Quantity: {availableQuantity}
        </div>
      </div>

      <div className={styles.actions}>{/* icons etc */}</div>
    </div>
  );
};

/*  <ProductCard
    productName="Product Name"
    productBrand="Hitachi" 
    productCategories={['Category 1', 'Category 2']}
    availableQuantity={1534}
    productImageSrc="/image.png" 
  /> */
