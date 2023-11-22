import { useState, useEffect } from "react";
import Countdown from "../../components/CountdownTimer.jsx";
import NavBar from "../../components/NavBar.jsx";
import Menu from "../../components/Menu.jsx";
import SearchBar from "../../components/customer/customerSearch.jsx";
import ProductModal from "../../components/customer/ProductModal.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const [saleData, setSaleData] = useState(null);
  const [ProductsListed, setProductsListed] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSaleData();
        setSaleData(data.sale);
        setProductsListed(data.sale.some((product) => product.listed)); // TODO: CHECK IF ANY PRODUCTS ARE LISTED
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const getSaleData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/sales/ongoing");
      if (!response.ok) {
        console.log("Error fetching data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col">
      <Menu />
      <div className="flex-grow mt-[7vh] pb-[15vh]">
        <Countdown saleData={saleData} />
        <section className="overflow-auto">
          <SearchBar />
          <Section title="Big Discounts!" category="Energy Efficient" />
        </section>
      </div>
      <NavBar />
    </div>
  );
};

export default CategoryPage;

const products = [
  {
    id: 1,
    url: "/Product Photo Placeholder.png",
    brand: "Union",
    name: "Union Aircon",
    salePrice: "1000",
    originalPrice: "1000",
    discount: "40",
    description:
      "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible. Yellow, black. Yellow, black. Yellow, black. Yellow, black. Ooh, black and yellow! Let's shake it up a little. Barry! Breakfast is ready! Coming! Hang on a second. Hello? Barry? Adam? Can you believe this is happening? I can't. I'll pick you up. Looking sharp. Use the stairs, Your father paid good money for those.",
    categories: [
      "Home Appliances",
      "Air Conditioning",
      "Energy Efficient",
      "Electronics",
      "Summer Essentials",
    ],
  },
  {
    id: 2,
    url: "/Product Photo Placeholder.png",
    brand: "Hitachi",
    name: "Union Aircon",
    salePrice: "1000",
    originalPrice: "1000",
    discount: "40",
    description:
      "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible. Yellow, black. Yellow, black. Yellow, black. Yellow, black. Ooh, black and yellow! Let's shake it up a little. Barry! Breakfast is ready! Coming! Hang on a second. Hello? Barry? Adam? Can you believe this is happening? I can't. I'll pick you up. Looking sharp. Use the stairs, Your father paid good money for those.",
    categories: [
      "Home Appliances",
      "Air Conditioning",
      "Energy Efficient",
      "Electronics",
      "Summer Essentials",
    ],
  },
  {
    id: 3,
    url: "/Product Photo Placeholder.png",
    brand: "Union",
    name: "Union Aircon",
    salePrice: "1000",
    originalPrice: "1000",
    discount: "40",
    description:
      "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible. Yellow, black. Yellow, black. Yellow, black. Yellow, black. Ooh, black and yellow! Let's shake it up a little. Barry! Breakfast is ready! Coming! Hang on a second. Hello? Barry? Adam? Can you believe this is happening? I can't. I'll pick you up. Looking sharp. Use the stairs, Your father paid good money for those.",
    categories: [
      "Home Appliances",
      "Air Conditioning",
      "Energy Efficient",
      "Electronics",
      "Summer Essentials",
    ],
  },
  {
    id: 4,
    url: "/Product Photo Placeholder.png",
    brand: "Hitachi",
    name: "Union Aircon",
    salePrice: "1000",
    originalPrice: "1000",
    discount: "40",
    description:
      "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible. Yellow, black. Yellow, black. Yellow, black. Yellow, black. Ooh, black and yellow! Let's shake it up a little. Barry! Breakfast is ready! Coming! Hang on a second. Hello? Barry? Adam? Can you believe this is happening? I can't. I'll pick you up. Looking sharp. Use the stairs, Your father paid good money for those.",
    categories: [
      "Home Appliances",
      "Air Conditioning",
      "Energy Efficient",
      "Electronics",
      "Summer Essentials",
    ],
  },
  {
    id: 5,
    url: "/Product Photo Placeholder.png",
    brand: "Union",
    name: "Union Aircon",
    salePrice: "1000",
    originalPrice: "1000",
    discount: "40",
    description:
      "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible. Yellow, black. Yellow, black. Yellow, black. Yellow, black. Ooh, black and yellow! Let's shake it up a little. Barry! Breakfast is ready! Coming! Hang on a second. Hello? Barry? Adam? Can you believe this is happening? I can't. I'll pick you up. Looking sharp. Use the stairs, Your father paid good money for those.",
    categories: [
      "Home Appliances",
      "Air Conditioning",
      "Energy Efficient",
      "Electronics",
      "Summer Essentials",
    ],
  },
  {
    id: 6,
    url: "/Product Photo Placeholder.png",
    brand: "Hitachi",
    name: "Union Aircon",
    salePrice: "1000",
    originalPrice: "1000",
    discount: "40",
    description:
      "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible. Yellow, black. Yellow, black. Yellow, black. Yellow, black. Ooh, black and yellow! Let's shake it up a little. Barry! Breakfast is ready! Coming! Hang on a second. Hello? Barry? Adam? Can you believe this is happening? I can't. I'll pick you up. Looking sharp. Use the stairs, Your father paid good money for those.",
    categories: [
      "Home Appliances",
      "Air Conditioning",
      "Energy Efficient",
      "Electronics",
      "Summer Essentials",
    ],
  },
];

const Button = ({ type }) => {
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
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faArrowRight} />
        <span>View All</span>
      </button>
    );
  }
};

const CARD_WIDTH = 300;
const CARD_HEIGHT = 440;
const CARD_CONTAINER_HEIGHT = CARD_HEIGHT + 30;
const MARGIN = 20;

const Section = ({ title, category }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = products.filter((product) =>
    product.categories.includes(category)
  );

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  return (
    <section className="">
      <div className="relative overflow-hidden p-4">
        <div className="mx-auto">
          <div className="flex flex-row items-center justify-between py-3">
            <p className="text-3xl text-slate-700 font-Proxima font-bold m-0">
              {title}
            </p>
            <div></div>
          </div>
          <div
            className="flex flex-wrap justify-start overflow-hidden"
            style={{
              height: "auto",
              padding: "0 10px",
              margin: "0 auto",
            }}
          >
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                {...product}
                onClick={() => handleCardClick(product)}
                style={{ margin: MARGIN }} // Apply margin to all sides for spacing
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
  salePrice,
  originalPrice,
  discount,
  style,
  description,
  onClick,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="relative shrink-0 cursor-pointer rounded-2xl bg-white shadow-md transition-all hover:scale-[1.015] hover:shadow-xl p-4"
      style={{ width: CARD_WIDTH, margin: "10px" }} // Set a fixed width and margin
      onClick={onClick}
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
          ₱{salePrice}
        </h2>
        <p className="text-lg text-slate-400 font-Nunito">
          from ₱{originalPrice}
        </p>
        <Button type={"cart"} />
      </div>
    </div>
  );
};
