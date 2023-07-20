import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { selectUser } from "../features/userSlice";
import { register } from "../features/userSlice";
import { useParams } from "react-router-dom";

import { Link, redirect } from "react-router-dom";
import { getUserDetails, selectUserDetails } from "../features/profileSlice";

const UserEdit = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [admin, setAdmin] = useState(false);
  const [message, setMessage] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      e.preventDefault();
      dispatch(register(name, email, password));
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
  const user = useSelector(selectUserDetails);

  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setAdmin(user.isAdmin);
  }, [user]);
  return (
    <div className="bg-[#000] pt-28">
      <Link to="/admin/userlist">
        <button className="why-btn ml-40  mt-10 mb-10 ">
          <h1 className="font-bold">Go Back</h1>
        </button>
      </Link>

      {message && <ToastContainer />}
      <div className="bg-[#161616] mx-auto w-[30%] px-10 rounded-lg pb-10">
        <h1 className="text-[#fff] text-center font-bold text-2xl pt-10">
          Edit User
        </h1>
        <div className="flex justify-center md:flex-row gap-5 pt-10">
          <div className="flex flex-col w-full">
            <label for="name" className="text-white mb-3 uppercase font-bold">
              Name
            </label>
            <input
              type="text"
              id="email"
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
          <div className="flex flex-row items-center w-full gap-3">
            <label for="admin" className="text-white  uppercase font-bold ">
              Is Admin
            </label>
            <input
              type="checkbox"
              id="admin"
              name="admin"
              checked={admin}
              onChange={(e) => setAdmin(e.target.checked)}
              className="bg-[#161616] text-white border-[grey] border-[1px] rounded-lg p-2 font-medium focus:outline-none focus:border-[#ff4d24]"
            />
          </div>
        </div>

        <button
          className="why-btn  w-full mt-10 mb-10 "
          onClick={(e) => submitHandler(e)}
        >
          <h1 className="font-bold">Update</h1>
        </button>
      </div>
    </div>
  );
};

export default UserEdit;
