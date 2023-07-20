import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import {
  getAllUsers,
  selectUsers,
  selectUser,
  deleteUserById,
} from "../features/userSlice";
import { Link } from "react-router-dom";
import {
  deleteProductById,
  fetchProducts,
  getProductsError,
  getProductsStatus,
  selectAllProducts,
} from "../features/productsSlice";

const ProductList = () => {
  const products = useSelector(selectAllProducts);
  const error = useSelector(getProductsError);
  const status = useSelector(getProductsStatus);
  const { id } = useParams();
  const dispatch = useDispatch();

  const fetchAllProducts = () => {
    dispatch(fetchProducts());
  };

  useEffect(() => {
    if (status === "idle") {
      fetchAllProducts();
    }

    if (status === "failed") {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    }
  }, [status, dispatch, products, fetchAllProducts]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteProductById(id));
      toast.success("User Deleted Successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  const createProductHandler = () => {
    // dispatch(createProduct());
    // toast.success("Product Created Successfully", {
    //   position: "top-center",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   draggable: true,
    // });
    // navigate(`/admin/productlist`);
  };

  return (
    <div className="bg-[#000] pt-20 px-20">
      <ToastContainer />
      <div className="flex justify-between">
        <h1 className="text-[#fff] text-3xl uppercase items-center font-bold mt-10">
          Product List
        </h1>
        <button
          className="why-btn ml-40  mt-10 mb-10 "
          onClick={createProductHandler}
        >
          <h1 className="font-bold">Create Product</h1>
        </button>
      </div>
      {status === "loading" && (
        <div className="flex justify-center items-center pt-28 bg-black">
          <div className="w-20 h-20 rounded-full animate-spin border-2 border-solid border-[red] border-t-transparent"></div>
        </div>
      )}
      <div className="w-full">
        <table className="table-fixed text-[#fff] w-full">
          <thead>
            <tr>
              <th className="w-1/12 ">ID</th>
              <th className="w-1/6">NAME</th>

              <th className="w-1/6">PRICE</th>
              <th className="w-1/6">CATEGORY</th>
              <th className="w-1/6">BRAND</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b border-[#555]">
                <td className="py-2">{product._id}</td>
                <td className="py-2">{product.name}</td>
                <td className="py-2">{product.price}</td>
                <td className="py-2">{product.category}</td>
                <td className="py-2">{product.brand}</td>

                <td className="py-2">
                  <Link to={`/admin/product/${product._id}/edit`}>
                    <button className="bg-[#ff4d24] text-white px-4 py-2 rounded-lg">
                      <h1 className="font-bold">Edit</h1>
                    </button>
                  </Link>
                </td>
                <td className="py-2">
                  <button
                    className="bg-[#ff4d24] text-white px-4 py-2 rounded-lg"
                    onClick={() => deleteHandler(product._id)}
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

export default ProductList;
