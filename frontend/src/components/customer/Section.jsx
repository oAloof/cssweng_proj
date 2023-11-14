import ProductItem from "./ProductItem.jsx";
import styles from "../../styles/customer/Section.module.css";

const Section = ({ category }) => {
  return (
    <div className={styles.container}>
      <b className={styles.title}>{category}</b>
      <div className={styles.results}>
        {/* dummy data */}
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        {/* {content} */}
      </div>
    </div>
  );
};

export default Section;
