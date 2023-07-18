import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { orderDetails } from "../features/orderSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import { selectOrderDetails } from "../features/orderSlice";

const Order = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const orderDetail = useSelector(selectOrderDetails);
  console.log(orderDetail);

  //   const itemsPrice = orderDetail.orderItems.reduce(
  //     (acc, item) => acc + item.price * item.qty,
  //     0
  //   );

  useEffect(() => {
    dispatch(orderDetails(id));
  }, [dispatch, id]);

  // Check if orderDetail is not loaded yet
  if (!orderDetail._id) {
    return <div>Loading...</div>;
  }

  // If orderDetail is loaded, display the content
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
