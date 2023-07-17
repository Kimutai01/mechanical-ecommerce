import React from "react";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="flex flex-row gap-10 justify-center">
      <div>
        {step1 ? (
          <Link to="/login" className="text-white text-lg font-bold">
            Login
          </Link>
        ) : (
          <span className="text-gray-500 text-lg font-bold">Login</span>
        )}
      </div>
      <div>
        {step2 ? (
          <Link to="/shipping" className="text-white text-lg font-bold">
            Shipping
          </Link>
        ) : (
          <span className="text-gray-500 text-lg font-bold">Shipping</span>
        )}
      </div>

      <div>
        {step3 ? (
          <Link to="/payment" className="text-white text-lg font-bold">
            Payment
          </Link>
        ) : (
          <span className="text-gray-500 text-lg font-bold">Payment</span>
        )}
      </div>

      <div>
        {step4 ? (
          <Link to="/placeorder" className="text-white text-lg font-bold">
            Place Order
          </Link>
        ) : (
          <span className="text-gray-500 text-lg font-bold">Place Order</span>
        )}
      </div>
    </div>
  );
};

export default CheckoutSteps;
