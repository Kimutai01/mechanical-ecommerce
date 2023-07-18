import React, { useEffect } from "react";
import { useMatch, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemsToCart,
  selectCartItems,
  removeItemsFromCart,
} from "../features/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import { BsFillTrash3Fill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../features/userSlice";

const Cart = () => {
  const navigate = useNavigate();
  const match = useMatch("/cart/:id");
  const { id } = match?.params || "";
  console.log(id);
  const user = useSelector(selectUser);

  const qty = useLocation().search
    ? Number(useLocation().search.split("=")[1])
    : 1;
  const dispatch = useDispatch();

  const checkoutHandler = () => {
    // dispatch(removeItemsFromCart(id));
    navigate("/login?redirect=/shipping");
  };

  const cart = useSelector(selectCartItems);
  console.log(cart);
  console.log(cart);
  cart.length === 0 &&
    toast.error("Your cart is empty", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
    });

  useEffect(() => {
    if (id) {
      dispatch(addItemsToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  return (
    <div className="pt-24 bg-[#000]">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-center text-[red]">
        Shopping Cart
      </h2>
      <div className="flex gap-20 mx-20">
        <div className="flex flex-col gap-5">
          {cart.map((item) => (
            <div className="flex gap-5 rounded-lg p-4 items-center bg-[#161616]">
              <img
                src={`http://127.0.0.1:8000/${item.image}`}
                alt=""
                className="h-28 w-28 rounded-md"
              />
              <h2 className="text-[#fff]">{item.name}</h2>
              <h2 className="text-[#fff]">{item.price}</h2>
              <div>
                <select
                  className="bg-[#fff] text-[#000] px-2 py-1 rounded-lg"
                  value={item.qty}
                  onChange={(e) =>
                    dispatch(
                      addItemsToCart(item.product, Number(e.target.value))
                    )
                  }
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="bg-[#ff4d23] text-white font-bold text-2xl px-5 py-2 rounded-lg"
                onClick={() => dispatch(removeItemsFromCart(item.product))}
              >
                <BsFillTrash3Fill />
              </button>
            </div>
          ))}
        </div>
        <div>
          <div className="bg-[#161616] gap-2  rounded-lg p-8">
            <h2 className="text-2xl font-bold text-center p-3  text-[red]">
              {/* Subtotal ({cart.reduce((acc, item) => acc + item.qty, 0)}) items */}
              Subtotal (
              {cart.reduce((acc, item) => acc + parseInt(item.qty), 0)}) items
            </h2>
            <h2 className="text-2xl font-bold text-center text-[grey]">
              Total Price: ${" "}
              {cart
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </h2>
            <button
              className="bg-[#ff4d23] text-white font-bold text-2xl px-5 py-2 rounded-lg mt-5 disabled:opacity-50"
              disabled={cart.length === 0}
              onClick={checkoutHandler}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
