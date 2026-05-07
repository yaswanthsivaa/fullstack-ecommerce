import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter ,Routes,Route} from "react-router-dom";
import {toast } from 'react-toastify';
import Productpage from "./Product";
import Cartpage from "./Cart";
import { createContext, useState, useEffect} from "react";
import Nav from "./Navbar";
import Footer from "./Footer";
import Shop from "./Shop";
import ProductDetail from "./ProductDetail";

export const AppContext=createContext();
function AppTask() {
const [cart,setCart]=useState({})
const [products,setProducts]=useState([])

// Extra for Django

useEffect(() => {
  fetch("https://fullstack-ecommerce-backend-vs9n.onrender.com/api/products/")
  .then(res => res.json())
  .then(data => {
    setProducts(data);
  })
  .catch(error => {
    console.error("Error fetching products:", error);
  });
}, []);


const [qty,setQty]=useState(1)

// const addtocart = (id) => {
  //     setCart((cart) => ({ ...cart, [id]: cart[id] ? cart[id] + qty : qty }));
  //     toast.success("Your item has been added!")
  //   };
  
// Extra for Django
const addtocart = async (id) => {
    try {
      const response = await fetch("https://fullstack-ecommerce-backend-vs9n.onrender.com/api/cart/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          product_id: id,
          quantity: qty
        })
      });

      const data = await response.json();
      console.log("Backend Response:", data);

      // Keep frontend cart logic (no change)
      setCart((cart) => ({
        ...cart,
        [id]: cart[id] ? cart[id] + qty : qty
      }));

      toast.success("Added to Cart!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Couldn't Add to Cart!!");
    }
  };


const handleQty = (e) => {
    setQty(Number(e.target.value)); 
  };

const inc = (product) => {
  setCart((cart) => ({ ...cart, [product.id]: (cart[product.id] ? cart[product.id] : 0) + 1 }));
};

const dec = (product) => {
  setCart((cart) => ({ ...cart, [product.id]: (cart[product.id] ? cart[product.id] : 0) -1 }));
};

return (
    <div>
        <BrowserRouter>
            <AppContext.Provider value={{cart,setCart,products,setProducts,inc,dec,addtocart,qty,setQty,handleQty}}>
                <Nav/>
                <Routes>
                    <Route path="/"element={<Productpage/>}></Route>
                    <Route path="shop"element={<Shop/>}></Route>
                    <Route path="cart"element={<Cartpage/>}></Route>
                    <Route path="shop/detail/:id" element={<ProductDetail/>} />
                </Routes>
                <Footer/>
            </AppContext.Provider>
        </BrowserRouter>
    </div>
  );
}
export default AppTask;
