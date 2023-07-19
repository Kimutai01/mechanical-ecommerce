import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { selectUser } from "../features/userSlice";
import { userDetailReset } from "../features/profileSlice";
import { ImCross } from "react-icons/im";

import { AiFillInstagram } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiFillPhone } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";
import { AiFillMail } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { Link, redirect } from "react-router-dom";
import { selectUserDetails, updateUserProfile } from "../features/profileSlice";
import { getUserDetails } from "../features/profileSlice";
import { listAllOrders } from "../features/orderSlice";
import { selectOrders } from "../features/orderSlice";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const orders = useSelector(selectOrders);
  console.log(orders);

  const location = useLocation();
  const navigate = useNavigate();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const submitHandler = (e) => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      e.preventDefault();
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          password: password,
        })
      );
    }
  };
  toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
  });
  const dispatch = useDispatch();
  const userDetails = useSelector(selectUserDetails);
  const user = useSelector(selectUser);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      if (!userDetails.name || user._id !== userDetails._id) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(userDetails.name);
        setEmail(userDetails.email);
      }
    }
  }, [navigate, user, userDetails, dispatch]);

  useEffect(() => {
    dispatch(listAllOrders());
  }, [dispatch]);

  return (
    <div className="bg-[#000] flex flex-col md:flex-row pt-24 px-5 md:px-24 pb-20 gap-10">
      <div className="bg-[#161616] mx-auto w-[30%] px-10 rounded-lg pb-10">
        <div className="flex justify-center md:flex-row gap-5 pt-10">
          <div className="flex flex-col w-full">
            <label for="name" className="text-white mb-3 uppercase font-bold">
              Name
            </label>
            <input
              type="text"
              id="email"
              required
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name.."
              className="bg-[#161616] text-white border-[grey] border-[1px] rounded-lg p-2 font-medium focus:outline-none focus:border-[#ff4d24]"
            />
          </div>
        </div>
        <div className="flex justify-center md:flex-row gap-5 pt-10">
          <div className="flex flex-col w-full">
            <label for="email" className="text-white mb-3 uppercase font-bold">
              Email Address
            </label>
            <input
              type="text"
              required
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address.."
              className="bg-[#161616] text-white border-[grey] border-[1px] rounded-lg p-2 font-medium focus:outline-none focus:border-[#ff4d24]"
            />
          </div>
        </div>
        <div className="flex justify-center md:flex-row mt-10 gap-5">
          <div className="flex flex-col w-full">
            <label
              for="password"
              className="text-white mb-3 uppercase font-bold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="name"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password.."
              className="bg-[#161616] text-white border-[grey] border-[1px] rounded-lg p-2 font-medium focus:outline-none focus:border-[#ff4d24]"
            />
          </div>
        </div>
        <div className="flex justify-center md:flex-row mt-10 gap-5">
          <div className="flex flex-col w-full">
            <label
              for="confirmPassword"
              className="text-white mb-3 uppercase font-bold"
            >
              Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password.."
              className="bg-[#161616] text-white border-[grey] border-[1px] rounded-lg p-2 font-medium focus:outline-none focus:border-[#ff4d24]"
            />
          </div>
        </div>

        <button
          className="why-btn  w-full mt-10 mb-10 "
          onClick={(e) => submitHandler(e)}
        >
          <h1 className="font-bold">Update profile</h1>
        </button>
        <p className="text-[#fff] font-medium">
          Already have an account?{" "}
          <Link
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
            className="text-[#ff4d24]"
          >
            Sign In
          </Link>
        </p>
      </div>
      <div>
        <h1 className="text-white text-4xl font-bold uppercase text-center">
          My Orders
        </h1>

        <table className="table-auto mt-10">
          <thead>
            <tr>
              <th className="text-white text-lg font-bold uppercase px-4 py-2">
                Order ID
              </th>
              <th className="text-white text-lg font-bold uppercase px-4 py-2">
                Date
              </th>
              <th className="text-white text-lg font-bold uppercase px-4 py-2">
                Total
              </th>
              <th className="text-white text-lg font-bold uppercase px-4 py-2">
                Paid
              </th>
              <th className="text-white text-lg font-bold uppercase px-4 py-2">
                Delivered
              </th>
              <th className="text-white text-lg font-bold uppercase px-4 py-2">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b-[1px] border-[#ff4d24]">
                <td className="text-white text-lg font-medium px-4 py-2">
                  {order._id}
                </td>
                <td className="text-white text-lg font-medium px-4 py-2">
                  {order.createdAt.substring(0, 10)}
                </td>
                <td className="text-white text-lg font-medium px-4 py-2">
                  {order.totalPrice}
                </td>
                <td className="text-white text-lg font-medium px-4 py-2">
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <ImCross className="text-[#ff4d24] ml-10 text-2xl" />
                  )}
                </td>
                <td className="text-white text-lg font-medium px-4 py-2">
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <ImCross className="text-[#ff4d24]  text-2xl ml-10" />
                  )}
                </td>
                <td className="text-white text-lg font-medium px-4 py-2">
                  <Link to={`/order/${order._id}`}>
                    <button className="why-btn">
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

export default Profile;
