import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { selectCartItemsCount } from "../../features/cartSlice";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

import { CiUser } from "react-icons/ci";

import { Link } from "react-router-dom";
import { RiMenu5Line } from "react-icons/ri";
import { HiShoppingCart } from "react-icons/hi";
import "./Navbar.css";
import { BsChevronDown } from "react-icons/bs";

import { motion } from "framer-motion";
const NavBar = () => {
  const [nav, setNav] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [navBg, setNavBg] = useState("#ecf0f3");
  const [linkColor, setLinkColor] = useState("#1f2937");

  useEffect(() => {
    setNavBg("#000");
    setLinkColor("#ecf0f3");
  }, []);

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };

    window.addEventListener("scroll", handleShadow);
  }, []);

  const handleNav = () => {
    setNav(!nav);
  };

  const [showServicesDetails, setShowServicesDetails] = useState(false);
  const [showStoreDetails, setShowStoreDetails] = useState(false);

  const handleServicesClick = () => {
    setShowServicesDetails(!showServicesDetails);
  };
  const handleStoreClick = () => {
    setShowStoreDetails(!showStoreDetails);
  };

  const cartItemsCount = useSelector(selectCartItemsCount);

  return (
    <div
      style={{ backgroundColor: `${navBg}` }}
      className={
        shadow
          ? "fixed w-full h-20 shadow-xl z-[100] md:px-24"
          : "fixed w-full h-20 z-[100] md:px-24"
      }
    >
      <div className="flex justify-between items-center w-full h-full md:px-4 py-4 px-2 2xl:px-16 rounded">
        <div className="animate-pulse">
          <Link className="text-[#fff] font-bold text-3xl" to="/">
            MECHANIC
          </Link>
        </div>
        <div>
          <ul className="hidden md:flex" style={{ color: `${linkColor}` }}>
            <Link to="/">
              <li className="ml-10 font-medium  text-xl hover:text-[#ff4d23] hover:scale-105 transition-all duration-all hover:border-y-black ">
                Home
              </li>
            </Link>
            <div className="group ml-10">
              <li className="font-medium  text-xl hover:text-[#ff4d23] hover:scale-105 transition-all duration-all hover:border-y-black ">
                Services
              </li>
            </div>
            <div className="group ml-10">
              <Link
                className="font-medium  text-xl hover:text-[#ff4d23] hover:scale-105 transition-all duration-all hover:border-y-black "
                to="/store"
              >
                Store
              </Link>
            </div>
            <Link to="/about">
              <li className="ml-10 font-medium  text-xl hover:text-[#ff4d23] hover:scale-105 transition-all duration-all hover:border-y-black ">
                About
              </li>
            </Link>

            <Link to="/contact">
              <li className="ml-10 font-medium  text-xl hover:text-[#ff4d23] hover:scale-105 transition-all duration-all hover:border-y-black ">
                Contact
              </li>
            </Link>
          </ul>
          <div
            className="md:hidden flex justify-between items-center w-full h-full"
            onClick={handleNav}
            style={{ color: `${linkColor}` }}
          >
            {/* cart with item count */}
            <Link to="/cart">
              <div className="relative">
                <HiShoppingCart
                  size={40}
                  className="text-[#ff4d23] text-center align-middle justify-center mr-3 "
                />
                {cartItemsCount > 0 && (
                  <div className="absolute top-[-5px] right-[-5px] bg-[#ff4d23] text-[#fff] rounded-full w-6 h-6 flex items-center justify-center text-sm">
                    {cartItemsCount}
                  </div>
                )}
              </div>
            </Link>
            <RiMenu5Line
              size={40}
              className="text-[#ff4d23] text-center align-middle items-center justify-center"
            />
          </div>
        </div>
        <div className="hidden md:flex">
          <div className="flex">
            {/* item count on the cart icon */}
            <Link to="/cart">
              <div className="relative">
                <HiShoppingCart
                  size={40}
                  className="text-[#ff4d23] text-center align-middle justify-center mr-3 mt-2  cursor-pointer"
                />
                {cartItemsCount > 0 && (
                  <div className="absolute top-[-5px] right-[-5px] bg-[#ff4d23] text-[#fff] rounded-full w-6 h-6 flex items-center justify-center text-sm">
                    {cartItemsCount}
                  </div>
                )}
              </div>
            </Link>
            <Link to="/login">
              <CiUser
                size={40}
                className="text-[#ff4d23] cursor-pointer mt-2"
              />
            </Link>
          </div>
          <div>
            <Link to="/contact">
              <button className="uppercase text-[#fff] bg-[#808080] rounded-full hover:bg-[#ff4d23] font-bold p-3 hidden md:block">
                get an appointment
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div
        className={
          nav ? "md:hiddden fixed left-0 top-0 w-full h-screen bg-black/70" : ""
        }
      >
        <div
          className={
            nav
              ? " fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%]  h-screen bg-[#000] text-white p-2 ease-in duration-500"
              : "fixed left-[-100%] top-0  p-10 ease-in duration-500"
          }
        >
          <div>
            <div className="flex justify-between items-center w-full mt-3 px-3">
              <Link className="font-bold text-4xl uppercase animate-pulse">
                Mechanic
              </Link>
              <div
                onClick={handleNav}
                className="cursor-pointer text-[#ff4d23]"
              >
                <AiOutlineClose size={35} />
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col  py-4">
              <ul>
                <Link to="/" onClick={handleNav}>
                  <li className="ml-3 text-xl">Home</li>
                </Link>
                <li className="relative">
                  <div
                    className="flex items-center justify-between px-3 py-4 cursor-pointer"
                    onClick={handleServicesClick}
                  >
                    <div className="text-xl">Services</div>
                    <div>
                      <BsChevronDown size={25} className={``} />
                    </div>
                  </div>
                  {showServicesDetails && (
                    <ul className="left-full bg-[#000] py-2 rounded-lg shadow-lg">
                      <Link to="/services">
                        <li
                          className="text-[#fff] text-xl py-1 px-10 hover:bg-gray-200"
                          onClick={handleNav}
                        >
                          Services
                        </li>
                      </Link>
                      <Link to="/performance" onClick={handleNav}>
                        <li className="text-[#fff] text-xl py-1 px-10 hover:bg-gray-200">
                          Service Details
                        </li>
                      </Link>
                    </ul>
                  )}
                </li>
                <Link to="/store" onClick={handleNav}>
                  <li className="ml-3 text-xl">Store</li>
                </Link>
                <Link to="/about" onClick={handleNav}>
                  <li className="py-4 text-xl ml-3 cursor-pointer">About</li>
                </Link>
              </ul>
              <div>
                <Link to="/contact">
                  <button className="uppercase text-[#fff] bg-[#808080] rounded-full hover:bg-[#ff4d23] font-bold p-4 mt-10 ml-4">
                    get an appointment
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
