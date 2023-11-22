import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const CARD_WIDTH = 300;
const CARD_HEIGHT = 440;
const CARD_CONTAINER_HEIGHT = CARD_HEIGHT + 30;
const MARGIN = 20;

import ProductModal from "./ProductModal";

const Section = ({ title, category, products }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);

  function checkCategory(product) {
    return product.category.includes(category)
  }

  var existingCategory = false 

  for (let i = 0; i < products.length; i ++){
    if (products[i].category.includes(category)){
      existingCategory = true
    }
  }

  var filteredProducts = []
  if (existingCategory){
    filteredProducts = products.filter(checkCategory);
    // setIsLoading(false)
  } else {
    filteredProducts = products
    // setIsLoading(false)
  }

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <section className="">
      <div className="relative overflow-hidden p-4">
        <div className="mx-auto">
          <div className="flex flex-row items-center justify-between py-3">
            <p className="text-3xl text-slate-700 font-Proxima font-bold m-0">
              {title}
            </p>
            <div>
              <Button type="viewAll" category = {category}/>
            </div>
          </div>
          <div
            className="flex overflow-x-auto overflow-y-hidden w-auto"
            style={{
              scrollSnapType: "x mandatory",
              height: CARD_CONTAINER_HEIGHT,
            }}
          >
            {filteredProducts.map((product) => (
              <Card
                key={product._id}
                {...product}
                onClick={() => handleCardClick(product)}
                style={{ marginRight: MARGIN }}
              />
            ))}
            <ProductModal
              isOpen={isOpen}
              product={selectedProduct}
              setIsOpen={setIsOpen}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Card = ({
  url,
  brand,
  name,
  discountedPrice,
  originalPrice,
  discountPercentage,
  style,
  description,
  onClick,
  images,
  quantitySold,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="relative shrink-0 cursor-pointer rounded-2xl bg-white shadow-md transition-all hover:scale-[1.015] hover:shadow-xl p-4 flex flex-col m-2"
      style={{ width: "CARD_WIDTH", height: "CARD_HEIGHT" }}
      onClick={onClick}
    >
      <div className="relative w-full" style={{ height: "50%" }}>
        <img
          src={`https://drive.google.com/uc?export=view&id=${images[0]}`}
          // src="/Product Photo Placeholder.png"
          alt="Product Image"
          className="rounded-2xl w-full h-2/5 object-contain object-center"
        />
        <div className="absolute bottom-[-10px] right-[-10px] bg-rose-400 rounded-lg font-Nunito text-white font-bold text-lg px-2 py-1">
          {discountPercentage}% OFF!
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <span className="text-sm font-semibold uppercase text-violet-300">
            {brand}
          </span>
          <p className="mb-2 text-xl font-bold">{name}</p>
          <span className="text-sm font-semibold text-slate-400">
            {quantitySold} sold
          </span>
        </div>
        <div className="flex justify-between flex-col items-start">
          <h2 className="mb-0 text-indigo-500 font-Nunito font-bold text-4xl">
            ₱{discountedPrice}
          </h2>
          <p className="text-lg text-slate-400 font-Nunito m-0">
            from ₱{originalPrice}
          </p>
        </div>
      </div>
      <div className="mt-2">
        <Button type={"cart"} className="w-full py-2" />
      </div>
    </div>
  );
};

export default Section;

const Button = ({ type, category}) => {
  const [isClicked, setIsClicked] = useState(false);

  {
    /* TODO: ADD THE ITEM TO THE USER'S CART */
  }
  const handleClick = (e) => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 2000);
    e.stopPropagation();
  };

  const clickedClass = isClicked
    ? `bg-indigo-300 
    before:absolute before:inset-0
    before:-z-10 before:translate-x-[0%]
    before:translate-y-[0%] before:scale-[2.5]
    before:rounded-[100%] before:bg-green-500
    before:transition-transform before:duration-4000
    before:content-[""] text-white`
    : `bg-indigo-500 border-indigo-300   text-indigo-100 
     transition-all duration-500 flex-grow w-full
     before:absolute before:inset-0
     before:-z-10 before:translate-x-[150%]
     before:translate-y-[150%] before:scale-[2.5]
     before:rounded-[100%] before:bg-indigo-300
     before:transition-transform before:duration-1000
     before:content-[""] hover:scale-105 hover:text-white
     hover:before:translate-x-[0%]
     hover:before:translate-y-[0%] active:scale-95`;

  const clickedText = isClicked ? "ADDED TO CART!" : "ADD TO CART";

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/products/category`);
    console.log('View all button clicked')
  };

  if (type === "cart") {
    return (
      <button
        className={`
        font-semibold uppercase relative z-0 flex items-center justify-center gap-2 overflow-hidden rounded-lg border-[1px] px-4 py-2 flex-grow w-full
          ${clickedClass}
        `}
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faShoppingCart} />
        <span>{clickedText}</span>
      </button>
    );
  } else if (type === "viewAll") {
    return (
      <button
        className={`
          relative z-0 flex items-center gap-2 overflow-hidden rounded-lg border-[1px] 
          border-indigo-300 px-4 py-2 font-semibold uppercase text-indigo-300 transition-all duration-500 
          before:absolute before:inset-0
          before:-z-10 before:translate-x-[150%]
          before:translate-y-[150%] before:scale-[2.5]
          before:rounded-[100%] before:bg-indigo-300
          before:transition-transform before:duration-1000
          before:content-[""]
          hover:scale-105 hover:text-white
          hover:before:translate-x-[0%]
          hover:before:translate-y-[0%]
          active:scale-95
        `}
        onClick={handleNavigation}
      >
        <FontAwesomeIcon icon={faArrowRight} />
        <span>View All</span>
      </button>
    );
  }
};
