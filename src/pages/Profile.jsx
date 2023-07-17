import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { selectUser } from "../features/userSlice";
import { userDetailReset } from "../features/profileSlice";

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

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

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
      if (!userDetails.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(userDetails.name);
        setEmail(userDetails.email);
      }
    }
  }, [navigate, user, userDetails, dispatch]);
  return (
    <div className="bg-[#000] flex flex-col md:flex-row pt-20 px-5 md:px-32 pb-20 gap-16">
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
        <h1 className="text-white text-4xl font-bold uppercase">My Orders</h1>
        <div className="mt-10 flex gap-5">
          <AiFillInstagram color="#ff4d24" size="1.5rem" />
          <AiFillFacebook color="#ff4d24" size="1.5rem" />
          <FaTwitter color="#ff4d24" size="1.5rem" />
        </div>
        <div className="mt-10 flex items-center gap-5">
          <IoMdMail color="#ff4d24" size="1.5rem" />
          <h1 className="text-lg font-medium">
            <a
              href="mailto:mechanic@eg.com"
              className="text-white hover:text-[grey]"
            >
              mechanic@gmail.com
            </a>
          </h1>
        </div>
        <div className="mt-10 flex gap-5">
          <IoLocationSharp color="#ff4d24" size="1.5rem" />
          <h1 className="text-white flex flex-col">
            <a
              href="https://goo.gl/maps/7XJqJqE4YrXZ6Y5r9"
              className="text-white hover:text-[grey]"
            >
              123, Main Street, Nairobi, Kenya, 00100
            </a>
            <a
              href="https://goo.gl/maps/7XJqJqE4YrXZ6Y5r9"
              className="text-white mt-3 hover:text-[grey]"
            >
              456, Main Street, Nairobi, Kenya, 00100
            </a>
          </h1>
        </div>
        <div className="flex mt-10 gap-5">
          <AiFillPhone color="#ff4d24" size="1.5rem" />
          <h1 className="text-white">
            <a href="tel:123-456-7890" className="text-white hover:text-[grey]">
              123-456-7890
            </a>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Profile;
