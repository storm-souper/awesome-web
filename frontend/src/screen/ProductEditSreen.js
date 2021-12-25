import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { detailsProduct, updateProduct } from '../action/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constant/productConstants';

export default function ProductEditSreen() {
  const navigate = useNavigate();

  const {id: productID} = useParams();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStocks, setCountInStocks] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const productDetails = useSelector(state => state.productDetails);
  const {loading, error, product} = productDetails;
  const productUpdate = useSelector(state => state.productUpdate);
  const {
    loading: loadingUpdate, 
    success: successUpdate, 
    error: errorUpdate, 
  } = productUpdate;
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;

  const dispatch = useDispatch(); 

  useEffect(() => {
    if (successUpdate) {
      dispatch({type: PRODUCT_UPDATE_RESET});
      userInfo.isAdmin && navigate('/productlist');
      !userInfo.isAdmin && userInfo.isSeller && navigate('/productlist/seller');
    }
    if (!product || product._id !== productID) {
      dispatch(detailsProduct(productID));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setCountInStocks(product.countInStocks);
      setBrand(product.brand);
      setDescription(product.description);
    }
  }, [dispatch, product, productID, successUpdate, navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productID,
        name,
        price, 
        image,
        category, 
        brand,
        countInStocks,
        description,
      })
    );
  };

  const uploadImageHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setLoadingUpload(true);
    try {
      const {data} = await Axios.post(
        '/api/uploads',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`
          }
        }
      );
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <div>
      <form className='form' onSubmit={submitHandler}>
        <div>
          <h1>Edit Product {productID}</h1>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {successUpdate && <MessageBox variant="success">Product Updated Successfully</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor='name'>Name</label>
              <input 
                id='name' 
                type='text' 
                placeholder='Enter name' 
                value={name} onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor='price'>Price</label>
              <input 
                id='price' 
                type='text' 
                placeholder='Enter price' 
                value={price} onChange={(e) => setPrice(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor='image'>Image</label>
              <img className="medium" src={image} alt={name}></img>
              <input 
                id='image' 
                type='text' 
                placeholder='Enter image' 
                value={image} onChange={(e) => setImage(e.target.value)}
              ></input>
              <input 
                label="Choose Image"
                type="file" 
                name="image-file" 
                id="image-file" 
                onChange={uploadImageHandler}
              />
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
            </div>
            <div>
              <label htmlFor='category'>Category</label>
              <input 
                id='category' 
                type='text' 
                placeholder='Enter category' 
                value={category} onChange={(e) => setCategory(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor='countInStocks'>Count In Stocks</label>
              <input 
                id='countInStocks' 
                type='text' 
                placeholder='Enter countInStocks' 
                value={countInStocks} onChange={(e) => setCountInStocks(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor='brand'>Brand</label>
              <input 
                id='brand' 
                type='text' 
                placeholder='Enter brand' 
                value={brand} onChange={(e) => setBrand(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor='description'>Description</label>
              <textarea 
                id='description'
                rows='3' 
                type='text' 
                placeholder='Enter description' 
                value={description} onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label></label>
              <button className='primary' type='submit'>
                Update
              </button>
            </div>
          </>
        ) }
      </form>
    </div>
  )
};
