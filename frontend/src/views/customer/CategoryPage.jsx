import ProductModal from "../../components/customer/ProductModal.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useState, useEffect, useContext } from "react";
import Countdown from "../../components/CountdownTimer.jsx";
import NavBar from "../../components/NavBar.jsx";
import Menu from "../../components/Menu.jsx";
import SearchBar from "../../components/customer/customerSearch.jsx";
import Loader from "../../components/Loader.jsx";

import ErrorMessage from "../../components/ErrorMessage.jsx";
import { AuthenticationContext } from "../../contexts/AuthenticationContext.jsx";

const CategoryPage = () => {
  const [saleData, setSaleData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [mostDiscounted, setMostDiscounted] = useState(false);
  const [mostSold, setMostSold] = useState(false);
  const [newestProducts, setNewestProducts] = useState(false);
  const { isAuthenticated, isAdmin } = useContext(AuthenticationContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSaleData();

        setSaleData(data);
        // setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    const fetchMostDiscounted = async () => {
      try {
        const data = await getMostDiscounted();

        setMostDiscounted(data);
        // setIsLoading(false);
      } catch (error) {
        console.error("Error fetching sales: ", error);
      }
    };

    const fetchMostSold = async () => {
      try {
        const data = await getMostSold();

        setMostSold(data);
        // setIsLoading(false);
      } catch (error) {
        console.error("Error fetching sales: ", error);
      }
    };

    const fetchNewestProducts = async () => {
      try {
        const data = await getNewestProducts();

        setNewestProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching sales: ", error);
      }
    };

    fetchData();
    fetchMostDiscounted();
    fetchMostSold();
    fetchNewestProducts();

    let timer;
    if (errorMessage) {
      timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [errorMessage, isLoading]);

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

  const getMostDiscounted = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/mostDiscounted");

      if (!response.ok) {
        console.error("Failed to fetch products: ", response.status);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getMostSold = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/mostSold");

      if (!response.ok) {
        console.error("Failed to fetch products: ", response.status);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getNewestProducts = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/newest");
      if (!response.ok) {
        console.error("Failed to fetch products: ", response.status);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-slate-100 min-h-screen min">
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}

      <Menu setErrorMessage={setErrorMessage} />

      {mostDiscounted ? (
        <div className="mt-[7vh] pb-[15vh]">
          <Countdown saleData={saleData} />
          <section className="overflow-auto ">
            <SearchBar />
            <Section
              title="Big Discounts!"
              category="mostDiscounted"
              products={mostDiscounted}
            />
            <Section
              title="Top Sales!"
              category="mostSold"
              products={mostSold}
            />
            <Section
              title="Newest Products!"
              category="newestProducts"
              products={newestProducts}
            />
          </section>
        </div>
      ) : (
        <NoProductsView saleData={saleData} />
      )}
      <NavBar />
    </div>
  );
};

export default CategoryPage;

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
            <div>
              <Button type="viewAll" category={category} />
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
      style={{ width: CARD_WIDTH, margin: "10px" }}
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
