import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="bg-[#000] pt-28">
      <div className="bg-[#161616] mx-auto w-[30%] px-10 rounded-lg pb-10">
        <div className="flex justify-center md:flex-row gap-5 pt-10">
          <div className="flex flex-col w-full">
            <label for="name" className="text-white mb-3 uppercase font-bold">
              Username
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your username.."
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
              placeholder="Your password.."
              className="bg-[#161616] text-white border-[grey] border-[1px] rounded-lg p-2 font-medium focus:outline-none focus:border-[#ff4d24]"
            />
          </div>
        </div>

        <button className="why-btn  w-full mt-10 mb-10 ">
          <h1>Login</h1>
        </button>
      </div>
    </div>
  );
};

export default Login;
