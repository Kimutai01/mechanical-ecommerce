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

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(selectUsers);
  const singleUser = useSelector(selectUser);

  console.log(users);

  useEffect(() => {
    if (singleUser && singleUser.isAdmin) {
      dispatch(getAllUsers());
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
      <h1>Users List</h1>
      <div className="w-full">
        <table className="table-fixed text-[#fff] w-full">
          <thead>
            <tr>
              <th className="w-1/12 ">ID</th>
              <th className="w-1/6">NAME</th>
              <th className="w-2/6">EMAIL</th>
              <th className="w-1/6">ADMIN</th>
              <th className="w-1/6">Edit</th>
              <th className="w-1/6">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b border-[#555]">
                <td className="py-2">{user._id}</td>
                <td className="py-2">{user.name}</td>
                <td className="py-2">
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td className="py-2">
                  {user.isAdmin ? (
                    <i className="fas fa-check text-green-500"></i>
                  ) : (
                    <i className="fas fa-times text-red-500"></i>
                  )}
                </td>
                <td className="py-2">
                  <Link to={`/admin/user/${user._id}/edit`}>
                    <button className="bg-[#ff4d24] text-white px-4 py-2 rounded-lg">
                      <h1 className="font-bold">Edit</h1>
                    </button>
                  </Link>
                </td>
                <td className="py-2">
                  <button
                    className="bg-[#ff4d24] text-white px-4 py-2 rounded-lg"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <h1 className="font-bold">Delete</h1>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;
