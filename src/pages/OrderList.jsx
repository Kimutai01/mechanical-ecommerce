import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAllUsers,
  selectUsers,
  selectUser,
  deleteUserById,
} from "../features/userSlice";
import { Link } from "react-router-dom";
import { getAllOrders, selectAllOrders } from "../features/orderSlice";

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(selectUsers);
  const singleUser = useSelector(selectUser);
  const orders = useSelector(selectAllOrders);

  console.log(users);

  useEffect(() => {
    if (singleUser && singleUser.isAdmin) {
      dispatch(getAllOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUserById(id));

      toast.success("User Deleted Successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="bg-[#000] pt-20 px-20">
      <ToastContainer />
      <h1>Orders </h1>
      <div className="w-full">
        <table className="table-fixed text-[#fff] w-full">
          <thead>
            <tr>
              <th className="w-1/12 ">ID</th>
              <th className="w-1/6">USER</th>
              <th className="w-2/6">DATE</th>
              <th className="w-1/6">TOTAL</th>
              <th className="w-1/6">PAID</th>

              <th className="w-1/6">DELIVERED</th>
              <th className="w-1/6">Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b border-[#555]">
                <td className="py-2">{order._id}</td>
                <td className="py-2">{order.user && order.user.name}</td>
                <td className="py-2">{order.createdAt.substring(0, 10)}</td>
                <td className="py-2">{order.totalPrice}</td>
                <td className="py-2">
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td className="py-2">
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td className="py-2">
                  <Link to={`/order/${order._id}`}>
                    <button className="bg-[#ff4d24] text-white px-4 py-2 rounded-lg">
                      <h1 className="font-bold">Details</h1>
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
