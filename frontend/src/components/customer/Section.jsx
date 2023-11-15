import ProductItem from "./ProductItem.jsx";
import styles from "../../styles/customer/Section.module.css";

const Section = ({ category }) => {
  // Implement backend :)
  const products = [
    {
      id: "product1",
      name: "Union Aircon",
      brand: "Union",
      originalPrice: 2342.11,
      discount: 40,
      photoUrl: "../../../public/Product Photo Placeholder.png",
    },
    // ...other products
  ];

  return (
    <div className={styles.container}>
      <b className={styles.title}>{category}</b>
      <div className={styles.results}>
        <div>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section;
