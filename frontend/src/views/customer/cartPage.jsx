import React from "react";

const CartItem = ({ item }) => (
  <div className="flex items-center justify-between border-b border-gray-200 py-3">
    <div className="flex items-center">
      <img
        className="h-10 w-10 object-cover mr-4"
        src={item.image}
        alt={item.name}
      />
      <div>
        <p className="text-sm font-semibold">{item.name}</p>
        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
      </div>
    </div>
    <div>
      <p className="text-sm">₱{item.price}</p>
    </div>
  </div>
);

const CartPage = () => {
  const cartItems = [
    // Example items (replace with your items)
    {
      id: 1,
      name: "Product 1",
      quantity: 2,
      price: 15.99,
      image: "path_to_image",
    },
    {
      id: 2,
      name: "Product 2",
      quantity: 1,
      price: 9.99,
      image: "path_to_image",
    },
  ];

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-5">Your Cart</h2>
      <div>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className="flex justify-end mt-4">
        <div>
          <p className="text-lg font-semibold">
            Total: ${totalPrice.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <Button />
      </div>
    </div>
  );
};

export default CartPage;

const Button = () => {
  return (
    <button
      className={`
                  relative z-0 flex items-center  justify-center gap-2 overflow-hidden rounded-lg border-[1px] 
                  border-indigo-300 px-4 py-2 font-semibold
                  uppercase bg-indigo-500 text-indigo-100 transition-all duration-500 w-2/3
                  
                  before:absolute before:inset-0
                  before:-z-10 before:translate-x-[150%]
                  before:translate-y-[150%] before:scale-[2.5]
                  before:rounded-[100%] before:bg-indigo-300
                  before:transition-transform before:duration-1000
                  before:content-[""]
          
                  hover:scale-105 hover:text-white
                  hover:before:translate-x-[0%]
                  hover:before:translate-y-[0%]
                  active:scale-95`}
    >
      <span>CHECK OUT</span>
    </button>
  );
};
