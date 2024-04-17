import React from "react";
import Error404 from "./Error404";
import { ToastContainer } from "react-toastify";
import Cart from "../Components/PointOfSale/Cart";
import AllItem from "../Components/AllItem";

const Pos = () => {
  const isLogin = true;
  return (
    <div className="container my-5">
      {isLogin ? (
        <div className="row">
          <ToastContainer />
          <div className="col-lg-8 mb-3">
            <div className="pos-col py-5 px-3">
              <Cart />
            </div>
          </div>
          <div className="col-lg-4 mb-3">
            <div
              className="pos-col py-5 px-3"
              style={{ backgroundColor: "#fcfcfced" }}
            >
              <AllItem ADD={"pos"} />
            </div>
          </div>
        </div>
      ) : (
        <Error404 />
      )}
    </div>
  );
};

export default Pos;
