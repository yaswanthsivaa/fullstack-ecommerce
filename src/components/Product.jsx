import React, { useContext, useEffect } from "react";
import { Carousel } from "bootstrap";
import { AppContext } from "./App";
import { ToastContainer } from "react-toastify";
import sofaSlide from "../Images/hero-img.png";
import watchSlide from "../Images/watch-07.png";


export default function Productpage() {
  const { products, addtocart } = useContext(AppContext);

  const SliderData = [
    {
      id: 1,
      imgUrl: sofaSlide,
      title: "50% Off For Your First Shopping",
      desc: "Discover amazing products at unbeatable prices.",
    },
    {
      id: 2,
      imgUrl: watchSlide,
      title: "New Arrivals Just Landed",
      desc: "Check out the latest additions to our store.",
    },
  ];

  const serviceData = [
    {
      icon: <ion-icon name="car"></ion-icon>,
      title: "Free Shipping",
      subtitle: "On all orders above $50",
      bg: "#fdefe6",
    },
    {
      icon: <ion-icon name="card"></ion-icon>,
      title: "Safe Payment",
      subtitle: "100% secure payment",
      bg: "#ceebe9",
    },
    {
      icon: <ion-icon name="shield-half-outline"></ion-icon>,
      title: "Secure Checkout",
      subtitle: "Protected transactions",
      bg: "#e2f2b2",
    },
    {
      icon: <ion-icon name="headset"></ion-icon>,
      title: "24/7 Support",
      subtitle: "We are here to help",
      bg: "#d6e5fb",
    },
  ];

  useEffect(() => {
    const element = document.querySelector("#heroCarousel");

    if (element) {
      new Carousel(element, {
        interval: 3000,   // 3 seconds
        ride: "carousel",
        pause: false,
        wrap: true
      });
    }
  }, []);

  return (
    <div className="container-fluid px-0 mt-5">
      <ToastContainer autoClose={1000} />

      {/* ================= CAROUSEL ================= */}

      <div
        id="heroCarousel"
        className="carousel slide"
      >

        {/* Indicators */}
        <div className="carousel-indicators">
          {SliderData.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
            ></button>
          ))}
        </div>

        <div className="carousel-inner" style={{ minHeight: "500px" }}>
          {SliderData.map((slide, index) => (
            <div
              key={slide.id}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <div className="container d-flex align-items-center justify-content-between flex-column flex-lg-row py-5">

                <div className="text-center text-lg-start mb-4 mb-lg-0">
                  <h1 className="fw-bold">{slide.title}</h1>
                  <p className="text-muted">{slide.desc}</p>
                </div>

                <img
                  src={slide.imgUrl}
                  alt="slide"
                  className="img-fluid"
                  style={{ maxHeight: "400px" }}
                />

              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>

      </div>
      {/* ================= SERVICES ================= */}
      <div className="row gy-4 mt-4 px-4">
        {serviceData.map((service, index) => (
          <div key={index} className="col-12 col-sm-6 col-md-3">
            <div
              className="card text-center p-3"
              style={{ backgroundColor: service.bg, border: "none" }}
            >
              <div className="display-6">{service.icon}</div>
              <h6 className="fw-bold mt-2">{service.title}</h6>
              <p className="text-muted small">{service.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ================= ALL PRODUCTS ================= */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">Our Products</h2>
        <div className="row gy-4">
          {products.map((product) => (
            <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100 text-center">
                <img
                  src={`https://fullstack-ecommerce-backend-vs9n.onrender.com/media/${product.image}`}
                  alt={product.product_name}
                  className="card-img-top"
                  style={{ height: "150px", objectFit: "contain" }}
                />
                <div className="card-body">
                  <h6>{product.product_name}</h6>
                  <h5 className="mt-2">${product.price}</h5>

                  <button
                    className="btn btn-dark mt-3"
                    onClick={() => addtocart(product.id)}
                  >
                    Add To Cart
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