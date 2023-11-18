import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

const CARD_WIDTH = 300;
const CARD_HEIGHT = 440;
const CARD_CONTAINER_HEIGHT = CARD_HEIGHT + 30;
const MARGIN = 20;

const Section = ({ category }) => {
  return (
    <section className="bg-slate-100">
      <div className="relative overflow-hidden p-4">
        {/* CARDS */}
        <div className="mx-auto">
          <div className="flex flex-row items-center justify-between py-3">
            <p className="text-3xl text-slate-700 font-Proxima font-bold m-0">
              CATEGORY {category}
            </p>
            <div>
              <Button type="viewAll" />
            </div>
          </div>
          <div
            className="flex overflow-x-auto overflow-y-hidden w-auto"
            style={{
              scrollSnapType: "x mandatory",
              height: CARD_CONTAINER_HEIGHT,
            }}
          >
            {products.map((product) => {
              return (
                <Card
                  key={product.id}
                  {...product}
                  style={{ marginRight: MARGIN }}
                />
              );
            })}
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
  salePrice,
  originalPrice,
  discount,
  style,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const productPage = `/${name.toLowerCase().replace(/\s/g, "-")}`;
    navigate(productPage);
  };

  return (
    <div
      className="relative shrink-0 cursor-pointer rounded-2xl bg-white shadow-md transition-all hover:scale-[1.015] hover:shadow-xl p-4 "
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        ...style,
      }}
      onClick={handleClick}
    >
      <div className="relative">
        <img
          src={url}
          alt={name}
          className="rounded-2xl w-full h-2/5 object-contain object-center"
        />
        <div className="absolute bottom-[-10px] right-[-10px] bg-rose-400 rounded-lg font-Nunito text-white font-bold text-lg px-2 py-1">
          {discount}% OFF!
        </div>
      </div>
      <div className="rounded-2xl text-slate-500">
        <div className="flex items-start gap-2 flex-row justify-between">
          <span className="text-sm font-semibold uppercase text-violet-300">
            {brand}
          </span>
        </div>
        <p className="my-2 text-xl font-bold">{name}</p>
        <h2 className="text-indigo-500 font-Nunito font-bold text-4xl">
          {salePrice}
        </h2>
        <p className="text-lg text-slate-400 font-Nunito">
          from {originalPrice}
        </p>
        <Button type={"cart"} />
      </div>
    </div>
  );
};

export default Section;

const products = [
  {
    id: 1,
    url: "/Product Photo Placeholder.png",
    brand: "Union",
    name: "Union Aircon",
    salePrice: "₱1000",
    originalPrice: "₱1000",
    discount: "40",
  },
  {
    id: 2,
    url: "/Product Photo Placeholder.png",
    brand: "Hitachi",
    name: "Union Aircon",
    salePrice: "₱1000",
    originalPrice: "₱1000",
    discount: "40",
  },
  {
    id: 3,
    url: "/Product Photo Placeholder.png",
    brand: "Union",
    name: "Union Aircon",
    salePrice: "₱1000",
    originalPrice: "₱1000",
    discount: "40",
  },
  {
    id: 4,
    url: "/Product Photo Placeholder.png",
    brand: "Hitachi",
    name: "Union Aircon",
    salePrice: "₱1000",
    originalPrice: "₱1000",
    discount: "40",
  },
  {
    id: 5,
    url: "/Product Photo Placeholder.png",
    brand: "Union",
    name: "Union Aircon",
    salePrice: "₱1000",
    originalPrice: "₱1000",
    discount: "40",
  },
  {
    id: 6,
    url: "/Product Photo Placeholder.png",
    brand: "Hitachi",
    name: "Union Aircon",
    salePrice: "₱1000",
    originalPrice: "₱1000",
    discount: "40",
  },
];

import { useState } from "react";

const Button = ({ type }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 500);
  };

  if (type === "cart") {
    return (
      <button
        className={`
          relative z-0 flex items-center justify-center gap-2 overflow-hidden rounded-lg border-[1px] 
          border-indigo-300 px-4 py-2 font-semibold uppercase bg-indigo-500 text-indigo-100 transition-all duration-500 flex-grow w-full
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
          ${isClicked ? "bg-green-500" : ""}
        `}
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faShoppingCart} />
        <span>ADD TO CART</span>
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
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faArrowRight} />
        <span>View All</span>
      </button>
    );
  }
};
