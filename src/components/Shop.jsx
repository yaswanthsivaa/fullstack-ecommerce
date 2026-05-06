import React, { useContext, useState } from 'react';
import table from '../Images/table.jpg';
import { Link } from 'react-router-dom';
import { AppContext } from './App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function Shop() {
  const { products } = useContext(AppContext);
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filteredProducts = products.filter((product) =>
    product.product_name?.toLowerCase().includes(search)
  );

  return (
    <div className="container-fluid p-0" style={{ marginTop: '100px' }}>

      {/* Banner */}
      <div
        className="d-flex justify-content-center align-items-center text-black"
        style={{
          backgroundImage: `url(${table})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '250px',
          width: '100vw',
          marginBottom: '100px',
        }}
      >
        <h1 style={{ color: 'white' }}>Product</h1>
      </div>

      {/* Search */}
      
<div className="container mb-5">
  <div className="row justify-content-center">
    <div className="col-12 col-md-6">
      <div className="input-group position-relative">
        <input
          type="search"
          onChange={handleSearch}
          className="form-control"
          placeholder="Search products"
          style={{
            borderRadius: "50px",
            paddingLeft: "20px",
            paddingRight: "45px",
            height: "45px",
          }}
        />

        <span
          className="position-absolute"
          style={{
            right: "15px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#555",
          }}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </span>
      </div>
    </div>
  </div>
</div>

      {/* Products Grid */}
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-4">
          {filteredProducts.map((product) => (

            <div key={product.id} className="col d-flex justify-content-center">
              
              {/* 🔥 IMPORTANT FIX HERE */}
              <Link
                to={`/shop/detail/${product.id}`}
                state={{ product }}
                className="text-decoration-none"
              >
                <div className="card" style={{ width: '18rem' }}>
                  
                  <img
                    src={`http://127.0.0.1:8000/media/${product.image}`}
                    alt={product.product_name}
                    className="card-img-top"
                    style={{ height: '150px', objectFit: 'contain' }}
                  />

                  <div className="card-body text-center">
                    <h5 className="card-title">
                      {product.product_name?.slice(0, 20)}
                    </h5>

                    <div>
                      {[...Array(5)].map((_, index) => (
                        <i
                          key={index}
                          className="fas fa-star"
                          style={{ color: 'gold' }}
                        ></i>
                      ))}
                    </div>

                    <div className="d-flex justify-content-center align-items-center mt-2">
                      <h4 className="card-text mb-0">${product.price}</h4>
                    </div>
                  </div>

                </div>
              </Link>

            </div>

          ))}
        </div>
      </div>
    </div>
  );
}