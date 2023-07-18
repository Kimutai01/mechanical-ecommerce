import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { selectShippingAddress } from "../features/cartSlice";
import { selectCartItems } from "../features/cartSlice";
import { selectPaymentMethod } from "../features/cartSlice";
import { createOrder } from "../features/orderSlice";
import { selectOrder } from "../features/orderSlice";
import { resetOrder } from "../features/orderSlice";
import { clearCart } from "../features/cartSlice";

import CheckoutSteps from "../components/CheckoutSteps";

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const orderItem = useSelector(selectOrder);
  const cart = useSelector(selectCartItems);
  const shippingAddress = useSelector(selectShippingAddress);
  const paymentMethod = useSelector(selectPaymentMethod);

  // Calculate the prices and create a new order object
  const navigate = useNavigate();
  const itemsPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice = Number(itemsPrice + shippingPrice + taxPrice).toFixed(2);
  const order = {
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };

  if (!paymentMethod) {
    const navigate = useNavigate();
    navigate(`/payment`);
  }

  const placeOrder = () => {
    dispatch(
      createOrder({
        ...order,
        orderItems: cart,
        shippingAddress,
        paymentMethod,
      })
    );
    toast.success("Order Placed Successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
    });
  };

  useEffect(() => {
    if (orderItem._id) {
      dispatch(resetOrder());
      navigate(`/order/${orderItem._id}`);
    }
  }, [orderItem._id, dispatch, navigate]);

  return (
    <div className="bg-[#000] pt-32 pb-20">
      <CheckoutSteps step1 step2 step3 step4 />

      <div className="flex mx-20 mt-10">
        <div>
          <div className="border-b border-[gray]">
            <h1 className="uppercase text-[#fff] font-bold text-3xl">
              Shipping
            </h1>
            <p className="text-[#fff] text-lg font-medium mt-5 mb-5">
              Address: {shippingAddress.address}, {shippingAddress.city},{" "}
              {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
          </div>
          <div className="border-b border-[gray] mt-5">
            <h1 className="uppercase text-[#fff] font-bold text-3xl">
              Payment Method
            </h1>
            <p className="text-[#fff] text-lg font-medium mt-5 mb-5">
              Method: {paymentMethod}
            </p>
          </div>
          <div className=" mt-5">
            <h1 className="uppercase text-[#fff] font-bold text-3xl">
              Order Items
            </h1>
            {cart.length === 0 && (
              <h1 className="text-[#fff] text-lg font-medium mt-5 mb-5">
                Cart is empty
              </h1>
            )}
            {cart.map((item) => (
              <div
                className="flex justify-between mt-5 border-b border-[gray] pb-5"
                key={item.id}
              >
                <div className="flex items-center">
                  <img
                    src={`http://127.0.0.1:8000/${item.image}`}
                    className="w-16 h-16 rounded-lg"
                    alt={item.name}
                  />
                  <div className="flex flex-col ml-5">
                    <h1 className="text-[#fff] text-lg font-medium">
                      {item.name}
                    </h1>
                  </div>
                  <div className="flex flex-col ml-5">
                    <h1 className="text-[#fff] text-lg font-medium">
                      {item.qty} x {item.price} = $ {item.qty * item.price}
                    </h1>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#161616] mx-20 px-10 rounded-lg pb-10">
          <h1 className="text-white text-3xl uppercase font-bold pt-10 pb-5 text-center">
            Order Summary
          </h1>
          <div className="flex mt-5">
            <div className="flex flex-col">
              <div className="flex justify-between flex-row gap-32 border-b border-[gray] pb-5">
                <h1 className="text-[#fff] text-lg font-medium">Items</h1>
                <p className="text-[#fff] text-lg font-medium">
                  $ {order.itemsPrice}
                </p>
              </div>

              <div className="flex justify-between flex-row mt-5 gap-32 border-b border-[gray] pb-5">
                <h1 className="text-[#fff] text-lg font-medium">Shipping</h1>
                <p className="text-[#fff] text-lg font-medium">
                  $ {order.shippingPrice}
                </p>
              </div>

              <div className="flex justify-between flex-row mt-5 gap-32 border-b border-[gray] pb-5">
                <h1 className="text-[#fff] text-lg font-medium">Tax</h1>
                <p className="text-[#fff] text-lg font-medium">
                  $ {order.taxPrice}
                </p>
              </div>

              <div className="flex justify-between flex-row mt-5 gap-32 border-b border-[gray] pb-5">
                <h1 className="text-[#fff] text-lg font-medium">Total</h1>
                <p className="text-[#fff] text-lg font-medium">
                  $ {order.totalPrice}
                </p>
              </div>
              <button
                className="bg-[#fff] text-[#000] text-lg font-medium mt-5 py-3 rounded-lg"
                disabled={cart.length === 0}
                onClick={placeOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
