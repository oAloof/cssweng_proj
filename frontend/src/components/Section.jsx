import ProductItem from "./ProductItem";
import styles from "../styles/Section.module.css";

const Section = ({ promotionText, propWidth, propWidth1 }) => {
  return (
    <div className={styles.container}>
      <b className={styles.title}>{promotionText}</b>
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
