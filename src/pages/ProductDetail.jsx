import React, { useState, useEffect } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

import Rating from "../components/Rating";

const ProductDetail = ({ match }) => {
  const { id } = useParams();
  const [product, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/products/${id}`
      );

      setProducts(data);
    };

    fetchProduct();
  }, []);

  console.log(product);

  return (
    <>
      <div>
        <button className="bg-[#ff4d23] text-white font-bold text-2xl px-5 py-2 rounded-lg">
          <Link to="/">Go Back</Link>
        </button>
        <div className="pt-28 bg-[#000] px-40 pb-20 flex">
          <div className="mr-20 w-[50%]">
            <img
              src={product.image}
              alt={product.name}
              className=" w-full rounded-t-lg"
            />
          </div>
          <div className="bg-[#161616] w-[50%] rounded-lg p-8">
            <h1 className="text-white text-3xl font-bold uppercase">
              {product.name}
            </h1>
            <div>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
                color={"#f8e825"}
              />
            </div>
            <div>
              <p className="text-[#ff4d23] font-bold text-2xl">
                $ {product.price} USD
              </p>
            </div>

            <p className="mt-5 text-[grey] font-medium">
              {product.description}
            </p>
            <div className="flex border-[#ff4d23] border-2 justify-between px-3  mt-5 w-3/4">
              <p className="text-[grey] font-bold text-2xl">Status :</p>
              <p className="text-[grey] font-bold text-2xl">
                {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </p>
            </div>
            <div className="flex border-[#ff4d23] border-2 justify-between px-3 mt-5 w-3/4">
              <p className="text-[grey] font-bold text-2xl">Qty :</p>
              <p className="text-[grey] font-bold text-2xl">
                <select className="bg-[#161616] text-[grey] font-bold text-2xl outline-none">
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </p>
            </div>
            <div className="flex justify-center mt-5">
              <button
                className="bg-[#ff4d23] text-[#161616] font-bold text-2xl px-10 py-3 rounded-lg uppercase"
                disabled={product.countInStock === 0}
              >
                Add to Cart
              </button>
            </div>
          </div>
          {/* <div>
        <h1 className="text-white text-3xl font-bold uppercase">
          {product.name}
        </h1>
        <div>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
            color={"#f8e825"}
          />
        </div>
        <div>
          <p className="text-[#ff4d23] font-bold text-2xl">
            $ {product.price} USD
          </p>
        </div>
        <p className="mt-5 text-[grey] font-medium">{product.description}</p>
      </div> */}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
