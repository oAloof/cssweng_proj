import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";

// CONTEXTS
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";

const CARD_WIDTH = 300;
const CARD_HEIGHT = 440;
const CARD_CONTAINER_HEIGHT = CARD_HEIGHT + 30;
const MARGIN = 20;

import ProductModal from "./ProductModal";
import Loader from "../Loader";

const Section = ({ title, category, products, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  function checkCategory(product) {
    return product.category.includes(category);
  }

  var existingCategory = false;

  for (let i = 0; i < products.length; i++) {
    if (products[i].category.includes(category)) {
      existingCategory = true;
    }
  }

  var filteredProducts = [];
  if (existingCategory) {
    filteredProducts = products.filter(checkCategory);

    // setIsLoading(false)
  } else {
    filteredProducts = products;
    // setIsLoading(false)
  }

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="">
      <div className="relative overflow-hidden p-4">
        <div className="mx-auto">
          <div className="flex flex-row items-center justify-between py-3">
            <p className="text-3xl text-slate-700 font-Proxima font-bold m-0">
              {title}
            </p>
            <div>
              <Button
                type="viewAll"
                category={category}
                products={products}
                title={title}
              />
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
  _id,
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
  availableQuantity,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="relative shrink-0 cursor-pointer rounded-2xl bg-white shadow-md transition-all hover:scale-[1.015] hover:shadow-xl p-4 flex flex-col m-2"
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        boxSizing: "border-box",
      }}
      onClick={onClick}
    >
      <div className="relative w-full mb-2" style={{ height: "40%" }}>
        <img
          src={`https://drive.google.com/uc?export=view&id=${images[0]}`}
          alt="Product Image"
          className="rounded-2xl w-full h-full object-cover object-center"
        />
        <div className="absolute bottom-[-10px] right-[-10px] bg-rose-400 rounded-lg font-Nunito text-white font-bold text-lg px-2 py-1 shadow-md">
          {discountPercentage}% OFF!
        </div>
      </div>
      <div className="rounded-2xl text-slate-500">
        <div className="flex-grow">
          <div className="flex flex-col justify-between">
            <div className="flex flex-col justify-between break-all">
              <span className="text-sm font-semibold uppercase text-violet-300">
                {brand}
              </span>
            </div>
            <p className="mb-2 text-xl font-bold font-Proxima">{name}</p>

            <h2 className="text-indigo-500 font-Nunito font-bold text-3xl break-all ">
              ₱
              {new Intl.NumberFormat("en-US", {
                style: "decimal",
                maximumFractionDigits: 2,
              }).format(discountedPrice)}
            </h2>
            <div className="flex flex-row justify-between m-0">
              <p className="text-m text-slate-400 font-Nunito break-all">
                from ₱
                {new Intl.NumberFormat("en-US", {
                  style: "decimal",
                  maximumFractionDigits: 2,
                }).format(originalPrice)}
              </p>
              <span className="text-sm font-semibold text-slate-400">
                {quantitySold > 0 && (
                  <span className="text-sm font-semibold text-slate-400 ">
                    {quantitySold} sold
                  </span>
                )}
                {availableQuantity < 1 && quantitySold > 0 && (
                  <span className="text-sm font-semibold text-slate-400">
                    {" "}
                    /{" "}
                  </span>
                )}
                {availableQuantity < 1 && (
                  <span className="text-sm font-semibold text-slate-400">
                    Sold Out
                  </span>
                )}
              </span>
            </div>
          </div>
          <div className="absolute bottom-4 left-0 w-full px-4 break-all">
            <Button
              type={"cart"}
              productId={_id}
              availableQuantity={availableQuantity}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;

const Button = ({
  type,
  category,
  products,
  title,
  productId,
  availableQuantity,
}) => {
  const { addToCart } = useContext(ShoppingCartContext);
  const { isAuthenticated } = useContext(AuthenticationContext);

  const isDisabled = type === "cart" && availableQuantity < 1;

  const [isClicked, setIsClicked] = useState(false);

  {
    /* TODO: ADD THE ITEM TO THE USER'S CART */
  }
  const handleClick = (e) => {
    if (!isAuthenticated) {
      alert("Please login to add items to your cart.");
      e.stopPropagation();
      return;
    }

    if (isDisabled) {
      e.stopPropagation();
      return;
    }
    setIsClicked(true);
    addToCart(productId, 1);
    setTimeout(() => {
      setIsClicked(false);
    }, 2000);
    e.stopPropagation();
  };

  let buttonClass;
  if (isDisabled) {
    buttonClass = `bg-gray-300 text-gray-500 cursor-not-allowed`;
  } else if (isClicked) {
    buttonClass = `bg-indigo-300 
    before:absolute before:inset-0
    before:-z-10 before:translate-x-[0%]
    before:translate-y-[0%] before:scale-[2.5]
    before:rounded-[100%] before:bg-green-500
    before:transition-transform before:duration-4000
    before:content-[""] text-white`;
  } else {
    buttonClass = `bg-indigo-500 border-indigo-300   text-indigo-100 
    transition-all duration-500 flex-grow w-full
    before:absolute before:inset-0
    before:-z-10 before:translate-x-[150%]
    before:translate-y-[150%] before:scale-[2.5]
    before:rounded-[100%] before:bg-indigo-300
    before:transition-transform before:duration-1000
    before:content-[""] hover:scale-105 hover:text-white
    hover:before:translate-x-[0%]
    hover:before:translate-y-[0%] active:scale-95`;
  }

  const clickedText = isClicked ? "ADDED TO CART!" : "ADD TO CART";

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/products/category`, {
      state: { title: title, category: category, products: products },
    });
    console.log("View all button clicked");
  };

  if (type === "cart") {
    return (
      <button
        className={`
        font-semibold uppercase relative z-0 flex items-center justify-center gap-2 overflow-hidden rounded-lg border-[1px] px-4 py-2 flex-grow w-full
          ${buttonClass}
        `}
        onClick={handleClick}
        disabled={isDisabled}
      >
        <FontAwesomeIcon icon={faShoppingCart} />
        <span>{isDisabled ? "SOLD OUT" : clickedText}</span>
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
