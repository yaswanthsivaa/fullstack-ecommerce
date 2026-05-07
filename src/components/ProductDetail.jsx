import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "./App";
import { ToastContainer } from "react-toastify";
import table from "../Images/table.jpg";

export default function ProductDetail() {
  const { products, addtocart } = useContext(AppContext);
  const location = useLocation();
  const { product } = location.state || {};

  const [activeTab, setActiveTab] = useState("description");

  // 🔥 If user refreshes page
  if (!product) {
    return (
      <div className="container mt-5">
        <h3>Product not found</h3>
      </div>
    );
  }

  const relatedProducts = products.filter(
    (item) =>
      item.category === product.category && item.id !== product.id
  );

  return (
    <div className="container-fluid py-4">

      <ToastContainer autoClose={1000} />

      {/* Banner */}
      <div
        className="d-flex justify-content-center align-items-center text-white"
        style={{
          backgroundImage: `url(${table})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "250px",
          marginBottom: "30px",
        }}
      >
        <h1>{product.product_name}</h1>
      </div>

      {/* Product Detail */}
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img
              src={`https://fullstack-ecommerce-backend-vs9n.onrender.com/media/${product.image}`}
              alt={product.product_name}
              className="img-fluid"
              style={{ maxHeight: "400px", objectFit: "contain" }}
            />
          </div>

          <div className="col-md-6">
            <h3>{product.product_name}</h3>
            <h4 className="text-muted">${product.price}</h4>
            <p className="mt-3">{product.description}</p>

            <button
              className="btn btn-dark mt-3"
              onClick={() => addtocart(product.id)}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mt-5">
        <div className="border-bottom mb-3">
          <span
            className={`me-4 ${activeTab === "description" ? "fw-bold" : ""}`}
            style={{ cursor: "pointer" }}
            onClick={() => setActiveTab("description")}
          >
            Description
          </span>
        </div>

        {activeTab === "description" && (
          <p className="text-muted">{product.description}</p>
        )}
      </div>

      {/* Related Products */}
      <div className="container mt-5">
        <h4 className="text-center mb-4">You Might Also Like</h4>
        <div className="row">
          {relatedProducts.map((item) => (
            <div key={item.id} className="col-md-3">
              <div className="card text-center">
                <img
                  src={`https://fullstack-ecommerce-backend-vs9n.onrender.com/media/${item.image}`}
                  alt={item.product_name}
                  className="card-img-top"
                  style={{ height: "150px", objectFit: "contain" }}
                />
                <div className="card-body">
                  <h6>{item.product_name}</h6>
                  <p>${item.price}</p>
                  <button
                    className="btn btn-sm btn-dark"
                    onClick={() => addtocart(item.id)}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}