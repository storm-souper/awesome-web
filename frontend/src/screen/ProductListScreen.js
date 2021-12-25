import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { createProduct, deleteProduct, listProducts } from '../action/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constant/productConstants';
import { useLocation } from 'react-router-dom';

export default function ProductListScreen() {
  const { pathname } = useLocation();
  const sellerMode = pathname.indexOf('/seller') >= 0;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productList = useSelector(state => state.productList);
  const {loading, error, products} = productList;
  const productCreate = useSelector(state => state.productCreate);
  const {
    loading: loadingCreate, 
    error: errorCreate, 
    success: successCreate, 
    product: createdProduct
  } = productCreate;
  const productDelete = useSelector(state => state.productDelete);
  const {
    loading: loadingDelete, 
    error: errorDelete, 
    success: successDelete, 
  } = productDelete;
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;

  useEffect(() => {
    if (successCreate) {
      dispatch({type: PRODUCT_CREATE_RESET});
      navigate(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({type: PRODUCT_DELETE_RESET})
    }  
    dispatch(listProducts({seller: sellerMode ? userInfo._id : ''}));
    // dispatch({type: PRODUCT_DETAILS_RESET});
  }, [dispatch, navigate, successCreate, createdProduct, successDelete, userInfo, sellerMode]);
  const deleteHandler = (product) => {
    // TODO: dispatch delete product action
    if (window.confirm('Are you sure to delete this product?')) {
      dispatch(deleteProduct(product._id));
    }
  };
  const createHandler = () => {
    dispatch(createProduct());
  };
  return (
    <div>
      <div className="row">
        <h1>Products</h1>
        <button 
          type='button' 
          className="primary" 
          onClick={createHandler}
        >
          Create Product
        </button>
      </div>
      {loadingCreate && <LoadingBox></LoadingBox>}
      {error && <MessageBox>{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button 
                    type="button" 
                    className="small"
                    onClick={() => navigate(`/product/${product._id}/edit`)}  
                  >
                    Edit
                  </button>
                  <button 
                    type="button" 
                    className="small"
                    onClick={() => deleteHandler(product)}  
                  >
                    Delete
                  </button>
                  {loadingDelete && <LoadingBox></LoadingBox>}
                  {errorDelete && (
                    <MessageBox variant="danger">{errorDelete}</MessageBox>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
};
