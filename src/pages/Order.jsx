import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { orderDetails } from "../features/orderSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import { selectOrderDetails } from "../features/orderSlice";
import { selectOrderPay } from "../features/orderSlice";
import { payOrder } from "../features/orderSlice";
import { selectLoading, selectError } from "../features/orderSlice";
import Loader from "../components/Loader";
import { PayPalButton } from "react-paypal-button-v2";

const Order = () => {
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);

  const { id } = useParams();
  console.log(id);
  const orderDetail = useSelector(selectOrderDetails);
  const orderPay = useSelector(selectOrderPay);
  const error = useSelector(selectError);
  console.log(orderDetail);

  //   const itemsPrice = orderDetail.orderItems.reduce(
  //     (acc, item) => acc + item.price * item.qty,
  //     0
  //   );

  //   AbUcQE9bOtTKsrCYMEaJ7jWUP2mr9nNuqglCRz6Z8AATAZvwhIFag1k7bYRPjH3vy9ClInyOlHtZWY9w;

  const loadingPay = useSelector(selectLoading);

  const addPayPalScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=AbUcQE9bOtTKsrCYMEaJ7jWUP2mr9nNuqglCRz6Z8AATAZvwhIFag1k7bYRPjH3vy9ClInyOlHtZWY9w`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };
  useEffect(() => {
    if (!orderDetail || !orderDetail._id) {
      // Order details are not fetched yet or are undefined, add any additional logic if needed
      return;
    }
    if (!orderDetail.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [orderDetail]);
  console.log(Number(id));
  useEffect(() => {
    dispatch(orderDetails(id));
  }, [dispatch, id]);
  console.log(orderDetail._id);

  // Check if orderDetail is not loaded yet
  if (!orderDetail._id) {
    return <div>Loading...</div>;
  }
  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    if (orderDetail._id) {
      dispatch(payOrder(orderDetail._id, paymentResult));
      // console.log({ id: orderDetail._id, paymentResult })
    }
  };

  return (
    <div className="bg-[#000] pt-32 pb-20">
      <div className="flex mx-20 mt-10">
        <div>
          <h1 className="uppercase text-[#fff] font-bold text-center text-3xl">
            Order {orderDetail._id}
          </h1>
          <div className="border-b border-[gray] mt-5">
            <h1 className="uppercase text-[#fff] font-bold text-3xl">
              Shipping
            </h1>
            <p className="text-[#fff] text-lg font-medium mt-5 mb-5">
              Name: {orderDetail.user.username}, Email: {orderDetail.user.email}
            </p>
            <p className="text-[#fff] text-lg font-medium mt-5 mb-5">
              Address: {orderDetail.ShippingAddress.address},{" "}
              {orderDetail.ShippingAddress.city},{" "}
              {orderDetail.ShippingAddress.postalCode},{" "}
              {orderDetail.ShippingAddress.country}
            </p>

            {orderDetail.isDelivered ? (
              <p className="text-[green] text-lg font-medium mt-5 mb-5">
                Delivered at: {orderDetail.deliveredAt.substring(0, 10)} time:{" "}
                {orderDetail.deliveredAt.substring(11, 19)}
              </p>
            ) : (
              <p className="text-[red] text-lg font-medium mt-5 mb-5">
                Not Delivered
              </p>
            )}
          </div>

          <div className="border-b border-[gray] mt-5">
            <h1 className="uppercase text-[#fff] font-bold text-3xl">
              Payment Method
            </h1>
            <p className="text-[#fff] text-lg font-medium mt-5 mb-5">
              Method: {orderDetail.paymentMethod}
            </p>
            {orderDetail.isPaid ? (
              <p className="text-[green] text-lg font-medium mt-5 mb-5">
                Paid at: {orderDetail.paidAt.substring(0, 10)} time:{" "}
                {orderDetail.paidAt.substring(11, 19)}
              </p>
            ) : (
              <p className="text-[red] text-lg font-medium mt-5 mb-5">
                Not Paid
              </p>
            )}
          </div>
          <div className=" mt-5">
            <h1 className="uppercase text-[#fff] font-bold text-3xl">
              Order Items
            </h1>
            {orderDetail.orders.length === 0 && (
              <h1 className="text-[#fff] text-lg font-medium mt-5 mb-5">
                Cart is empty
              </h1>
            )}
            {orderDetail.orders.map((item) => (
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
                  $
                  {orderDetail.length === 0
                    ? 0
                    : orderDetail.orders.reduce(
                        (acc, item) => acc + item.qty * item.price,
                        0
                      )}
                </p>
              </div>

              <div className="flex justify-between flex-row mt-5 gap-32 border-b border-[gray] pb-5">
                <h1 className="text-[#fff] text-lg font-medium">Shipping</h1>
                <p className="text-[#fff] text-lg font-medium">
                  $ {orderDetail.shippingPrice}
                </p>
              </div>

              <div className="flex justify-between flex-row mt-5 gap-32 border-b border-[gray] pb-5">
                <h1 className="text-[#fff] text-lg font-medium">Tax</h1>
                <p className="text-[#fff] text-lg font-medium">
                  $ {orderDetail.taxPrice}
                </p>
              </div>

              <div className="flex justify-between flex-row mt-5 gap-32 border-b border-[gray] pb-5">
                <h1 className="text-[#fff] text-lg font-medium">Total</h1>
                <p className="text-[#fff] text-lg font-medium">
                  $ {orderDetail.totalPrice}
                </p>
              </div>
              <div className="flex justify-between flex-row mt-5 gap-32 border-b border-[gray] pb-5">
                {!orderDetail.isPaid && (
                  <div className="flex flex-col">
                    {loadingPay && <Loader />}
                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <PayPalButton
                        amount={orderDetail.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="bg-[#000] pt-32 pb-20">
    //   <div className="flex mx-20 mt-10">
    //     <h1 className="uppercase text-[#fff] font-bold text-center text-3xl">
    //       Order {orderDetail._id}
    //     </h1>
    //   </div>
    // </div>
  );
};

export default Order;
