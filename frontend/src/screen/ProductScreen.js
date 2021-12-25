import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Rating from '../components/Rating';
import { Link, useParams, useNavigate } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsProduct } from '../action/productActions';

export default function ProductScreen() {
  const productID = useParams().id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    console.log(productID)
    dispatch(detailsProduct(productID))
  }, [dispatch, productID]);
  const addToCartHandler = () => {
    navigate(`/cart/${productID}?qty=${qty}`)
  }
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Back to Homepage</Link>
          <div className="row top">
            <div className="col-2">
              <img className="large" src={product.image} alt={product.name}></img>
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <Rating 
                    rating={product.rating} 
                    numReviews={product.numReviews}
                  ></Rating>
                </li>
                <li>
                  Price: ${product.price}
                </li>
                <li>
                  <p>{product.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div>${product.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {product.countInStocks > 0 
                          ? (<span className="success">In Stock</span>)
                          : (<span className="danger">Not Available</span>)
                        }
                      </div>
                    </div>
                  </li>
                  {product.countInStocks > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select value={qty} onChange={e => setQty(e.target.value)}>
                              {[...Array(product.countInStocks).keys()].map(x => (
                                  <option key={x+1} value={x+1}>
                                    {x+1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button 
                          onClick={addToCartHandler} 
                          className="primary block"
                        >
                          Add to Cart
                        </button>
                      </li>
                    </>
                  )}  
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}      
    </div>  
  )
}

