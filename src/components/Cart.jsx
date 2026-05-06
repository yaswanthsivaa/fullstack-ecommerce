import React, { useEffect, useState } from "react";

export default function Cartpage() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchCart = () => {
    fetch("http://127.0.0.1:8000/api/cart/")
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data);

        const totalPrice = data.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
        setTotal(totalPrice);
      });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // 🔥 Increase Quantity
  const increaseQty = (productId) => {
    fetch("http://127.0.0.1:8000/api/cart/update/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: productId,
        action: "increase",
      }),
    }).then(() => fetchCart());
  };

  // 🔥 Decrease Quantity
  const decreaseQty = (productId) => {
    fetch("http://127.0.0.1:8000/api/cart/update/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: productId,
        action: "decrease",
      }),
    }).then(() => fetchCart());
  };

  // 🔥 Remove Item
  const removeItem = (productId) => {
    fetch("http://127.0.0.1:8000/api/cart/remove/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id: productId }),
    }).then(() => fetchCart());
  };

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <div className="row">

        {/* Cart Items */}
        <div className="col-lg-8">
          {cartItems.length === 0 ? (
            <h3>No items in cart</h3>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="d-flex justify-content-between align-items-center p-3 border rounded mb-3"
              >
                <div className="d-flex align-items-center">
                  <img
                    src={`http://127.0.0.1:8000/media/${item.product.image}`}
                    alt={item.product.product_name}
                    style={{
                      height: "100px",
                      width: "100px",
                      objectFit: "contain",
                    }}
                  />

                  <div className="ms-3">
                    <h5>{item.product.product_name}</h5>
                    <p>
                      ${item.product.price} × {item.quantity}
                    </p>
                    <strong>
                      ${item.product.price * item.quantity}
                    </strong>
                  </div>
                </div>

                <div>
                  <button
                    className="btn btn-sm btn-success me-2"
                    onClick={() => increaseQty(item.product.id)}
                  >
                    +
                  </button>

                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => decreaseQty(item.product.id)}
                  >
                    -
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => removeItem(item.product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Summary */}
        <div className="col-lg-4">
          <div className="border p-3 rounded">
            <h4>Cart Summary</h4>
            <hr />
            <h5>Total Price:</h5>
            <h3>${total}</h3>
          </div>
        </div>

      </div>
    </div>
  );
}